<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogOpen" persistent max-width="700px">
      <v-card color="secondary">
        <v-card-title>
          <span class="headline">{{ typeName }} {{ intentText }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <small
              >{{ typeName }} tarihi ve saati, miktarı, işareti, ve
              kategorisi.</small
            >
            <v-row>
              <v-col cols="12" sm="12" md="3">
                <v-menu
                  :close-on-content-click="false"
                  v-model="startDatePickerMenu"
                  transition="scale-transition"
                  min-width="auto"
                  ref="menu"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="formData.startDate"
                      label="Başlangıç tarihi"
                      v-on="on"
                      readonly
                      filled
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="tr"
                    ref="picker"
                    color="secondary"
                    @change="onStartDateChange"
                    v-model="formData.startDate"
                    :min="minDateCanUse"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="12" md="3">
                <v-menu
                  :close-on-content-click="false"
                  v-model="startTimePickerMenu"
                  transition="scale-transition"
                  min-width="auto"
                  ref="menu"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="formData.startTime"
                      label="Başlangıç saati"
                      v-on="on"
                      readonly
                      filled
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="formData.startTime"
                    format="24hr"
                    color="secondary"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="12" md="2">
                <v-btn
                  fab
                  small
                  @click="toggleSign"
                  style="top: -23px; left: -23px"
                  :color="formData.sign == 'positive' ? 'success' : 'error'"
                >
                  <v-icon>
                    {{ formData.sign == "positive" ? "mdi-plus" : "mdi-minus" }}
                  </v-icon>
                </v-btn>
                <v-text-field
                  style="margin-top: -40px"
                  v-model="formData.amount"
                  label="Miktar"
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-autocomplete
                  v-model="formData.category"
                  :items="categories"
                  filled
                  label="Kategori"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <small>{{ typeName }} durumu ve notu.</small>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-autocomplete
                  v-model="formData.status"
                  :items="situations"
                  filled
                  label="Durum"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  v-model="formData.note"
                  label="Not"
                  filled
                ></v-text-field>
              </v-col>
            </v-row>
            <small v-if="type == 'schedule'"
              >Tekrar zamanı ve tekrar aralığı örneğin: x günde bir.</small
            >
            <v-row v-if="type == 'schedule'">
              <v-col cols="12" sm="12" :md="repetitionType == 0 ? '12' : '6'">
                <v-tabs
                  v-model="repetitionType"
                  class="d-flex justify-center mb-6"
                >
                  <v-tab class="secondary">Tekrar Yok</v-tab>
                  <v-tab class="secondary">Gün</v-tab>
                  <v-tab class="secondary">Hafta</v-tab>
                  <v-tab class="secondary">Ay</v-tab>
                  <v-tab class="secondary">Yıl</v-tab>
                </v-tabs>
              </v-col>
              <v-col
                cols="12"
                md="5"
                v-if="repetitionType > 0"
                class="d-flex align-center"
              >
                <v-slider
                  class="secondary"
                  v-model="formData.times"
                  hint="Tekrar miktarı"
                  :min="limitsOfScheduleTimes.min"
                  :max="limitsOfScheduleTimes.max"
                ></v-slider>
              </v-col>
              <v-col
                cols="12"
                md="1"
                class="d-flex justify-center align-center mb-6"
                v-if="repetitionType > 0"
              >
                <h2>{{ formData.times }}</h2>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success darken-1" @click="cancel">İptal</v-btn>
          <v-btn color="error darken-1" @click="confirm">
            {{ intentText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      require: true,
    },
    // Using for multipurpose use, transaction and schedule.
    type: {
      type: String,
      require: true,
    },
    // Can be add or update
    intent: {
      type: String,
      require: true,
      validator: (value) => {
        return value == "add" || value == "update";
      },
    },
    // Useing value for getting item from parent compenent
    value: {
      require: true,
    },
  },
  computed: {
    isDialogOpen() {
      return this.dialog;
    },
    typeName() {
      return this.type == "schedule" ? "Plan" : "İşlem";
    },
    intentText() {
      return this.intent == "add" ? "Ekle" : "Güncelle";
    },
    // Decide can use date max and min by type prop
    minDateCanUse() {
      return this.type == "transaction"
        ? "1950-01-01"
        : new Date().toISOString().substr(0, 10);
    },
    limitsOfScheduleTimes() {
      const cr = (min, max) => ({ min, max });
      switch (this.repetitionType) {
        case 1:
          return cr(1, 31);
        case 2:
          return cr(1, 54);
        case 3:
          return cr(1, 12);
        case 4:
          return cr(1, 10);
        default:
          return cr(0, 0);
      }
    },
  },
  data: () => ({
    startDatePickerMenu: false,
    startTimePickerMenu: false,
    formData: {
      startDate: null,
      startTime: "12:00",
      amount: 1,
      category: null,
      status: null,
      sign: "positive",
      // schedule
      times: 1,
      repeat: false,
      repetitionType: "day",
    },
    categories: ["Ev", "Araba", "Giyim", "Eğlence"],
    situations: ["Tanımlanmamış", "Tamamlandı", "Beklemede", "İptal"],
    repetitionType: 0,
  }),
  methods: {
    confirm() {
      const s = this;
      s.$emit("confirm", JSON.parse(JSON.stringify(this.formData)));
    },
    cancel() {
      this.$emit("cancel", "cancelButton");
    },
    onStartDateChange() {},
    serializeItem(formData) {
      this.formData = formData;
    },
    toggleSign() {
      const { sign } = this.formData;
      this.formData.sign = sign == "positive" ? "negative" : "positive";
    },
  },
  watch: {
    dialog: {
      handler: function (newValue) {
        if (newValue) {
          this.serializeItem(this.value);
        }
      },
    },
  },
};
</script>
<style>
</style>