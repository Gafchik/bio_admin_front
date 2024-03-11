<script setup>
import { useUserStore } from '@/store/common/user-store.js'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const {sendGoogle2fac} = userStore
const {code,google2facDialog,qr,has2fac} = storeToRefs(userStore)
</script>

<template>
  <q-dialog v-model="google2facDialog" persistent>
    <q-card>
      <q-card-section class="bg-indigo-7">
        <div class="text-h6">Двухфакторная авторизация</div>
      </q-card-section>

      <q-card-section v-show="!has2fac" class="q-mt-md row justify-center content-center">
        <div v-html="qr"></div>
      </q-card-section>
      <q-card-section v-show="has2fac" class="q-mt-md row justify-center content-center">
        <q-input
            class="q-my-lg"
            filled
            type="text"
            v-model="code"
            label="Код"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
               @click="sendGoogle2fac(code)"
               icon="done"
               flat
               color="positive"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>