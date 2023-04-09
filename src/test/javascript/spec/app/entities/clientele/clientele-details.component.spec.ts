/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ClienteleDetailComponent from '@/entities/clientele/clientele-details.vue';
import ClienteleClass from '@/entities/clientele/clientele-details.component';
import ClienteleService from '@/entities/clientele/clientele.service';
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
  describe('Clientele Management Detail Component', () => {
    let wrapper: Wrapper<ClienteleClass>;
    let comp: ClienteleClass;
    let clienteleServiceStub: SinonStubbedInstance<ClienteleService>;

    beforeEach(() => {
      clienteleServiceStub = sinon.createStubInstance<ClienteleService>(ClienteleService);

      wrapper = shallowMount<ClienteleClass>(ClienteleDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { clienteleService: () => clienteleServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundClientele = { id: 123 };
        clienteleServiceStub.find.resolves(foundClientele);

        // WHEN
        comp.retrieveClientele(123);
        await comp.$nextTick();

        // THEN
        expect(comp.clientele).toBe(foundClientele);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundClientele = { id: 123 };
        clienteleServiceStub.find.resolves(foundClientele);

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
