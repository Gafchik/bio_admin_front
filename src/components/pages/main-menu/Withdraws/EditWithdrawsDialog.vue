<script setup>
import {CONFIRMED, PENDING,CANCELED} from "@/constants/withdraw-statuses.js"
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useWithdrawsStore} from "@/store/pages/Withdraws/withdraws-store.js";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
const appStore = useAppStore()
const {showInfoMassage} = appStore
import {ref} from "vue";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const {openDialogConfirm} = useDialogConfirmStore()
const T_PREFIX = 'pages.withdraws'
const withdrawStore = useWithdrawsStore()
const {getWithdrawsAsync,closeEditWithdrawDialog,editWithdrawStatusAsync} = withdrawStore
const {editWithdrawDialog,editWithdrawItem} = storeToRefs(withdrawStore)
const statuses = [
  {
    value: CONFIRMED,
    text: t(`app.withdraw_status.${CONFIRMED}`)
  },
  {
    value: CANCELED,
    text: t(`app.withdraw_status.${CANCELED}`)
  }
]
const withdrawEditForm = ref(null)
const status = ref(CONFIRMED)
function closeDialog(){
  closeEditWithdrawDialog()
  status.value = CONFIRMED
}
function onSubmit(){
  openDialogConfirm({
    title: t(`${T_PREFIX}.confirm.title`),
    text: t(`${T_PREFIX}.confirm.text`),
    func: editWithdrawStatusAsync,
    funcParams: {
      id: editWithdrawItem.value.id,
      status: status.value,
    },
    callbackFunc: (res) => {
      if (!!res) {
        showInfoMassage(t(`${T_PREFIX}.confirm.success`))
        getWithdrawsAsync()
        closeDialog()
      }
    }
  })
}
</script>

<template>
  <q-dialog v-model="editWithdrawDialog" persistent>
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none">
        <div class="text-h6">
          {{ t(`${T_PREFIX}.edit.title`) }}
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
          ref="withdrawEditForm"
      >
        <q-card-section class="q-mt-md justify-center content-center scroll">
          <div class="q-px-xl">
            <q-select
                class="q-mt-lg"
                filled
                emit-value
                map-options
                option-value="value"
                option-label="text"
                :label="t(`${T_PREFIX}.edit.status`)"
                v-model="status"
                :options="statuses"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
              @click="closeDialog"
              icon="close"
              flat
              color="red"/>
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