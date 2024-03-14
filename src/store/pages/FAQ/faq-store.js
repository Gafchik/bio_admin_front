import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {Notify} from "quasar";

export const useFaqStore = defineStore('useFaqStore', () => {
    const appStore = useAppStore()
    const {axios} = storeToRefs(appStore)
    const {openDialogConfirm} = useDialogConfirmStore()
    const category = ref([])
    const editItemCategory = ref({})
    const editCategoryDialog = ref(false)
    const addCategoryDialog = ref(false)
    const question = ref([])
    const addItemCategory = ref({
        position: 1,
        status: true,
        ru: '',
        uk: '',
        en: '',
        ge: '',
    })
    async function getFaqCategory(){
        axios.value.post('/api/faq/get-category')
            .then(response => {
                category.value = response.data.data.category;
            })
            .catch(error => {});
    }
    async function getFaqQuestion(){
        axios.value.post('/api/faq/get-question')
            .then(response => {
                question.value = response.data.data.faq;
            })
            .catch(error => {});
    }
    function deleteCategory(item){
        openDialogConfirm({
            title: 'Удаление категории',
            text: 'Вы уверены что хотите удалить категорию '+item.label,
            func: deleteCategoryAsync,
            funcParams: item
        })
    }
    async function deleteCategoryAsync(data){
        axios.value.post('/api/faq/delete-category',{
            category_id: data.id,
        })
            .then(response => {
                Notify.create({
                    color: 'green',
                    message: 'Категория успешно удалена',
                    progress: true,
                    position: 'top',
                    html: true,
                });
                getFaq()
            })
            .catch(error => {});
    }
    function editCategory(item){
        editItemCategory.value = {
            id: item.id,
            label: item.label,
            position: item.position,
            status: !!item.status,
            ru: item.ru,
            uk: item.uk,
            en: item.en,
            ge: item.ge,
        }
        editCategoryDialog.value = true
    }
    function closeEditCategoryDialog(){
        editItemCategory.value = {}
        editCategoryDialog.value = false
    }
    function saveEditCategory(){
        openDialogConfirm({
            title: 'Сохранение изменений',
            text: 'Вы уверены что хотите сохранить категорию '+editItemCategory.value.label,
            func: saveEditCategoryAsync,
            funcParams: editItemCategory.value
        })
    }
    async function saveEditCategoryAsync(data){
        axios.value.post('/api/faq/change-category',{
            category_id: data.id,
            position: data.position,
            status: data.status,
            locale: {
                ru: data.ru,
                uk: data.uk,
                en: data.en,
                ge: data.ge
            }
        })
            .then(response => {
                Notify.create({
                    color: 'green',
                    message: 'Категория успешно изменена',
                    progress: true,
                    position: 'top',
                    html: true,
                });
                getFaq()
                closeEditCategoryDialog()
            })
            .catch(error => {});
    }
    function addCategory(){
        addCategoryDialog.value = true
    }
    function closeAddDialog() {
        addCategoryDialog.value = false
        addItemCategory.value = {
            position: 1,
            status: true,
            ru: '',
            uk: '',
            en: '',
            ge: '',
        }
    }
    function saveAddCategory(item){
        openDialogConfirm({
            title: 'Сохранение новой категории',
            text: 'Вы уверены что хотите добавить категорию?',
            func: saveAddCategoryAsync,
            funcParams: item
        })
    }
    async function saveAddCategoryAsync(data){
        axios.value.post('/api/faq/add-category',{
            category_id: data.id,
            position: data.position,
            status: data.status,
            locale: {
                ru: data.ru,
                uk: data.uk,
                en: data.en,
                ge: data.ge
            }
        })
            .then(response => {
                Notify.create({
                    color: 'green',
                    message: 'Категория успешно добавлена',
                    progress: true,
                    position: 'top',
                    html: true,
                });
                getFaq()
                closeAddDialog()
            })
            .catch(error => {});
    }
    return {
        getFaqCategory,category,question, deleteCategory, editCategory, addCategory,editItemCategory,editCategoryDialog,
        saveEditCategory,closeEditCategoryDialog,addCategoryDialog,saveAddCategory,addItemCategory,
        closeAddDialog,getFaqQuestion
    }
})