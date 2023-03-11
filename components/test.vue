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

<script setup>
import { bookHeader } from "../stores/bookHeader";
import { ref, watch, nextTick  } from 'vue';
import { storeToRefs } from 'pinia'

    const dialog = ref(false);
    const dialogDelete = ref(false);
    const editedIndex = ref(0);
    const editedItem = ref({});
    const defaultItem = ref({});
    const store = bookHeader();
        
    const response  = await useFetch("http://192.168.149.143:8000/api/v1/record?page=1&page_size=10&book_id=86cd9709-a843-4967-a62b-0e9c2b714dee&start_time=0&end_time=9999999999999");
    const { getHeader } = storeToRefs(store);
    const headers = getHeader.value.map(res => ({
        title: res.name,
        key: res.name
    }));
    const hed = headers.push({
        title: 'Actions', 
        key: 'actions',
    });
    const dataBook = response.data.value.map((e) => e.content);

    headers.forEach(element => {
        editedItem[element.key] = null;
    });
    
    

    const editItem = (item) => {
      editedIndex.value = dataBook.indexOf(item);
      editedItem.value = Object.assign({}, item);
      dialog.value = true;
    };

    function deleteItem (item) {
      editedIndex.value = dataBook.indexOf(item)
      editedItem.value = Object.assign({}, item)
      dialogDelete.value = true
    };

    function deleteItemConfirm () {
      dataBook.splice(editedIndex.value, 1)
      closeDelete()
    };

    function close () {
      dialog = false
      nextTick(() => {
        editedItem = Object.assign({}, defaultItem.value)
        editedIndex = -1
      })
    };

    function closeDelete () {
      dialogDelete.value = false
      nextTick(() => {
        editedItem.value = Object.assign({}, defaultItem.value)
        editedIndex.value = -1
      })
    };

    function save () {
      if (editedIndex > -1) {
        Object.assign(dataBook[editedIndex], editedItem)
      } else {
        dataBook.push(editedItem)
      }
      // console.log('dataBook', dataBook);
      close()
    };

</script>

<style lang="scss" scoped>

</style>