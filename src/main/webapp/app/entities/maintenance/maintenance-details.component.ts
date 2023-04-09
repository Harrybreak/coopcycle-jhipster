import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMaintenance } from '@/shared/model/maintenance.model';
import MaintenanceService from './maintenance.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class MaintenanceDetails extends Vue {
  @Inject('maintenanceService') private maintenanceService: () => MaintenanceService;
  @Inject('alertService') private alertService: () => AlertService;

  public maintenance: IMaintenance = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.maintenanceId) {
        vm.retrieveMaintenance(to.params.maintenanceId);
      }
    });
  }

  public retrieveMaintenance(maintenanceId) {
    this.maintenanceService()
      .find(maintenanceId)
      .then(res => {
        this.maintenance = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
