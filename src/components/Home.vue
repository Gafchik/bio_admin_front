<script setup>
import { ref } from 'vue'
import {useI18n} from "vue-i18n";
const {t} = useI18n()
defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <q-page class="q-pa-md bg-green-1">
    <q-btn
        @click="$q.notify('My message')"
        color="primary"
        label="Show a notification"
    />
    <q-icon name="done" />
    <q-btn
        color="primary"
        label="Show another notification"
    />
  </q-page>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
