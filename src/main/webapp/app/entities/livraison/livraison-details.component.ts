import { Component, Vue, Inject } from 'vue-property-decorator';

import { ILivraison } from '@/shared/model/livraison.model';
import LivraisonService from './livraison.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class LivraisonDetails extends Vue {
  @Inject('livraisonService') private livraisonService: () => LivraisonService;
  @Inject('alertService') private alertService: () => AlertService;

  public livraison: ILivraison = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.livraisonId) {
        vm.retrieveLivraison(to.params.livraisonId);
      }
    });
  }

  public retrieveLivraison(livraisonId) {
    this.livraisonService()
      .find(livraisonId)
      .then(res => {
        this.livraison = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
