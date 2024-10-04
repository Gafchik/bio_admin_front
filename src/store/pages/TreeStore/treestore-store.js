import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import {useAppStore} from "@/store/app-store.js";
import {useI18n} from "vue-i18n";
export const useTreestoreStore = defineStore('useTreestoreStore', () => {
    const {t} = useI18n()
    const appStore = useAppStore()
    const {showInfoMassage} = appStore;
    const {axios,currentLocale} = storeToRefs(appStore)
    const treestore = ref([])
    const savePayload = ref({})
    async function searchAsync(payload){
        savePayload.value = payload
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
        searchAsync,treestore,
        savePayload
    }
})