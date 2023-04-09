<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopCyleApp.commerce.home.createOrEditLabel"
          data-cy="CommerceCreateUpdateHeading"
          v-text="$t('coopCyleApp.commerce.home.createOrEditLabel')"
        >
          Create or edit a Commerce
        </h2>
        <div>
          <div class="form-group" v-if="commerce.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="commerce.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.commerce.nom')" for="commerce-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="commerce-nom"
              data-cy="nom"
              :class="{ valid: !$v.commerce.nom.$invalid, invalid: $v.commerce.nom.$invalid }"
              v-model="$v.commerce.nom.$model"
              required
            />
            <div v-if="$v.commerce.nom.$anyDirty && $v.commerce.nom.$invalid">
              <small class="form-text text-danger" v-if="!$v.commerce.nom.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.commerce.theme')" for="commerce-theme">Theme</label>
            <select
              class="form-control"
              name="theme"
              :class="{ valid: !$v.commerce.theme.$invalid, invalid: $v.commerce.theme.$invalid }"
              v-model="$v.commerce.theme.$model"
              id="commerce-theme"
              data-cy="theme"
            >
              <option v-for="theme in themeValues" :key="theme" v-bind:value="theme" v-bind:label="$t('coopCyleApp.Theme.' + theme)">
                {{ theme }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.commerce.site')" for="commerce-site">Site</label>
            <input
              type="text"
              class="form-control"
              name="site"
              id="commerce-site"
              data-cy="site"
              :class="{ valid: !$v.commerce.site.$invalid, invalid: $v.commerce.site.$invalid }"
              v-model="$v.commerce.site.$model"
            />
            <div v-if="$v.commerce.site.$anyDirty && $v.commerce.site.$invalid"></div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.commerce.cooperative')" for="commerce-cooperative">Cooperative</label>
            <select class="form-control" id="commerce-cooperative" data-cy="cooperative" name="cooperative" v-model="commerce.cooperative">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  commerce.cooperative && cooperativeOption.id === commerce.cooperative.id ? commerce.cooperative : cooperativeOption
                "
                v-for="cooperativeOption in cooperatives"
                :key="cooperativeOption.id"
              >
                {{ cooperativeOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.commerce.cooperative')" for="commerce-cooperative">Cooperative</label>
            <select class="form-control" id="commerce-cooperative" data-cy="cooperative" name="cooperative" v-model="commerce.cooperative">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  commerce.cooperative && cooperativeOption.id === commerce.cooperative.id ? commerce.cooperative : cooperativeOption
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
            :disabled="$v.commerce.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./commerce-update.component.ts"></script>
