<script setup>
import {useAppStore} from "@/store/app-store.js";
import {onMounted, ref, toRef, toRefs} from "vue";
import { removeSpaces, removeQueryParams } from '@/filters/filters.js';
import {Quill, QuillEditor} from '@vueup/vue-quill'
const appStore = useAppStore()
const {openElFinderDialog} = appStore
import {useI18n} from "vue-i18n";
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

function quill_img_handler() {
  const url = import.meta.env.VITE_BASE_FILE_URL+'/';
  // const path = prompt(t('app.imagePath'));
  const path = removeSpaces(removeQueryParams(prompt(t('app.imagePath'))))
  alert(path)
  if (path) {
    const range = quillRef.value.getSelection();
    const rangeIndex = range ? range.index : 0
    quillRef.value.insertEmbed(rangeIndex, 'image', url+path);
    quillRef.value.setSelection(rangeIndex + 1);
  }
}
function onQuillReady(quillInstance) {
  quillRef.value = quillInstance;
}
function showFileDialog() {
  openElFinderDialog()
}
function test(){
  console.log(model.value)
}
</script>

<template>
  <div v-if="!!title.length" class="text-center">{{t(title)}}</div>
  <QuillEditor
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

        <!-- Кнопка для вызова диалога -->
        <button class="ql-custom-button" @click="showFileDialog">
          <i class="fas fa-folder-open"></i>
        </button>
      </div>
    </template>
  </QuillEditor>
<!--  <q-btn @click="test">test</q-btn>-->
</template>

<style scoped>

</style>