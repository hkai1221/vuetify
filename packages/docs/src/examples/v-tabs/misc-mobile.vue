<template>
  <v-card class="mx-auto" width="350px">
    <v-toolbar color="surface">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Contacts</v-toolbar-title>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon="mdi-dots-vertical"></v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          color="primary"
          grow
        >
          <v-tab
            :value="1"
          >
            <v-icon icon="mdi-phone"></v-icon>
          </v-tab>

          <v-tab
            :value="2"
          >
            <v-icon icon="mdi-heart"></v-icon>
          </v-tab>

          <v-tab
            :value="3"
          >
            <v-icon icon="mdi-account-box"></v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-window v-model="tabs">
      <v-tabs-window-item
        v-for="i in 3"
        :key="i"
        :value="i"
      >
        <v-card>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const tabs = ref(null)
</script>

<script>
  export default {
    data () {
      return {
        tabs: null,
      }
    },
  }
</script>
