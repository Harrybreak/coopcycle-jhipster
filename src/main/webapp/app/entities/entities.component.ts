import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import ClienteleService from './clientele/clientele.service';
import CooperativeService from './cooperative/cooperative.service';
import CommerceService from './commerce/commerce.service';
import LivraisonService from './livraison/livraison.service';
import MaintenanceService from './maintenance/maintenance.service';
import PanierService from './panier/panier.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('clienteleService') private clienteleService = () => new ClienteleService();
  @Provide('cooperativeService') private cooperativeService = () => new CooperativeService();
  @Provide('commerceService') private commerceService = () => new CommerceService();
  @Provide('livraisonService') private livraisonService = () => new LivraisonService();
  @Provide('maintenanceService') private maintenanceService = () => new MaintenanceService();
  @Provide('panierService') private panierService = () => new PanierService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
