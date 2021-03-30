<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="accent">
          <v-toolbar color="accent">
            <v-toolbar-title>Arama</v-toolbar-title>
            <v-text-field
              label="Miktar, Kategori, Tarih, Not"
              hide-details="auto"
              solo-inverted
              flat
              color="white"
              class="mx-3"
            ></v-text-field>
            <v-btn icon class="mx-1">
              <v-icon large>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <transaction-table
            @onClickRow="showItem"
            :headers="headers"
            :data="data"
          />
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn color="secondary">Daha fazla yükle</v-btn>
  </v-container>
</template>
<script>
import TransactionTable from "../components/TransactionTable.vue";

const dateOption = { year: "numeric", month: "long", day: "numeric" };

export default {
  name: "Schedule",
  components: {
    TransactionTable,
  },
  data: () => ({
    headers: [
      { text: "*", value: "icon" },
      { text: "Kategori", value: "category" },
      { text: "Miktar", value: "amount" },
      { text: "Saat", value: "time" },
      { text: "Durum", value: "status" },
    ],
    data: [
      {
        icon: "mdi-home",
        category: "Ev",
        amount: 150,
        time: new Date().toLocaleDateString("tr-TR", { time: "long" }),
        sign: "positive",
        status: "Beklemede",
        vendor: new Date().toLocaleDateString("tr-TR", dateOption),
      },
      {
        icon: "mdi-car",
        category: "Araba",
        amount: 150,
        time: new Date().toLocaleDateString("tr-TR", { time: "long" }),
        sign: "negative",
        status: "Gerçekleşti",
        vendor: new Date().toLocaleDateString("tr-TR", dateOption),
      },
      {
        icon: "mdi-",
        category: "",
        amount: 150,
        time: new Date().toLocaleDateString("tr-TR", { time: "long" }),
        sign: "positive",
        status: "Belirtilmedi",
        vendor: new Date().toLocaleDateString("tr-TR", dateOption),
      },
      {
        icon: "mdi-home",
        category: "Ev",
        amount: 150,
        time: new Date().toLocaleDateString("tr-TR", { time: "long" }),
        sign: "positive",
        status: "Beklemede",
        vendor: new Date(new Date().getDate() + 4).toLocaleDateString(
          "tr-TR",
          dateOption
        ),
      },
      {
        icon: "mdi-car",
        category: "Araba",
        amount: 150,
        time: new Date(new Date().getDate() + 1).toLocaleDateString("tr-TR", {
          time: "long",
        }),
        sign: "positive",
        status: "Gerçekleşti",
        vendor: new Date(new Date().getDate() + 1).toLocaleDateString(
          "tr-TR",
          dateOption
        ),
      },
      {
        icon: "mdi-",
        category: "",
        amount: 150,
        time: new Date().toLocaleDateString("tr-TR", { time: "long" }),
        sign: "positive",
        status: "Belirtilmedi",
        vendor: new Date(new Date().getDate() + 1).toLocaleDateString(
          "tr-TR",
          dateOption
        ),
      },
    ],
  }),
  methods: {
    showItem: (item) => alert(JSON.stringify(item)),
  },
};
</script>
<style scoped>
</style>