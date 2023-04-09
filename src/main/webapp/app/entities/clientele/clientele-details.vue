<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="clientele">
        <h2 class="jh-entity-heading" data-cy="clienteleDetailsHeading">
          <span v-text="$t('coopCyleApp.clientele.detail.title')">Clientele</span> {{ clientele.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopCyleApp.clientele.commerce')">Commerce</span>
          </dt>
          <dd>
            <span v-for="(commerce, i) in clientele.commerce" :key="commerce.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'CommerceView', params: { commerceId: commerce.id } }">{{ commerce.id }}</router-link>
            </span>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.clientele.cooperative')">Cooperative</span>
          </dt>
          <dd>
            <div v-if="clientele.cooperative">
              <router-link :to="{ name: 'CooperativeView', params: { cooperativeId: clientele.cooperative.id } }">{{
                clientele.cooperative.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="clientele.id"
          :to="{ name: 'ClienteleEdit', params: { clienteleId: clientele.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./clientele-details.component.ts"></script>
