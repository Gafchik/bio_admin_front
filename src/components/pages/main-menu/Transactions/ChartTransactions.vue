<script setup>
import {useTransactionsStore} from "@/store/pages/Transactions/transactions-store.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import moment from "moment";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const T_PREFIX = 'pages.transactions.chart'
const transactionsStore = useTransactionsStore()
const {closeChartDialog} = transactionsStore
const appStore = useAppStore()
const {showInfoMassage} = appStore
const {currentLocale} = storeToRefs(appStore)
const {chartDialog,transaction,savePayload} = storeToRefs(transactionsStore)
const dateFormat = computed(() => {
  if (savePayload.value.dateFromTo && savePayload.value.dateFromTo.from && savePayload.value.dateFromTo.to) {
    const fromDate = moment(savePayload.value.dateFromTo.from, 'YYYY/MM/DD');
    const toDate = moment(savePayload.value.dateFromTo.to, 'YYYY/MM/DD');

    // Вычисляем разницу в месяцах между двумя датами
    const diffInMonths = toDate.diff(fromDate, 'months', true); // true для дробной разницы

    // Возвращаем формат даты на основе разницы
    return diffInMonths < 2 ? 'YYYY-MM-DD' : 'YYYY-MM';
  }

  // Если дат нет, возвращаем пустую строку или другой стандартный формат
  return 'YYYY-MM';
})
const x_os = computed(() => {
  return Array.from(
      new Set(
          transaction.value.map(t => moment(t.created_at).format(dateFormat.value))
      )
  ).sort((a, b) => moment(a, dateFormat.value).diff(moment(b, dateFormat.value)));
});
const options = computed(() => {
  return {
    chart: {
      id: 'vuechart-example'
    },
    xaxis: {
      categories: x_os.value,
    }
  }
})
const series = computed(() => {
  let res = [];

  // Получаем уникальные типы транзакций
  const uniqueTypes = [...new Set(transaction.value.map(t => t.type))];

  uniqueTypes.forEach(type => {
    let dateRes = [];

    x_os.value.forEach(date => {
      // Считаем количество транзакций по типу и дате
      let count = transaction.value.filter(
          i => i.type === type && date === moment(i.created_at).format(dateFormat.value)
      ).length;

      dateRes.push(count);
    });

    // Добавляем данные для каждого типа
    res.push({
      name: type,
      data: dateRes, // Исправлено с 'date' на 'data'
    });
  });

  return res;
});

</script>

<template>
  <q-dialog v-model="chartDialog" maximized>
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none">
        <div class="text-h6">
          {{ t(`${T_PREFIX}.title`)}}
        </div>
        <q-space />
        <q-btn
            @click="closeChartDialog"
            icon="close"
            flat
            color="red"/>
      </q-bar>
      <q-card-section class="q-mt-md justify-center content-center scroll">
        <apexchart height="500" type="line" :options="options" :series="series"></apexchart>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
            @click="closeChartDialog"
            icon="close"
            flat
            color="red"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>