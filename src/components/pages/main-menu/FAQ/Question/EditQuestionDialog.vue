<script setup>
import { ref, computed} from 'vue'
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
import MyQuillEditor from "@/components/common/MyQuillEditor.vue";
const {t} = useI18n()
const faqStore = useFaqStore()
const {saveEditQuestion,closeEditQuestionDialog} = faqStore
const {editItemQuestion,editQuestionDialog,category} = storeToRefs(faqStore)
const code = ref('')
const disableSubmit = computed(() => {
  return !editItemQuestion.value.position.toString()
      || !editItemQuestion.value.faq_category_id
      || !editItemQuestion.value.ru_question.length
      || !editItemQuestion.value.uk_question.length
      || !editItemQuestion.value.en_question.length
      || !editItemQuestion.value.ge_question.length
      || !editItemQuestion.value.ru_answer.length
      || !editItemQuestion.value.uk_answer.length
      || !editItemQuestion.value.en_answer.length
      || !editItemQuestion.value.ge_answer.length
})
const TRANC_PREFIX = 'pages.faq.question.dialog'
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
</script>

<template>
  <q-dialog v-model="editQuestionDialog" maximized>
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none">
        <div class="text-h6">
          {{ t(`${TRANC_PREFIX}.edit_title`)}}
        </div>
        <q-space />
        <q-btn
            @click="closeEditQuestionDialog"
            icon="close"
            flat
            color="red"/>
      </q-bar>
      <div v-show="disableSubmit" class="justify-center content-center text-center text-red">
        <b>{{t(`${TRANC_PREFIX}.not_valid`)}}</b>
      </div>
      <q-card-section class="q-mt-md justify-center content-center scroll">
        <q-select
            class="q-mt-lg"
            filled
            emit-value
            map-options
            option-value="id"
            :option-label="currentLocale === 'ru' ? 'label_ru' : 'label_en'"
            :label="t(`${TRANC_PREFIX}.category_select`)"
            v-model="editItemQuestion.faq_category_id"
            :options="category"
        >
        </q-select>
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemQuestion.position"
           :label="t(`${TRANC_PREFIX}.position`)"
        />
        <q-toggle
            v-model="editItemQuestion.status"
            :label="t(`${TRANC_PREFIX}.status`)" />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemQuestion.ru_question"
            :label="t(`${TRANC_PREFIX}.question_ru`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemQuestion.uk_question"
            :label="t(`${TRANC_PREFIX}.question_ua`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemQuestion.en_question"
            :label="t(`${TRANC_PREFIX}.question_en`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItemQuestion.ge_question"
            :label="t(`${TRANC_PREFIX}.question_ge`)"
        />
        <MyQuillEditor
            class="q-my-xs"
            :title="t(`${TRANC_PREFIX}.answer_ru`)"
            :showUploadImage="true"
            nameRef="ru_answer"
            style="height: 250px"
            v-model:model="editItemQuestion.ru_answer"/>
        <MyQuillEditor
            class="q-my-xs"
            :title="t(`${TRANC_PREFIX}.answer_ua`)"
            :showUploadImage="true"
            nameRef="uk_answer"
            style="height: 250px"
            v-model:model="editItemQuestion.uk_answer"/>
        <MyQuillEditor
            class="q-my-xs"
            :title="t(`${TRANC_PREFIX}.answer_en`)"
            :showUploadImage="true"
            nameRef="en_answer"
            style="height: 250px"
            v-model:model="editItemQuestion.en_answer"/>
        <MyQuillEditor
            class="q-my-xs"
            :title="t(`${TRANC_PREFIX}.answer_ge`)"
            :showUploadImage="true"
            nameRef="ge_answer"
            style="height: 250px"
            v-model:model="editItemQuestion.ge_answer"/>
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