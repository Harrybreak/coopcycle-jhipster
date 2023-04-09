<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="panier">
        <h2 class="jh-entity-heading" data-cy="panierDetailsHeading">
          <span v-text="$t('coopCyleApp.panier.detail.title')">Panier</span> {{ panier.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopCyleApp.panier.etat')">Etat</span>
          </dt>
          <dd>
            <span v-text="$t('coopCyleApp.EtatLivraison.' + panier.etat)">{{ panier.etat }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.panier.paiement')">Paiement</span>
          </dt>
          <dd>
            <span v-text="$t('coopCyleApp.Paiement.' + panier.paiement)">{{ panier.paiement }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.panier.dateCommande')">Date Commande</span>
          </dt>
          <dd>
            <span v-if="panier.dateCommande">{{ $d(Date.parse(panier.dateCommande), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.panier.clientele')">Clientele</span>
          </dt>
          <dd>
            <div v-if="panier.clientele">
              <router-link :to="{ name: 'ClienteleView', params: { clienteleId: panier.clientele.id } }">{{
                panier.clientele.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('coopCyleApp.panier.commerce')">Commerce</span>
          </dt>
          <dd>
            <div v-if="panier.commerce">
              <router-link :to="{ name: 'CommerceView', params: { commerceId: panier.commerce.id } }">{{ panier.commerce.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="panier.id" :to="{ name: 'PanierEdit', params: { panierId: panier.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./panier-details.component.ts"></script>
