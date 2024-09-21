<script setup>
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import { centToDollar } from '@/filters/filters.js';
import EditWithdrawsDialog from "@/components/pages/main-menu/Withdraws/EditWithdrawsDialog.vue"
import InfoWithdrawsDialog from "@/components/pages/main-menu/Withdraws/InfoWithdrawsDialog.vue"
import {useWithdrawsStore} from "@/store/pages/Withdraws/withdraws-store.js";
import {CONFIRMED, PENDING,CANCELED} from "@/constants/withdraw-statuses.js"
const {t} = useI18n()
const T_PREFIX = 'pages.withdraws'
const withdrawStore = useWithdrawsStore()
const {getWithdrawsAsync,openEditWithdrawDialog,openWithdrawInfoDialogAsync} = withdrawStore
getWithdrawsAsync()
const {withdraws} = storeToRefs(withdrawStore)
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
      name: 'full_name',
      required: true,
      label: t(`${T_PREFIX}.table_headers.full_name`),
      align: 'center',
      field: row => row.full_name,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'account_number',
      required: true,
      label: t(`${T_PREFIX}.table_headers.account_number`),
      align: 'center',
      field: row => row.account_number,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'bank',
      required: true,
      label: t(`${T_PREFIX}.table_headers.bank`),
      align: 'center',
      field: row => row.bank,
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
      name: 'date',
      required: true,
      label: t(`${T_PREFIX}.table_headers.date`),
      align: 'center',
      field: row => row.date,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'type',
      required: true,
      label: t(`${T_PREFIX}.table_headers.type`),
      align: 'center',
      field: row => row.type,
      format: val => t(`${T_PREFIX}.type.${val}`),
      sortable: true
    },
    {
      name: 'amount',
      required: true,
      label: t(`${T_PREFIX}.table_headers.amount`),
      align: 'center',
      field: row => row.amount,
      format: val => `${centToDollar(val)} $`,
      sortable: true
    },
    {
      name: 'status',
      required: true,
      label: t(`${T_PREFIX}.table_headers.status`),
      align: 'center',
      field: row => row.status,
      format: val => t(`app.withdraw_status.${val}`),
      sortable: true
    },
    {
      name: 'action',
      required: true,
      align: 'center',
    },
  ]
})
const searchWithdraws = ref('')
function editStatus(item){
  openEditWithdrawDialog(item)
}
</script>

<template>
  <div>
    <q-table
        class="q-my-md"
        :title="t(`${T_PREFIX}.title`)"
        :rows="withdraws"
        :columns="columns"
        row-key="name"
        :filter="searchWithdraws"
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
            v-model="searchWithdraws"
            :placeholder="t(`app.search`)">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td>
          <q-btn v-if="props.row.status === PENDING"
                 flat
                 dense
                 color="blue"
                 icon="edit"
                 @click="editStatus(props.row)"/>
          <q-btn
                 flat
                 dense
                 color="blue"
                 icon="info"
                 @click="openWithdrawInfoDialogAsync({id:props.row.id})"/>
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
                    <q-btn v-if="props.row.status === PENDING"
                           flat
                           dense
                           color="blue"
                           icon="edit"
                           @click="editStatus(props.row)"/>
                    <q-btn
                        flat
                        dense
                        color="blue"
                        icon="info_i"
                        @click="openWithdrawInfoDialogAsync({id:props.row.id})"/>
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
    <EditWithdrawsDialog/>
    <InfoWithdrawsDialog/>
  </div>
</template>

<style scoped>

</style>