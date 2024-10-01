<script setup>
import {useWithdrawsStore} from "@/store/pages/Withdraws/withdraws-store.js";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
const appStore = useAppStore()
const {showInfoMassage} = appStore
import {computed, ref} from "vue";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const T_PREFIX = 'pages.withdraws.info'
const withdrawStore = useWithdrawsStore()
const {closeWithdrawInfoDialog} = withdrawStore
const {infoWithdrawDialog,infoWithdraw} = storeToRefs(withdrawStore)
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
  ]
})
</script>

<template>
  <q-dialog v-model="infoWithdrawDialog" persistent full-width>
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none">
        <div class="text-h6">
          {{ t(`${T_PREFIX}.title`) }}
        </div>
        <q-space/>
        <q-btn
            @click="closeWithdrawInfoDialog"
            icon="close"
            flat
            color="red"/>
      </q-bar>

        <q-card-section class="q-mt-md justify-center content-center scroll">
          <q-table
              class="q-my-md"
              :rows="infoWithdraw"
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
                        <q-item-section side>

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
              @click="closeWithdrawInfoDialog"
              icon="close"
              flat
              color="red"/>
        </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>