import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import LivraisonService from '@/entities/livraison/livraison.service';
import { ILivraison } from '@/shared/model/livraison.model';

import ClienteleService from '@/entities/clientele/clientele.service';
import { IClientele } from '@/shared/model/clientele.model';

import CommerceService from '@/entities/commerce/commerce.service';
import { ICommerce } from '@/shared/model/commerce.model';

import { IPanier, Panier } from '@/shared/model/panier.model';
import PanierService from './panier.service';
import { EtatLivraison } from '@/shared/model/enumerations/etat-livraison.model';
import { Paiement } from '@/shared/model/enumerations/paiement.model';

const validations: any = {
  panier: {
    etat: {
      required,
    },
    paiement: {
      required,
    },
    dateCommande: {},
  },
};

@Component({
  validations,
})
export default class PanierUpdate extends Vue {
  @Inject('panierService') private panierService: () => PanierService;
  @Inject('alertService') private alertService: () => AlertService;

  public panier: IPanier = new Panier();

  @Inject('livraisonService') private livraisonService: () => LivraisonService;

  public livraisons: ILivraison[] = [];

  @Inject('clienteleService') private clienteleService: () => ClienteleService;

  public clienteles: IClientele[] = [];

  @Inject('commerceService') private commerceService: () => CommerceService;

  public commerce: ICommerce[] = [];
  public etatLivraisonValues: string[] = Object.keys(EtatLivraison);
  public paiementValues: string[] = Object.keys(Paiement);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.panierId) {
        vm.retrievePanier(to.params.panierId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.panier.id) {
      this.panierService()
        .update(this.panier)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopCyleApp.panier.updated', { param: param.id });
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.panierService()
        .create(this.panier)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopCyleApp.panier.created', { param: param.id });
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.panier[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.panier[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.panier[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.panier[field] = null;
    }
  }

  public retrievePanier(panierId): void {
    this.panierService()
      .find(panierId)
      .then(res => {
        res.dateCommande = new Date(res.dateCommande);
        this.panier = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.livraisonService()
      .retrieve()
      .then(res => {
        this.livraisons = res.data;
      });
    this.clienteleService()
      .retrieve()
      .then(res => {
        this.clienteles = res.data;
      });
    this.commerceService()
      .retrieve()
      .then(res => {
        this.commerce = res.data;
      });
  }
}
