<script setup>
import { useAppStore } from '@/store/app-store.js'
import {computed, ref} from 'vue'

import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {useContactsStore} from "@/store/pages/Contacts/contacts-store.js";
import MyQuillEditor from "@/components/common/MyQuillEditor.vue";
const {t} = useI18n()
const contactsStore = useContactsStore()
const {closeEditItemFn,saveEditItemFn} = contactsStore
const {dic_contacts_type,dic_contacts_social_type,editDialog,editItem} = storeToRefs(contactsStore)

const TRANC_PREFIX = 'pages.contacts.dialog'
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)

</script>

<template>
  <q-dialog v-model="editDialog" maximized>
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none">
        <div class="text-h6">
          {{ t(`${TRANC_PREFIX}.edit_title`)}}
        </div>
        <q-space />
        <q-btn
            @click="closeEditItemFn"
            icon="close"
            flat
            color="red"/>
      </q-bar>
      <q-card-section class="q-mt-md justify-center content-center scroll">
        <q-select
            class="q-mt-lg"
            filled
            emit-value
            map-options
            option-value="id"
            :option-label="currentLocale === 'ru' ? 'name_ru' : 'name_en'"
            :label="t(`${TRANC_PREFIX}.type_select`)"
            v-model="editItem.type"
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
            v-model="editItem.social_type"
            :options="dic_contacts_social_type"
        >
        </q-select>
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItem.email"
            :label="t(`${TRANC_PREFIX}.email`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItem.phone"
            :label="t(`${TRANC_PREFIX}.phone`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItem.url"
            :label="t(`${TRANC_PREFIX}.url`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="number"
            v-model="editItem.position"
            :label="t(`${TRANC_PREFIX}.position`)"
        />
        <q-toggle
            v-model="editItem.status"
            :label="t(`${TRANC_PREFIX}.status`)" />

        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItem.title_ru"
            :label="t(`${TRANC_PREFIX}.title_ru`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItem.title_uk"
            :label="t(`${TRANC_PREFIX}.title_uk`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItem.title_en"
            :label="t(`${TRANC_PREFIX}.title_en`)"
        />
        <q-input
            class="q-my-xs"
            filled
            type="text"
            v-model="editItem.title_ge"
            :label="t(`${TRANC_PREFIX}.title_ge`)"
        />
        <MyQuillEditor
            class="q-my-xs"
            :title="t(`${TRANC_PREFIX}.address_ru`)"
            :showUploadImage="true"
            nameRef="address_ru"
            style="height: 250px"
            v-model:model="editItem.address_ru"/>
        <MyQuillEditor
            class="q-my-xs"
            :title="t(`${TRANC_PREFIX}.address_uk`)"
            :showUploadImage="true"
            nameRef="address_uk"
            style="height: 250px"
            v-model:model="editItem.address_uk"/>
        <MyQuillEditor
            class="q-my-xs"
            :title="t(`${TRANC_PREFIX}.address_en`)"
            :showUploadImage="true"
            nameRef="address_en"
            style="height: 250px"
            v-model:model="editItem.address_en"/>
        <MyQuillEditor
            class="q-my-xs"
            :title="t(`${TRANC_PREFIX}.address_ge`)"
            :showUploadImage="true"
            nameRef="address_ge"
            style="height: 250px"
            v-model:model="editItem.address_ge"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
            @click="closeEditItemFn"
            icon="close"
            flat
            color="red"/>
        <q-btn
            icon="done"
            @click="saveEditItemFn"
            flat
            color="positive"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>