<script setup>
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";
const appStore = useAppStore()
const {openElFinderDialog,closeElFinderDialog} = appStore
const {elFinderDialog} = storeToRefs(appStore)
</script>

<template>
  <q-dialog v-model="elFinderDialog" persistent maximized>
    <q-card>
      <q-card-section class="bg-indigo-7 row items-center q-pb-none">
        <q-space />
        <q-btn
            @click="closeElFinderDialog"
            icon="close"
            flat
            color="red"/>
      </q-card-section>
      <q-card-section>
        <iframe src="https://bio-files.dichajeka.online/" width="100%" height="500px"></iframe>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
</style>
