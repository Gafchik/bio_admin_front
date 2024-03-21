<script setup>
import { useAppStore } from '@/store/app-store.js'
import {computed, ref} from 'vue'

import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {useContactsStore} from "@/store/pages/Contacts/contacts-store.js";
import {toolbarOptions} from "@/constants/quill-editor-toolbar.js";
const {t} = useI18n()
const contactsStore = useContactsStore()
const {closeAddItemFn,saveAddItemFn} = contactsStore
const {dic_contacts_type,dic_contacts_social_type,addDialog,addItem} = storeToRefs(contactsStore)

const TRANC_PREFIX = 'pages.contacts.dialog'
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)

</script>

<template>
  <q-dialog v-model="addDialog" maximized>
    <q-card>
      <q-card-section class="bg-indigo-7 row items-center q-pb-none">
        <div class="text-h6">
          {{ t(`${TRANC_PREFIX}.add_title`)}}
        </div>
        <q-space />
        <q-btn
            @click="closeAddItemFn"
            icon="close"
            flat
            color="red"/>
      </q-card-section>
      <q-card-section class="q-mt-md justify-center content-center scroll">
        <q-select
            class="q-mt-lg"
            filled
            emit-value
            map-options
            option-value="id"
            :option-label="currentLocale === 'ru' ? 'name_ru' : 'name_en'"
            :label="t(`${TRANC_PREFIX}.type_select`)"
            v-model="addItem.type"
            :options="dic_contacts_type"
        >
        </q-select>
        <q-select
            class="q-mt-lg"
            filled
            emit-value
            map-options
            clearable
            option-value="social_name"
            :option-label="currentLocale === 'ru' ? 'name_ru' : 'name_en'"
            :label="t(`${TRANC_PREFIX}.social_type_select`)"
            v-model="addItem.social_type"
            :options="dic_contacts_social_type"
        >
        </q-select>
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItem.email"
            :label="t(`${TRANC_PREFIX}.email`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItem.phone"
            :label="t(`${TRANC_PREFIX}.phone`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItem.url"
            :label="t(`${TRANC_PREFIX}.url`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="number"
            v-model="addItem.position"
            :label="t(`${TRANC_PREFIX}.position`)"
        />
        <q-toggle
            v-model="addItem.status"
            :label="t(`${TRANC_PREFIX}.status`)" />

        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItem.title_ru"
            :label="t(`${TRANC_PREFIX}.title_ru`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItem.title_uk"
            :label="t(`${TRANC_PREFIX}.title_uk`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItem.title_en"
            :label="t(`${TRANC_PREFIX}.title_en`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="addItem.title_ge"
            :label="t(`${TRANC_PREFIX}.title_ge`)"
        />
        <div class="text-center">{{t(`${TRANC_PREFIX}.address_ru`)}}</div>
        <QuillEditor
            class="q-my-xs"
            style="height: 250px"
            :toolbar="toolbarOptions"
            theme="snow"
            contentType="html"
            v-model:content="addItem.address_ru"  />
        <div class="text-center">{{t(`${TRANC_PREFIX}.address_uk`)}}</div>
        <QuillEditor
            class="q-my-xs"
            style="height: 250px"
            :toolbar="toolbarOptions"
            theme="snow"
            contentType="html"
            v-model:content="addItem.address_uk"  />
        <div class="text-center">{{t(`${TRANC_PREFIX}.address_en`)}}</div>
        <QuillEditor
            class="q-my-xs"
            style="height: 250px"
            :toolbar="toolbarOptions"
            theme="snow"
            contentType="html"
            v-model:content="addItem.address_en"  />
        <div class="text-center">{{t(`${TRANC_PREFIX}.address_ge`)}}</div>
        <QuillEditor
            class="q-my-xs"
            style="height: 250px"
            :toolbar="toolbarOptions"
            theme="snow"
            contentType="html"
            v-model:content="addItem.address_ge"  />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
            @click="closeAddItemFn"
            icon="close"
            flat
            color="red"/>
        <q-btn
            icon="done"
            @click="saveAddItemFn"
            flat
            color="positive"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>