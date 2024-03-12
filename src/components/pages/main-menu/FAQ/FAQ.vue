<script setup>
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const faqStore = useFaqStore()
const {getFaq} = faqStore
const {faqData} = storeToRefs(faqStore)
getFaq();
const columns = [
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
    name: 'position',
    required: true,
    label: 'Позиция',
    align: 'center',
    field: row => row.position,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'category',
    required: true,
    label: 'Категории',
    align: 'center',
    field: row => row.name,
    sortable: false
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
]
function changeCategoryTans(locale,value){
  alert(locale,value)
}
</script>

<template>
  <q-table
      class="q-my-md"
      title="FAQ"
      :rows="faqData"
      :columns="columns"
      row-key="name"
      hide-bottom
      dense
      bordered
      separator="cell"
  >
    <template v-slot:body-cell-category="props">
        <q-tr v-for="trans in props.row.trans"
              :props="props"
              :key="trans.id">
          <q-td>
            <q-tr>{{'Локаль: '+ trans.locale}}</q-tr>
            <q-tr>
              {{'Перевод: '}}
              <span v-if="!!trans.name">{{trans.name}}</span>
              <b class="text-red" v-else>Нет перевода</b>
              <q-popup-edit v-model="trans.name" v-slot="scope" class="row">
                <q-input lable="Перевод" v-model="scope.value" autofocus />
                <q-btn flat color="positive" icon="done" @click="changeCategoryTans(trans.locale,scope.value)" />
              </q-popup-edit>
            </q-tr>
          </q-td>
        </q-tr>

    </template>
  </q-table>
</template>

<style scoped>

</style>