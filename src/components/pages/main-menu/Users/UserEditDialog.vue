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
const {closeEditDialog,editPersonalDataAsync,getUsersAsync,editRolesAsync,editSettingDataAsync} = usersStore
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
  if(tabModel.value === 'settings'){
    onSubmitSettingRoles()
  }
}
function onSubmitSettingRoles(){
  openDialogConfirm({
    title: t(`${T_PREFIX}.confirm.edit.setting.title`),
    text: t(`${T_PREFIX}.confirm.edit.setting.text`),
    func: editSettingDataAsync,
    funcParams: {
      id: editUserData.value.id,
      live_wallet_balance : formField.value.live_wallet_balance,
      bonus_wallet_balance : formField.value.bonus_wallet_balance,
      futures_wallet_balance : formField.value.futures_wallet_balance,
      promocode : formField.value.promocode,
      promocode_discount : formField.value.promocode_discount,
      promocode_bonus : formField.value.promocode_bonus,
      promocode_wallet : formField.value.promocode_wallet,
      promocode_multiple : formField.value.promocode_multiple,
      promocode_area : formField.value.promocode_area,
      promocode_tree_min : formField.value.promocode_tree_min,
      promocode_tree_max : formField.value.promocode_tree_max,
      max_number_trees_for_sale : formField.value.max_number_trees_for_sale,
      shop_commission : formField.value.shop_commission,
      gift_commission : formField.value.gift_commission,
      shop_commission_first_sale : formField.value.shop_commission_first_sale,
      shop_commission_gift_sale : formField.value.shop_commission_gift_sale,
    },
    callbackFunc: (res) => {
      if (!!res) {
        showInfoMassage(t(`${T_PREFIX}.confirm.edit.setting.success`))
        getUsersAsync()
        closeDialog()
      }
    }
  })
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
const INT_SETTINGS_KEYS = [
  'live_wallet_balance',
  'bonus_wallet_balance',
  'futures_wallet_balance',
  'promocode_tree_min',
  'promocode_tree_max',
  'max_number_trees_for_sale',
  'shop_commission',
  'gift_commission',
  'shop_commission_first_sale',
  'shop_commission_gift_sale',
]
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

    let walletForm = {}
    editUserData.value.wallets.forEach(w => {
      if(w.type === null){
        walletForm.live_wallet_balance = w.balance
      }else if(w.type === 'bonus'){
        walletForm.bonus_wallet_balance = w.balance

      }else if(w.type === 'futures'){
        walletForm.futures_wallet_balance = w.balance
      }
    })
    let intSettingsValue = {}
    INT_SETTINGS_KEYS.forEach(key => {

    })
    formField.value = copyObject({
      ...editUserData.value,
      newPassword: '',
      roles:roleForm,
      ...walletForm,
      promocode_area: JSON.parse(editUserData.value.promocode_area),
      promocode_multiple: !!editUserData.value.promocode_multiple,
    })
  }else{
    formField.value = {}
  }
}
const PROMOCODE_WALLETS = [
    'main',
    'bonus',
]
const PROMOCODE_AREA = [
  {
    value:'firstsale_buy',
    text: t(`app.promo_area.firstsale_buy`)
  },
  {
    value:'express_buy',
    text: t(`app.promo_area.express_buy`)
  },
  {
    value:'express_gift',
    text: t(`app.promo_area.express_gift`)
  },
]
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
              <q-input
                  clearable
                  class="input-number-arrow"
                  :label="t(`${T_PREFIX}.edit.balance`)"
                  :hint="t(`${T_PREFIX}.edit.wallet_hint`)"
                  v-model.number="formField.live_wallet_balance"
                  type="number"
                  filled
                  lazy-rules
                  :rules="[
                    rules.requiredWith0(t(`${T_PREFIX}.edit.balance`)),
                     rules.numericMoreOrEqual(t(`${T_PREFIX}.edit.balance`),0)
                  ]"
              />
              <q-input
                  clearable
                  class="input-number-arrow"
                  :label="t(`${T_PREFIX}.edit.bonus`)"
                  :hint="t(`${T_PREFIX}.edit.wallet_hint`)"
                  v-model.number="formField.bonus_wallet_balance"
                  type="number"
                  filled
                  lazy-rules
                  :rules="[
                    rules.requiredWith0(t(`${T_PREFIX}.edit.bonus`)),
                    rules.numericMoreOrEqual(t(`${T_PREFIX}.edit.bonus`),0)
                  ]"
              />
              <q-input
                  clearable
                  class="input-number-arrow"
                  :label="t(`${T_PREFIX}.edit.futures`)"
                  :hint="t(`${T_PREFIX}.edit.wallet_hint`)"
                  v-model.number="formField.futures_wallet_balance"
                  type="number"
                  filled
                  lazy-rules
                  :rules="[
                    rules.requiredWith0(t(`${T_PREFIX}.edit.futures`)),
                    rules.numericMoreOrEqual(t(`${T_PREFIX}.edit.futures`),0)
                  ]"
              />
              <q-input
                  class="q-mt-lg"
                  filled
                  type="text"
                  v-model="formField.promocode"
                  :label="t(`${T_PREFIX}.edit.promocode`)"
              />
              <q-input
                  class="q-mt-lg"
                  filled
                  type="text"
                  v-model="formField.promocode_discount"
                  :label="t(`${T_PREFIX}.edit.promocode_discount`)"
              />
              <q-input
                  class="q-mt-lg"
                  filled
                  type="text"
                  v-model="formField.promocode_bonus"
                  :label="t(`${T_PREFIX}.edit.promocode_bonus`)"
              />
              <q-select
                  class="q-mt-lg"
                  filled
                  option-value="value"
                  option-label="text"
                  :label="t(`${T_PREFIX}.edit.promocode_wallet`)"
                  v-model="formField.promocode_wallet"
                  :options="PROMOCODE_WALLETS"
              />
              <q-checkbox
                  v-model="formField.promocode_multiple"
                  :label="t(`${T_PREFIX}.edit.promocode_multiple`)"
              />
              <q-select
                  class="q-mt-lg"
                  filled
                  emit-value
                  map-options
                  option-value="value"
                  option-label="text"
                  multiple
                  :label="t(`${T_PREFIX}.edit.promocode_area`)"
                  v-model="formField.promocode_area"
                  :options="PROMOCODE_AREA"
              />
              <q-input
                  clearable
                  class="input-number-arrow q-mt-lg"
                  :label="t(`${T_PREFIX}.edit.promocode_tree_min`)"
                  v-model.number="formField.promocode_tree_min"
                  type="number"
                  filled
                  lazy-rules
                  :rules="[
                     rules.numericMoreOrEqual(t(`${T_PREFIX}.edit.promocode_tree_min`),0)
                  ]"
              />
              <q-input
                  clearable
                  class="input-number-arrow q-mt-lg"
                  :label="t(`${T_PREFIX}.edit.promocode_tree_max`)"
                  v-model.number="formField.promocode_tree_max"
                  type="number"
                  filled
                  lazy-rules
                  :rules="[
                     rules.numericMoreOrEqual(t(`${T_PREFIX}.edit.promocode_tree_max`),0)
                  ]"
              />
              <q-input
                  clearable
                  placeholder="20"
                  class="input-number-arrow q-mt-lg"
                  :label="t(`${T_PREFIX}.edit.max_number_trees_for_sale`)"
                  v-model.number="formField.max_number_trees_for_sale"
                  type="number"
                  filled
                  lazy-rules
                  :rules="[
                    rules.numericMoreOrEqual(t(`${T_PREFIX}.edit.max_number_trees_for_sale`),0),
                    rules.numericLessOrEqual(t(`${T_PREFIX}.edit.max_number_trees_for_sale`),20),
                  ]"
              />
              <q-input
                  clearable
                  placeholder="3"
                  class="input-number-arrow q-mt-lg"
                  :label="t(`${T_PREFIX}.edit.shop_commission`)"
                  v-model.number="formField.shop_commission"
                  type="number"
                  filled
                  lazy-rules
                  :rules="[
                    rules.numericMoreOrEqual(t(`${T_PREFIX}.edit.shop_commission`),0),
                    rules.numericLessOrEqual(t(`${T_PREFIX}.edit.shop_commission`),100),
                  ]"
              />
              <q-input
                  clearable
                  placeholder="3"
                  class="input-number-arrow q-mt-lg"
                  :label="t(`${T_PREFIX}.edit.gift_commission`)"
                  v-model.number="formField.gift_commission"
                  type="number"
                  filled
                  lazy-rules
                  :rules="[
                    rules.numericMoreOrEqual(t(`${T_PREFIX}.edit.gift_commission`),0),
                    rules.numericLessOrEqual(t(`${T_PREFIX}.edit.gift_commission`),100),
                  ]"
              />
              <q-input
                  clearable
                  placeholder="25"
                  class="input-number-arrow q-mt-lg"
                  :label="t(`${T_PREFIX}.edit.shop_commission_first_sale`)"
                  v-model.number="formField.shop_commission_first_sale"
                  type="number"
                  filled
                  lazy-rules
                  :rules="[
                    rules.numericMoreOrEqual(t(`${T_PREFIX}.edit.shop_commission_first_sale`),0),
                    rules.numericLessOrEqual(t(`${T_PREFIX}.edit.shop_commission_first_sale`),100),
                  ]"
              />
              <q-input
                  clearable
                  placeholder="25"
                  class="input-number-arrow q-mt-lg"
                  :label="t(`${T_PREFIX}.edit.shop_commission_gift_sale`)"
                  v-model.number="formField.shop_commission_gift_sale"
                  type="number"
                  filled
                  lazy-rules
                  :rules="[
                    rules.numericMoreOrEqual(t(`${T_PREFIX}.edit.shop_commission_gift_sale`),0),
                    rules.numericLessOrEqual(t(`${T_PREFIX}.edit.shop_commission_gift_sale`),100),
                  ]"
              />
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

<style lang="scss">
  @import "@sass/common-style.css";
</style>