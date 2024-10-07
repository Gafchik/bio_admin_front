<script setup>
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
import {computed, ref, watch} from "vue";
import {copyObject} from "@/helpers/object-helper.js"
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
const {openDialogConfirm} = useDialogConfirmStore()
import {useUsersStore} from "@/store/pages/Users/users-store.js";
import rules from "@/rules/rules.js";
import {useAppStore} from "@/store/app-store.js";
import {useRolesStore} from "@/store/pages/Roles/roles-store.js";
const usersStore = useUsersStore()
const {closeEditDialog,editPersonalDataAsync,getUsersAsync,editRolesAsync} = usersStore
const {userEditDialog,editUserData} = storeToRefs(usersStore)
const {t} = useI18n()
const T_PREFIX = 'pages.users'
const userEditForm = ref(null)
const appStore = useAppStore()
const {showInfoMassage} = appStore
const rolesStore = useRolesStore()
const {roles} = storeToRefs(rolesStore)

function closeDialog(){
  closeEditDialog()
}
function onSubmit(){
  if(tabModel.value === 'personal'){
    onSubmitFromPersonal()
  }
  if(tabModel.value === 'roles'){
    onSubmitFromRoles()
  }
}
function onSubmitFromRoles(){
  let payloadRoles = []
  let currenUserRolesIds = editUserData.value.roles.map(role => role.id)
  roles.value.forEach(role => {
    if(currenUserRolesIds.includes(role.id)){
      if(!formField.value.roles[role.id]){
        payloadRoles.push({
          id: role.id,
          action: 'delete',
        })
      }
    }else{
      if(!!formField.value.roles[role.id]){
        payloadRoles.push({
          id: role.id,
          action: 'add',
        })
      }
    }
  })
  if(!!payloadRoles.length){
    openDialogConfirm({
      title: t(`${T_PREFIX}.confirm.edit.roles.title`),
      text: t(`${T_PREFIX}.confirm.edit.roles.text`),
      func: editRolesAsync,
      funcParams: {
        id: editUserData.value.id,
        roles: payloadRoles,
      },
      callbackFunc: (res) => {
        if (!!res) {
          showInfoMassage(t(`${T_PREFIX}.confirm.edit.roles.success`))
          getUsersAsync()
          closeDialog()
        }
      }
    })
  }else{
    showInfoMassage(t(`${T_PREFIX}.edit.no_change`))
  }

}
function onSubmitFromPersonal(){
  openDialogConfirm({
    title: t(`${T_PREFIX}.confirm.edit.personal.title`),
    text: t(`${T_PREFIX}.confirm.edit.personal.text`),
    func: editPersonalDataAsync,
    funcParams: {
      id: editUserData.value.id,
      first_name: formField.value.first_name,
      last_name: formField.value.last_name,
      email: formField.value.email,
      phone: formField.value.phone,
      gender: formField.value.gender,
      newPassword: formField.value.newPassword,
      is_active: formField.value.is_active,
    },
    callbackFunc: (res) => {
      if (!!res) {
        showInfoMassage(t(`${T_PREFIX}.confirm.edit.personal.success`))
        getUsersAsync()
        closeDialog()
      }
    }
  })
}
const formField = ref({})
function setFormField(dialog){
  if(dialog){
    let roleForm = {}
    let allRoleIds = roles.value.map(role => role.id)
    editUserData.value.roles.forEach((userRole) => {
      if(allRoleIds.includes(userRole.id)){
        roleForm[userRole.id] = true
      }
    })
    allRoleIds.forEach(roleId => {
      if(!roleForm.hasOwnProperty(roleId)){
        roleForm[roleId] = false
      }
    })

    formField.value = copyObject({...editUserData.value,newPassword:'',roles:roleForm})
  }else{
    formField.value = {}
  }
}
const tabModel = ref('personal')
const genders = computed(() => {
  return [
    {
      text: t(`app.gender.male`),
      value: 'male',
    },
    {
      text: t(`app.gender.female`),
      value: 'female',
    },
  ]
})
const activationArray = computed(() => {
  return [
    {
      text: t(`app.yes`),
      value: 1,
    },
    {
      text: t(`app.no`),
      value: 0,
    },
  ]
})
watch(() => userEditDialog.value, (value) =>  setFormField(value))
const test = ref(true)
</script>

<template>
  <q-dialog v-model="userEditDialog" maximized>
    <q-card>
      <q-bar class="bg-indigo-7 row items-center q-pb-none" style="height: auto">
        <div class="text-h6">
          {{ t(`${T_PREFIX}.edit.title`, {email: editUserData.email}) }}
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
          ref="userEditForm"
      >
        <q-card-section class="q-mt-md justify-center content-center scroll">
          <q-tabs
              v-model="tabModel"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              mobile-arrows
              outside-arrows
          >
            <q-tab name="personal" :label="t(`${T_PREFIX}.edit.tabs_name.personal`)" />
            <q-tab name="settings" :label="t(`${T_PREFIX}.edit.tabs_name.settings`)" />
            <q-tab name="roles" :label="t(`${T_PREFIX}.edit.tabs_name.roles`)" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tabModel" animated>
            <q-tab-panel name="personal">
              <q-input
                  filled
                  type="text"
                  v-model="formField.first_name"
                  :label="t(`${T_PREFIX}.edit.first_name`)"
                  lazy-rules
                  :rules="[
                    rules.required(t(`${T_PREFIX}.edit.first_name`))
                  ]"
              />
              <q-input
                  filled
                  type="text"
                  v-model="formField.last_name"
                  :label="t(`${T_PREFIX}.edit.last_name`)"
                  lazy-rules
                  :rules="[
                    rules.required(t(`${T_PREFIX}.edit.last_name`))
                  ]"
              />
              <q-input
                  filled
                  type="email"
                  v-model="formField.email"
                  :label="t(`${T_PREFIX}.edit.email`)"
                  lazy-rules
                  :rules="[
                    rules.required(t(`${T_PREFIX}.edit.email`)),
                    rules.email(),
                  ]"
              />
              <q-input
                  filled
                  type="text"
                  v-model="formField.phone"
                  :label="t(`${T_PREFIX}.edit.phone`)"
                  lazy-rules
                  :rules="[
                    rules.required(t(`${T_PREFIX}.edit.phone`))
                  ]"
              />
              <q-select
                  filled
                  emit-value
                  map-options
                  option-value="value"
                  option-label="text"
                  :label="t(`${T_PREFIX}.edit.gender`)"
                  v-model="formField.gender"
                  :options="genders"
              />
              <q-select
                  class="q-mt-lg"
                  filled
                  emit-value
                  map-options
                  option-value="value"
                  option-label="text"
                  :label="t(`${T_PREFIX}.edit.is_active`)"
                  v-model="formField.is_active"
                  :options="activationArray"
              />
              <q-input
                  class="q-mt-lg"
                  filled
                  v-model="formField.newPassword"
                  :label="t(`${T_PREFIX}.edit.newPassword`)"
                  type="password"
                  counter
              />
            </q-tab-panel>
            <q-tab-panel name="settings">
<!--              TODO work with settings-->
              <div class="text-h6">settings</div>
              settings
            </q-tab-panel>
            <q-tab-panel name="roles">
              <div v-for="role in roles">
                <q-checkbox v-model="formField.roles[role.id]" :label="role.name" />
              </div>
            </q-tab-panel>
          </q-tab-panels>
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