<script setup>
import { ref, computed} from 'vue'
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
import MyQuillEditor from "@/components/common/MyQuillEditor.vue";
const {t} = useI18n()
const faqStore = useFaqStore()
const {saveAddQuestion,closeAddQuestionDialog} = faqStore
const {addQuestionDialog,addItemQuestion,category} = storeToRefs(faqStore)
const code = ref('')
const disableSubmit = computed(() => {
  return !addItemQuestion.value.position.toString()
      || !addItemQuestion.value.faq_category_id
      || !addItemQuestion.value.ru_question.length
      || !addItemQuestion.value.uk_question.length
      || !addItemQuestion.value.en_question.length
      || !addItemQuestion.value.ge_question.length
      || !addItemQuestion.value.ru_answer.length
      || !addItemQuestion.value.uk_answer.length
      || !addItemQuestion.value.en_answer.length
      || !addItemQuestion.value.ge_answer.length
})
const TRANC_PREFIX = 'pages.faq.question.dialog'
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
</script>

<template>
  <q-dialog v-model="addQuestionDialog" maximized>
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none">
        <div class="text-h6">
          {{ t(`${TRANC_PREFIX}.add_title`)}}
        </div>
        <q-space />
        <q-btn
            @click="closeAddQuestionDialog"
            icon="close"
            flat
            color="red"/>
      </q-bar>
      <div v-show="disableSubmit" class="justify-center content-center text-center text-red">
        <b>{{t(`${TRANC_PREFIX}.not_valid`)}}</b>
      </div>
      <q-card-section class="q-mt-md justify-center content-center scroll" >
        <q-select
            class="q-mt-lg"
            filled
            emit-value
            map-options
            option-value="id"
            :option-label="currentLocale === 'ru' ? 'label_ru' : 'label_en'"
            :label="t(`${TRANC_PREFIX}.category_select`)"
            v-model="addItemQuestion.faq_category_id"
            :options="category"
        >
        </q-select>
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItemQuestion.position"
            :label="t(`${TRANC_PREFIX}.position`)"
        />
        <q-toggle
            v-model="addItemQuestion.status"
            :label="t(`${TRANC_PREFIX}.status`)" />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItemQuestion.ru_question"
            :label="t(`${TRANC_PREFIX}.question_ru`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItemQuestion.uk_question"
            :label="t(`${TRANC_PREFIX}.question_ua`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItemQuestion.en_question"
            :label="t(`${TRANC_PREFIX}.question_en`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItemQuestion.ge_question"
            :label="t(`${TRANC_PREFIX}.question_ge`)"
        />
        <MyQuillEditor
            class="q-my-xs"
            :title="t(`${TRANC_PREFIX}.answer_ru`)"
            :showUploadImage="true"
            nameRef="ru_answer"
            style="height: 250px"
            v-model:model="addItemQuestion.ru_answer"/>
        <MyQuillEditor
            class="q-my-xs"
            :title="t(`${TRANC_PREFIX}.answer_ua`)"
            :showUploadImage="true"
            nameRef="uk_answer"
            style="height: 250px"
            v-model:model="addItemQuestion.uk_answer"/>
        <MyQuillEditor
            class="q-my-xs"
            :title="t(`${TRANC_PREFIX}.answer_en`)"
            :showUploadImage="true"
            nameRef="en_answer"
            style="height: 250px"
            v-model:model="addItemQuestion.en_answer"/>
        <MyQuillEditor
            class="q-my-xs"
            :title="t(`${TRANC_PREFIX}.answer_ge`)"
            :showUploadImage="true"
            nameRef="ge_answer"
            style="height: 250px"
            v-model:model="addItemQuestion.ge_answer"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
            @click="closeAddQuestionDialog"
            icon="close"
            flat
            color="red"/>
        <q-btn
            :disable="disableSubmit"
            icon="done"
            @click="saveAddQuestion"
            flat
            color="positive"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>