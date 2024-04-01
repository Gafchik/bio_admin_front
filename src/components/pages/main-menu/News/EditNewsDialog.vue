<script setup>
import MyQuillEditor from "@/components/common/MyQuillEditor.vue";
import { removeSpaces, removeQueryParams } from '@/filters/filters.js';
import {useNewsStore} from "@/store/pages/News/news-store.js";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
import {ARRAY_FULL_LOCALE} from "@/constants/locales.js";
import {computed, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const newsStore = useNewsStore()
const {closeEditDialog,saveEditItem} = newsStore
const {editDialog,editItem,previewImg} = storeToRefs(newsStore)
const appStore = useAppStore()
const {currentLocale,isLoading} = storeToRefs(appStore)
const {openElFinderDialog} = appStore
const TRANC_PREFIX = 'pages.news.dialog'
const BASE_SETTING = 'base_setting'
const tab = ref('base_setting')
const tabs = [BASE_SETTING,...ARRAY_FULL_LOCALE]
const VITE_BASE_FILE_URL = import.meta.env.VITE_BASE_FILE_URL

function changePreview(path){
  if(path[0] === '/'){
    previewImg.value = VITE_BASE_FILE_URL+path
    editItem.value.imagePath = path
  }else{
    previewImg.value = VITE_BASE_FILE_URL+'/'+path
    editItem.value.imagePath = '/'+path
  }
}

const disableSubmit = computed(() => {
  return !editItem.value.imagePath || !editItem.value.date
})
</script>

<template>
  <q-dialog v-model="editDialog" maximized>
    <q-card>
      <q-card-section class="bg-indigo-7 row items-center q-pb-none">
        <div class="text-h6">
          {{ t(`${TRANC_PREFIX}.edit_title`)}}
        </div>
        <q-space />
        <q-btn
            @click="closeEditDialog"
            icon="close"
            flat
            color="red"/>
      </q-card-section>
      <q-card-section class="q-mt-md justify-center content-center scroll">
        <div v-show="disableSubmit" class="justify-center content-center text-center text-red">
          <b>{{t(`${TRANC_PREFIX}.not_valid`)}}</b>
        </div>
        <q-tabs
            v-model="tab"
            :mobile-arrows="$q.platform.is.mobile"
            dense
            align="justify"
        >
          <q-tab v-for="tabItem in tabs" :name="tabItem" :label="t(`app.locale.${tabItem}`)"/>
        </q-tabs>
        <q-tab-panels
            v-model="tab"
            animated
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
        >
          <q-tab-panel v-for="tabPanel in tabs" :name="tabPanel">
            <div v-show="tabPanel === BASE_SETTING">
              <div class="text-center">
                <q-img style="width: 50%; height: auto" :src="previewImg"/>
              </div>
              <q-input
                  filled
                  class="q-my-lg"
                  v-model="editItem.imagePath"
                  :rules="[val => !!val || t('app.required')]"
                  :label="t(`${TRANC_PREFIX}.image`)"
                  @update:model-value="changePreview">
                <template v-slot:append>
                  <q-icon name="folder_open" @click="openElFinderDialog"/>
                </template>
              </q-input>
              <q-input
                  filled
                  class="q-my-lg"
                  v-model="editItem.date"
                  mask="date"
                  :rules="[val => !!val || t('app.required')]"
                  :label="t(`${TRANC_PREFIX}.date`)">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="editItem.date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup icon="close" color="red" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-toggle
                  v-model="editItem.status"
                  :label="t(`${TRANC_PREFIX}.status`)" />
            </div>
            <div v-show="tabPanel !== BASE_SETTING">
              <q-input filled v-model="editItem['name_'+tabPanel]" :label="t(`${TRANC_PREFIX}.name`)"/>
              <MyQuillEditor
                  class="q-my-xs"
                  :title="t(`${TRANC_PREFIX}.short_content`)"
                  :nameRef="'short_content'+tabPanel"
                  :showUploadImage="true"
                  :style="$q.platform.is.mobile ? 'height: 250px' : 'height: 300px'"
                  v-model:model="editItem['short_content_'+tabPanel]"/>
              <MyQuillEditor
                  class="q-my-xs"
                  :title="t(`${TRANC_PREFIX}.content`)"
                  :nameRef="'content_'+tabPanel"
                  :showUploadImage="true"
                  :style="$q.platform.is.mobile ? 'height: 250px' : 'height: 380px'"
                  v-model:model="editItem['content_'+tabPanel]"/>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
            @click="closeEditDialog"
            icon="close"
            flat
            color="red"/>
        <q-btn
            :disable="disableSubmit"
            icon="done"
            @click="saveEditItem"
            flat
            color="positive"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>