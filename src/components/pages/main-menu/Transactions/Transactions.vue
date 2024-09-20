<script setup>
import moment from "moment";
import TransactionsDetailsDialog from "@/components/pages/main-menu/Transactions/TransactionsDetailsDialog.vue";
import ChartTransactions from "@/components/pages/main-menu/Transactions/ChartTransactions.vue";
import {useTransactionsStore} from "@/store/pages/Transactions/transactions-store.js";
import {DATE_PICKER_LOCALES} from "@/constants/date-picker-locales.js"
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const T_PREFIX = 'pages.transactions'
const transactionsStore = useTransactionsStore()
const {getTypesAsync, getStatusesAsync,searchAsync,downloadAsync,openDetailDialog,openChartDialog} = transactionsStore
const appStore = useAppStore()
const {showInfoMassage} = appStore
const {currentLocale} = storeToRefs(appStore)
const {types, statuses,transaction} = storeToRefs(transactionsStore)
function dateOptions(date) {
  let today = moment().format('YYYY-MM-DD')
  return moment(date).isSameOrBefore(today)
}
getTypesAsync()
getStatusesAsync()
const payload = ref({
  dateFromTo: [],
  type: null,
  statuses: null,
  email: null,
  id: null,
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
      name: 'phone',
      required: true,
      label: t(`${T_PREFIX}.table_headers.phone`),
      align: 'center',
      field: row => row.phone,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'type',
      required: true,
      label: t(`${T_PREFIX}.table_headers.type`),
      align: 'center',
      field: row => row.type,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'status',
      required: true,
      label: t(`${T_PREFIX}.table_headers.status`),
      align: 'center',
      field: row => row.status,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'tree_count',
      required: true,
      label: t(`${T_PREFIX}.table_headers.tree_count`),
      align: 'center',
      field: row => row.tree_count,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'total',
      required: true,
      label: t(`${T_PREFIX}.table_headers.total`),
      align: 'center',
      field: row => row.total,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'amount',
      required: true,
      label: t(`${T_PREFIX}.table_headers.amount`),
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
    },
    {
      name: 'promocode',
      required: true,
      label: t(`${T_PREFIX}.table_headers.promocode`),
      align: 'center',
      field: row => row.promocode,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'exchange_currency',
      required: true,
      label: t(`${T_PREFIX}.table_headers.exchange_currency`),
      align: 'center',
      field: row => row.exchange_currency,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'exchange_rate',
      required: true,
      label: t(`${T_PREFIX}.table_headers.exchange_rate`),
      align: 'center',
      field: row => row.exchange_rate,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'payment_system',
      required: true,
      label: t(`${T_PREFIX}.table_headers.payment_system`),
      align: 'center',
      field: row => row.payment_system,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'action',
      align: 'center',
      format: val => `${val}`,
      sortable: false
    },
  ]
})
function download(item){
    downloadAsync(item.id)
}
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
            <q-select
                filled
                v-model="payload.type"
                :options="types"
                emit-value
                map-options
                clearable
                option-value="id"
                :option-label="currentLocale === 'ru' ? 'name_rus' : 'name_eng'"
                :label="t(`${T_PREFIX}.type`)" />
          </div>
          <div class="q-mt-sm">
            <q-select
                filled
                v-model="payload.statuses"
                :options="statuses"
                emit-value
                map-options
                clearable
                option-value="id"
                :option-label="currentLocale === 'ru' ? 'name_rus' : 'name_eng'"
                :label="t(`${T_PREFIX}.statuses`)" />
          </div>
          <div class="q-mt-sm">
            <q-input
                class="q-my-xs"
                filled
                clearable
                type="text"
                v-model="payload.email"
                label="Email"
            />
          </div>
          <div class="q-mt-sm">
            <q-input
                clearable
                :label="t(`${T_PREFIX}.t_id`)"
                v-model.number="payload.id"
                type="number"
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
          :rows="transaction"
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
              debounce="300"
              v-model="searchInTable"
              :placeholder="t(`app.search`)">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-right>
          <q-btn
              flat
              dense
              color="blue"
              icon="bar_chart"
              @click="openChartDialog()"/>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td>
            <q-btn v-if="props.row.type_id === 0 && props.row.status_id === 1"
                   flat dense
                   color="blue"
                   icon="download"
                   @click="download(props.row)"/>
          </q-td>
        </template>
        <template v-slot:body-cell-id="props">
          <q-td>
            <a v-if="!!props.row.has_details" href="#" @click.prevent="openDetailDialog(props.row.id)">{{props.row.id}}</a>
            <span v-else>{{props.row.id}}</span>
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
                      <q-btn v-if="props.row.type_id === 0 && props.row.status_id === 1"
                             flat
                             dense
                             color="blue"
                             icon="download"
                             @click="download(props.row)"/>
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
    <TransactionsDetailsDialog/>
    <ChartTransactions/>
  </div>

</template>

<style scoped>

</style>