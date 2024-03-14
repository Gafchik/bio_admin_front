<script setup>
import { ref, computed} from 'vue'
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
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
</script>

<template>
  <q-dialog v-model="editCategoryDialog" persistent>
    <q-card>
      <q-card-section class="bg-indigo-7">
        <div class="text-h6">Редактирование категории {{editItemCategory.label}}</div>
      </q-card-section>
      <div v-show="disableSubmit" class="justify-center content-center text-center text-red">
        <b>Не все поля заполнены!</b>
      </div>
      <q-card-section class="q-mt-md justify-center content-center scroll" style="max-height: 50vh">
        <q-input
            class="q-my-lg"
            filled
            type="number"
            v-model="editItemCategory.position"
            label="Позиция"
        />
        <q-toggle v-model="editItemCategory.status" label="Статус" />
        <q-input
            class="q-my-lg"
            filled
            type="text"
            v-model="editItemCategory.ru"
            label="Название русский"
        />
        <q-input
            class="q-my-lg"
            filled
            type="text"
            v-model="editItemCategory.uk"
            label="Название украинский"
        />
        <q-input
            class="q-my-lg"
            filled
            type="text"
            v-model="editItemCategory.en"
            label="Название ангийский"
        />
        <q-input
            class="q-my-lg"
            filled
            type="text"
            v-model="editItemCategory.ge"
            label="Название грузинский"
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