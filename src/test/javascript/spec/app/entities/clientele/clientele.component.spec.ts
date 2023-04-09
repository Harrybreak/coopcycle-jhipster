/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ClienteleComponent from '@/entities/clientele/clientele.vue';
import ClienteleClass from '@/entities/clientele/clientele.component';
import ClienteleService from '@/entities/clientele/clientele.service';
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
  describe('Clientele Management Component', () => {
    let wrapper: Wrapper<ClienteleClass>;
    let comp: ClienteleClass;
    let clienteleServiceStub: SinonStubbedInstance<ClienteleService>;

    beforeEach(() => {
      clienteleServiceStub = sinon.createStubInstance<ClienteleService>(ClienteleService);
      clienteleServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ClienteleClass>(ClienteleComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          clienteleService: () => clienteleServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      clienteleServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllClienteles();
      await comp.$nextTick();

      // THEN
      expect(clienteleServiceStub.retrieve.called).toBeTruthy();
      expect(comp.clienteles[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      clienteleServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(clienteleServiceStub.retrieve.callCount).toEqual(1);

      comp.removeClientele();
      await comp.$nextTick();

      // THEN
      expect(clienteleServiceStub.delete.called).toBeTruthy();
      expect(clienteleServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
