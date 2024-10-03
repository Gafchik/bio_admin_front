<script setup>
import {useTransactionsStore} from "@/store/pages/Transactions/transactions-store.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const T_PREFIX = 'pages.transactions.detail'
const transactionsStore = useTransactionsStore()
const {closeDialog} = transactionsStore
const appStore = useAppStore()
const {showInfoMassage} = appStore
const {currentLocale} = storeToRefs(appStore)
const {detailDialog,detailTransaction} = storeToRefs(transactionsStore)
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
      name: 'from_user',
      required: true,
      label: t(`${T_PREFIX}.table_headers.from_user`),
      align: 'center',
      field: row => row.from_first_name +' ' +row.from_last_name,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'to_user',
      required: true,
      label: t(`${T_PREFIX}.table_headers.to_user`),
      field: row => row.to_first_name +' ' +row.to_last_name,
      align: 'center',
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'data',
      required: true,
      label: t(`${T_PREFIX}.table_headers.data`),
      align: 'center',
      field: row => row.data,
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
  ]
})
const searchInTable = ref('')
</script>

<template>
  <q-dialog v-model="detailDialog" maximized>
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none">
        <div class="text-h6">
          {{ t(`${T_PREFIX}.title`)}}
        </div>
        <q-space />
        <q-btn
            @click="closeDialog"
            icon="close"
            flat
            color="red"/>
      </q-bar>
      <q-card-section class="q-mt-md justify-center content-center scroll">
        <q-table
            class="q-my-md"
            :rows="detailTransaction"
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
          <template v-slot:body-cell-data="props">
            <q-td class="text-center">
              <template  v-for="(value,key) in props.row.data">
                <span>{{value}},</span>
                <br v-if="(key+1) % 5 === 0 && key !== 0">
              </template>
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
                    <template v-if="col.name === 'data'">
                      <q-item-section>
                        <q-item-label>{{ col.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label caption>
                          <template  v-for="(value,key) in props.row.data">
                            <span>{{value}},</span>
                            <br v-if="(key+1) % 5 === 0 && key !== 0">
                          </template>
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
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
            @click="closeDialog"
            icon="close"
            flat
            color="red"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>