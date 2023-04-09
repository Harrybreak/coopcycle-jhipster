import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import ClienteleService from '@/entities/clientele/clientele.service';
import { IClientele } from '@/shared/model/clientele.model';

import LivraisonService from '@/entities/livraison/livraison.service';
import { ILivraison } from '@/shared/model/livraison.model';

import CommerceService from '@/entities/commerce/commerce.service';
import { ICommerce } from '@/shared/model/commerce.model';

import { ICooperative, Cooperative } from '@/shared/model/cooperative.model';
import CooperativeService from './cooperative.service';

const validations: any = {
  cooperative: {
    nom: {
      required,
    },
    canton: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class CooperativeUpdate extends Vue {
  @Inject('cooperativeService') private cooperativeService: () => CooperativeService;
  @Inject('alertService') private alertService: () => AlertService;

  public cooperative: ICooperative = new Cooperative();

  @Inject('clienteleService') private clienteleService: () => ClienteleService;

  public clienteles: IClientele[] = [];

  @Inject('livraisonService') private livraisonService: () => LivraisonService;

  public livraisons: ILivraison[] = [];

  @Inject('commerceService') private commerceService: () => CommerceService;

  public commerce: ICommerce[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cooperativeId) {
        vm.retrieveCooperative(to.params.cooperativeId);
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
    if (this.cooperative.id) {
      this.cooperativeService()
        .update(this.cooperative)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopCyleApp.cooperative.updated', { param: param.id });
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
      this.cooperativeService()
        .create(this.cooperative)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopCyleApp.cooperative.created', { param: param.id });
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

  public retrieveCooperative(cooperativeId): void {
    this.cooperativeService()
      .find(cooperativeId)
      .then(res => {
        this.cooperative = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.clienteleService()
      .retrieve()
      .then(res => {
        this.clienteles = res.data;
      });
    this.livraisonService()
      .retrieve()
      .then(res => {
        this.livraisons = res.data;
      });
    this.commerceService()
      .retrieve()
      .then(res => {
        this.commerce = res.data;
      });
  }
}
