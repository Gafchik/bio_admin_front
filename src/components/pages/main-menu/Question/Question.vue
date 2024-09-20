<script setup>
import {useQuestionStore} from "@/store/pages/Question/question-store.js";
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {useAppStore} from "@/store/app-store.js";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import AnswerDialog from "@/components/pages/main-menu/Question/AnswerDialog.vue"
const {t} = useI18n()
const {openDialogConfirm} = useDialogConfirmStore()
const T_PREFIX = 'pages.question'
const questionStore = useQuestionStore()
const {getQuestionAsync, deleteQuestionAsync,openAnswerDialog} = questionStore
getQuestionAsync()
const {question} = storeToRefs(questionStore)
const searchQuestion = ref('')
const appStore = useAppStore()
const {showInfoMassage} = appStore
const columns = computed(() => {
  return [
    {
      name: 'id',
      required: true,
      label: t(`${T_PREFIX}.table_headers.id`),
      align: 'center',
      field: row => row.id,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'name',
      required: true,
      label: t(`${T_PREFIX}.table_headers.name`),
      align: 'center',
      field: row => row.name,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'email',
      required: true,
      label: t(`${T_PREFIX}.table_headers.email`),
      align: 'center',
      field: row => row.email,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'question',
      required: true,
      label: t(`${T_PREFIX}.table_headers.question`),
      align: 'center',
      field: row => row.question,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'created_at',
      required: true,
      label: t(`${T_PREFIX}.table_headers.created_at`),
      align: 'center',
      field: row => row.created_at,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'answer',
      required: true,
      label: t(`${T_PREFIX}.table_headers.answer`),
      align: 'center',
      field: row => row.answer,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'answered_at',
      required: true,
      label: t(`${T_PREFIX}.table_headers.answered_at`),
      align: 'center',
      field: row => row.answered_at,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'action',
      required: true,
      align: 'center',
    },
  ]
})

function answer(item) {
  openAnswerDialog(item.id)
}

function deleteQuestion(item) {
  openDialogConfirm({
    title: t(`${T_PREFIX}.confirm.delete.title`),
    text: t(`${T_PREFIX}.confirm.delete.text`),
    func: deleteQuestionAsync,
    funcParams: item.id,
    callbackFunc: (res) => {
      if (!!res) {
        showInfoMassage(t(`${T_PREFIX}.confirm.delete.success`))
        getQuestionAsync()
      }
    }
  })
}

</script>

<template>
  <div>
    <q-table
        class="q-my-md"
        :title="t(`${T_PREFIX}.title`)"
        :rows="question"
        :columns="columns"
        row-key="name"
        :filter="searchQuestion"
        dense
        :grid="$q.platform.is.mobile"
        bordered
        separator="cell"
    >
      <template v-slot:top-right>
        <q-input
            borderless
            dense
            debounce="300"
            v-model="searchQuestion"
            :placeholder="t(`app.search`)">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td>
          <q-btn flat dense color="blue" icon="reply" @click="answer(props.row)"/>
          <q-btn flat dense color="red" icon="delete" @click="deleteQuestion(props.row)"/>
        </q-td>
      </template>
      <template v-slot:body-cell-question="props">
        <q-td>
          <div class="question-text">
            {{ props.row.question }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-answer="props">
        <q-td>
          <div class="question-text">
            {{ props.row.answer }}
          </div>
        </q-td>
      </template>
      <template v-slot:item="props">
        <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card bordered>
            <q-list dense>
              <q-item v-for="col in props.cols"
                      :key="col.name">
                <template v-if="col.name === 'action'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat dense color="blue" icon="reply" @click="answer(props.row)"/>
                    <q-btn flat dense color="red" icon="delete" @click="deleteQuestion(props.row)"/>
                  </q-item-section>
                </template>
                <template v-else-if="col.name === 'question'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="q-pl-xl">
                      {{ col.value }}
                    </q-item-label>
                  </q-item-section>
                </template>
                <template v-else-if="col.name === 'answer'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="q-pl-xl">
                      {{ col.value }}
                    </q-item-label>
                  </q-item-section>
                </template>
                <template v-else>
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ col.value }}</q-item-label>
                  </q-item-section>
                </template>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
    <AnswerDialog/>
  </div>
</template>

<style scoped>
.question-text {
  word-wrap: break-word; /* Переносить слова, если они не умещаются */
  word-break: break-all; /* Переносить длинные слова на следующую строку */
  white-space: normal; /* Разрешить перенос текста */
}
</style>