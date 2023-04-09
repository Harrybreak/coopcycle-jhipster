<template>
  <div>
    <h2 id="page-heading" data-cy="ClienteleHeading">
      <span v-text="$t('coopCyleApp.clientele.home.title')" id="clientele-heading">Clienteles</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('coopCyleApp.clientele.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ClienteleCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-clientele"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('coopCyleApp.clientele.home.createLabel')"> Create a new Clientele </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && clienteles && clienteles.length === 0">
      <span v-text="$t('coopCyleApp.clientele.home.notFound')">No clienteles found</span>
    </div>
    <div class="table-responsive" v-if="clienteles && clienteles.length > 0">
      <table class="table table-striped" aria-describedby="clienteles">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.clientele.commerce')">Commerce</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.clientele.cooperative')">Cooperative</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="clientele in clienteles" :key="clientele.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ClienteleView', params: { clienteleId: clientele.id } }">{{ clientele.id }}</router-link>
            </td>
            <td>
              <span v-for="(commerce, i) in clientele.commerce" :key="commerce.id"
                >{{ i > 0 ? ', ' : '' }}
                <router-link class="form-control-static" :to="{ name: 'CommerceView', params: { commerceId: commerce.id } }">{{
                  commerce.id
                }}</router-link>
              </span>
            </td>
            <td>
              <div v-if="clientele.cooperative">
                <router-link :to="{ name: 'CooperativeView', params: { cooperativeId: clientele.cooperative.id } }">{{
                  clientele.cooperative.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ClienteleView', params: { clienteleId: clientele.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ClienteleEdit', params: { clienteleId: clientele.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(clientele)"
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
        ><span id="coopCyleApp.clientele.delete.question" data-cy="clienteleDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-clientele-heading" v-text="$t('coopCyleApp.clientele.delete.question', { id: removeId })">
          Are you sure you want to delete this Clientele?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-clientele"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeClientele()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./clientele.component.ts"></script>
