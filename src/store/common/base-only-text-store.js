import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useI18n} from "vue-i18n";
const TRANC_PREFIX = 'pages.BaseOnlyTextPages'
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
                    item.value[obj.locale] = obj.content?.replace(/\\"/g, '"');
                });
            })
            .catch(error => {});
    }
    function saveItem(id){
        openDialogConfirm({
            title: t(`${TRANC_PREFIX}.confirm.title`),
            text: t(`${TRANC_PREFIX}.confirm.text`),
            func: saveItemAsync,
            funcParams: id
        })
    }
    async function saveItemAsync(id){
        axios.value.post('/api/base-only-text-pages/edit',{
            id:id,
            lang: {
                ...item.value
            }
        })
            .then(response => {
                showInfoMassage(t(`${TRANC_PREFIX}.confirm.success`))
                getItemInfoAsync(id)
            })
            .catch(error => {});
    }
    return {
        item, getItemInfoAsync, saveItem
    }
})