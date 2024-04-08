<script setup>
import {useMyQuillStore} from "@/store/common/my-quill-store.js";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
import {computed, watch} from "vue";
const {t} = useI18n()
const appStore = useAppStore()
const {currentLocale, isLoading} = storeToRefs(appStore)
const {openElFinderDialog} = appStore
const quillStore = useMyQuillStore()
const {imageDialog,imageObject} = storeToRefs(quillStore)
const {closeImageDialog,readyImage} = quillStore
const disableSubmit = computed(() => {
  return imageObject.value.path === '/' || imageObject.value.path === '' || !imageObject.value.path
})
const VITE_BASE_FILE_URL = import.meta.env.VITE_BASE_FILE_URL
function changePreview(value) {
  if(!!value){
    if (!value.startsWith('/')) {
      imageObject.value.path = '/' + value;
    }
  }
}
watch(
    () => imageObject.value.path,
    (newValue, oldValue) => changePreview(newValue),
);
</script>

<template>
  <q-dialog v-model="imageDialog" persistent maximized>
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none">
        <q-space/>
        <q-btn
            @click="closeImageDialog"
            icon="close"
            flat
            color="red"/>
      </q-bar>
      <q-card-section class="q-mt-sm justify-center content-center scroll">
        <div class="text-center">
          <q-img fit="fill" style="width: 50%; height: auto" :src="VITE_BASE_FILE_URL+imageObject.path"/>
        </div>
        <div v-show="disableSubmit" class="justify-center content-center text-center text-red">
          <b>{{ t('app.field_required') }}</b>
        </div>
        <q-input
            filled
            v-model="imageObject.path"
            :rules="[val => val !== '/' || t('app.required')]"
            :label="t('app.imagePath')"
        >
          <template v-slot:append>
            <q-icon name="folder_open" @click="openElFinderDialog"/>
          </template>
        </q-input>
        <q-input
            class="q-mb-xs"
            :label="t('app.width')"
            v-model.number="imageObject.width"
            type="number"
            filled
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
            @click="closeImageDialog"
            icon="close"
            flat
            color="red"/>
        <q-btn
            :disable="disableSubmit"
            icon="done"
            @click="readyImage"
            flat
            color="positive"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>