<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap>
      <transaction-item-popup
        v-model="selectedTransaction"
        :dialog.sync="transactionPopupDialog"
        :type="'schedule'"
        :intent="transactionPopupIntent"
        @add="onTransactionAdd"
        @update="onTransactionUpdate"
        @cancel="onTransactionTaskCancel"
      />
      <v-flex xs12>
        <v-card color="accent">
          <v-toolbar color="accent">
            <v-toolbar-title>Arama</v-toolbar-title>
            <v-text-field
              label="Miktar, Kategori, Tarih, Not"
              hide-details="auto"
              solo-inverted
              flat
              class="mx-3 primary"
            ></v-text-field>
            <v-btn @click="transactionPopupDialog = true" icon class="mx-1">
              <v-icon large>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <transaction-table
            @onClickRow="showItem"
            :headers="headers"
            :data="data"
          />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary">Daha fazla yükle</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import TransactionTable from "../components/TransactionTable.vue";
import TransactionItemPopup from "../components/TransactionItemPopup.vue";

const dateOption = { year: "numeric", month: "long", day: "numeric" };

export default {
  name: "Transaction",
  components: {
    TransactionTable,
    TransactionItemPopup,
  },
  data: () => ({
    transactionPopupDialog: false,
    transactionPopupIntent: "add",
    selectedTransaction: {
      icon: "mdi-home",
      category: "Ev",
      amount: 1500,
      time: new Date().toLocaleDateString("tr-TR", { time: "long" }),
      sign: "positive",
      status: "Beklemede",
      vendor: new Date().toLocaleDateString("tr-TR", dateOption),
    },
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
    onTransactionAdd() {},
    onTransactionUpdate() {},
    onTransactionTaskCancel(reason) {
      console.log(reason);
      this.transactionPopupDialog = false;
    },
  },
};
</script>
<style scoped>
</style>