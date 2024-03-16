<script setup>
import Goggle2FacDialog from "@/components/pages/Login/Goggle2FacDialog.vue"
import { useAppStore } from '@/store/app-store.js'
const appStore = useAppStore()
import { storeToRefs } from 'pinia'
const {loginAsync} = appStore
const {email,password,disableSubmit,code} = storeToRefs(appStore)
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const TRANC_PREFIX = 'pages.login'
</script>

<template>
  <div>
    <Goggle2FacDialog/>
  </div>
  <q-card class="my-card q-mt-md" style="width: 50%">
    <q-card-section>
      <div class="text-h6">{{t(`${TRANC_PREFIX}.header`)}}</div>
    </q-card-section>
    <q-card-section>
      <q-input
          filled
          type="email"
          v-model="email"
          :label="t(`${TRANC_PREFIX}.email`)"
          lazy-rules
      />
      <q-input
          class="q-my-lg"
          filled
          type="password"
          v-model="password"
          :label="t(`${TRANC_PREFIX}.password`)"
          lazy-rules
      />
    </q-card-section>
    <q-separator />
    <q-card-actions class="row justify-end">
      <q-btn :disable="disableSubmit"
             @click="loginAsync"
             :label="t(`${TRANC_PREFIX}.login`)"
             color="primary"/>
    </q-card-actions>
    <Goggle2FacDialog/>
  </q-card>
</template>

<style scoped>

</style>