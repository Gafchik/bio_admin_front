<script setup>
import {useAppStore} from "@/store/app-store.js";
const appStore = useAppStore()
const {showInfoMassage} = appStore
const {currentLocale} = storeToRefs(appStore)
import rules from "@/rules/rules.js";
import {DATE_PICKER_LOCALES} from "@/constants/date-picker-locales.js"
import {useI18n} from "vue-i18n";
import {useTreesStore} from "@/store/pages/Trees/trees-store.js";
import {storeToRefs} from "pinia";
import {computed, ref, watch} from "vue";
import {copyObject} from "@/helpers/object-helper.js";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
const {t} = useI18n()
const T_PREFIX = 'pages.trees'
const treesStore = useTreesStore()
const {editTreesDialog,editTreesItem,savePayload} = storeToRefs(treesStore)
const {closeEditTreeDialog,editTreeAsync,getTreesAsync} = treesStore
const {openDialogConfirm} = useDialogConfirmStore()
function closeDialog(){
  closeEditTreeDialog()
}
const DEFAULT_PAYLOAD = {
  id: null,
  owner_mail: null,
  sale_frozen_to: null,
  dividend_frozen_to: null,
}
function onSubmit(){
  openDialogConfirm({
    title: t(`${T_PREFIX}.edit.confirm.title`),
    text: t(`${T_PREFIX}.edit.confirm.text`),
    func: editTreeAsync,
    funcParams: payload.value,
    callbackFunc: (res) => {
      if (!!res) {
        showInfoMassage(t(`${T_PREFIX}.edit.confirm.success`))
        getTreesAsync(savePayload.value)
        closeDialog()
      }
    }
  })
}
const treeEditForm = ref(null)
const payload = ref({})
function setPayload(dialog){
  if (dialog) {
    payload.value = copyObject({
      id: editTreesItem.value.id,
      owner_mail: editTreesItem.value.owner_mail,
      sale_frozen_to: editTreesItem.value.sale_frozen_to,
      dividend_frozen_to: editTreesItem.value.dividend_frozen_to,
    })
  } else {
    payload.value = copyObject(DEFAULT_PAYLOAD)
  }
}
function resetForm(){
  payload.value = copyObject({
    id: editTreesItem.value.id,
    owner_mail: editTreesItem.value.owner_mail,
    sale_frozen_to: editTreesItem.value.sale_frozen_to,
    dividend_frozen_to: editTreesItem.value.dividend_frozen_to,
  })
}
watch(() => editTreesDialog.value, (value) =>  setPayload(value))
</script>

<template>
  <q-dialog v-model="editTreesDialog">
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none" style="height: auto">
        <div class="text-h6">
          {{ t(`${T_PREFIX}.edit.title`, {id: editTreesItem.id}) }}
        </div>
        <q-space/>
        <q-btn
            @click="closeDialog"
            icon="close"
            flat
            color="red"/>
      </q-bar>
      <q-form
          @submit="onSubmit"
          class="q-gutter-md"
          ref="treeEditForm"
      >
        <q-card-section class="q-mt-md justify-center content-center scroll">
          <q-input
              class="q-my-xs"
              filled
              type="text"
              v-model="payload.owner_mail"
              :label="t(`${T_PREFIX}.edit.email`)"
              :rules="[
                  rules.required(t(`${T_PREFIX}.edit.email`)),
                  rules.email(),
              ]"
          />
          <q-input
              class="q-my-xs"
              :label="t(`${T_PREFIX}.edit.sale_frozen_to`)"
              readonly
              filled
              v-model="payload.sale_frozen_to"
              mask="date"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="payload.sale_frozen_to" :locale="DATE_PICKER_LOCALES[currentLocale]">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup
                             icon="done"
                             color="green"
                             flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
              class="q-my-xs"
              :label="t(`${T_PREFIX}.edit.dividend_frozen_to`)"
              readonly
              filled
              v-model="payload.dividend_frozen_to"
              mask="date"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="payload.dividend_frozen_to" :locale="DATE_PICKER_LOCALES[currentLocale]">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup
                             icon="done"
                             color="green"
                             flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
              @click="closeDialog"
              icon="close"
              flat
              color="red"/>
          <q-btn
              @click="resetForm"
              icon="refresh"
              flat
              color="blue"/>
          <q-btn
              icon="done"
              flat
              type="submit"
              color="green"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>