import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IClientele } from '@/shared/model/clientele.model';

import ClienteleService from './clientele.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Clientele extends Vue {
  @Inject('clienteleService') private clienteleService: () => ClienteleService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public clienteles: IClientele[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllClienteles();
  }

  public clear(): void {
    this.retrieveAllClienteles();
  }

  public retrieveAllClienteles(): void {
    this.isFetching = true;
    this.clienteleService()
      .retrieve()
      .then(
        res => {
          this.clienteles = res.data;
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

  public prepareRemove(instance: IClientele): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeClientele(): void {
    this.clienteleService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopCyleApp.clientele.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllClienteles();
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
