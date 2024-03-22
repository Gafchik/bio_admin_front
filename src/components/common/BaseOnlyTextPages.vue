<script setup>
import DialogConfirm from "@/components/common/DialogConfirm.vue"
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
const {getItemInfoAsync,saveItem} = baseOnlyTextStore
const {item} = storeToRefs(baseOnlyTextStore)
const props = defineProps({
  id: {
    type: Number,
    required: true,
  }
})
getItemInfoAsync(props.id)
const tab = ref(ARRAY_FULL_LOCALE[0])
</script>

<template>
  <div class="q-my-lg" style="width: 90%">
    <div>
      <q-tabs
          v-model="tab"
          :mobile-arrows="$q.platform.is.mobile"
          dense
          align="justify"
      >
        <q-tab v-for="locale in ARRAY_FULL_LOCALE" :name="locale" :label="t(`app.locale.${locale}`)"/>
      </q-tabs>
      <q-tab-panels
          v-model="tab"
          animated
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
      >
        <q-tab-panel v-for="locale in ARRAY_FULL_LOCALE" :name="locale" >
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
    <q-card-actions align="right">
      <q-btn
          icon="save"
          @click="saveItem(props.id)"
          flat
          color="positive"/>
    </q-card-actions>
    <DialogConfirm/>
  </div>
</template>

<style scoped>

</style>
