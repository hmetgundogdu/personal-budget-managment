<template>
  <v-app-bar app color="primary" id="appHeader" elevation="0">
    <v-row class="d-flex justify-start align-center">
      <v-col class="overline text-h5">{{ $route.name }}</v-col>
      <v-col class="d-flex justify-end">
        <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-icon>{{
            $vuetify.theme.dark ? "mdi-weather-sunny" : "mdi-weather-night"
          }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>
<script>
export default {
  name: "AppHeader",
};
</script>
<style scoped>
#appHeader {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>