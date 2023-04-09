import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import PanierService from '@/entities/panier/panier.service';
import { IPanier } from '@/shared/model/panier.model';

import CommerceService from '@/entities/commerce/commerce.service';
import { ICommerce } from '@/shared/model/commerce.model';

import CooperativeService from '@/entities/cooperative/cooperative.service';
import { ICooperative } from '@/shared/model/cooperative.model';

import { IClientele, Clientele } from '@/shared/model/clientele.model';
import ClienteleService from './clientele.service';

const validations: any = {
  clientele: {},
};

@Component({
  validations,
})
export default class ClienteleUpdate extends Vue {
  @Inject('clienteleService') private clienteleService: () => ClienteleService;
  @Inject('alertService') private alertService: () => AlertService;

  public clientele: IClientele = new Clientele();

  @Inject('panierService') private panierService: () => PanierService;

  public paniers: IPanier[] = [];

  @Inject('commerceService') private commerceService: () => CommerceService;

  public commerce: ICommerce[] = [];

  @Inject('cooperativeService') private cooperativeService: () => CooperativeService;

  public cooperatives: ICooperative[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clienteleId) {
        vm.retrieveClientele(to.params.clienteleId);
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
    this.clientele.commerce = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.clientele.id) {
      this.clienteleService()
        .update(this.clientele)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopCyleApp.clientele.updated', { param: param.id });
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
      this.clienteleService()
        .create(this.clientele)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopCyleApp.clientele.created', { param: param.id });
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

  public retrieveClientele(clienteleId): void {
    this.clienteleService()
      .find(clienteleId)
      .then(res => {
        this.clientele = res;
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
    this.commerceService()
      .retrieve()
      .then(res => {
        this.commerce = res.data;
      });
    this.cooperativeService()
      .retrieve()
      .then(res => {
        this.cooperatives = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      return selectedVals.find(value => option.id === value.id) ?? option;
    }
    return option;
  }
}
