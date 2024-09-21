import {defineStore, storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
import {ref} from "vue";

export const useWithdrawsStore = defineStore('useWithdrawsStore', () => {
    const {t} = useI18n()
    const appStore = useAppStore()
    const {showInfoMassage} = appStore;
    const {axios, currentLocale} = storeToRefs(appStore)
    const withdraws = ref([])
    const editWithdrawDialog = ref(false)
    const editWithdrawItem = ref({})
    const infoWithdrawDialog = ref(false)
    const infoWithdraw = ref([])
    async function getWithdrawsAsync(){
        return await axios.value.post('/api/withdraws/get')
            .then(response => {
                withdraws.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    function openEditWithdrawDialog(item){
        editWithdrawDialog.value = true
        editWithdrawItem.value = item
    }
    function closeEditWithdrawDialog(){
        editWithdrawDialog.value = false
        editWithdrawItem.value = {}
    }
    async function editWithdrawStatusAsync(payload){
        return await axios.value.post('/api/withdraws/edit',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function openWithdrawInfoDialogAsync(payload){
        return await axios.value.post('/api/withdraws/info',payload)
            .then(response => {
                infoWithdraw.value = response.data.data
                infoWithdrawDialog.value = true
                return true
            })
            .catch(error => {
                return false
            });
    }
    function closeWithdrawInfoDialog(){
        infoWithdrawDialog.value = false
        infoWithdraw.value = []
    }
    return {
        getWithdrawsAsync,withdraws,openEditWithdrawDialog,closeEditWithdrawDialog,editWithdrawDialog,editWithdrawItem,
        editWithdrawStatusAsync,openWithdrawInfoDialogAsync,closeWithdrawInfoDialog,infoWithdrawDialog,infoWithdraw,
    }
})