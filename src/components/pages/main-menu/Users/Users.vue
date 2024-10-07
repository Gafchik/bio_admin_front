<script setup>
import {useI18n} from "vue-i18n";
import UserEditDialog from "@/components/pages/main-menu/Users/UserEditDialog.vue";
import {computed, ref} from "vue";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
const appStore = useAppStore()
const {showInfoMassage} = appStore
const {openDialogConfirm} = useDialogConfirmStore()
import {useUsersStore} from "@/store/pages/Users/users-store.js";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
const {t} = useI18n()
const T_PREFIX = 'pages.users'
const usersStore = useUsersStore()
const {getUsersAsync,getStatus,deleteUserAsync,openEditDialogAsync} = usersStore
getUsersAsync()
const {users} = storeToRefs(usersStore)
const columns = computed(() => {
  return [
    {
      name: 'id',
      required: true,
      label: t(`${T_PREFIX}.table_headers.id`),
      align: 'center',
      field: row => row.id,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'fio',
      required: true,
      label: t(`${T_PREFIX}.table_headers.fio`),
      align: 'center',
      field: row => row.fio,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'email',
      required: true,
      label: t(`${T_PREFIX}.table_headers.email`),
      align: 'center',
      field: row => row.email,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'phone',
      required: true,
      label: t(`${T_PREFIX}.table_headers.phone`),
      align: 'center',
      field: row => row.phone,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'is_active',
      required: true,
      label: t(`${T_PREFIX}.table_headers.is_active`),
      align: 'center',
      field: row => row.is_active,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'code',
      required: true,
      label: t(`${T_PREFIX}.table_headers.code`),
      align: 'center',
      field: row => row.code,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'promocode',
      required: true,
      label: t(`${T_PREFIX}.table_headers.promocode`),
      align: 'center',
      field: row => row.promocode,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'level',
      required: true,
      label: t(`${T_PREFIX}.table_headers.level`),
      align: 'center',
      field: row => getStatus(row.count_trees).name,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'count_trees',
      required: true,
      label: t(`${T_PREFIX}.table_headers.count_trees`),
      align: 'center',
      field: row => row.count_trees,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'action',
      required: true,
      align: 'center',
    },
  ]
})
const search = ref('')
function deleteUser(item){
  openDialogConfirm({
    title: t(`${T_PREFIX}.confirm.delete.title`),
    text: t(`${T_PREFIX}.confirm.delete.text`),
    func: deleteUserAsync,
    funcParams: {
      id:item.id
    },
    callbackFunc: (res) => {
      if (!!res) {
        showInfoMassage(t(`${T_PREFIX}.confirm.delete.success`))
        getUsersAsync()
      }
    }
  })
}
</script>

<template>
  <div>
    <q-table
        class="q-my-md"
        :title="t(`${T_PREFIX}.title`)"
        :rows="users"
        :columns="columns"
        row-key="name"
        :filter="search"
        dense
        :grid="$q.platform.is.mobile"
        bordered
        separator="cell"
    >
      <template v-slot:top-right>
        <q-input
            borderless
            dense
            debounce="300"
            v-model="search"
            :placeholder="t(`app.search`)">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-is_active="props">
        <q-td class="text-center">
          <q-icon v-if="!!props.row.is_active" name="done" color="green"/>
          <q-icon v-else name="close" color="red"/>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td>
          <q-btn
              flat
              dense
              color="blue"
              icon="edit"
              @click="openEditDialogAsync({id:props.row.id})"/>
          <q-btn
              flat
              dense
              color="red"
              icon="delete"
              @click="deleteUser(props.row)"/>
        </q-td>
      </template>
      <template v-slot:item="props">
        <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card bordered>
            <q-list dense>
              <q-item v-for="col in props.cols"
                      :key="col.name">
                <template v-if="col.name === 'is_active'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon v-if="!!col.value" name="done" color="green"/>
                    <q-icon v-else name="close" color="red"/>
                  </q-item-section>
                </template>
                <template v-else-if="col.name === 'action'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                        flat
                        dense
                        color="blue"
                        icon="edit"
                        @click="openEditDialogAsync({id: props.row.id})"/>
                    <q-btn
                        flat
                        dense
                        color="red"
                        icon="delete"
                        @click="deleteUser(props.row)"/>
                  </q-item-section>
                </template>
                <template v-else>
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ col.value }}</q-item-label>
                  </q-item-section>
                </template>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
    <UserEditDialog/>
  </div>
</template>

<style scoped>

</style>