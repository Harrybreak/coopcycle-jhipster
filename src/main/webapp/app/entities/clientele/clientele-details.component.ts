import { Component, Vue, Inject } from 'vue-property-decorator';

import { IClientele } from '@/shared/model/clientele.model';
import ClienteleService from './clientele.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ClienteleDetails extends Vue {
  @Inject('clienteleService') private clienteleService: () => ClienteleService;
  @Inject('alertService') private alertService: () => AlertService;

  public clientele: IClientele = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clienteleId) {
        vm.retrieveClientele(to.params.clienteleId);
      }
    });
  }

  public retrieveClientele(clienteleId) {
    this.clienteleService()
      .find(clienteleId)
      .then(res => {
        this.clientele = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
