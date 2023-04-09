import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ILivraison } from '@/shared/model/livraison.model';

import LivraisonService from './livraison.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Livraison extends Vue {
  @Inject('livraisonService') private livraisonService: () => LivraisonService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public livraisons: ILivraison[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllLivraisons();
  }

  public clear(): void {
    this.retrieveAllLivraisons();
  }

  public retrieveAllLivraisons(): void {
    this.isFetching = true;
    this.livraisonService()
      .retrieve()
      .then(
        res => {
          this.livraisons = res.data;
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

  public prepareRemove(instance: ILivraison): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeLivraison(): void {
    this.livraisonService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopCyleApp.livraison.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllLivraisons();
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
