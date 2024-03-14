<script setup>
import EditCategoryDialog from "@/components/pages/main-menu/FAQ/Category/EditCategoryDialog.vue"
import AddCategoryDialog from "@/components/pages/main-menu/FAQ/Category/AddCategoryDialog.vue"
import DialogConfirm from "@/components/common/DialogConfirm.vue"
import { ref } from 'vue'
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const faqStore = useFaqStore()
const {getFaqQuestion,deleteCategory, editCategory, addCategory} = faqStore
const {question} = storeToRefs(faqStore)
const searchCat = ref('')
const pagination = ref({
  rowsPerPage: 10
})
getFaqQuestion();
const faq_columns = [
  {
    name: 'id',
    required: true,
    label: 'id',
    align: 'center',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'category_name',
    required: true,
    label: 'Название Категории',
    align: 'center',
    field: row => row.category_name,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'question',
    required: true,
    label: 'Вопрос',
    align: 'center',
    field: row => row.question,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'answer',
    required: true,
    label: 'Ответ',
    align: 'center',
    field: row => row.answer,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'position',
    required: true,
    label: 'Позиция',
    align: 'center',
    field: row => row.position,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'status',
    required: true,
    label: 'Статус',
    align: 'center',
    field: row => row.status,
    sortable: false,
  },
  {
    name: 'created_at',
    required: true,
    label: 'Создано',
    align: 'center',
    field: row => row.created_at,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'updated_at',
    required: true,
    label: 'Обновлено',
    align: 'center',
    field: row => row.updated_at,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'action',
    required: true,
    label: 'Действие',
    align: 'center',
  },
]
</script>

<template>
  <div>
    <q-table
        title="FAQ вопросы ответы"
        :rows="question"
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
            @click="addCategory"
            icon="add"
            flat
            color="blue"/>
        <q-input borderless dense debounce="300" v-model="searchCat" placeholder="Поиск">
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
          <q-btn flat dense color="blue" icon="edit" @click="editCategory(props.row)"/>
          <q-btn flat dense color="red" icon="delete" @click="deleteCategory(props.row)"/>
        </q-td>
      </template>
      <template v-slot:body-cell-question="props">
        <q-td>
          <div style="width: 200px; word-wrap: break-word; white-space: normal">
            <span>{{props.row.question}}</span>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-answer="props">
        <q-td>
          <div style="width: 600px; word-wrap: break-word; white-space: normal">
            <span v-html="props.row.answer"></span>
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
                    <q-btn flat dense color="blue" icon="edit" @click="editCategory(props.row)"/>
                    <q-btn flat dense color="red" icon="delete" @click="deleteCategory(props.row)"/>
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
    <EditCategoryDialog/>
    <AddCategoryDialog/>
    <DialogConfirm/>
  </div>
</template>

<style scoped>

</style>