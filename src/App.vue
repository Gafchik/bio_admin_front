<script setup>
import AppHeader from '@/components/core/Header.vue'
import Drawer from "@/components/core/Drawer.vue";
import LoadingDialog from "@/components/common/LoadingDialog.vue";
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader></AppHeader>
    <Drawer/>
    <q-page-container class="row justify-center content-start">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
  <LoadingDialog/>
</template>

<style scoped>
</style>
