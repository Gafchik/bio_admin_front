import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useI18n} from "vue-i18n";

const TRANC_PREFIX = 'pages.gallery'
const DEF_EDIT_ITEM = {
    id_album: 0,
    category_image: '',
    status: 1,
    position: 0,
    name_ru: '',
    name_uk: '',
    name_en: '',
    name_ge: '',
    is_image: true,
    items: [],
}
const DEF_ADD_ITEM = {
    category_image: '',
    status: true,
    position: 0,
    name_ru: '',
    name_uk: '',
    name_en: '',
    name_ge: '',
    is_image: true,
    items: [{
        id: 0,
        video: null,
        image: '/',
        status: true,
        position: 0,
        lang: null
    }],
}
export const useGalleryStore = defineStore('useGalleryStore', () =>{
    const {t} = useI18n()
    const appStore = useAppStore()
    const {showInfoMassage} = appStore;
    const {axios,currentLocale} = storeToRefs(appStore)
    const {openDialogConfirm} = useDialogConfirmStore()
    const albums = ref([])
    const editDialog = ref(false)
    const addDialog = ref(false)
    const editItem = ref(DEF_EDIT_ITEM)
    const addItem = ref(DEF_ADD_ITEM)
    async function getAlbums(){
        return await axios.value.post('/api/gallery/get-items')
            .then(response => {
                albums.value = response.data.data
            })
            .catch(error => {});
    }
    async function editAlbum(item){
        await axios.value.post('/api/gallery/get-items-album',{id: item.id_album})
            .then(response => {
                editItem.value = response.data.data
                editItem.value.status = !!editItem.value.status
                editItem.value.is_image = !!editItem.value.is_image
                editItem.value.items.forEach((i) => {
                    i.status = !!i.status
                })
                editDialog.value = true
            })
            .catch(error => {});
    }
    function closeEditDialog(){
        editDialog.value = false
        editItem.value = DEF_EDIT_ITEM
    }
    function saveEditItem(){
        openDialogConfirm({
            title: t(`${TRANC_PREFIX}.confirm.edit.title`),
            text: t(`${TRANC_PREFIX}.confirm.edit.text`,),
            func: saveEditItemAsync,
            funcParams: editItem.value
        })
    }
    async function saveEditItemAsync(item){
        await axios.value.post('/api/gallery/edit-items-album',item)
            .then(response => {
                showInfoMassage( t(`${TRANC_PREFIX}.confirm.edit.success`))
                getAlbums()
                closeEditDialog()
            })
            .catch(error => {});
    }
    function deleteAlbum(item){
        openDialogConfirm({
            title: t(`${TRANC_PREFIX}.confirm.delete.title`),
            text: t(`${TRANC_PREFIX}.confirm.delete.text`,),
            func: deleteAlbumAsync,
            funcParams:item.id_album
        })
    }
    async function deleteAlbumAsync(id) {
        await axios.value.post('/api/gallery/delete-items-album',{id: id})
            .then(response => {
                showInfoMassage( t(`${TRANC_PREFIX}.confirm.delete.success`))
                getAlbums()
            })
            .catch(error => {});
    }
    function openAddDialog(){
        addItem.value = {...DEF_ADD_ITEM}
        addDialog.value = true
    }
    function closeAddDialog(){
        addDialog.value = false
        addItem.value = {...DEF_ADD_ITEM}
    }
    function saveAddItem(){
        openDialogConfirm({
            title: t(`${TRANC_PREFIX}.confirm.add.title`),
            text: t(`${TRANC_PREFIX}.confirm.add.text`,),
            func: saveAddItemAsync,
            funcParams: addItem.value
        })
    }
    async function saveAddItemAsync(item){
        await axios.value.post('/api/gallery/add-items-album',item)
            .then(response => {
                showInfoMassage( t(`${TRANC_PREFIX}.confirm.add.success`))
                getAlbums()
                closeAddDialog()
            })
            .catch(error => {});
    }
    return {
        getAlbums,albums,editAlbum, deleteAlbum,openAddDialog,closeEditDialog,editItem,editDialog,saveEditItem,
        addDialog,closeAddDialog,saveAddItem,addItem
    }
})