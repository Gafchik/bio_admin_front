<script setup>
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import { useI18n } from "vue-i18n";
import {useBaseOnlyTextStore} from "@/store/common/base-only-text-store.js";
const {t} = useI18n()
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
const baseOnlyTextStore = useBaseOnlyTextStore()
const {getItemInfoAsync,saveItem,saveItemAsync} = baseOnlyTextStore
const {item} = storeToRefs(baseOnlyTextStore)
const props = defineProps({
  TRANC_PREFIX: {
    type: String,
    required: true,
    default: ''
  },
  ROUTE_PREFIX: {
    type: String,
    required: true,
    default: ''
  },
})
</script>

<template>
  <div class="q-my-lg">
    cefcrfcfc
  </div>
</template>

<style scoped>

</style>