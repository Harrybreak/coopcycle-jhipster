<template>
  <div>
    <h2 id="page-heading" data-cy="PanierHeading">
      <span v-text="$t('coopCyleApp.panier.home.title')" id="panier-heading">Paniers</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('coopCyleApp.panier.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'PanierCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-panier"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('coopCyleApp.panier.home.createLabel')"> Create a new Panier </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && paniers && paniers.length === 0">
      <span v-text="$t('coopCyleApp.panier.home.notFound')">No paniers found</span>
    </div>
    <div class="table-responsive" v-if="paniers && paniers.length > 0">
      <table class="table table-striped" aria-describedby="paniers">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.panier.etat')">Etat</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.panier.paiement')">Paiement</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.panier.dateCommande')">Date Commande</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.panier.clientele')">Clientele</span></th>
            <th scope="row"><span v-text="$t('coopCyleApp.panier.commerce')">Commerce</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="panier in paniers" :key="panier.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'PanierView', params: { panierId: panier.id } }">{{ panier.id }}</router-link>
            </td>
            <td v-text="$t('coopCyleApp.EtatLivraison.' + panier.etat)">{{ panier.etat }}</td>
            <td v-text="$t('coopCyleApp.Paiement.' + panier.paiement)">{{ panier.paiement }}</td>
            <td>{{ panier.dateCommande ? $d(Date.parse(panier.dateCommande), 'short') : '' }}</td>
            <td>
              <div v-if="panier.clientele">
                <router-link :to="{ name: 'ClienteleView', params: { clienteleId: panier.clientele.id } }">{{
                  panier.clientele.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="panier.commerce">
                <router-link :to="{ name: 'CommerceView', params: { commerceId: panier.commerce.id } }">{{
                  panier.commerce.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'PanierView', params: { panierId: panier.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'PanierEdit', params: { panierId: panier.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(panier)"
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
        ><span id="coopCyleApp.panier.delete.question" data-cy="panierDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-panier-heading" v-text="$t('coopCyleApp.panier.delete.question', { id: removeId })">
          Are you sure you want to delete this Panier?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-panier"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removePanier()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./panier.component.ts"></script>
