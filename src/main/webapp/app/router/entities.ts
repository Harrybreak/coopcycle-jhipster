import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

const Clientele = () => import('@/entities/clientele/clientele.vue');
const ClienteleUpdate = () => import('@/entities/clientele/clientele-update.vue');
const ClienteleDetails = () => import('@/entities/clientele/clientele-details.vue');

const Cooperative = () => import('@/entities/cooperative/cooperative.vue');
const CooperativeUpdate = () => import('@/entities/cooperative/cooperative-update.vue');
const CooperativeDetails = () => import('@/entities/cooperative/cooperative-details.vue');

const Commerce = () => import('@/entities/commerce/commerce.vue');
const CommerceUpdate = () => import('@/entities/commerce/commerce-update.vue');
const CommerceDetails = () => import('@/entities/commerce/commerce-details.vue');

const Livraison = () => import('@/entities/livraison/livraison.vue');
const LivraisonUpdate = () => import('@/entities/livraison/livraison-update.vue');
const LivraisonDetails = () => import('@/entities/livraison/livraison-details.vue');

const Maintenance = () => import('@/entities/maintenance/maintenance.vue');
const MaintenanceUpdate = () => import('@/entities/maintenance/maintenance-update.vue');
const MaintenanceDetails = () => import('@/entities/maintenance/maintenance-details.vue');

const Panier = () => import('@/entities/panier/panier.vue');
const PanierUpdate = () => import('@/entities/panier/panier-update.vue');
const PanierDetails = () => import('@/entities/panier/panier-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'clientele',
      name: 'Clientele',
      component: Clientele,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'clientele/new',
      name: 'ClienteleCreate',
      component: ClienteleUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'clientele/:clienteleId/edit',
      name: 'ClienteleEdit',
      component: ClienteleUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'clientele/:clienteleId/view',
      name: 'ClienteleView',
      component: ClienteleDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative',
      name: 'Cooperative',
      component: Cooperative,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative/new',
      name: 'CooperativeCreate',
      component: CooperativeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative/:cooperativeId/edit',
      name: 'CooperativeEdit',
      component: CooperativeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative/:cooperativeId/view',
      name: 'CooperativeView',
      component: CooperativeDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commerce',
      name: 'Commerce',
      component: Commerce,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commerce/new',
      name: 'CommerceCreate',
      component: CommerceUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commerce/:commerceId/edit',
      name: 'CommerceEdit',
      component: CommerceUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commerce/:commerceId/view',
      name: 'CommerceView',
      component: CommerceDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'livraison',
      name: 'Livraison',
      component: Livraison,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'livraison/new',
      name: 'LivraisonCreate',
      component: LivraisonUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'livraison/:livraisonId/edit',
      name: 'LivraisonEdit',
      component: LivraisonUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'livraison/:livraisonId/view',
      name: 'LivraisonView',
      component: LivraisonDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'maintenance',
      name: 'Maintenance',
      component: Maintenance,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'maintenance/new',
      name: 'MaintenanceCreate',
      component: MaintenanceUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'maintenance/:maintenanceId/edit',
      name: 'MaintenanceEdit',
      component: MaintenanceUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'maintenance/:maintenanceId/view',
      name: 'MaintenanceView',
      component: MaintenanceDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'panier',
      name: 'Panier',
      component: Panier,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'panier/new',
      name: 'PanierCreate',
      component: PanierUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'panier/:panierId/edit',
      name: 'PanierEdit',
      component: PanierUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'panier/:panierId/view',
      name: 'PanierView',
      component: PanierDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
