<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col
        cols="3"
        sm="4"
        v-for="item in data" :key="item.id"
      >
      <v-card
        class="mx-auto"
        max-width="344"
        variant="outlined"
      >
        <v-card-item>
          <div>
            <div class="text-overline mb-1">
              NM.CT QSP
            </div>
            <div class="title text-h6 mb-1">
              {{item.name}}
            </div>
            <div class="text-caption">Dành cho khu vực Đúc</div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-btn variant="outlined" color="primary" @click="toDetail(item.id)">
            Xem chi tiết
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { bookHeader } from "../stores/bookHeader";

  const test = bookHeader();
  const router = useRouter();
  const { data } = await useFetch("http://192.168.149.143:8000/api/v1/book?page=1&page_size=50");
  function toDetail(id) {
    router.push('/books/' + id);
    test.setHeader(data.value[0].fields);
  }
</script>

<style scoped lang="scss">
.title {
  display:inline-block;
  width:100%;
  overflow:hidden !important;
  height: 70px;
}
</style>