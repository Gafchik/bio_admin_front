<script setup>

import menu from "@/constants/main-menu.js"
import { useAppStore } from '@/store/app-store.js'
import { useUserStore } from '@/store/common/user-store.js'
import { storeToRefs } from 'pinia'
const appStore = useAppStore()
const userStore = useUserStore()
const {redirectTo} = appStore
const {drawer,selectedMainMenu} = storeToRefs(appStore)
const {isLogin} = storeToRefs(userStore)

</script>

<template>
  <q-drawer
      v-model="drawer"
      v-if="isLogin"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-indigo-7 text-white"
  >
    <q-scroll-area class="fit">
      <q-tree
          :nodes="menu"
          node-key="route_name"
          label-key="label"
          selected-color="primary"
          v-model:selected="selectedMainMenu"
          @update:selected="redirectTo"
          default-expand-all
      />
    </q-scroll-area>
  </q-drawer>
</template>

