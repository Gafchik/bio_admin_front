import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useI18n} from "vue-i18n";

const TRANC_PREFIX = 'pages.news'
export const useNewsStore = defineStore('useNewsStore', () =>{
    const {t} = useI18n()
    const appStore = useAppStore()
    const {showInfoMassage} = appStore;
    const {axios,currentLocale} = storeToRefs(appStore)
    const {openDialogConfirm} = useDialogConfirmStore()
    const newsItems = ref([])
    const allCountNews = ref(1)
    const isLoanPage = ref(1)
    const getCardRequest = ref(false)
    const editDialog = ref(false)
    const addDialog = ref(false)
    const previewImg = ref('')
    const editItem = ref({
        id_card:0,
        image:'',
        imagePath:'',
        view_count:0,
        date:'',
        status:true,
        name_ru:'',
        name_uk:'',
        name_en:'',
        name_ge:'',
        short_content_ru:'',
        short_content_uk:'',
        short_content_en:'',
        short_content_ge:'',
        content_ru:'',
        content_uk:'',
        content_en:'',
        content_ge:'',
    })
    const addItem = ref({})
    async function getNewsListAsync(page){
        if(!getCardRequest.value){
            getCardRequest.value = true
            return axios.value.post('/api/news/get-items',{page: page})
                .then(response => {
                    response.data.data.items.forEach(obj => {
                        obj.imagePath = obj.image
                        if(obj.image[0] === '/'){
                            obj.image = import.meta.env.VITE_BASE_FILE_URL+obj.image
                        }else{
                            obj.image = import.meta.env.VITE_BASE_FILE_URL+'/'+obj.image
                        }
                    });
                    newsItems.value.push(...response.data.data.items)
                    allCountNews.value = response.data.data.allCount
                    getCardRequest.value = false
                    return !!response.data.data.items.length
                })
                .catch(error => {
                    return false
                });
        }
    }
    function editNews(item){
        previewImg.value = item.image
        editItem.value = {
            id_card:item.id_card,
            image:item.image,
            imagePath:item.imagePath,
            view_count:item.view_count,
            date:item.date,
            status:!!item.status,

            name_ru:item.name_ru ?? '',
            name_uk:item.name_uk ?? '',
            name_en:item.name_en ?? '',
            name_ge:item.name_ge ?? '',
            short_content_ru:item.short_content_ru ?? '',
            short_content_uk:item.short_content_uk ?? '',
            short_content_en:item.short_content_en ?? '',
            short_content_ge:item.short_content_ge ?? '',
            content_ru:item.content_ru ?? '',
            content_uk:item.content_uk ?? '',
            content_en:item.content_en ?? '',
            content_ge:item.content_ge ?? '',
        }
        editDialog.value = true
    }
    function closeEditDialog(){
        editDialog.value = false
        previewImg.value = ''
        editItem.value = {
            id_card:0,
            image:'',
            imagePath:'',
            view_count:0,
            date:'',
            status:true,
            name_ru:'',
            name_uk:'',
            name_en:'',
            name_ge:'',
            short_content_ru:'',
            short_content_uk:'',
            short_content_en:'',
            short_content_ge:'',
            content_ru:'',
            content_uk:'',
            content_en:'',
            content_ge:'',
        }
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
        axios.value.post('/api/news/edit',{
            id: item.id_card,
            image: item.imagePath,
            date: item.date,
            status: item.status,
            ru:{
                name: item.name_ru,
                short_content: item.short_content_ru,
                content: item.content_ru,
            },
            uk:{
                name: item.name_uk,
                short_content: item.short_content_uk,
                content: item.content_uk,
            },
            en:{
                name: item.name_en,
                short_content: item.short_content_en,
                content: item.content_en,
            },
            ge:{
                name: item.name_ge,
                short_content: item.short_content_ge,
                content: item.content_ge,
            },
        })
            .then(response => {
                showInfoMassage( t(`${TRANC_PREFIX}.confirm.edit.success`))
                let index = newsItems.value.findIndex(i => i.id_card === item.id_card);
                if (index !== -1) {
                    newsItems.value[index] = { ...item }; // Обновляем объект в массиве
                    newsItems.value[index].image = import.meta.env.VITE_BASE_FILE_URL+item.imagePath;
                }
                closeEditDialog()
            })
            .catch(error => {});
    }
    function deleteNews(item){
        openDialogConfirm({
            title: t(`${TRANC_PREFIX}.confirm.delete.title`),
            text: t(`${TRANC_PREFIX}.confirm.delete.text`,),
            func: deleteNewsAsync,
            funcParams:item.id_card
        })
    }
    async function deleteNewsAsync(id){
        axios.value.post('/api/news/delete',{
            id: id,
        })
            .then(response => {
                showInfoMassage( t(`${TRANC_PREFIX}.confirm.delete.success`))
                newsItems.value = newsItems.value.filter(obj => obj.id_card !== id)
            })
            .catch(error => {});
    }
    function openAddDialog(){
        addItem.value = {
            image:'',
            imagePath:'',
            view_count:0,
            date:'',
            status:true,
            name_ru:'',
            name_uk:'',
            name_en:'',
            name_ge:'',
            short_content_ru:'',
            short_content_uk:'',
            short_content_en:'',
            short_content_ge:'',
            content_ru:'',
            content_uk:'',
            content_en:'',
            content_ge:'',
        }
        addDialog.value = true
    }
    function closeAddDialog(){
        addDialog.value = false
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
        axios.value.post('/api/news/add',{
            image: item.imagePath,
            date: item.date,
            status: item.status,
            ru:{
                name: item.name_ru,
                short_content: item.short_content_ru,
                content: item.content_ru,
            },
            uk:{
                name: item.name_uk,
                short_content: item.short_content_uk,
                content: item.content_uk,
            },
            en:{
                name: item.name_en,
                short_content: item.short_content_en,
                content: item.content_en,
            },
            ge:{
                name: item.name_ge,
                short_content: item.short_content_ge,
                content: item.content_ge,
            },
        })
            .then(response => {
                showInfoMassage( t(`${TRANC_PREFIX}.confirm.add.success`))
                item.id_card = response.data.data.id
                newsItems.value.push({...item})
                newsItems.value.sort((a, b) => b.id_card - a.id_card)
                closeAddDialog()
            })
            .catch(error => {});
    }
    return {
        getNewsListAsync,newsItems,allCountNews,editNews,deleteNews,isLoanPage,editDialog,editItem,saveEditItem,closeEditDialog,
        previewImg,addDialog,addItem,closeAddDialog,saveAddItem,openAddDialog
    }
})