import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IMaintenance } from '@/shared/model/maintenance.model';

import MaintenanceService from './maintenance.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Maintenance extends Vue {
  @Inject('maintenanceService') private maintenanceService: () => MaintenanceService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public maintenances: IMaintenance[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllMaintenances();
  }

  public clear(): void {
    this.retrieveAllMaintenances();
  }

  public retrieveAllMaintenances(): void {
    this.isFetching = true;
    this.maintenanceService()
      .retrieve()
      .then(
        res => {
          this.maintenances = res.data;
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

  public prepareRemove(instance: IMaintenance): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeMaintenance(): void {
    this.maintenanceService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopCyleApp.maintenance.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllMaintenances();
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
