<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col
        cols="3"
        sm="4"
        v-for="item in listBooks" :key="item.id"
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
<script>

export default {
  data() {
    return {
      listBooks : []
    }
  },
  
  mounted() {
    this.getData();
    this.asyncData();
  },
  methods: {
    toDetail(value) {
      this.$router.push('/books/' + value);
    },
    async getData() {
      const response  = await fetch("http://192.168.149.143:8000/api/v1/book?page=1&page_size=50");
      this.listBooks = await response.json();
    },
  }
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