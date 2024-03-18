<script setup>
import EditQuestionDialog from "@/components/pages/main-menu/FAQ/Question/EditQuestionDialog.vue"
import AddQuestionDialog from "@/components/pages/main-menu/FAQ/Question/AddQuestionDialog.vue"
import DialogConfirm from "@/components/common/DialogConfirm.vue"
import {computed, ref} from 'vue'
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const faqStore = useFaqStore()
const {getFaq,deleteQuestion, editQuestion, addQuestion} = faqStore
const {question,category} = storeToRefs(faqStore)
const searchCat = ref('')
const categoryModel = ref(null)
const pagination = ref({
  rowsPerPage: 10
})
const TRANC_PREFIX = 'pages.faq.question'
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
getFaq();
const faq_columns = computed(() => {return [
  {
    name: 'id',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.id`),
    align: 'center',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'category_name',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.category_name`),
    align: 'center',
    field: row => currentLocale.value === 'ru' ? row.category_name_ru : row.category_name_en,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'question',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.question`),
    align: 'center',
    field: row => currentLocale.value === 'ru' ? row.question_ru : row.question_en,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'answer',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.answer`),
    align: 'center',
    field: row => currentLocale.value === 'ru' ? row.answer_ru : row.answer_en,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'position',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.position`),
    align: 'center',
    field: row => row.position,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'status',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.status`),
    align: 'center',
    field: row => row.status,
    sortable: false
  },
  {
    name: 'action',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.action`),
    align: 'center',
  },
]})
const filterQuestion = computed(() => {
  return !!categoryModel.value
      ? question.value.filter(i => i.faq_category_id === categoryModel.value.id)
      : question.value
})
</script>

<template>
  <div>
      <q-select
          class="q-my-lg"
          :style="$q.platform.is.mobile ? 'margin-inline: 10%' : 'margin-inline: 40%'"
          clearable
          filled
          option-value="id"
          :option-label="currentLocale === 'ru' ? 'label_ru' : 'label_en'"
          :label="t(`${TRANC_PREFIX}.category_select`)"
          v-model="categoryModel"
          :options="category"
      >
      </q-select>
    <q-table
        :title="t(`${TRANC_PREFIX}.title`)"
        :rows="filterQuestion"
        :columns="faq_columns"
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        row-key="name"
        :filter="searchCat"
        dense
        :grid="$q.platform.is.mobile"
        bordered
        separator="cell"
    >
      <template v-slot:top-right>
        <q-btn
            @click="addQuestion"
            icon="add"
            flat
            color="blue"/>
        <q-input
            borderless
            dense
            debounce="300"
            v-model="searchCat"
            :placeholder="t(`app.search`)">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td>
          <q-icon v-if="!!props.row.status" name="done" color="green"/>
          <q-icon v-else name="close" color="red"/>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td>
          <q-btn flat dense color="blue" icon="edit" @click="editQuestion(props.row)"/>
          <q-btn flat dense color="red" icon="delete" @click="deleteQuestion(props.row)"/>
        </q-td>
      </template>
      <template v-slot:body-cell-question="props">
        <q-td>
          <div style="width: 200px; word-wrap: break-word; white-space: normal">
            <span>{{currentLocale === 'ru' ? props.row.question_ru : props.row.question_en}}</span>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-answer="props">
        <q-td>
          <div style="width: 600px; word-wrap: break-word; white-space: normal">
            <span v-html="currentLocale === 'ru' ? props.row.answer_ru : props.row.answer_en"></span>
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
                <template v-if="col.name === 'status'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon v-if="!!col.value" name="done" color="green"/>
                    <q-icon v-else name="close" color="red"/>
                  </q-item-section>
                </template>
                <template v-else-if="col.name === 'action'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat dense color="blue" icon="edit" @click="editQuestion(props.row)"/>
                    <q-btn flat dense color="red" icon="delete" @click="deleteQuestion(props.row)"/>
                  </q-item-section>
                </template>
                <template v-else-if="col.name === 'question'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <div style="width: 200px; word-wrap: break-word; white-space: normal;" class="text-right">
                      <span>{{col.value}}</span>
                    </div>
                  </q-item-section>
                </template>
                <template v-else-if="col.name === 'answer'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <div style="width: 200px; word-wrap: break-word; white-space: normal;" class="text-right">
                      <span v-html="col.value"></span>
                    </div>
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
    <EditQuestionDialog/>
    <AddQuestionDialog/>
    <DialogConfirm/>
  </div>
</template>

<style scoped>

</style>