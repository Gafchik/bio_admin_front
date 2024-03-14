<script setup>
import { ref, computed} from 'vue'
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const faqStore = useFaqStore()
const {saveAddCategory,closeAddDialog} = faqStore
const {addItemCategory,addCategoryDialog} = storeToRefs(faqStore)

const disableSubmit = computed(() => {
  return !addItemCategory.value.position.toString()
      || !addItemCategory.value.ru.length
      || !addItemCategory.value.uk.length
      || !addItemCategory.value.en.length
      || !addItemCategory.value.ge.length
})

</script>

<template>
  <q-dialog v-model="addCategoryDialog" persistent>
    <q-card>
      <q-card-section class="bg-indigo-7">
        <div class="text-h6">Добавление категории</div>
      </q-card-section>
      <div v-show="disableSubmit" class="justify-center content-center text-center text-red">
        <b>Не все поля заполнены!</b>
      </div>
      <q-card-section class="q-mt-md justify-center content-center scroll" style="max-height: 50vh">
        <q-input
            class="q-my-lg"
            filled
            type="number"
            v-model="addItemCategory.position"
            label="Позиция"
        />
        <q-toggle v-model="addItemCategory.status" label="Статус" />
        <q-input
            class="q-my-lg"
            filled
            type="text"
            v-model="addItemCategory.ru"
            label="Название русский"
        />
        <q-input
            class="q-my-lg"
            filled
            type="text"
            v-model="addItemCategory.uk"
            label="Название украинский"
        />
        <q-input
            class="q-my-lg"
            filled
            type="text"
            v-model="addItemCategory.en"
            label="Название ангийский"
        />
        <q-input
            class="q-my-lg"
            filled
            type="text"
            v-model="addItemCategory.ge"
            label="Название грузинский"
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