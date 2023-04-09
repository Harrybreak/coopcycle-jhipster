/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import PanierComponent from '@/entities/panier/panier.vue';
import PanierClass from '@/entities/panier/panier.component';
import PanierService from '@/entities/panier/panier.service';
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
  describe('Panier Management Component', () => {
    let wrapper: Wrapper<PanierClass>;
    let comp: PanierClass;
    let panierServiceStub: SinonStubbedInstance<PanierService>;

    beforeEach(() => {
      panierServiceStub = sinon.createStubInstance<PanierService>(PanierService);
      panierServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<PanierClass>(PanierComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          panierService: () => panierServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      panierServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllPaniers();
      await comp.$nextTick();

      // THEN
      expect(panierServiceStub.retrieve.called).toBeTruthy();
      expect(comp.paniers[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      panierServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(panierServiceStub.retrieve.callCount).toEqual(1);

      comp.removePanier();
      await comp.$nextTick();

      // THEN
      expect(panierServiceStub.delete.called).toBeTruthy();
      expect(panierServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
