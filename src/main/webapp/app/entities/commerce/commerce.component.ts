import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICommerce } from '@/shared/model/commerce.model';

import CommerceService from './commerce.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Commerce extends Vue {
  @Inject('commerceService') private commerceService: () => CommerceService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public commerce: ICommerce[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCommerces();
  }

  public clear(): void {
    this.retrieveAllCommerces();
  }

  public retrieveAllCommerces(): void {
    this.isFetching = true;
    this.commerceService()
      .retrieve()
      .then(
        res => {
          this.commerce = res.data;
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

  public prepareRemove(instance: ICommerce): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCommerce(): void {
    this.commerceService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopCyleApp.commerce.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCommerces();
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
