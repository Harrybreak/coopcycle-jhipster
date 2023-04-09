<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopCyleApp.clientele.home.createOrEditLabel"
          data-cy="ClienteleCreateUpdateHeading"
          v-text="$t('coopCyleApp.clientele.home.createOrEditLabel')"
        >
          Create or edit a Clientele
        </h2>
        <div>
          <div class="form-group" v-if="clientele.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="clientele.id" readonly />
          </div>
          <div class="form-group">
            <label v-text="$t('coopCyleApp.clientele.commerce')" for="clientele-commerce">Commerce</label>
            <select
              class="form-control"
              id="clientele-commerce"
              data-cy="commerce"
              multiple
              name="commerce"
              v-if="clientele.commerce !== undefined"
              v-model="clientele.commerce"
            >
              <option
                v-bind:value="getSelected(clientele.commerce, commerceOption)"
                v-for="commerceOption in commerce"
                :key="commerceOption.id"
              >
                {{ commerceOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopCyleApp.clientele.cooperative')" for="clientele-cooperative"
              >Cooperative</label
            >
            <select
              class="form-control"
              id="clientele-cooperative"
              data-cy="cooperative"
              name="cooperative"
              v-model="clientele.cooperative"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  clientele.cooperative && cooperativeOption.id === clientele.cooperative.id ? clientele.cooperative : cooperativeOption
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
            :disabled="$v.clientele.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./clientele-update.component.ts"></script>
