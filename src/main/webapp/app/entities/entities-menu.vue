<template>
  <div>
    <b-dropdown-item to="/clientele">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.clientele')">Clientele</span>
    </b-dropdown-item>
    <b-dropdown-item to="/cooperative">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.cooperative')">Cooperative</span>
    </b-dropdown-item>
    <b-dropdown-item to="/commerce">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.commerce')">Commerce</span>
    </b-dropdown-item>
    <b-dropdown-item to="/livraison">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.livraison')">Livraison</span>
    </b-dropdown-item>
    <b-dropdown-item to="/maintenance">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.maintenance')">Maintenance</span>
    </b-dropdown-item>
    <b-dropdown-item to="/panier">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.panier')">Panier</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
