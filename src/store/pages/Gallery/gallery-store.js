import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useI18n} from "vue-i18n";

const TRANC_PREFIX = 'pages.gallery'
export const useGalleryStore = defineStore('useGalleryStore', () =>{
    const {t} = useI18n()
    const appStore = useAppStore()
    const {showInfoMassage} = appStore;
    const {axios,currentLocale} = storeToRefs(appStore)
    const {openDialogConfirm} = useDialogConfirmStore()
    const albums = ref([])
    async function getAlbums(){
        return await axios.value.post('/api/gallery/get-items')
            .then(response => {
                albums.value = response.data.data
            })
            .catch(error => {});
    }
    function editAlbum(){

    }
    function deleteAlbum(){

    }
    function openAddDialog(){

    }
    return {
        getAlbums,albums,editAlbum, deleteAlbum,openAddDialog
    }
})