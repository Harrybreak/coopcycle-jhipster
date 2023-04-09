/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import LivraisonDetailComponent from '@/entities/livraison/livraison-details.vue';
import LivraisonClass from '@/entities/livraison/livraison-details.component';
import LivraisonService from '@/entities/livraison/livraison.service';
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
  describe('Livraison Management Detail Component', () => {
    let wrapper: Wrapper<LivraisonClass>;
    let comp: LivraisonClass;
    let livraisonServiceStub: SinonStubbedInstance<LivraisonService>;

    beforeEach(() => {
      livraisonServiceStub = sinon.createStubInstance<LivraisonService>(LivraisonService);

      wrapper = shallowMount<LivraisonClass>(LivraisonDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { livraisonService: () => livraisonServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundLivraison = { id: 123 };
        livraisonServiceStub.find.resolves(foundLivraison);

        // WHEN
        comp.retrieveLivraison(123);
        await comp.$nextTick();

        // THEN
        expect(comp.livraison).toBe(foundLivraison);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundLivraison = { id: 123 };
        livraisonServiceStub.find.resolves(foundLivraison);

        // WHEN
        comp.beforeRouteEnter({ params: { livraisonId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.livraison).toBe(foundLivraison);
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
