import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import {useAppStore} from "@/store/app-store.js";

export const useTreesStore = defineStore('useTreesStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale} = storeToRefs(appStore)
    const plantingDates = ref([])
    const trees = ref([])
    const editTreesDialog = ref(false)
    const editTreesItem = ref({})
    const savePayload = ref({})

    async function getPlantingDatesAsync(){
        return await axios.value.post('/api/trees/get-planting-dates')
            .then(response => {
                plantingDates.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function getTreesAsync(payload){
        savePayload.value = payload
        return await axios.value.post('/api/trees/get-trees',payload)
            .then(response => {
                trees.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    function openEditTreeDialog(item){
        editTreesItem.value = item
        editTreesDialog.value = true
    }
    function closeEditTreeDialog(){
        editTreesDialog.value = false
        editTreesItem.value = {}
    }
    async function editTreeAsync(payload){
        return await axios.value.post('/api/trees/edit-trees',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    return {
        plantingDates,getPlantingDatesAsync,trees,getTreesAsync,editTreesDialog,
        editTreesItem,openEditTreeDialog, closeEditTreeDialog,editTreeAsync,savePayload,
    }
})