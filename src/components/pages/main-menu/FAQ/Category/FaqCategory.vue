<script setup>
import EditCategoryDialog from "@/components/pages/main-menu/FAQ/Category/EditCategoryDialog.vue"
import AddCategoryDialog from "@/components/pages/main-menu/FAQ/Category/AddCategoryDialog.vue"
import DialogConfirm from "@/components/common/DialogConfirm.vue"
import { useAppStore } from '@/store/app-store.js'
import {computed, ref} from 'vue'
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const faqStore = useFaqStore()
const {getFaq,deleteCategory, editCategory, addCategory} = faqStore
const {category,faq} = storeToRefs(faqStore)
const searchCat = ref('')
const TRANC_PREFIX = 'pages.faq.categories'
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
getFaq();
const category_columns = computed(() => {return [
  {
    name: 'id',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.id`),
    align: 'center',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'label',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.label`),
    align: 'center',
    field: row => currentLocale.value === 'ru' ? row.label_ru : row.label_en,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'position',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.position`),
    align: 'center',
    field: row => row.position,
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
    name: 'created_at',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.created_at`),
    align: 'center',
    field: row => row.created_at,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'updated_at',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.updated_at`),
    align: 'center',
    field: row => row.updated_at,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'action',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.action`),
    align: 'center',
  },
]})
</script>

<template>
  <div>
    <q-table
            class="q-my-md"
            :title="t(`${TRANC_PREFIX}.title`)"
            :rows="category"
            :columns="category_columns"
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
                dense
                color="blue"/>
            <q-input
                borderless
                dense
                debounce="300"
                v-model="searchCat"
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
              <q-btn flat dense color="blue" icon="edit" @click="editCategory(props.row)"/>
              <q-btn flat dense color="red" icon="delete" @click="deleteCategory(props.row)"/>
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