<script setup>

import menu from "@/constants/main-menu.js"
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
const appStore = useAppStore()
const {redirectTo} = appStore
const {drawer,selectedMainMenu,isLogin} = storeToRefs(appStore)
import {useI18n} from "vue-i18n";
const {t} = useI18n()
</script>

<template>
  <q-drawer
      v-model="drawer"
      v-if="isLogin"
      :width="350"
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
      >
        <template v-slot:default-header="prop">
          <div class="row items-center">
            <q-icon :name="prop.node.icon || 'share'" size="28px" class="q-mr-sm" />
            <div class="text-weight-bold">{{ t(prop.node.label) }}</div>
          </div>
        </template>
      </q-tree>
    </q-scroll-area>
  </q-drawer>
</template>

