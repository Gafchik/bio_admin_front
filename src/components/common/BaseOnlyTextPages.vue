<script setup>
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import { useI18n } from "vue-i18n";
import {useBaseOnlyTextStore} from "@/store/common/base-only-text-store.js";
import {ref} from "vue";
import {ARRAY_FULL_LOCALE} from "@/constants/locales.js";
import {toolbarOptions} from "@/constants/quill-editor-toolbar.js";
const {t} = useI18n()
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
const baseOnlyTextStore = useBaseOnlyTextStore()
const {getItemInfoAsync,saveItem,saveItemAsync} = baseOnlyTextStore
const {item} = storeToRefs(baseOnlyTextStore)
const props = defineProps({
  TRANC_PREFIX: {
    type: String,
    required: true,
    default: ''
  },
  id: {
    type: Number,
    required: true,
  }
})
getItemInfoAsync(props.id)
const tab = ref(ARRAY_FULL_LOCALE[0])
const splitterModel = ref(20)
</script>

<template>
  <div class="q-my-lg">
    <div v-if="$q.platform.is.desktop">
      <q-tabs
          v-model="tab"
          narrow-indicator
          dense
          align="justify"
      >
        <q-tab v-for="locale in ARRAY_FULL_LOCALE" :name="locale" :label="t(`app.locale.${locale}`)"/>
      </q-tabs>
      <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
      >
        <q-tab-panel v-for="locale in ARRAY_FULL_LOCALE" :name="locale">
          <QuillEditor
              class="q-my-xs"
              style="height: 250px"
              :toolbar="toolbarOptions"
              theme="snow"
              contentType="html"
              v-model:content="item[locale]"  />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div v-else>
      <q-splitter
          v-model="splitterModel"
          style="height: 250px"
      >

        <template v-slot:before>
          <q-tabs
              v-model="tab"
              narrow-indicator
              dense
              align="justify"
          >
            <q-tab v-for="locale in ARRAY_FULL_LOCALE" :name="locale" :label="t(`app.locale.${locale}`)"/>
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
          >
            <q-tab-panel v-for="locale in ARRAY_FULL_LOCALE" :name="locale">
              <QuillEditor
                  class="q-my-xs"
                  style="height: 250px"
                  :toolbar="toolbarOptions"
                  theme="snow"
                  contentType="html"
                  v-model:content="item[locale]"  />
            </q-tab-panel>
          </q-tab-panels>
        </template>

      </q-splitter>
    </div>
  </div>
</template>

<style scoped>

</style>