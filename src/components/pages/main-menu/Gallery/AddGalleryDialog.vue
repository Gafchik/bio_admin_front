<script setup>
import {storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
import {ARRAY_FULL_LOCALE, ARRAY_LOCALE} from "@/constants/locales.js";
import {computed, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import {useGalleryStore} from "@/store/pages/Gallery/gallery-store.js";

const {t} = useI18n()

const galleryStore = useGalleryStore()
const {addItem,addDialog} = storeToRefs(galleryStore)
const {closeAddDialog,saveAddItem} = galleryStore
const appStore = useAppStore()
const {currentLocale, isLoading} = storeToRefs(appStore)
const {openElFinderDialog} = appStore
const TRANC_PREFIX = 'pages.gallery'
const BASE_SETTING = 'base_setting'
const tab = ref('base_setting')
const tabs = [BASE_SETTING, ...ARRAY_FULL_LOCALE]
const VITE_BASE_FILE_URL = import.meta.env.VITE_BASE_FILE_URL
const emptyAlbumItem = {
  id: 0,
  video: null,
  image: '/',
  status: true,
  position: 0,
  lang: null
}
function changePreview(name, value) {
  if(!!value){
    if (!value.startsWith('/')) {
      addItem.value[name] = '/' + value;
    }
  }
}
function changePreviewArrays(index,value){
  if(!!value){
    if (!value.startsWith('/')) {
      addItem.value.items[index].image = '/' + value;
    }
  }
}
const disableSubmit = computed(() => {
  let allFieldEmpty = true
  let field = addItem.value.is_image ? 'image' : 'video'
  addItem.value.items.forEach(i => {
    if(i[field] !== '' && i[field] !== '/' && !!i[field]){
      allFieldEmpty = false
    }
  })
  return !addItem.value.name_ru
      || !addItem.value.name_en
      || !addItem.value.name_ge
      || !addItem.value.name_uk
      || (addItem.value.category_image === '/' || addItem.value.category_image === '' || !addItem.value.category_image)
      || allFieldEmpty
})
watch(
    () => addItem.value.category_image,
    (newValue, oldValue) => changePreview('category_image',newValue),
);
watch(
    () => addItem.value.items,
    (newValue, oldValue) => {
      newValue.forEach(i => {
        let index = addItem.value.items.indexOf(i)
        changePreviewArrays(index,i.image)
      })
    },
    {
      deep: true,
    }
);
function deleteItemFromAlbum(item){
  let index = addItem.value.items.indexOf(item)
  addItem.value.items.splice(index, 1);
}
function addAlbumItem(){
  addItem.value.items.push({...emptyAlbumItem})
}
function changeAlbumType(){
  addItem.value.items = [{...emptyAlbumItem}]
}
</script>

<template>
  <q-dialog v-model="addDialog" maximized>
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none">
        <div class="text-h6">
          {{ t(`${TRANC_PREFIX}.dialog.add_title`) }}
        </div>
        <q-space/>
        <q-btn
            @click="closeAddDialog"
            icon="close"
            flat
            color="red"/>
      </q-bar>
      <q-card-section class="q-mt-md justify-center content-center scroll">
        <div v-show="disableSubmit" class="justify-center content-center text-center text-red">
          <b>{{ t(`${TRANC_PREFIX}.not_valid`) }}</b>
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
            <div v-show="tabPanel !== BASE_SETTING">
              <q-input
                  filled
                  :rules="[val => !!val || t('app.required')]"
                  v-model="addItem['name_'+tabPanel]"
                  :label="t(`${TRANC_PREFIX}.album_name`)"/>
            </div>
            <div v-show="tabPanel === BASE_SETTING">
              <div class="text-center">
                <q-img fit="fill" style="width: 50%; height: auto" :src="VITE_BASE_FILE_URL+addItem.category_image"/>
              </div>
              <q-input
                  filled
                  class="q-my-lg"
                  v-model="addItem.category_image"
                  :rules="[val => val !== '/' || t('app.required')]"
                  :label="t(`${TRANC_PREFIX}.album_image`)"
              >
                <template v-slot:append>
                  <q-icon name="folder_open" @click="openElFinderDialog"/>
                </template>
              </q-input>
              <q-toggle
                  v-model="addItem.status"
                  :label="t(`${TRANC_PREFIX}.album_status`)"/>
              <q-toggle @update:model-value="changeAlbumType"
                        v-model="addItem.is_image"
                        :label="t(`${TRANC_PREFIX}.${addItem.is_image ? 'is_image' : 'is_video'}`)"/>
              <div class="text-center">{{t(`${TRANC_PREFIX}.items`)}}</div>
              <q-separator />
              <div v-for="item in addItem.items">
                <div class="row justify-between" v-if="addItem.is_image">
                  <div :style="$q.platform.is.desktop ?'width: 70%;': 'width: 70%;'" class="row justify-between items-center">
                    <q-input
                        filled
                        :style="$q.platform.is.desktop ? 'width: 70%;' : 'width: 90%'"
                        v-model="item.image"
                        :label="t(`${TRANC_PREFIX}.image`)"
                    >
                      <template v-slot:append>
                        <q-icon name="folder_open" @click="openElFinderDialog"/>
                      </template>
                    </q-input>
                    <div class="row justify-between">
                      <q-toggle
                          v-model="item.status"
                          :label="t(`${TRANC_PREFIX}.status`)"/>
                      <q-btn
                          v-show="addItem.items.length > 1"
                          @click="deleteItemFromAlbum(item)"
                          icon="delete"
                          flat
                          color="red"/>
                      <q-btn
                          v-show="addItem.items.indexOf(item) === addItem.items.length-1"
                          @click="addAlbumItem"
                          icon="add"
                          flat
                          color="green"/>
                    </div>

                  </div>
                  <q-img
                      loading="lazy"
                      fit="fill"
                      :style="$q.platform.is.desktop ?'width: 10%; height: auto' : 'width: 30%; height: auto'"
                      :src="VITE_BASE_FILE_URL+item.image"/>
                </div>

                <div class="row justify-between" v-if="!addItem.is_image">
                  <div class="full-width row wrap justify-between items-center content-center">
                    <q-input
                        filled

                        :style="$q.platform.is.desktop ? 'width: 70%;' : 'width: 100%;'"
                        v-model="item.video"
                        :label="t(`${TRANC_PREFIX}.video`)"
                    />
                    <q-select
                        :style="$q.platform.is.desktop ? 'width: 15%;' : 'width: 40%;'"
                        :class="$q.platform.is.desktop ? 'q-pa-md' : 'q-py-md'"
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        standout
                        clearable
                        bottom-slots
                        filled
                        v-model="item.lang"
                        :options="ARRAY_LOCALE"
                    >
                      <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps" class="justify-center">
                          <span>{{t(`app.locale.${scope.opt}`)}}</span>
                        </q-item>
                      </template>
                      <template v-slot:selected>
                        <q-item v-if="$q.platform.is.desktop">
                          <span v-if="!item.lang">{{t(`${TRANC_PREFIX}.empty_lang`)}}</span>
                          <span v-else>{{t(`app.locale.${item.lang}`)}}</span>
                        </q-item>
                        <q-item v-else>
                          <span v-if="!item.lang">{{t(`${TRANC_PREFIX}.empty_lang`)}}</span>
                          <span v-else>{{item.lang}}</span>
                        </q-item>
                      </template>
                    </q-select>
                    <div class="row justify-between">
                      <q-toggle
                          v-model="item.status"
                          :label="t(`${TRANC_PREFIX}.status`)"/>
                      <q-btn
                          v-show="addItem.items.length > 1"
                          @click="deleteItemFromAlbum(item)"
                          icon="delete"
                          class="q-pa-none q-mx-md"
                          flat
                          color="red"/>
                      <q-btn
                          class="q-pa-none"
                          v-show="addItem.items.indexOf(item) === addItem.items.length-1"
                          @click="addAlbumItem"
                          icon="add"
                          flat
                          color="green"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
            @click="closeAddDialog"
            icon="close"
            flat
            color="red"/>
        <q-btn
            :disable="disableSubmit"
            icon="done"
            @click="saveAddItem"
            flat
            color="positive"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>