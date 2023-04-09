/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import LivraisonUpdateComponent from '@/entities/livraison/livraison-update.vue';
import LivraisonClass from '@/entities/livraison/livraison-update.component';
import LivraisonService from '@/entities/livraison/livraison.service';

import PanierService from '@/entities/panier/panier.service';

import CooperativeService from '@/entities/cooperative/cooperative.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Livraison Management Update Component', () => {
    let wrapper: Wrapper<LivraisonClass>;
    let comp: LivraisonClass;
    let livraisonServiceStub: SinonStubbedInstance<LivraisonService>;

    beforeEach(() => {
      livraisonServiceStub = sinon.createStubInstance<LivraisonService>(LivraisonService);

      wrapper = shallowMount<LivraisonClass>(LivraisonUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          livraisonService: () => livraisonServiceStub,
          alertService: () => new AlertService(),

          panierService: () =>
            sinon.createStubInstance<PanierService>(PanierService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          cooperativeService: () =>
            sinon.createStubInstance<CooperativeService>(CooperativeService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.livraison = entity;
        livraisonServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(livraisonServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.livraison = entity;
        livraisonServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(livraisonServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundLivraison = { id: 123 };
        livraisonServiceStub.find.resolves(foundLivraison);
        livraisonServiceStub.retrieve.resolves([foundLivraison]);

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
