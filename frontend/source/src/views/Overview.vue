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
                ref="weeklyConstChart"
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
              :data.sync="summaryData"
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
      labels: [],
      datasets: [
        {
          label: "Ev",
          backgroundColor: ["#41B883", "#E46651", "#DD1B16", "#CCC"],
          data: [1, 2, 3, 4],
        },
      ],
    },
    weeklyConstChart: {
      labels: daysOfWeek,
      datasets: [
        {
          label: "Harcama",
          backgroundColor: "#41B883",
          data: daysOfWeek.map(() => 0),
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
    summaryData: [],
  }),
  methods: {
    showItem: (item) => alert(JSON.stringify(item)),
  },
  async mounted() {
    const s = this;
    // fetch MonthlyCostByCategories
    const categories = await s.$http("user/categories", { method: "GET" });
    const monthlyCostByCategories = await s.$http(
      "user/widgets/MonthlyCostByCategories",
      { method: "GET" }
    );

    s.mounthlyConstWithCategoriesChart.labels = categories.payload
      .filter((c) =>
        monthlyCostByCategories.payload.some(
          (mc) => mc.transaction_category_id == c.id
        )
      )
      .map((c) => c.name);
    s.mounthlyConstWithCategoriesChart.datasets[0].data = monthlyCostByCategories.payload.map(
      (mc) => mc.cost
    );
    // fetch weeklyConstChart
    const weeklyConstChartData = await s.$http("user/widget/weeklyCostByDays", {
      method: "GET",
    });

    weeklyConstChartData.payload.forEach((t) => {
      console.log(
        new Date(t.day).getDay(),
        t,
        s.weeklyConstChart.datasets[0].data
      );
      s.weeklyConstChart.datasets[0].data[new Date(t.day).getDay()] = t.cost;
    });
    // rerender chart
    s.$refs.weeklyConstChart.renderChart(
      s.weeklyConstChart,
      s.lineChartOptions
    );
    // fetch summary data
    // icon: "mdi-home",
    // category: "Ev",
    // amount: 150,
    // time: new Date().toLocaleDateString("tr-TR", { time: "long" }),
    // sign: "positive",
    // status: "Beklemede",
    // vendor: new Date().toLocaleDateString("tr-TR", dateOption),

    // amount: "6.11"
    // createdAt: "2021-04-01T04:06:44.026Z"
    // id: 6
    // isGenesis: false
    // note_id: null
    // sign: true
    // startDate: "2021-04-01T04:06:44.026Z"
    // transactionCategoryId: 3
    // transactionSituationId: 3
    // updatedAt: "2021-04-01T04:06:44.026Z"
    // userId: 1

    const sitiuations = await s.$http("user/situations/", {
      method: "GET",
    });

    const summaryData = await s.$http("user/widget/summary", {
      method: "GET",
    });

console.log(categories)
    if (summaryData.payload != null) {
      s.summaryData = summaryData.payload.map((sd) => ({
        id: sd.id,
        icon: "mdi-home",
        category: categories.payload.find((c) => c.id == sd.transactionCategoryId).name,
        status: sitiuations.payload.find((s) => s.id == sd.transactionSituationId).name,
        amount: sd.amount,
        sign: sd.sign,
        vendor: new Date().toLocaleDateString("tr-TR", sd.startDate),
      }));
    }
  },
};
</script>
<style scoped>
</style>