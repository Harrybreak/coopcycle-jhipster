/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import MaintenanceUpdateComponent from '@/entities/maintenance/maintenance-update.vue';
import MaintenanceClass from '@/entities/maintenance/maintenance-update.component';
import MaintenanceService from '@/entities/maintenance/maintenance.service';

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
  describe('Maintenance Management Update Component', () => {
    let wrapper: Wrapper<MaintenanceClass>;
    let comp: MaintenanceClass;
    let maintenanceServiceStub: SinonStubbedInstance<MaintenanceService>;

    beforeEach(() => {
      maintenanceServiceStub = sinon.createStubInstance<MaintenanceService>(MaintenanceService);

      wrapper = shallowMount<MaintenanceClass>(MaintenanceUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          maintenanceService: () => maintenanceServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.maintenance = entity;
        maintenanceServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(maintenanceServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.maintenance = entity;
        maintenanceServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(maintenanceServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMaintenance = { id: 123 };
        maintenanceServiceStub.find.resolves(foundMaintenance);
        maintenanceServiceStub.retrieve.resolves([foundMaintenance]);

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
