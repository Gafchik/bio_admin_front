<script setup>
import {computed, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
import {useGalleryStore} from "@/store/pages/Gallery/gallery-store.js";
const galleryStore = useGalleryStore()
const {getAlbums,editAlbum, deleteAlbum,openAddDialog} = galleryStore
const {albums} = storeToRefs(galleryStore)
const {t} = useI18n()
const search = ref('')
const pagination = ref({
  rowsPerPage: 10,
})
const TRANC_PREFIX = 'pages.gallery'
const appStore = useAppStore()
const {currentLocale, isLoading} = storeToRefs(appStore)
getAlbums()
const columns = computed(() => {
  return [
    {
      name: 'id_album',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.id`),
      align: 'center',
      field: row => row.id_album,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'name',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.name`),
      align: 'center',
      field: row => currentLocale.value === 'ru' ? row.name_ru : row.name_en,
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
  ]
})

</script>

<template>
  <q-table
      class="q-my-lg"
      :title="t(`${TRANC_PREFIX}.title`)"
      :rows="albums"
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
          <q-icon name="search"/>
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-name="props">
      <q-td>
        <span v-html="currentLocale === 'ru' ? props.row.name_ru : props.row.name_en"></span>
      </q-td>
    </template>
    <template v-slot:body-cell-status="props">
      <q-td>
        <q-icon v-if="!!props.row.status" name="done" color="green"/>
        <q-icon v-else name="close" color="red"/>
      </q-td>
    </template>
    <template v-slot:body-cell-action="props">
      <q-td>
        <q-btn flat dense color="blue" icon="edit" @click="editAlbum(props.row)"/>
        <q-btn flat dense color="red" icon="delete" @click="deleteAlbum(props.row)"/>
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
                  <q-btn flat dense color="blue" icon="edit" @click="editAlbum(props.row)"/>
                  <q-btn flat dense color="red" icon="delete" @click="deleteAlbum(props.row)"/>
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
</template>

<style scoped>

</style>