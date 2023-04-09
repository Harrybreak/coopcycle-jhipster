<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="commerce">
        <h2 class="jh-entity-heading" data-cy="commerceDetailsHeading">
          <span v-text="$t('coopCyleApp.commerce.detail.title')">Commerce</span> {{ commerce.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopCyleApp.commerce.nom')">Nom</span>
          </dt>
          <dd>
            <span>{{ commerce.nom }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.commerce.theme')">Theme</span>
          </dt>
          <dd>
            <span v-text="$t('coopCyleApp.Theme.' + commerce.theme)">{{ commerce.theme }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.commerce.site')">Site</span>
          </dt>
          <dd>
            <span>{{ commerce.site }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.commerce.cooperative')">Cooperative</span>
          </dt>
          <dd>
            <div v-if="commerce.cooperative">
              <router-link :to="{ name: 'CooperativeView', params: { cooperativeId: commerce.cooperative.id } }">{{
                commerce.cooperative.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.commerce.cooperative')">Cooperative</span>
          </dt>
          <dd>
            <div v-if="commerce.cooperative">
              <router-link :to="{ name: 'CooperativeView', params: { cooperativeId: commerce.cooperative.id } }">{{
                commerce.cooperative.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="commerce.id" :to="{ name: 'CommerceEdit', params: { commerceId: commerce.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./commerce-details.component.ts"></script>
