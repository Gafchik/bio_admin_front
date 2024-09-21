<script setup>
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const VITE_BASE_FILE_URL = import.meta.env.VITE_BASE_FILE_URL
const appStore = useAppStore()
const {axios} = storeToRefs(appStore)
const is_permission = ref(false)
async function checkPermission(){
  return await axios.value.post('/api/server-explorer/check')
      .then(response => {
        is_permission.value = true
        return true
      })
      .catch(error => {
        return false
      });
}
checkPermission()
</script>

<template>
<div style="width: 100%;">
   <iframe v-if="is_permission" :src="VITE_BASE_FILE_URL" width="100%" height="500px"></iframe>
</div>
</template>

<style scoped>

</style>