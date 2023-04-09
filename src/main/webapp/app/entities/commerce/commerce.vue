<template>
  <div>
    <h2 id="page-heading" data-cy="CommerceHeading">
      <span v-text="$t('coopCyleApp.commerce.home.title')" id="commerce-heading">Commerce</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('coopCyleApp.commerce.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CommerceCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-commerce"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('coopCyleApp.commerce.home.createLabel')"> Create a new Commerce </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && commerce && commerce.length === 0">
      <span v-text="$t('coopCyleApp.commerce.home.notFound')">No commerce found</span>
    </div>
    <div class="table-responsive" v-if="commerce && commerce.length > 0">
      <table class="table table-striped" aria-describedby="commerce">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.commerce.nom')">Nom</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.commerce.theme')">Theme</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.commerce.site')">Site</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.commerce.cooperative')">Cooperative</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.commerce.cooperative')">Cooperative</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="commerce in commerce" :key="commerce.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CommerceView', params: { commerceId: commerce.id } }">{{ commerce.id }}</router-link>
            </td>
            <td>{{ commerce.nom }}</td>
            <td v-text="$t('coopCyleApp.Theme.' + commerce.theme)">{{ commerce.theme }}</td>
            <td>{{ commerce.site }}</td>
            <td>
              <div v-if="commerce.cooperative">
                <router-link :to="{ name: 'CooperativeView', params: { cooperativeId: commerce.cooperative.id } }">{{
                  commerce.cooperative.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="commerce.cooperative">
                <router-link :to="{ name: 'CooperativeView', params: { cooperativeId: commerce.cooperative.id } }">{{
                  commerce.cooperative.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CommerceView', params: { commerceId: commerce.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CommerceEdit', params: { commerceId: commerce.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(commerce)"
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
        ><span id="coopCyleApp.commerce.delete.question" data-cy="commerceDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-commerce-heading" v-text="$t('coopCyleApp.commerce.delete.question', { id: removeId })">
          Are you sure you want to delete this Commerce?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-commerce"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCommerce()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./commerce.component.ts"></script>
