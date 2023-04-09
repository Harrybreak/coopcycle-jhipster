<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="livraison">
        <h2 class="jh-entity-heading" data-cy="livraisonDetailsHeading">
          <span v-text="$t('coopCyleApp.livraison.detail.title')">Livraison</span> {{ livraison.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopCyleApp.livraison.identite')">Identite</span>
          </dt>
          <dd>
            <span>{{ livraison.identite }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.livraison.vehicule')">Vehicule</span>
          </dt>
          <dd>
            <span>{{ livraison.vehicule }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.livraison.disponible')">Disponible</span>
          </dt>
          <dd>
            <span>{{ livraison.disponible }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.livraison.panier')">Panier</span>
          </dt>
          <dd>
            <div v-if="livraison.panier">
              <router-link :to="{ name: 'PanierView', params: { panierId: livraison.panier.id } }">{{ livraison.panier.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.livraison.cooperative')">Cooperative</span>
          </dt>
          <dd>
            <div v-if="livraison.cooperative">
              <router-link :to="{ name: 'CooperativeView', params: { cooperativeId: livraison.cooperative.id } }">{{
                livraison.cooperative.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="livraison.id"
          :to="{ name: 'LivraisonEdit', params: { livraisonId: livraison.id } }"
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

<script lang="ts" src="./livraison-details.component.ts"></script>
