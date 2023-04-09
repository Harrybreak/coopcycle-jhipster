<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopCyleApp.livraison.home.createOrEditLabel"
          data-cy="LivraisonCreateUpdateHeading"
          v-text="$t('coopCyleApp.livraison.home.createOrEditLabel')"
        >
          Create or edit a Livraison
        </h2>
        <div>
          <div class="form-group" v-if="livraison.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="livraison.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.livraison.identite')" for="livraison-identite">Identite</label>
            <input
              type="text"
              class="form-control"
              name="identite"
              id="livraison-identite"
              data-cy="identite"
              :class="{ valid: !$v.livraison.identite.$invalid, invalid: $v.livraison.identite.$invalid }"
              v-model="$v.livraison.identite.$model"
              required
            />
            <div v-if="$v.livraison.identite.$anyDirty && $v.livraison.identite.$invalid">
              <small class="form-text text-danger" v-if="!$v.livraison.identite.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.livraison.vehicule')" for="livraison-vehicule">Vehicule</label>
            <input
              type="text"
              class="form-control"
              name="vehicule"
              id="livraison-vehicule"
              data-cy="vehicule"
              :class="{ valid: !$v.livraison.vehicule.$invalid, invalid: $v.livraison.vehicule.$invalid }"
              v-model="$v.livraison.vehicule.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.livraison.disponible')" for="livraison-disponible">Disponible</label>
            <input
              type="checkbox"
              class="form-check"
              name="disponible"
              id="livraison-disponible"
              data-cy="disponible"
              :class="{ valid: !$v.livraison.disponible.$invalid, invalid: $v.livraison.disponible.$invalid }"
              v-model="$v.livraison.disponible.$model"
              required
            />
            <div v-if="$v.livraison.disponible.$anyDirty && $v.livraison.disponible.$invalid">
              <small class="form-text text-danger" v-if="!$v.livraison.disponible.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.livraison.panier')" for="livraison-panier">Panier</label>
            <select class="form-control" id="livraison-panier" data-cy="panier" name="panier" v-model="livraison.panier">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="livraison.panier && panierOption.id === livraison.panier.id ? livraison.panier : panierOption"
                v-for="panierOption in paniers"
                :key="panierOption.id"
              >
                {{ panierOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.livraison.cooperative')" for="livraison-cooperative"
              >Cooperative</label
            >
            <select
              class="form-control"
              id="livraison-cooperative"
              data-cy="cooperative"
              name="cooperative"
              v-model="livraison.cooperative"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  livraison.cooperative && cooperativeOption.id === livraison.cooperative.id ? livraison.cooperative : cooperativeOption
                "
                v-for="cooperativeOption in cooperatives"
                :key="cooperativeOption.id"
              >
                {{ cooperativeOption.id }}
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
            :disabled="$v.livraison.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./livraison-update.component.ts"></script>
