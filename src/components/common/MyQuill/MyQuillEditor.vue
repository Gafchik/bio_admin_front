<script setup>
import {useMyQuillStore} from "@/store/common/my-quill-store.js";
import {useAppStore} from "@/store/app-store.js";
import {ref} from "vue";
import { removeQueryParams } from '@/filters/filters.js';
import {Quill, QuillEditor} from '@vueup/vue-quill'
const appStore = useAppStore()
const quillStore = useMyQuillStore()
const {openImageDialog} = quillStore
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
const {t} = useI18n()
const Block = Quill.import('blots/block');
Block.tagName = 'DIV';
Quill.register(Block, true);
const model = defineModel('model', { type: String, default: ''})
const prop = defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
  showUploadImage: {
    type: Boolean,
    required: true,
    default: false
  },
  nameRef:{
    type: String,
    required: true,
  },
  style:{
    type: String,
    default: 'height: 250px'
  }
})
const quillRef = ref(null);
const visible = ref(true);
import { EventBus } from 'quasar'
const event = new EventBus()
event.on('readyImage'+prop.nameRef, (imageObject,rangeIndex,quillInstance) => {
  const url = import.meta.env.VITE_BASE_FILE_URL;
  imageObject.path = removeQueryParams(imageObject.path)
  quillInstance.deleteText(rangeIndex, 1);
  quillInstance.insertEmbed(rangeIndex, 'image', url+imageObject.path);
  if(!!imageObject.width){
    quillInstance.formatText(rangeIndex, 1, 'height ', 'auto');
    quillInstance.formatText(rangeIndex, 1, 'width', imageObject.width+'px');
  }
  quillInstance.setSelection(rangeIndex +1)
  visible.value = !visible.value
  setTimeout(() => {
    visible.value = !visible.value
  }, 10);
})
function quill_img_handler() {
  const cursor = quillRef.value.getSelection();
  const rangeIndex = cursor ? cursor.index : 0
  openImageDialog(event,prop.nameRef,rangeIndex,quillRef.value)

  // const url = import.meta.env.VITE_BASE_FILE_URL;
  // const path = removeQueryParams(prompt(t('app.imagePath')))
  // if (path) {
  //   const range = quillRef.value.getSelection();
  //   const rangeIndex = range ? range.index : 0
  //   quillRef.value.insertEmbed(rangeIndex, 'image', url+path);
  //   quillRef.value.setSelection(rangeIndex + 1);
  // }
}

function onQuillReady(quillInstance) {
  quillRef.value = quillInstance;
}
function test(){
  console.log(model.value)
}
</script>

<template>
  <div>
    <div v-if="!!title.length" class="text-center">{{t(title)}}</div>
    <QuillEditor
        v-if="visible"
        class="q-my-xs"
        :style="style"
        theme="snow"
        contentType="html"
        :toolbar="`#${nameRef}`"
        @ready="onQuillReady"
        v-model:content="model">
      <template #toolbar>
        <div :id="nameRef">
          <!-- Основные кнопки Quill -->
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
          <button class="ql-strike"></button>
          <button class="ql-blockquote"></button>
          <button class="ql-code-block"></button>
          <button class="ql-link"></button>
          <!--        <button @click="quill_img_handler" class="ql-image"></button>-->
          <button v-show="showUploadImage" class="ql-custom-button" @click="quill_img_handler">
            <i class="fa-regular fa-image"></i>
          </button>
          <button class="ql-video"></button>
          <button class="ql-formula"></button>
          <button class="ql-clean"></button>

          <!-- Дополнительные кнопки из toolbarOptions -->
          <button class="ql-header" value="1"></button>
          <button class="ql-header" value="2"></button>
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
          <button class="ql-list" value="check"></button>
          <button class="ql-script" value="sub"></button>
          <button class="ql-script" value="super"></button>
          <button class="ql-indent" value="-1"></button>
          <button class="ql-indent" value="+1"></button>
          <button class="ql-direction" value="rtl"></button>
          <select class="ql-size">
            <option value="small"></option>
            <option value="false"></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
          <select class="ql-header">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option value="false"></option>
          </select>
          <select class="ql-color"></select>
          <select class="ql-background"></select>
          <select class="ql-font"></select>
          <select class="ql-align"></select>

        </div>
      </template>
    </QuillEditor>
<!--    <q-btn @click="test">test</q-btn>-->
  </div>
</template>

<style scoped>

</style>