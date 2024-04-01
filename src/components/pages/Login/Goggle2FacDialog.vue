<script setup>
import { useAppStore } from '@/store/app-store.js'
const appStore = useAppStore()
import { storeToRefs } from 'pinia'
const {sendGoogle2fac} = appStore
const {code,google2facDialog,qr,has2fac} = storeToRefs(appStore)
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const TRANC_PREFIX = 'pages.login'
</script>

<template>
  <q-dialog v-model="google2facDialog" persistent>
    <q-card>
      <q-card-section class="bg-indigo-7">
        <div class="text-h6">{{t(`${TRANC_PREFIX}.header2fa`)}}</div>
      </q-card-section>

      <q-card-section v-show="!has2fac" class="q-mt-md row justify-center content-center">
        <q-img width="80%" :src="qr"></q-img>
      </q-card-section>
      <q-card-section v-show="has2fac" class="q-mt-md row justify-center content-center">
        <q-input
            class="q-my-lg"
            filled
            type="text"
            v-model="code"
            :label="t(`${TRANC_PREFIX}.code2fa`)"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
               @click="sendGoogle2fac"
               icon="done"
               flat
               color="positive"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>