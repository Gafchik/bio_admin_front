<script setup>
import EditTreesDialog from "@/components/pages/main-menu/Trees/EditTreesDialog.vue"
import {useI18n} from "vue-i18n";
import {useTreesStore} from "@/store/pages/Trees/trees-store.js";
import {storeToRefs} from "pinia";
import { centToDollar } from '@/filters/filters.js';
import {computed, ref} from "vue";
const {t} = useI18n()
const T_PREFIX = 'pages.trees'
const treesStore = useTreesStore()
const {plantingDates,trees} = storeToRefs(treesStore)
const {getPlantingDatesAsync,getTreesAsync,openEditTreeDialog} = treesStore
getPlantingDatesAsync()
const payload = ref({
  plantingDate: null,
  email: '',
  uuid: '',
})
function search(){
  getTreesAsync(payload.value)
}
const searchInTable = ref('')
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
      name: 'uuid',
      required: true,
      label: t(`${T_PREFIX}.table_headers.uuid`),
      align: 'center',
      field: row => row.uuid,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'owner_mail',
      required: true,
      label: t(`${T_PREFIX}.table_headers.owner_mail`),
      align: 'center',
      field: row => row.owner_mail,
      format: val => `${val}`,
      sortable: true
    },{
      name: 'year',
      required: true,
      label: t(`${T_PREFIX}.table_headers.year`),
      align: 'center',
      field: row => row.year,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'season',
      required: true,
      label: t(`${T_PREFIX}.table_headers.season`),
      align: 'center',
      field: row => t(`app.season.${row.season}`),
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'sale_frozen_to',
      required: true,
      label: t(`${T_PREFIX}.table_headers.sale_frozen_to`),
      align: 'center',
      field: row => row.sale_frozen_to,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'dividend_frozen_to',
      required: true,
      label: t(`${T_PREFIX}.table_headers.dividend_frozen_to`),
      align: 'center',
      field: row => row.dividend_frozen_to,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'initial_price',
      required: true,
      label: t(`${T_PREFIX}.table_headers.initial_price`),
      align: 'center',
      field: row => row.initial_price,
      format: val => `${centToDollar(val)} $`,
      sortable: true
    },
    {
      name: 'current_price',
      required: true,
      label: t(`${T_PREFIX}.table_headers.current_price`),
      align: 'center',
      field: row => row.current_price,
      format: val => `${centToDollar(val)} $`,
      sortable: true
    },
    {
      name: 'action',
      required: true,
      align: 'center',
    },
  ]
})
</script>

<template>
<div>
  <div class="row justify-center">
    <q-card flat bordered class="my-card"
            :style="$q.platform.is.desktop ? 'width: 75%;':'width: 100%'">
      <q-card-section>
        <div class="text-h6">{{t(`${T_PREFIX}.title`)}}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="q-mt-sm">
          <q-select
              filled
              v-model="payload.plantingDate"
              :options="plantingDates"
              clearable
              :label="t(`${T_PREFIX}.plantingDate`)" />
        </div>
        <div class="q-mt-sm">
          <q-input
              class="q-my-xs"
              filled
              clearable
              type="text"
              v-model="payload.email"
              :label="t(`${T_PREFIX}.email`)"
          />
        </div>
        <div class="q-mt-sm">
          <q-input
              clearable
              :label="t(`${T_PREFIX}.uuid`)"
              v-model.number="payload.uuid"
              type="text"
              filled
          />
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-actions align="right">
        <q-btn flat icon="search" color="positive" @click="search"/>
      </q-card-actions>
    </q-card>
  </div>
  <div class="q-mt-xs">
    <q-table
        class="q-my-md"
        :rows="trees"
        :columns="columns"
        row-key="name"
        :filter="searchInTable"
        dense
        :grid="$q.platform.is.mobile"
        bordered
        separator="cell"
    >
      <template v-slot:top-left>
        <q-input
            borderless
            dense
            clearable
            debounce="300"
            v-model="searchInTable"
            :placeholder="t(`app.search`)">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td>
          <q-btn
                 flat dense
                 color="blue"
                 icon="edit"
                 @click="openEditTreeDialog(props.row)"/>
        </q-td>
      </template>
      <template v-slot:item="props">
        <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card bordered>
            <q-list dense>
              <q-item v-for="col in props.cols" :key="col.name">
                <template v-if="col.name === 'action'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                        flat dense
                        color="blue"
                        icon="edit"
                        @click="openEditTreeDialog(props.row)"/>
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
  </div>
  <EditTreesDialog/>
</div>
</template>

<style scoped>

</style>