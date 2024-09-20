<script setup>
import {useQuestionStore} from "@/store/pages/Question/question-store.js";
import {useI18n} from "vue-i18n";
import rules from "@/rules/rules.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {useAppStore} from "@/store/app-store.js";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";

const {t} = useI18n()
const {openDialogConfirm} = useDialogConfirmStore()
const T_PREFIX = 'pages.question.answer'
const questionStore = useQuestionStore()
const {closeAnswerDialog, answerQuestionAsync, getQuestionAsync} = questionStore
const {questionIdFromAnswer, answerDialog} = storeToRefs(questionStore)
const appStore = useAppStore()
const {showInfoMassage} = appStore
const answer = ref('')
const answerForm = ref(null)

function closeDialog() {
  closeAnswerDialog()
  answer.value = ''
}

function onSubmit() {
  openDialogConfirm({
    title: t(`${T_PREFIX}.confirm.answer.title`),
    text: t(`${T_PREFIX}.confirm.answer.text`),
    func: answerQuestionAsync,
    funcParams: {
      id: questionIdFromAnswer.value,
      answer: answer.value,
    },
    callbackFunc: (res) => {
      if (!!res) {
        showInfoMassage(t(`${T_PREFIX}.confirm.answer.success`))
        getQuestionAsync()
        closeDialog()
      }
    }
  })
}
</script>

<template>
  <q-dialog v-model="answerDialog" persistent full-width>
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none">
        <div class="text-h6">
          {{ t(`${T_PREFIX}.title`) }}
        </div>
        <q-space/>
        <q-btn
            @click="closeDialog"
            icon="close"
            flat
            color="red"/>
      </q-bar>
      <q-form
              @submit="onSubmit"
              class="q-gutter-md"
              ref="answerForm"
      >
        <q-card-section class="q-mt-md justify-center content-center scroll">
          <div class="q-px-xl">
            <q-input
                type="textarea"
                name="answer"
                v-model="answer"
                :label="t(`${T_PREFIX}.title`)"
                maxlength="500"
                counter
                :rules="[
                  rules.required(t(`${T_PREFIX}.title`))
              ]"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
              @click="closeDialog"
              icon="close"
              flat
              color="red"/>
          <q-btn
              icon="done"
              flat
              type="submit"
              color="green"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>