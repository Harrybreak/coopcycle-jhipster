<template>
  <div>
    <h2 id="page-heading" data-cy="MaintenanceHeading">
      <span v-text="$t('coopCyleApp.maintenance.home.title')" id="maintenance-heading">Maintenances</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('coopCyleApp.maintenance.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'MaintenanceCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-maintenance"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('coopCyleApp.maintenance.home.createLabel')"> Create a new Maintenance </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && maintenances && maintenances.length === 0">
      <span v-text="$t('coopCyleApp.maintenance.home.notFound')">No maintenances found</span>
    </div>
    <div class="table-responsive" v-if="maintenances && maintenances.length > 0">
      <table class="table table-striped" aria-describedby="maintenances">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.maintenance.categorie')">Categorie</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="maintenance in maintenances" :key="maintenance.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'MaintenanceView', params: { maintenanceId: maintenance.id } }">{{ maintenance.id }}</router-link>
            </td>
            <td v-text="$t('coopCyleApp.TypeMaintenance.' + maintenance.categorie)">{{ maintenance.categorie }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'MaintenanceView', params: { maintenanceId: maintenance.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'MaintenanceEdit', params: { maintenanceId: maintenance.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(maintenance)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="coopCyleApp.maintenance.delete.question" data-cy="maintenanceDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-maintenance-heading" v-text="$t('coopCyleApp.maintenance.delete.question', { id: removeId })">
          Are you sure you want to delete this Maintenance?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-maintenance"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeMaintenance()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./maintenance.component.ts"></script>
