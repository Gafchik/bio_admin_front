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

function redirectTo(routeName){
  router.push({
    name: routeName,
  })
}
</script>

<template>
  <q-header elevated class="bg-indigo-7">
    <q-toolbar>
      <q-btn @click="drawer = !drawer" flat round dense icon="menu" class="q-mr-sm" />
    </q-toolbar>

  </q-header>
</template>

<style scoped>

</style>