import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import {useAppStore} from "@/store/app-store.js";
import {useI18n} from "vue-i18n";
import {download} from "@/helpers/download-helper.js";
export const useTransactionsStore = defineStore('useTransactionsStore', () => {
    const {t} = useI18n()
    const appStore = useAppStore()
    const {showInfoMassage} = appStore;
    const {axios,currentLocale} = storeToRefs(appStore)
    const types = ref([])
    const statuses = ref([])
    const transaction = ref([])
    const detailDialog = ref(false)
    const chartDialog = ref(false)
    const detailTransaction = ref([])
    const savePayload = ref({})
    async function getTypesAsync(){
        return await axios.value.post('/api/transactions/get-types')
            .then(response => {
                types.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function getStatusesAsync(){
        return await axios.value.post('/api/transactions/get-statuses')
            .then(response => {
                statuses.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function searchAsync(payload){
        savePayload.value = payload
        return await axios.value.post('/api/transactions/get-transaction',payload)
            .then(response => {
                transaction.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function downloadAsync(payload) {
        return await axios.value({
            method: 'post',
            url: '/api/transactions/download',
            responseType: 'blob',
            data: {id: payload}
        })
            .then(response => {
                download(response.data, 'archive.zip')
            })
            .catch(error => {});
    }
    function closeDialog(){
        detailDialog.value = false;
        detailTransaction.value = [];
    }
    async function openDetailDialog(id){
        return await axios.value.post('/api/transactions/get-transaction-details',{id:id})
            .then(response => {
                detailTransaction.value = response.data.data
                detailDialog.value = true;
                return true
            })
            .catch(error => {
                return false
            });
    }
    function openChartDialog(){
        chartDialog.value = true
    }
    function closeChartDialog(){
        chartDialog.value = false
    }
    return {
        types, statuses,getTypesAsync, getStatusesAsync,searchAsync,transaction,downloadAsync,detailDialog,
        closeDialog,openDetailDialog,detailTransaction,openChartDialog,chartDialog,closeChartDialog,savePayload
    }
})