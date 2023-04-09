import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IPanier } from '@/shared/model/panier.model';

import PanierService from './panier.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Panier extends Vue {
  @Inject('panierService') private panierService: () => PanierService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public paniers: IPanier[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllPaniers();
  }

  public clear(): void {
    this.retrieveAllPaniers();
  }

  public retrieveAllPaniers(): void {
    this.isFetching = true;
    this.panierService()
      .retrieve()
      .then(
        res => {
          this.paniers = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IPanier): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removePanier(): void {
    this.panierService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopCyleApp.panier.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllPaniers();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
