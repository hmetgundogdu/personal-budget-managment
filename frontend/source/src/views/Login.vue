<template>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card classw="elevation-12">
            <v-toolbar color="primary" elevation="0">
              <v-toolbar-title>Giriş</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pa-5">
              <v-form v-model="formIsValid">
                <v-text-field
                  v-model="username"
                  prepend-icon="person"
                  name="login"
                  label="Kullanıcı ismi"
                  type="text"
                  solo-inverted
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Parola"
                  type="password"
                  solo-inverted
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn id="loginButton" color="success" @click="login"
                >Giriş yap</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    username: null,
    password: null,
    formIsValid: false,
  }),
  methods: {
    login() {
      const s = this;
      const username = s.username;
      const password = s.password;

      s.$store
        .dispatch("user/login", { username, password })
        .then((result) => {
          if (result) s.$router.push("Overview");
        });
    },
  },
};
</script>
<style scoped>
#loginButton {
  margin: -30px 10px 15px 30px;
}
</style> 