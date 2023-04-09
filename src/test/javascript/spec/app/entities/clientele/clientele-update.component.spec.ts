/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ClienteleUpdateComponent from '@/entities/clientele/clientele-update.vue';
import ClienteleClass from '@/entities/clientele/clientele-update.component';
import ClienteleService from '@/entities/clientele/clientele.service';

import PanierService from '@/entities/panier/panier.service';

import CommerceService from '@/entities/commerce/commerce.service';

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
  describe('Clientele Management Update Component', () => {
    let wrapper: Wrapper<ClienteleClass>;
    let comp: ClienteleClass;
    let clienteleServiceStub: SinonStubbedInstance<ClienteleService>;

    beforeEach(() => {
      clienteleServiceStub = sinon.createStubInstance<ClienteleService>(ClienteleService);

      wrapper = shallowMount<ClienteleClass>(ClienteleUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          clienteleService: () => clienteleServiceStub,
          alertService: () => new AlertService(),

          panierService: () =>
            sinon.createStubInstance<PanierService>(PanierService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          commerceService: () =>
            sinon.createStubInstance<CommerceService>(CommerceService, {
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
        comp.clientele = entity;
        clienteleServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(clienteleServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.clientele = entity;
        clienteleServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(clienteleServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundClientele = { id: 123 };
        clienteleServiceStub.find.resolves(foundClientele);
        clienteleServiceStub.retrieve.resolves([foundClientele]);

        // WHEN
        comp.beforeRouteEnter({ params: { clienteleId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.clientele).toBe(foundClientele);
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
