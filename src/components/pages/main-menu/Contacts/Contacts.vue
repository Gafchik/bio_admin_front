<script setup>
import DialogConfirm from "@/components/common/DialogConfirm.vue"
import EditContactsDialog from "@/components/pages/main-menu/Contacts/EditContactsDialog.vue"
import AddContactsDialog from "@/components/pages/main-menu/Contacts/AddContactsDialog.vue"
import { useAppStore } from '@/store/app-store.js'
import {computed, ref} from 'vue'

import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {useContactsStore} from "@/store/pages/Contacts/contacts-store.js";
const {t} = useI18n()
const contactsStore = useContactsStore()
const {getContactsInfoAsync,addItemFn, editItemFn, deleteItemFn} = contactsStore
const {contacts,dic_contacts_type,dic_contacts_social_type} = storeToRefs(contactsStore)

const TRANC_PREFIX = 'pages.contacts'
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
getContactsInfoAsync()
const search = ref('')
const pagination = ref({
  rowsPerPage: 10
})

const columns = computed(() => {return [
  {
    name: 'id',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.id`),
    align: 'center',
    field: row =>row.id,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'type',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.type`),
    align: 'center',
    field: row =>{
      let res = dic_contacts_type.value.find(i => i.id === row.type)
      return !!res
          ? currentLocale.value === 'ru' ? res.name_ru : res.name_en
          : row.type
    } ,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'social_type',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.social_type`),
    align: 'center',
    field: row =>{
      let res = dic_contacts_social_type.value.find(i => i.social_name === row.social_type)
      return !!res
          ? currentLocale.value === 'ru' ? res.name_ru : res.name_en
          : row.social_type
    } ,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'title',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.title`),
    align: 'center',
    field: row => currentLocale.value === 'ru' ? row.title_ru : row.title_en,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'address',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.address`),
    align: 'center',
    field: row => currentLocale.value === 'ru' ? row.address_ru : row.address_en,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'email',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.email`),
    align: 'center',
    field: row =>row.email,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'phone',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.phone`),
    align: 'center',
    field: row =>row.phone,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'url',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.url`),
    align: 'center',
    field: row =>row.url,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'position',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.position`),
    align: 'center',
    field: row =>row.position,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'status',
    required: true,
    label: t(`${TRANC_PREFIX}.table_headers.status`),
    align: 'center',
    field: row =>row.status,
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
import {CKEditorConfig} from "@/modules/sk-editor-5-config.js";
const model = ref('')

</script>

<template>
<div>
  <ckeditor :editor="CKEditorConfig" v-model="model" ></ckeditor>
  <q-table
      class="q-my-lg"
      :title="t(`${TRANC_PREFIX}.title`)"
      :rows="contacts"
      :columns="columns"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      row-key="name"
      :filter="search"
      dense
      :grid="$q.platform.is.mobile"
      bordered
      separator="cell"
  >
    <template v-slot:top-right>
      <q-btn
          @click="addItemFn"
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
        <q-btn flat dense color="blue" icon="edit" @click="editItemFn(props.row)"/>
        <q-btn flat dense color="red" icon="delete" @click="deleteItemFn(props.row)"/>
      </q-td>
    </template>
    <template v-slot:body-cell-address="props">
      <q-td>
        <div style="width: 200px; word-wrap: break-word; white-space: normal">
          <span v-html="currentLocale === 'ru' ? props.row.address_ru : props.row.address_en "/>
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-url="props">
      <q-td>
        <div style="width: 200px; word-break: break-all; white-space: normal">
          <a :href="props.row.url">{{props.row.url}}</a>
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
            <q-item v-for="col in props.cols" :key="col.name">
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
                  <q-btn flat dense color="blue" icon="edit" @click="editItemFn(props.row)"/>
                  <q-btn flat dense color="red" icon="delete" @click="deleteItemFn(props.row)"/>
                </q-item-section>
              </template>
              <template v-else-if="col.name === 'address'">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div style="width: 150px; word-wrap: break-word; white-space: normal;" class="text-right">
                    <span v-html="col.value"/>
                  </div>
                </q-item-section>
              </template>
              <template v-else-if="col.name === 'url'">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div style="width: 200px; word-break: break-all; white-space: normal;" class="text-right">
                    <a :href="col.value">{{col.value}}</a>
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
  <EditContactsDialog/>
  <AddContactsDialog/>
  <DialogConfirm/>
</div>
</template>

<style scoped>

</style>