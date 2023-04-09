/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import MaintenanceComponent from '@/entities/maintenance/maintenance.vue';
import MaintenanceClass from '@/entities/maintenance/maintenance.component';
import MaintenanceService from '@/entities/maintenance/maintenance.service';
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
  describe('Maintenance Management Component', () => {
    let wrapper: Wrapper<MaintenanceClass>;
    let comp: MaintenanceClass;
    let maintenanceServiceStub: SinonStubbedInstance<MaintenanceService>;

    beforeEach(() => {
      maintenanceServiceStub = sinon.createStubInstance<MaintenanceService>(MaintenanceService);
      maintenanceServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<MaintenanceClass>(MaintenanceComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          maintenanceService: () => maintenanceServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      maintenanceServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllMaintenances();
      await comp.$nextTick();

      // THEN
      expect(maintenanceServiceStub.retrieve.called).toBeTruthy();
      expect(comp.maintenances[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      maintenanceServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(maintenanceServiceStub.retrieve.callCount).toEqual(1);

      comp.removeMaintenance();
      await comp.$nextTick();

      // THEN
      expect(maintenanceServiceStub.delete.called).toBeTruthy();
      expect(maintenanceServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
