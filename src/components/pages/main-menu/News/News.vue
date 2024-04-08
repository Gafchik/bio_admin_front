<script setup>
import {computed, ref} from 'vue'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
import {useNewsStore} from "@/store/pages/News/news-store.js";
import EditNewsDialog from "@/components/pages/main-menu/News/EditNewsDialog.vue";
import AddNewsDialog from "@/components/pages/main-menu/News/AddNewsDialog.vue";
const {t} = useI18n()
const newsStore = useNewsStore()
const {getNewsListAsync,editNews,deleteNews,openAddDialog} = newsStore
const {newsItems,allCountNews,isLoanPage} = storeToRefs(newsStore)
const search = ref('')

const pagination = ref({
  rowsPerPage: 10,
  page: 1,
})
const TRANC_PREFIX = 'pages.news'
const appStore = useAppStore()
const {currentLocale,isLoading} = storeToRefs(appStore)
getNewsListAsync(pagination.value.page)
const countPage = computed(() => {
  return parseInt(allCountNews.value / pagination.value.rowsPerPage)+1
})
const columns = computed(() => {return [
  {
    name: 'id_card',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.id`),
    align: 'center',
    field: row => row.id_card,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'image',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.image`),
    align: 'center',
    field: row => row.image,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'view_count',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.view_count`),
    align: 'center',
    field: row => row.view_count,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'date',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.date`),
    align: 'center',
    field: row => row.date,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'short_content',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.short_content`),
    align: 'center',
    field: row => currentLocale.value === 'ru' ? row.short_content_ru : row.short_content_en,
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
function pageBack(scope){
  scope.prevPage()
}
function pageNext(scope){
  const newPage = scope.pagination.page+1;
  if(newPage > isLoanPage.value){
    isLoanPage.value = newPage
    getNewsListAsync(scope.pagination.page+1).then(res => {
      if(res){
        scope.nextPage()
        scope.pagination.page++
      }
    })
  }else{
    scope.nextPage()
  }
}

</script>

<template>
  <div>
    <q-table
        class="q-my-lg"
        :title="t(`${TRANC_PREFIX}.title`)"
        :rows="newsItems"
        :columns="columns"
        row-key="id"
        :filter="search"
        dense
        :grid="$q.platform.is.mobile"
        bordered
        separator="cell"
        virtual-scroll
        :pagination="pagination"
        :rows-per-page-options="[0]"
    >
      <template v-slot:bottom="scope">
        <div class="absolute-bottom-right">
          <q-btn
              icon="chevron_left"
              color="grey-8"
              round
              dense
              flat
              :disable="scope.isFirstPage || isLoading"
              @click="pageBack(scope)"
          ></q-btn>
          <span>{{scope.pagination.page+'/'+countPage}}</span>
          <q-btn
              icon="chevron_right"
              color="grey-8"
              round
              dense
              flat
              :disable="scope.pagination.page === countPage || isLoading"
              @click="pageNext(scope)"
          ></q-btn>
        </div>
      </template>

      <template v-slot:top-right>
        <q-btn
            @click="openAddDialog"
            icon="add"
            flat
            color="blue"/>
        <q-input
            borderless
            dense
            debounce="300"
            v-model="search"
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
          <q-btn flat dense color="blue" icon="edit" @click="editNews(props.row)"/>
          <q-btn flat dense color="red" icon="delete" @click="deleteNews(props.row)"/>
        </q-td>
      </template>
      <template v-slot:body-cell-image="props">
        <q-td>
          <q-img style="width: 200px; height: auto" :src="props.row.image"/>
        </q-td>
      </template>
      <template v-slot:body-cell-short_content="props">
        <q-td>
          <div style="width: 600px; word-wrap: break-word; white-space: normal">
            <span v-html="currentLocale === 'ru' ? props.row.short_content_ru : props.row.short_content_en"></span>
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
                <template v-else-if="col.name === 'image'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-img style="width: 200px; height: auto" :src="props.row.image"/>
                  </q-item-section>
                </template>
                <template v-else-if="col.name === 'action'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat dense color="blue" icon="edit" @click="editNews(props.row)"/>
                    <q-btn flat dense color="red" icon="delete" @click="deleteNews(props.row)"/>
                  </q-item-section>
                </template>
                <template v-else-if="col.name === 'short_content'">
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
    <EditNewsDialog/>
    <AddNewsDialog/>
  </div>
</template>

<style scoped>

</style>