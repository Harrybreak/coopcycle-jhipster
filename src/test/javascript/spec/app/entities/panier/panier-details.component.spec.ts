/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import PanierDetailComponent from '@/entities/panier/panier-details.vue';
import PanierClass from '@/entities/panier/panier-details.component';
import PanierService from '@/entities/panier/panier.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Panier Management Detail Component', () => {
    let wrapper: Wrapper<PanierClass>;
    let comp: PanierClass;
    let panierServiceStub: SinonStubbedInstance<PanierService>;

    beforeEach(() => {
      panierServiceStub = sinon.createStubInstance<PanierService>(PanierService);

      wrapper = shallowMount<PanierClass>(PanierDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { panierService: () => panierServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundPanier = { id: 123 };
        panierServiceStub.find.resolves(foundPanier);

        // WHEN
        comp.retrievePanier(123);
        await comp.$nextTick();

        // THEN
        expect(comp.panier).toBe(foundPanier);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundPanier = { id: 123 };
        panierServiceStub.find.resolves(foundPanier);

        // WHEN
        comp.beforeRouteEnter({ params: { panierId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.panier).toBe(foundPanier);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
