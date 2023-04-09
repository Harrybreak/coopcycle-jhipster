<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopCyleApp.cooperative.home.createOrEditLabel"
          data-cy="CooperativeCreateUpdateHeading"
          v-text="$t('coopCyleApp.cooperative.home.createOrEditLabel')"
        >
          Create or edit a Cooperative
        </h2>
        <div>
          <div class="form-group" v-if="cooperative.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="cooperative.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.cooperative.nom')" for="cooperative-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="cooperative-nom"
              data-cy="nom"
              :class="{ valid: !$v.cooperative.nom.$invalid, invalid: $v.cooperative.nom.$invalid }"
              v-model="$v.cooperative.nom.$model"
              required
            />
            <div v-if="$v.cooperative.nom.$anyDirty && $v.cooperative.nom.$invalid">
              <small class="form-text text-danger" v-if="!$v.cooperative.nom.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.cooperative.canton')" for="cooperative-canton">Canton</label>
            <input
              type="text"
              class="form-control"
              name="canton"
              id="cooperative-canton"
              data-cy="canton"
              :class="{ valid: !$v.cooperative.canton.$invalid, invalid: $v.cooperative.canton.$invalid }"
              v-model="$v.cooperative.canton.$model"
              required
            />
            <div v-if="$v.cooperative.canton.$anyDirty && $v.cooperative.canton.$invalid">
              <small class="form-text text-danger" v-if="!$v.cooperative.canton.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
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
            :disabled="$v.cooperative.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./cooperative-update.component.ts"></script>
