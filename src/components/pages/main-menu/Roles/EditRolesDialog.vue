<script setup>
import {useI18n} from "vue-i18n";
import {useRolesStore} from "@/store/pages/Roles/roles-store.js";
import {storeToRefs} from "pinia";
import {computed, ref, watch} from "vue";
import {DEFAULT_ROLE_ITEM} from "@/constants/roles-fields.js"
import {copyObject} from "@/helpers/object-helper.js"
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const T_PREFIX = 'pages.roles'
const rolesStore = useRolesStore()
const {editRolesDialog, editRolesItem} = storeToRefs(rolesStore)
const {closeEditRolesDialog,editRolesAsync,getRolesAsync} = rolesStore
const rolesEditForm = ref(null)
const {openDialogConfirm} = useDialogConfirmStore()
const appStore = useAppStore()
const {showInfoMassage} = appStore
function closeDialog() {
  closeEditRolesDialog()
}

const permissions = ref({})
function onSubmit() {
  openDialogConfirm({
    title: t(`${T_PREFIX}.edit.confirm.title`),
    text: t(`${T_PREFIX}.edit.confirm.text`),
    func: editRolesAsync,
    funcParams: {
      id: editRolesItem.value.id,
      permission: JSON.stringify(preparePayloadPermission({...permissions.value}))
    },
    callbackFunc: (res) => {
      if (!!res) {
        showInfoMassage(t(`${T_PREFIX}.edit.confirm.success`))
        getRolesAsync()
        closeDialog()
      }
    }
  })
}
function preparePayloadPermission(obj, parent = '', res = {}) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const propName = parent ? `${parent}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        preparePayloadPermission(obj[key], propName, res);
      } else {
        res[propName] = obj[key];
      }
    }
  }
  return res;
}
function groupPermissions(obj) {
  let grouped = {};
  Object.keys(obj).forEach((key) => {
    const [category, action] = key.split('.');
    if (!grouped[category]) {
      grouped[category] = {};
    }
    if (action === undefined) {
      grouped[category] = obj[key];
    } else {
      grouped[category][action] = obj[key];
    }
  });
  return grouped;
}
function resetForm(){
  setPermission(editRolesDialog.value)
}
function setPermission(dialog){
  if (dialog && !!editRolesItem.value.permissions) {
    let obj = {...JSON.parse(editRolesItem.value.permissions)}
    permissions.value = groupPermissions(obj)
  } else {
    permissions.value = copyObject(DEFAULT_ROLE_ITEM)
  }
}
watch(() => editRolesDialog.value, (value) =>  setPermission(value))
</script>

<template>
  <q-dialog v-model="editRolesDialog"
            persistent
            :full-height="$q.platform.is.desktop"
            :maximized="$q.platform.is.mobile"
  >
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none">
        <div class="text-h6">
          {{ t(`${T_PREFIX}.edit.title`, {name: editRolesItem.name}) }}
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
          ref="rolesEditForm"
      >
        <q-card-section class="q-mt-md justify-center content-center scroll">
          <template v-for="(actions, category) in permissions" :key="category" >
            <div v-if="typeof actions === 'boolean'" class="row justify-center text-center">
              <q-toggle
                  v-model="permissions[category]"
                  color="green"
                  :label="category"
                  left-label
                  unchecked-icon="clear"
                  checked-icon="check"
              />
            </div>
            <q-expansion-item v-else
              expand-separator
              :label="category"
              default-opened
            >
              <template v-slot:header>
                <q-item-section class="text-center text-h6">
                 {{category}}
                </q-item-section>
              </template>
              <q-card>
                <q-card-section class="row justify-center text-center">
                  <template v-if="typeof actions === 'object'">
                    <q-toggle v-for="(value, action) in actions" :key="action"
                              v-model="permissions[category][action]"
                              color="green"
                              :label="action"
                              left-label
                              unchecked-icon="clear"
                              checked-icon="check"
                    />
                  </template>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </template>
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