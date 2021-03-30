<template>
  <v-data-table
    dense
    disable-sort
    :headers="headers"
    hide-default-footer
    :items="data"
    item-key="id"
    group-by="vendor"
    class="primary"
  >
    <template v-slot:[`group.header`]="{ items, isOpen, toggle }">
      <th colspan="5" class="secondary">
        <v-icon @click="toggle">
          {{ isOpen ? "mdi-minus" : "mdi-plus" }}
        </v-icon>
        {{ items[1].vendor }}
      </th>
    </template>
    <template v-slot:item="{ item }">
      <tr @click="$emit('onClickRow', item)" v-bind:class="item.sign">
        <td>
          <v-icon>{{ item.icon }}</v-icon>
        </td>
        <td>{{ item.category }}</td>
        <td>{{ item.amount }}</td>
        <td>{{ item.time }}</td>
        <td>{{ item.status }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: "TransactionTable",
  props: {
    headers: {
      type: Array,
      require: true,
    },
    data: {
      type: Array,
      require: true,
      /* validator: (data) => {
        for (let item of data)
          if (typeof item.id != "number" || typeof item.vendor != "string") {
            return false;
          }
        return true;
      },*/
    },
  },
  data: () => ({}),
};
</script>
<style scoped>
tr.negative {
  background-color: rgb(213, 158, 167)
}
tr.positive {
  background-color: rgb(107, 181, 107)
}
</style>

