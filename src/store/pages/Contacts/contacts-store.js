import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {Notify} from "quasar";
import {useI18n} from "vue-i18n";

const TRANC_PREFIX = 'pages.contacts'
export const useContactsStore = defineStore('useContactsStore', () => {
    const {t} = useI18n()
    const appStore = useAppStore()
    const {showInfoMassage} = appStore
    const {axios,currentLocale} = storeToRefs(appStore)
    const {openDialogConfirm} = useDialogConfirmStore()

    const contacts = ref([])
    const dic_contacts_type = ref([])
    const dic_contacts_social_type = ref([])
    const addDialog = ref(false)
    const editDialog = ref(false)
    const editItem = ref({})
    async function getContactsInfoAsync() {
        axios.value.post('/api/contacts/get-info',)
            .then(response => {
                contacts.value = response.data.data.contacts
                dic_contacts_type.value = response.data.data.dic_contacts_type
                dic_contacts_social_type.value = response.data.data.dic_contacts_social_type
            })
            .catch(error => {});
    }
    function addItemFn(item){

    }
    function closeAddItemFn(){

    }
    function editItemFn(item){
        editItem.value = {
            id: item.id,
            type: item.type,
            social_type: item.social_type,
            email: item.email,
            phone: item.phone,
            url: item.url,
            position: item.position,
            status: !!item.status,
            title_ru: item.title_ru,
            title_uk: item.title_uk,
            title_en: item.title_en,
            title_ge: item.title_ge,
            address_ru: item.address_ru,
            address_uk: item.address_uk,
            address_en: item.address_en,
            address_ge: item.address_ge,
        }
        editDialog.value = true
    }
    function closeEditItemFn(){
        editDialog.value = false
        editItem.value = {}
    }
    function saveEditItemFn(){
        openDialogConfirm({
            title: t(`${TRANC_PREFIX}.confirm.edit.title`),
            text: t(`${TRANC_PREFIX}.confirm.edit.text`),
            func: saveEditItemFnAsync,
            funcParams: editItem.value
        })
    }
    async function saveEditItemFnAsync(data){
        console.log(data)
    }
    function deleteItemFn(item){

    }

    return {
        getContactsInfoAsync,contacts,dic_contacts_type,dic_contacts_social_type,addItemFn,editItemFn, deleteItemFn,
        closeAddItemFn, closeEditItemFn,editDialog,editItem,saveEditItemFn
    }
})