<template>
  <v-app :style="appStyle">
    <app-sidebar />
    <app-header />
    <v-main color="primary">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppSidebar from "./components/AppSidebar.vue";
export default {
  name: "App",
  components: {
    AppSidebar,
    AppHeader,
  },
  computed: {
    appStyle() {
      const vuetifyThemes = this.$vuetify.theme.themes;
      const isDark = this.$vuetify.theme.dark;
      const currentTheme = isDark ? vuetifyThemes.dark : vuetifyThemes.light;
      return {
        "background-color": currentTheme.background,
        color: isDark ? "white" : "black",
      };
    },
  },
  data: () => ({}),
};
</script>