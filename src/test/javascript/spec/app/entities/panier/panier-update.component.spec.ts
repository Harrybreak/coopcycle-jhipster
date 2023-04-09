/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import PanierUpdateComponent from '@/entities/panier/panier-update.vue';
import PanierClass from '@/entities/panier/panier-update.component';
import PanierService from '@/entities/panier/panier.service';

import LivraisonService from '@/entities/livraison/livraison.service';

import ClienteleService from '@/entities/clientele/clientele.service';

import CommerceService from '@/entities/commerce/commerce.service';
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
  describe('Panier Management Update Component', () => {
    let wrapper: Wrapper<PanierClass>;
    let comp: PanierClass;
    let panierServiceStub: SinonStubbedInstance<PanierService>;

    beforeEach(() => {
      panierServiceStub = sinon.createStubInstance<PanierService>(PanierService);

      wrapper = shallowMount<PanierClass>(PanierUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          panierService: () => panierServiceStub,
          alertService: () => new AlertService(),

          livraisonService: () =>
            sinon.createStubInstance<LivraisonService>(LivraisonService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          clienteleService: () =>
            sinon.createStubInstance<ClienteleService>(ClienteleService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          commerceService: () =>
            sinon.createStubInstance<CommerceService>(CommerceService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.panier = entity;
        panierServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(panierServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.panier = entity;
        panierServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(panierServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundPanier = { id: 123 };
        panierServiceStub.find.resolves(foundPanier);
        panierServiceStub.retrieve.resolves([foundPanier]);

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
