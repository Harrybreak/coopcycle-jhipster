/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import LivraisonComponent from '@/entities/livraison/livraison.vue';
import LivraisonClass from '@/entities/livraison/livraison.component';
import LivraisonService from '@/entities/livraison/livraison.service';
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
  describe('Livraison Management Component', () => {
    let wrapper: Wrapper<LivraisonClass>;
    let comp: LivraisonClass;
    let livraisonServiceStub: SinonStubbedInstance<LivraisonService>;

    beforeEach(() => {
      livraisonServiceStub = sinon.createStubInstance<LivraisonService>(LivraisonService);
      livraisonServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<LivraisonClass>(LivraisonComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          livraisonService: () => livraisonServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      livraisonServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllLivraisons();
      await comp.$nextTick();

      // THEN
      expect(livraisonServiceStub.retrieve.called).toBeTruthy();
      expect(comp.livraisons[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      livraisonServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(livraisonServiceStub.retrieve.callCount).toEqual(1);

      comp.removeLivraison();
      await comp.$nextTick();

      // THEN
      expect(livraisonServiceStub.delete.called).toBeTruthy();
      expect(livraisonServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
