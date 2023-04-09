import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICommerce } from '@/shared/model/commerce.model';
import CommerceService from './commerce.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CommerceDetails extends Vue {
  @Inject('commerceService') private commerceService: () => CommerceService;
  @Inject('alertService') private alertService: () => AlertService;

  public commerce: ICommerce = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.commerceId) {
        vm.retrieveCommerce(to.params.commerceId);
      }
    });
  }

  public retrieveCommerce(commerceId) {
    this.commerceService()
      .find(commerceId)
      .then(res => {
        this.commerce = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
