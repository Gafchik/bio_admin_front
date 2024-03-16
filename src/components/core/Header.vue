<script setup>

import {useI18n} from "vue-i18n";
import router from "@/routes/router.js";
const {t} = useI18n()
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
const appStore = useAppStore()
import locales from "@/constants/locales.js"
const {drawer,localesModel,isLogin} = storeToRefs(appStore)
const {logout} = appStore

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
      <q-select
          class="q-mt-lg q-mr-lg"
          transition-show="flip-up"
          transition-hide="flip-down"
          standout
          bottom-slots
          filled
          v-model="localesModel"
          :options="locales"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" class="justify-center">
            <div v-if="$q.platform.is.mobile" class="row items-center">
              <q-item-section avatar>
                <q-img :src="scope.opt.image"/>
              </q-item-section>
              <q-item-section >
                <q-item-label>
                  {{t(`app.locale.${scope.opt.value}`)}}
                </q-item-label>
              </q-item-section>
            </div>
            <q-img v-else :src="scope.opt.image"/>
          </q-item>
        </template>
        <template v-slot:selected>
          <q-avatar>
            <q-img :src="localesModel.image"/>
          </q-avatar>
        </template>
      </q-select>
      <q-btn @click="logout" flat round dense icon="logout" class="q-mr-sm" v-if="isLogin" />
    </q-toolbar>

  </q-header>
</template>

<style scoped>

</style>