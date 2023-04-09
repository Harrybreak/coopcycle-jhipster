/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import MaintenanceDetailComponent from '@/entities/maintenance/maintenance-details.vue';
import MaintenanceClass from '@/entities/maintenance/maintenance-details.component';
import MaintenanceService from '@/entities/maintenance/maintenance.service';
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
  describe('Maintenance Management Detail Component', () => {
    let wrapper: Wrapper<MaintenanceClass>;
    let comp: MaintenanceClass;
    let maintenanceServiceStub: SinonStubbedInstance<MaintenanceService>;

    beforeEach(() => {
      maintenanceServiceStub = sinon.createStubInstance<MaintenanceService>(MaintenanceService);

      wrapper = shallowMount<MaintenanceClass>(MaintenanceDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { maintenanceService: () => maintenanceServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMaintenance = { id: 123 };
        maintenanceServiceStub.find.resolves(foundMaintenance);

        // WHEN
        comp.retrieveMaintenance(123);
        await comp.$nextTick();

        // THEN
        expect(comp.maintenance).toBe(foundMaintenance);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMaintenance = { id: 123 };
        maintenanceServiceStub.find.resolves(foundMaintenance);

        // WHEN
        comp.beforeRouteEnter({ params: { maintenanceId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.maintenance).toBe(foundMaintenance);
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
