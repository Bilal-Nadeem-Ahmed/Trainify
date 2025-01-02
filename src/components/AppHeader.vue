<template>
  <v-app-bar app>
    <v-app-bar-nav-icon
      v-if="mobile"
      @click="drawer = !drawer"
    />
    <v-spacer v-if="mobile" />

    <img
      src="@/assets/logo-white-text.png"
      alt="Logo"
      class="logo pa-2"
    > </img>

    <v-spacer v-if="!mobile" />
    <v-toolbar-items v-if="!mobile">
      <v-btn
        variant="plain"
        :class="{ 'active-btn': route.path === '/' }"
        to="/"
      >
        Home
      </v-btn>
      <v-btn
        variant="plain"
        :class="{ 'active-btn': route.path === '/dashboard' }"
        to="/dashboard"
      >
        Dashboard
      </v-btn>
      <v-btn
        variant="plain"
        :class="{ 'active-btn': route.path === '/workout' }"
        to="/workout"
      >
        Workout
      </v-btn>
      <v-btn
        variant="plain"
        :class="{ 'active-btn': route.path === '/about' }"
        to="/about"
      >
        About
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
  <v-navigation-drawer
    v-if="mobile"
    v-model="drawer"
    app
    temporary
  >
    <v-list>
      <v-list-item
        link
        :class="{ 'active-list-item': route.path === '/' }"
        to="/"
      >
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item
        link
        :class="{ 'active-list-item': route.path === '/dashboard' }"
        to="/dashboard"
      >
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item
        link
        :class="{ 'active-list-item': route.path === '/workout' }"
        to="/workout"
      >
        <v-list-item-title>Workout</v-list-item-title>
      </v-list-item>
      <v-list-item
        link
        :class="{ 'active-list-item': route.path === '/about' }"
        to="/about"
      >
        <v-list-item-title>About</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { useRoute } from "vue-router";

const { mobile } = useDisplay();
const drawer = ref(false);
const route = useRoute();
</script>

<style scoped>
.logo {
    width: 170px;
}

.active-btn {
    background-color: #1976d2;
    color: white;
}

.active-list-item {
    background-color: #1976d2;
    color: white;
}
</style>
