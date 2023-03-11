<template>
<v-card>
    <v-layout>
    <v-navigation-drawer
        expand-on-hover
        rail
    >
        <v-list>
        <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            title="Lê Thanh Dương"
            subtitle="duonglt@hoaphat.com.vn"
        ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-folder" @click="$router.push('/')" title="Danh sách sổ" value="myfiles"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" title="Danh sách người dùng" value="shared"></v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-main class="main">
        <slot/>
    </v-main>
    </v-layout>
</v-card>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
.main :deep(.bg-surface-variant) {
    background: white !important;
    color: black !important;
}
</style>