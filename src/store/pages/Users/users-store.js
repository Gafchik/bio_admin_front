import {defineStore, storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
import {ref} from "vue";
import {STATUSES} from "@/constants/users-statuses.js"
export const useUsersStore = defineStore('useUsersStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale} = storeToRefs(appStore)
    const users = ref([])
    const userEditDialog = ref(false)
    const editUserData = ref([])
    async function getUsersAsync(){
        return await axios.value.post('/api/users/get-users')
            .then(response => {
                users.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    function getStatus(countTrees) {
        return STATUSES.find(i => countTrees <= i.count_to && countTrees >= i.count_from)
    }
    async function deleteUserAsync(payload){
        return await axios.value.post('/api/users/delete-users',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function openEditDialogAsync(payload){
        return await axios.value.post('/api/users/get-users-by-id',payload)
            .then(response => {
                editUserData.value = response.data.data
                userEditDialog.value = true
                return true
            })
            .catch(error => {
                return false
            });
    }
    function closeEditDialog(){
        userEditDialog.value = false
        editUserData.value = []
    }
    async function editPersonalDataAsync(payload){
        return await axios.value.post('/api/users/edit-personal-data',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    return {
        getUsersAsync,users,getStatus,deleteUserAsync,userEditDialog,
        editUserData,openEditDialogAsync,closeEditDialog,editPersonalDataAsync,
    }
})