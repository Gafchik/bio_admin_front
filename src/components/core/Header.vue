<script setup>

import {useI18n} from "vue-i18n";
import router from "@/routes/router.js";
const {t} = useI18n()
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import {ref} from "vue";
const appStore = useAppStore()
const {} = appStore
const {drawer} = storeToRefs(appStore)
import { useUserStore } from '@/store/common/user-store.js'
const userStore = useUserStore()
const {logout} = userStore
const {isLogin} = storeToRefs(userStore)
function redirectTo(routeName){
  router.push({
    name: routeName,
  })
}
</script>

<template>
  <q-header elevated class="bg-indigo-7">
    <q-toolbar>
      <q-btn @click="drawer = !drawer" flat round dense icon="menu" class="q-mr-sm" v-if="isLogin" />
      <q-toolbar-title></q-toolbar-title>
      <q-btn @click="logout" flat round dense icon="logout" class="q-mr-sm" v-if="isLogin" />
    </q-toolbar>

  </q-header>
</template>

<style scoped>

</style>