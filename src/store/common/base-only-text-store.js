import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useI18n} from "vue-i18n";
export const useBaseOnlyTextStore = defineStore('useBaseOnlyTextStore', () => {
    const {t} = useI18n()
    const appStore = useAppStore()
    const {showInfoMassage} = appStore;
    const {axios,currentLocale} = storeToRefs(appStore)
    const {openDialogConfirm} = useDialogConfirmStore()

    const item = ref({
        ru: '',
        uk: '',
        en: '',
        ge: '',
    })
    async function getItemInfoAsync(id){
        axios.value.post('/api/base-only-text-pages/get',{id:id})
            .then(response => {
                response.data.data.forEach(obj => {
                    // console.log(item.value[obj.locale])
                    // console.log(obj.content?.replace(/\\"/g, '"'))
                    // item.value[obj.locale] = obj.content;
                    item.value[obj.locale] = obj.content?.replace(/\\"/g, '"');
                });
            })
            .catch(error => {});
    }
    function saveItem(routePrefix, trancPrefix){

    }
    async function saveItemAsync(routePrefix){

    }
    return {
        item, getItemInfoAsync, saveItem, saveItemAsync
    }
})