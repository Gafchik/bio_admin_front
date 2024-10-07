import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import {useAppStore} from "@/store/app-store.js";
export const useTreestoreStore = defineStore('useTreestoreStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale} = storeToRefs(appStore)
    const treestore = ref([])
    const plantingDates = ref([])
    async function getPlantingDatesAsync(){
        return await axios.value.post('/api/treestore/get-planting-dates-tree-store')
            .then(response => {
                plantingDates.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function searchAsync(payload){
        return await axios.value.post('/api/treestore/get-treestore',payload)
            .then(response => {
                treestore.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    return {
        searchAsync,treestore,plantingDates,getPlantingDatesAsync
    }
})