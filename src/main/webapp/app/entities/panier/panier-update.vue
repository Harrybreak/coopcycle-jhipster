<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopCyleApp.panier.home.createOrEditLabel"
          data-cy="PanierCreateUpdateHeading"
          v-text="$t('coopCyleApp.panier.home.createOrEditLabel')"
        >
          Create or edit a Panier
        </h2>
        <div>
          <div class="form-group" v-if="panier.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="panier.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.panier.etat')" for="panier-etat">Etat</label>
            <select
              class="form-control"
              name="etat"
              :class="{ valid: !$v.panier.etat.$invalid, invalid: $v.panier.etat.$invalid }"
              v-model="$v.panier.etat.$model"
              id="panier-etat"
              data-cy="etat"
              required
            >
              <option
                v-for="etatLivraison in etatLivraisonValues"
                :key="etatLivraison"
                v-bind:value="etatLivraison"
                v-bind:label="$t('coopCyleApp.EtatLivraison.' + etatLivraison)"
              >
                {{ etatLivraison }}
              </option>
            </select>
            <div v-if="$v.panier.etat.$anyDirty && $v.panier.etat.$invalid">
              <small class="form-text text-danger" v-if="!$v.panier.etat.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.panier.paiement')" for="panier-paiement">Paiement</label>
            <select
              class="form-control"
              name="paiement"
              :class="{ valid: !$v.panier.paiement.$invalid, invalid: $v.panier.paiement.$invalid }"
              v-model="$v.panier.paiement.$model"
              id="panier-paiement"
              data-cy="paiement"
              required
            >
              <option
                v-for="paiement in paiementValues"
                :key="paiement"
                v-bind:value="paiement"
                v-bind:label="$t('coopCyleApp.Paiement.' + paiement)"
              >
                {{ paiement }}
              </option>
            </select>
            <div v-if="$v.panier.paiement.$anyDirty && $v.panier.paiement.$invalid">
              <small class="form-text text-danger" v-if="!$v.panier.paiement.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.panier.dateCommande')" for="panier-dateCommande">Date Commande</label>
            <div class="d-flex">
              <input
                id="panier-dateCommande"
                data-cy="dateCommande"
                type="datetime-local"
                class="form-control"
                name="dateCommande"
                :class="{ valid: !$v.panier.dateCommande.$invalid, invalid: $v.panier.dateCommande.$invalid }"
                :value="convertDateTimeFromServer($v.panier.dateCommande.$model)"
                @change="updateInstantField('dateCommande', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.panier.clientele')" for="panier-clientele">Clientele</label>
            <select class="form-control" id="panier-clientele" data-cy="clientele" name="clientele" v-model="panier.clientele">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="panier.clientele && clienteleOption.id === panier.clientele.id ? panier.clientele : clienteleOption"
                v-for="clienteleOption in clienteles"
                :key="clienteleOption.id"
              >
                {{ clienteleOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.panier.commerce')" for="panier-commerce">Commerce</label>
            <select class="form-control" id="panier-commerce" data-cy="commerce" name="commerce" v-model="panier.commerce">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="panier.commerce && commerceOption.id === panier.commerce.id ? panier.commerce : commerceOption"
                v-for="commerceOption in commerce"
                :key="commerceOption.id"
              >
                {{ commerceOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.panier.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./panier-update.component.ts"></script>
