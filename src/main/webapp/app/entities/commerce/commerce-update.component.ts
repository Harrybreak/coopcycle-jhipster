import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import PanierService from '@/entities/panier/panier.service';
import { IPanier } from '@/shared/model/panier.model';

import CooperativeService from '@/entities/cooperative/cooperative.service';
import { ICooperative } from '@/shared/model/cooperative.model';

import ClienteleService from '@/entities/clientele/clientele.service';
import { IClientele } from '@/shared/model/clientele.model';

import { ICommerce, Commerce } from '@/shared/model/commerce.model';
import CommerceService from './commerce.service';
import { Theme } from '@/shared/model/enumerations/theme.model';

const validations: any = {
  commerce: {
    nom: {
      required,
    },
    theme: {},
    site: {},
  },
};

@Component({
  validations,
})
export default class CommerceUpdate extends Vue {
  @Inject('commerceService') private commerceService: () => CommerceService;
  @Inject('alertService') private alertService: () => AlertService;

  public commerce: ICommerce = new Commerce();

  @Inject('panierService') private panierService: () => PanierService;

  public paniers: IPanier[] = [];

  @Inject('cooperativeService') private cooperativeService: () => CooperativeService;

  public cooperatives: ICooperative[] = [];

  @Inject('clienteleService') private clienteleService: () => ClienteleService;

  public clienteles: IClientele[] = [];
  public themeValues: string[] = Object.keys(Theme);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.commerceId) {
        vm.retrieveCommerce(to.params.commerceId);
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
    if (this.commerce.id) {
      this.commerceService()
        .update(this.commerce)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopCyleApp.commerce.updated', { param: param.id });
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
      this.commerceService()
        .create(this.commerce)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopCyleApp.commerce.created', { param: param.id });
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

  public retrieveCommerce(commerceId): void {
    this.commerceService()
      .find(commerceId)
      .then(res => {
        this.commerce = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.panierService()
      .retrieve()
      .then(res => {
        this.paniers = res.data;
      });
    this.cooperativeService()
      .retrieve()
      .then(res => {
        this.cooperatives = res.data;
      });
    this.clienteleService()
      .retrieve()
      .then(res => {
        this.clienteles = res.data;
      });
  }
}
