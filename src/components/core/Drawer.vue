<script setup>
import menu from "@/constants/main-menu.js"
import {useI18n} from "vue-i18n";
import router from "@/routes/router.js";
const {t} = useI18n()
import { useAppStore } from '@/store/app-store.js'
import { useUserStore } from '@/store/common/user-store.js'
import { storeToRefs } from 'pinia'
const appStore = useAppStore()
const userStore = useUserStore()
const {} = appStore
const {drawer} = storeToRefs(appStore)
const {isLogin} = storeToRefs(userStore)

function redirectTo(routeName){
  router.push({
    name: routeName,
  })
}
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
      <q-list>
        <template v-for="item in menu">
          <q-item clickable @click="redirectTo(item.route_name)" v-ripple>
            <q-item-section v-show="!!item.icon" avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              {{ t(`main_menu.${item.label}`) }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

