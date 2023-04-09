/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CommerceDetailComponent from '@/entities/commerce/commerce-details.vue';
import CommerceClass from '@/entities/commerce/commerce-details.component';
import CommerceService from '@/entities/commerce/commerce.service';
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
  describe('Commerce Management Detail Component', () => {
    let wrapper: Wrapper<CommerceClass>;
    let comp: CommerceClass;
    let commerceServiceStub: SinonStubbedInstance<CommerceService>;

    beforeEach(() => {
      commerceServiceStub = sinon.createStubInstance<CommerceService>(CommerceService);

      wrapper = shallowMount<CommerceClass>(CommerceDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { commerceService: () => commerceServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCommerce = { id: 123 };
        commerceServiceStub.find.resolves(foundCommerce);

        // WHEN
        comp.retrieveCommerce(123);
        await comp.$nextTick();

        // THEN
        expect(comp.commerce).toBe(foundCommerce);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCommerce = { id: 123 };
        commerceServiceStub.find.resolves(foundCommerce);

        // WHEN
        comp.beforeRouteEnter({ params: { commerceId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.commerce).toBe(foundCommerce);
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
