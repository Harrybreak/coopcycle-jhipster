<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopCyleApp.maintenance.home.createOrEditLabel"
          data-cy="MaintenanceCreateUpdateHeading"
          v-text="$t('coopCyleApp.maintenance.home.createOrEditLabel')"
        >
          Create or edit a Maintenance
        </h2>
        <div>
          <div class="form-group" v-if="maintenance.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="maintenance.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.maintenance.categorie')" for="maintenance-categorie">Categorie</label>
            <select
              class="form-control"
              name="categorie"
              :class="{ valid: !$v.maintenance.categorie.$invalid, invalid: $v.maintenance.categorie.$invalid }"
              v-model="$v.maintenance.categorie.$model"
              id="maintenance-categorie"
              data-cy="categorie"
            >
              <option
                v-for="typeMaintenance in typeMaintenanceValues"
                :key="typeMaintenance"
                v-bind:value="typeMaintenance"
                v-bind:label="$t('coopCyleApp.TypeMaintenance.' + typeMaintenance)"
              >
                {{ typeMaintenance }}
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
            :disabled="$v.maintenance.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./maintenance-update.component.ts"></script>
