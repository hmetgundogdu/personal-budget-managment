<template>
  <v-navigation-drawer color="secondary" app :value="isLogin">
    <v-list color="primary">
      <v-list-item color="primary">
        <v-list-item-content>
          <v-list-item-title class="title"
            >Kişisel Bütçe Yönetim</v-list-item-title
          >
          <v-list-item-subtitle>{{
            $store.getters["user/name"]
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list>
      <router-link v-for="item in navItems" :key="item.title" :to="item.path">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Çıkış yap</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "AppSidebar",
  computed: {
    isLogin() {
      return this.$store.getters["user/isLogin"];
    },
  },
  data: () => ({
    navItems: [
      { title: "Genel Bakış", icon: "mdi-view-dashboard", path: "Overview" },
      {
        title: "İşlemler",
        icon: "mdi-format-list-bulleted-type",
        path: "Transactions",
      },
      { title: "Planlama", icon: "mdi-calendar-range", path: "Schedule" },
    ],
  }),
  methods: {
    logout() {
      const s = this;
      s.$store.dispatch("user/logout").then(() => {
        s.$router.push("Login");
      });
    },
  },
};
</script>
<style scoped>
</style>