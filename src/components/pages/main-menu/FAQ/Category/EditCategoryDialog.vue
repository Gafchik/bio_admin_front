<script setup>
import { ref, computed} from 'vue'
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const faqStore = useFaqStore()
const {saveEditCategory,closeEditCategoryDialog} = faqStore
const {editItemCategory,editCategoryDialog} = storeToRefs(faqStore)
const code = ref('')
const disableSubmit = computed(() => {
  return !editItemCategory.value.position.toString()
    || !editItemCategory.value.ru.length
    || !editItemCategory.value.uk.length
    || !editItemCategory.value.en.length
    || !editItemCategory.value.ge.length
})
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
const TRANC_PREFIX = 'pages.faq.categories.dialog'
</script>

<template>
  <q-dialog v-model="editCategoryDialog" persistent full-width>
    <q-card>
      <q-card-section class="bg-indigo-7">
        <div class="text-h6">
          {{ t(`${TRANC_PREFIX}.edit_title`)}}
        </div>
      </q-card-section>
      <div v-show="disableSubmit" class="justify-center content-center text-center text-red">
        <b>{{t(`${TRANC_PREFIX}.not_valid`)}}</b>
      </div>
      <q-card-section class="q-mt-md justify-center content-center scroll">
        <q-input
            class="q-my-xs"
            filled
            type="number"
            v-model="editItemCategory.position"
            :label="t(`${TRANC_PREFIX}.position`)"
        />
        <q-toggle
            v-model="editItemCategory.status"
            :label="t(`${TRANC_PREFIX}.status`)" />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemCategory.ru"
            :label="t(`${TRANC_PREFIX}.name_ru`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemCategory.uk"
            :label="t(`${TRANC_PREFIX}.name_ua`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemCategory.en"
            :label="t(`${TRANC_PREFIX}.name_en`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemCategory.ge"
            :label="t(`${TRANC_PREFIX}.name_ge`)"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
            @click="closeEditCategoryDialog"
            icon="close"
            flat
            color="red"/>
        <q-btn
            :disable="disableSubmit"
            icon="done"
            @click="saveEditCategory"
            flat
            color="positive"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>