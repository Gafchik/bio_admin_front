<script setup>
import moment from "moment";
import {useTreestoreStore} from "@/store/pages/TreeStore/treestore-store.js";
import {DATE_PICKER_LOCALES} from "@/constants/date-picker-locales.js"
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const T_PREFIX = 'pages.treestore'
const treestoreStore = useTreestoreStore()
const {searchAsync,openDetailDialog} = treestoreStore
const appStore = useAppStore()
const {showInfoMassage} = appStore
const {currentLocale} = storeToRefs(appStore)
const {treestore} = storeToRefs(treestoreStore)
function dateOptions(date) {
  let today = moment().format('YYYY-MM-DD')
  return moment(date).isSameOrBefore(today)
}
const payload = ref({
  dateFromTo: [],
  year: null,
  email: null
})
const searchInTable = ref('')
function search(){
  searchAsync(payload.value)
}
function clearDate(){
  payload.value.dateFromTo = []
}
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
      name: 'created_at',
      required: true,
      label: t(`${T_PREFIX}.table_headers.created_at`),
      align: 'center',
      field: row => row.created_at,
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
      name: 'tree_id',
      required: true,
      label: t(`${T_PREFIX}.table_headers.tree_id`),
      align: 'center',
      field: row => row.uuid,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'price',
      required: true,
      label: t(`${T_PREFIX}.table_headers.price`),
      align: 'center',
      field: row => row.amount,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'commission',
      required: true,
      label: t(`${T_PREFIX}.table_headers.commission`),
      align: 'center',
      field: row => row.commission,
      format: val => `${val}`,
      sortable: true
    }
  ]
})

</script>

<template>
  <div>
    <div class="row justify-center">
      <q-card flat bordered class="my-card" style="width: 75%">
        <q-card-section>
          <div class="text-h6">{{t(`${T_PREFIX}.title`)}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row justify-between">
            <q-input readonly :label="t(`app.date.from`)" filled v-model="payload.dateFromTo.from" mask="date"/>
            <q-input readonly :label="t(`app.date.to`)" filled v-model="payload.dateFromTo.to" mask="date"/>
            <q-btn icon="event" round color="primary">
              <q-popup-proxy  cover transition-show="scale" transition-hide="scale">
                <q-date
                    v-model="payload.dateFromTo"
                    :locale="DATE_PICKER_LOCALES[currentLocale]"
                    :options="dateOptions"
                    range>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup icon="refresh" color="res" flat @click="clearDate" />
                    <q-btn v-close-popup icon="done" color="green" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>
          </div>

          <div class="q-mt-sm">
            <q-input
                class="q-my-xs"
                filled
                clearable
                type="number"
                v-model="payload.year"
                :option-label="currentLocale === 'ru' ? 'name_rus' : 'name_eng'"
                :label="t(`${T_PREFIX}.year`)"
            />
          </div>
          <div class="q-mt-sm">
            <q-input
                class="q-my-xs"
                filled
                clearable
                type="text"
                v-model="payload.email"
                :option-label="currentLocale === 'ru' ? 'name_rus' : 'name_eng'"
                label="Email"
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
          :rows="treestore"
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

                  </template>
                  <template v-else-if="col.name === 'id'">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <a v-if="!!props.row.has_details" href="#" @click.prevent="openDetailDialog(col.value)">{{col.value}}</a>
                      <q-item-label v-else caption>{{ col.value }}</q-item-label>
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
  </div>

</template>

<style scoped>

</style>