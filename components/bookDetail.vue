<template>
  <v-no-ssr>
  <v-data-table
    :headers="headers"
    :items="dataBook"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>SỔ THEO DÕI GIAO/NHẬN THIẾT BỊ MÁY TÍNH</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="props"
            >
              Thêm mới
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                    v-for="item in headers" :key="item.date"
                  >
                    <v-text-field
                      v-model="editedItem[item.key]"
                      :label="item.title"
                      v-if="item.key !== 'actions' && item.key !== 'remark' "
                    ></v-text-field>
                    <v-textarea 
                      v-model="editedItem[item.key]"
                      :label="item.title"
                      v-if="item.key == 'remark' "
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Huỷ
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
              >
                Lưu
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Bạn có muốn xoá trường dữ liệu này?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Huỷ</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Xoá</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editItem(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item.raw)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Khôi phục
      </v-btn>
    </template>
  </v-data-table>
</v-no-ssr>
</template>

<script>
import { book } from "../js/book";
import { listBooks } from "../js/list-books";
export default {
  data: () => ({
    book,
    listBooks,
    dialog: false,
    dialogDelete: false,
    headers: [],
    dataBook: [],
    editedIndex: -1,
    editedItem: {
    },
    defaultItem: {
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Thêm mới' : 'Chỉnh sửa'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize();
  },

  methods: {
    async initialize () {
      const response  = await fetch("http://192.168.149.143:8000/api/v1/book?page=1&page_size=50");
      const books = await response.json();
      console.log('books', books);

      this.headers = books[0].fields.map(res => ({
        title: res.name,
        key: res.name
      }));
      this.headers.push(...arguments,{
        title: 'Actions', 
        key: 'actions',
      })

      const response_1  = await fetch("http://192.168.149.143:8000/api/v1/record?page=1&page_size=10&book_id=86cd9709-a843-4967-a62b-0e9c2b714dee&start_time=0&end_time=9999999999999");
      const records = await response_1.json();

      this.dataBook = records.map((e) => e.content);

      this.headers.forEach(element => {
        this.editedItem[element.key] = null;
      });
      
    },

    editItem (item) {
      this.editedIndex = this.dataBook.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.dataBook.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.dataBook.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.dataBook[this.editedIndex], this.editedItem)
      } else {
        this.dataBook.push(this.editedItem)
      }
      console.log('this.dataBook', this.dataBook);
      this.close()
    },
  },
}
</script>
<style type="scss">
  .v-table {
    font-size: 12px;
  }
</style>