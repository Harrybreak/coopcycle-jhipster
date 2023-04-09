import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import { IMaintenance, Maintenance } from '@/shared/model/maintenance.model';
import MaintenanceService from './maintenance.service';
import { TypeMaintenance } from '@/shared/model/enumerations/type-maintenance.model';

const validations: any = {
  maintenance: {
    categorie: {},
  },
};

@Component({
  validations,
})
export default class MaintenanceUpdate extends Vue {
  @Inject('maintenanceService') private maintenanceService: () => MaintenanceService;
  @Inject('alertService') private alertService: () => AlertService;

  public maintenance: IMaintenance = new Maintenance();
  public typeMaintenanceValues: string[] = Object.keys(TypeMaintenance);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.maintenanceId) {
        vm.retrieveMaintenance(to.params.maintenanceId);
      }
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
    if (this.maintenance.id) {
      this.maintenanceService()
        .update(this.maintenance)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopCyleApp.maintenance.updated', { param: param.id });
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
      this.maintenanceService()
        .create(this.maintenance)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopCyleApp.maintenance.created', { param: param.id });
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

  public retrieveMaintenance(maintenanceId): void {
    this.maintenanceService()
      .find(maintenanceId)
      .then(res => {
        this.maintenance = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
