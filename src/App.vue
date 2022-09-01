<template>
  <v-app>
    <template>
      <v-data-table
        :headers="headers"
        :items="sales"
        sort-by="date"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>My Sales Data Table</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Sales Data
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Sales Data</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.rep"
                          label="Sales Rep"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.item"
                          label="Item"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.quantity"
                          label="Qty"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.price"
                          label="Price ($)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Start </v-btn>
        </template>
      </v-data-table>
    </template>
  </v-app>
</template>

<script>
import api from './api';
import { Server } from './utils/config';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Sales Rep', align: 'start', value: 'rep' },
      { text: 'Item', value: 'item' },
      { text: 'Qty', value: 'quantity' },
      { text: 'Price ($)', value: 'price' },
      { text: 'Action', value: 'action', sortable: false },
    ],
    sales: [],
    editedIndex: -1,
    editedItem: {
      rep: '',
      item: '',
      quantity: 0,
      price: 0,
    },
    defaultItem: {
      rep: '',
      item: '',
      quantity: 0,
      price: 0,
    },
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.sales = [
        {
          date: '8/31/2022',
          rep: 'Frankie Ystein',
          item: 'Frozen Yoghurt',
          quantity: 2,
          price: 40.79,
        },
        {
          date: '8/31/2022',
          rep: 'Divine Orji',
          item: 'Ice Cream Sandwich',
          quantity: 1,
          price: 0.84,
        },
        {
          date: '8/31/2022',
          rep: 'Olawale Olakunle',
          item: 'Eclair',
          quantity: 7,
          price: 20.99,
        },
      ];
    },

    deleteItem(item) {
      this.editedIndex = this.sales.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.sales.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.sales[this.editedIndex], this.editedItem);
      } else {
        this.sales.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
