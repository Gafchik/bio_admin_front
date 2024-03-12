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
  <q-page class="w-100 q-mt-md">
    <q-tree
        :nodes="menu"
        node-key="route_name"
        label-key="label"
        selected-color="primary"
        v-model:selected="selectedMainMenu"
        @update:selected="redirectTo"
        default-expand-all
    />
  </q-page>
</template>

<style scoped>

</style>
