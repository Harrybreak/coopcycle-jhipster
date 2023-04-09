/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CommerceComponent from '@/entities/commerce/commerce.vue';
import CommerceClass from '@/entities/commerce/commerce.component';
import CommerceService from '@/entities/commerce/commerce.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Commerce Management Component', () => {
    let wrapper: Wrapper<CommerceClass>;
    let comp: CommerceClass;
    let commerceServiceStub: SinonStubbedInstance<CommerceService>;

    beforeEach(() => {
      commerceServiceStub = sinon.createStubInstance<CommerceService>(CommerceService);
      commerceServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CommerceClass>(CommerceComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          commerceService: () => commerceServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      commerceServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCommerces();
      await comp.$nextTick();

      // THEN
      expect(commerceServiceStub.retrieve.called).toBeTruthy();
      expect(comp.commerce[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      commerceServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(commerceServiceStub.retrieve.callCount).toEqual(1);

      comp.removeCommerce();
      await comp.$nextTick();

      // THEN
      expect(commerceServiceStub.delete.called).toBeTruthy();
      expect(commerceServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
