<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap>
      <v-flex class="d-flex justify-space-around align-center">
        <v-flex xs4>
          <v-card color="accent">
            <v-card-title>Aylık harcama dağılımı</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-2">
              <doughnut-chart
                :options="doughnutChartOptions"
                :chartdata="mounthlyConstWithCategoriesChart"
              />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs7>
          <v-card color="accent">
            <v-card-title>Haftalık Harcama</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-3">
              <line-chart
                :options="lineChartOptions"
                :chartdata="weeklyConstChart"
              />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-flex>
      <v-flex xs12>
        <v-card color="accent">
          <v-card-title>Özet</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <transaction-table
              @onClickRow="showItem"
              :headers="headers"
              :data="data"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
function getRandomInt() {
  return Math.random();
}

const daysOfWeek = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

var dateOption = { year: "numeric", month: "long", day: "numeric" };

import DoughnutChart from "../components/DoughnutChart.vue";
import LineChart from "../components/LineChart.vue";
import TransactionTable from "../components/TransactionTable.vue";

export default {
  name: "Overview",
  components: {
    DoughnutChart,
    LineChart,
    TransactionTable,
  },
  data: () => ({
    lineChartOptions: {
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "white",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "white",
            },
          },
        ],
      },
    },
    doughnutChartOptions: {
      legend: { display: false },
      responsive: true,
      maintainAspectRatio: false,
    },
    mounthlyConstWithCategoriesChart: {
      labels: ["Ev", "Eğlence", "Araç", "Diğer"],
      datasets: [
        {
          label: "Ev",
          backgroundColor: ["#41B883", "#E46651", "#DD1B16", "#CCC"],
          data: [getRandomInt(), getRandomInt(), getRandomInt(), 0.2],
        },
      ],
    },
    weeklyConstChart: {
      labels: daysOfWeek,
      datasets: [
        {
          label: "Harcama",
          backgroundColor: "#41B883",
          data: daysOfWeek.map(() => getRandomInt()),
        },
      ],
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
        sign: "positive",
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