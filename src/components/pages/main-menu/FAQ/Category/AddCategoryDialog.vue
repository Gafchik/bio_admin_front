<script setup>
import { ref, computed} from 'vue'
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const faqStore = useFaqStore()
const {saveAddCategory,closeAddDialog} = faqStore
const {addItemCategory,addCategoryDialog} = storeToRefs(faqStore)
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)

const disableSubmit = computed(() => {
  return !addItemCategory.value.position.toString()
      || !addItemCategory.value.ru.length
      || !addItemCategory.value.uk.length
      || !addItemCategory.value.en.length
      || !addItemCategory.value.ge.length
})
const TRANC_PREFIX = 'pages.faq.categories.dialog'
</script>

<template>
  <q-dialog v-model="addCategoryDialog" persistent full-width >
    <q-card>
      <q-bar class="bg-indigo-7">
        <div class="text-h6">{{t(`${TRANC_PREFIX}.add_title`)}}</div>
      </q-bar>
      <div v-show="disableSubmit" class="justify-center content-center text-center text-red">
        <b>{{t(`${TRANC_PREFIX}.not_valid`)}}</b>
      </div>
      <q-card-section class="q-mt-md justify-center content-center">
        <q-input
            class="q-my-xs"
            filled
            type="number"
            v-model="addItemCategory.position"
            :label="t(`${TRANC_PREFIX}.position`)"
        />
        <q-toggle
            v-model="addItemCategory.status"
            :label="t(`${TRANC_PREFIX}.status`)" />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItemCategory.ru"
            :label="t(`${TRANC_PREFIX}.name_ru`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItemCategory.uk"
            :label="t(`${TRANC_PREFIX}.name_ua`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItemCategory.en"
            :label="t(`${TRANC_PREFIX}.name_en`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItemCategory.ge"
            :label="t(`${TRANC_PREFIX}.name_ge`)"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
            @click="closeAddDialog"
            icon="close"
            flat
            color="red"/>
        <q-btn
            :disable="disableSubmit"
            icon="done"
            @click="saveAddCategory(addItemCategory)"
            flat
            color="positive"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>