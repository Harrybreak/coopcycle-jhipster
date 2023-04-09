import { Component, Vue, Inject } from 'vue-property-decorator';

import { IPanier } from '@/shared/model/panier.model';
import PanierService from './panier.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class PanierDetails extends Vue {
  @Inject('panierService') private panierService: () => PanierService;
  @Inject('alertService') private alertService: () => AlertService;

  public panier: IPanier = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.panierId) {
        vm.retrievePanier(to.params.panierId);
      }
    });
  }

  public retrievePanier(panierId) {
    this.panierService()
      .find(panierId)
      .then(res => {
        this.panier = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
