<script setup>
import {storeToRefs} from "pinia";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js"
const dialogConfirmStore = useDialogConfirmStore()
const {closeDialogConfirm,callFunctionYes} = dialogConfirmStore
const {isShowDialog,title,text} = storeToRefs(dialogConfirmStore)
</script>

<template>
<div>
  <q-dialog v-model="isShowDialog" persistent>
    <q-card>
      <q-card-section class="bg-blue-8 text-white row items-center">
        <div class="text-h6">
          {{ title }}
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle2" v-html="text"/>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat icon="close" color="negative" @click="closeDialogConfirm"/>
        <q-btn flat icon="done" color="positive" @click="callFunctionYes"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
</template>