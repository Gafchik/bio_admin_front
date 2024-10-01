<script setup>
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import {useRolesStore} from "@/store/pages/Roles/roles-store.js";
import {storeToRefs} from "pinia";
import EditRolesDialog from "@/components/pages/main-menu/Roles/EditRolesDialog.vue";
import AddRolesDialog from "@/components/pages/main-menu/Roles/AddRolesDialog.vue";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useAppStore} from "@/store/app-store.js";
const {openDialogConfirm} = useDialogConfirmStore()
const appStore = useAppStore()
const {showInfoMassage} = appStore
const {t} = useI18n()
const T_PREFIX = 'pages.roles'
const searchRoles = ref('')
const rolesStore = useRolesStore()
const {roles} = storeToRefs(rolesStore)
const {getRolesAsync,openEditRolesDialog,openAddRolesDialog,deleteRoleAsync} = rolesStore
getRolesAsync()
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
      name: 'name',
      required: true,
      label: t(`${T_PREFIX}.table_headers.name`),
      align: 'center',
      field: row => row.name,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'key',
      required: true,
      label: t(`${T_PREFIX}.table_headers.key`),
      align: 'center',
      field: row => row.slug,
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
const pagination = ref({
  rowsPerPage: 10,
})

function deleteRole(item){
  openDialogConfirm({
    title: t(`${T_PREFIX}.delete.confirm.title`),
    text: t(`${T_PREFIX}.delete.confirm.text`),
    func: deleteRoleAsync,
    funcParams: {
      id:item.id
    },
    callbackFunc: (res) => {
      if (!!res) {
        showInfoMassage(t(`${T_PREFIX}.delete.confirm.success`))
        getRolesAsync()
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
        :rows="roles"
        :columns="columns"
        row-key="name"
        :filter="searchRoles"
        dense
        :grid="$q.platform.is.mobile"
        bordered
        separator="cell"
        :pagination="pagination"
        :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-btn
            @click="openAddRolesDialog"
            icon="add"
            flat
            color="blue"/>
        <q-input
            borderless
            dense
            debounce="300"
            v-model="searchRoles"
            :placeholder="t(`app.search`)">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td>
          <q-btn
                 flat
                 dense
                 color="blue"
                 icon="edit"
                 @click="openEditRolesDialog(props.row)"/>
          <q-btn
              flat
              dense
              color="red"
              icon="delete"
              @click="deleteRole(props.row)"/>
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
                <template v-if="col.name === 'action'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                           flat
                           dense
                           color="blue"
                           icon="edit"
                          @click="openEditRolesDialog(props.row)"/>
                    <q-btn
                        flat
                        dense
                        color="red"
                        icon="delete"
                         @click="deleteRole(props.row)"/>
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
    <EditRolesDialog/>
    <AddRolesDialog/>
  </div>
</template>

<style scoped>

</style>