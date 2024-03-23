<script setup>
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";

const appStore = useAppStore()
const { isLoading } =storeToRefs(appStore)
</script>

<template>
  <q-dialog v-model="isLoading" persistent>
    <q-spinner-hourglass color="blue" size="5.5em"/>
  </q-dialog>
</template>

<style scoped>

</style>