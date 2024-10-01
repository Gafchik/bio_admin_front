import {defineStore, storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
import {ref} from "vue";

export const useRolesStore = defineStore('useRolesStore', () => {
    const {t} = useI18n()
    const appStore = useAppStore()
    const {showInfoMassage} = appStore;
    const {axios, currentLocale} = storeToRefs(appStore)
    const roles = ref([])
    const editRolesDialog = ref(false)
    const addRolesDialog = ref(false)
    const editRolesItem = ref({})
    async function getRolesAsync(){
        return await axios.value.post('/api/roles/get-roles')
            .then(response => {
                roles.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    function openEditRolesDialog(item){
        editRolesItem.value = item
        editRolesDialog.value = true
    }
    function openAddRolesDialog(){
        addRolesDialog.value = true
    }
    function closeEditRolesDialog(){
        editRolesDialog.value = false
        editRolesItem.value = {}
    }
    function closeAddRolesDialog(){
        addRolesDialog.value = false
    }
    async function editRolesAsync(payload){
        return await axios.value.post('/api/roles/edit-roles',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function addRolesAsync(payload){
        return await axios.value.post('/api/roles/add-roles',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function deleteRoleAsync(payload){
        return await axios.value.post('/api/roles/delete-roles',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    return {
       roles, getRolesAsync,editRolesDialog,openEditRolesDialog,closeEditRolesDialog,editRolesAsync,editRolesItem,
        addRolesDialog,openAddRolesDialog,closeAddRolesDialog,addRolesAsync,deleteRoleAsync,

    }
})