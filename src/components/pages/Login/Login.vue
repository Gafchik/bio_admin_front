<script setup>
import {ref,computed} from "vue";
import { useUserStore } from '@/store/common/user-store.js'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const {loginAsync} = userStore
const {email,password,disableSubmit,code} = storeToRefs(userStore)

</script>

<template>
  <q-card class="my-card q-mt-md" style="width: 50%">
    <q-card-section>
      <div class="text-h6">Вход</div>
    </q-card-section>
    <q-card-section>
      <q-input
          filled
          type="email"
          v-model="email"
          label="E-mail"
          lazy-rules
      />
      <q-input
          class="q-my-lg"
          filled
          type="password"
          v-model="password"
          label="Пароль"
          lazy-rules
      />
      <q-input
          filled
          type="number"
          v-model="code"
          label="Код"
          lazy-rules
      />
    </q-card-section>
    <q-separator />
    <q-card-actions class="row justify-end">
      <q-btn :disable="disableSubmit"
             @click="loginAsync"
             label="Войти"
             color="primary"/>
    </q-card-actions>
  </q-card>
</template>

<style scoped>

</style>