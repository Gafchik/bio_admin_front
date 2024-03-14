<script setup>
import { ref, computed} from 'vue'
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {toolbarOptions} from "@/constants/quill-editor-toolbar.js";
const {t} = useI18n()
const faqStore = useFaqStore()
const {saveEditQuestion,closeEditQuestionDialog} = faqStore
const {editItemQuestion,editQuestionDialog} = storeToRefs(faqStore)
const code = ref('')
const disableSubmit = computed(() => {
  return !editItemQuestion.value.position.toString()
      || !editItemQuestion.value.ru_question.length
      || !editItemQuestion.value.uk_question.length
      || !editItemQuestion.value.en_question.length
      || !editItemQuestion.value.ge_question.length
      || !editItemQuestion.value.ru_answer.length
      || !editItemQuestion.value.uk_answer.length
      || !editItemQuestion.value.en_answer.length
      || !editItemQuestion.value.ge_answer.length
})
</script>

<template>
  <q-dialog v-model="editQuestionDialog" persistent full-width>
    <q-card>
      <q-card-section class="bg-indigo-7">
        <div class="text-h6">Редактирование категории {{editItemQuestion.label}}</div>
      </q-card-section>
      <div v-show="disableSubmit" class="justify-center content-center text-center text-red">
        <b>Не все поля заполнены!</b>
      </div>
      <q-card-section class="q-mt-md justify-center content-center scroll" style="max-height: 50vh">
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemQuestion.position"
            label="Позиция"
        />
        <q-toggle v-model="editItemQuestion.status" label="Статус" />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemQuestion.ru_question"
            label="Вопрос на русском"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemQuestion.uk_question"
            label="Вопрос на украинском"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemQuestion.en_question"
            label="Вопрос на английском"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemQuestion.ge_question"
            label="Вопрос на грузинском"
        />
        <div class="text-center">Ответ на русском</div>
        <QuillEditor
            class="q-my-xs"
            style="height: 250px"
            :toolbar="toolbarOptions"
            theme="snow"
            contentType="html"
            v-model:content="editItemQuestion.ru_answer"  />
        <div class="text-center">Ответ на украинском</div>
        <QuillEditor
            class="q-my-xs"
            style="height: 250px"
            :toolbar="toolbarOptions"
            theme="snow"
            contentType="html"
            v-model:content="editItemQuestion.uk_answer"  />
        <div class="text-center">Ответ на английском</div>
        <QuillEditor
            class="q-my-xs"
            style="height: 250px"
            :toolbar="toolbarOptions"
            theme="snow"
            contentType="html"
            v-model:content="editItemQuestion.en_answer"  />
        <div class="text-center">Ответ на грузинском</div>
        <QuillEditor
            class="q-my-xs"
            style="height: 250px"
            :toolbar="toolbarOptions"
            theme="snow"
            contentType="html"
            v-model:content="editItemQuestion.ge_answer"  />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
            @click="closeEditQuestionDialog"
            icon="close"
            flat
            color="red"/>
        <q-btn
            :disable="disableSubmit"
            icon="done"
            @click="saveEditQuestion"
            flat
            color="positive"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>