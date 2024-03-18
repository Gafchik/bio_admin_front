import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {Notify} from "quasar";
import {useI18n} from "vue-i18n";

const TRANC_PREFIX = 'pages.faq'
export const useFaqStore = defineStore('useFaqStore', () => {
    const {t} = useI18n()
    const appStore = useAppStore()
    const {axios,currentLocale} = storeToRefs(appStore)
    const {openDialogConfirm} = useDialogConfirmStore()
    const category = ref([])
    const editItemCategory = ref({})
    const editItemQuestion = ref({})
    const editCategoryDialog = ref(false)
    const editQuestionDialog = ref(false)
    const addCategoryDialog = ref(false)
    const addQuestionDialog = ref(false)
    const question = ref([])
    const addItemCategory = ref({
        position: 1,
        status: true,
        ru: '',
        uk: '',
        en: '',
        ge: '',
    })
    const addItemQuestion = ref({
        faq_category_id: null,
        position: 1,
        status: true,
        ru_question: '',
        uk_question: '',
        en_question: '',
        ge_question: '',
        ru_answer: '',
        uk_answer: '',
        en_answer: '',
        ge_answer: '',
    })
    async function getFaq(){
        axios.value.post('/api/faq/get')
            .then(response => {
                category.value = response.data.data.category;
                question.value = response.data.data.faq;
            })
            .catch(error => {});
    }
    function deleteCategory(item){
        openDialogConfirm({
            title: t(`${TRANC_PREFIX}.categories.confirm.delete.title`),
            text: t(`${TRANC_PREFIX}.categories.confirm.delete.text`,{name: currentLocale.value === 'ru' ? item.label_ru : item.label_en}),
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
                    message: t(`${TRANC_PREFIX}.categories.confirm.delete.success`),
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
            title: t(`${TRANC_PREFIX}.categories.confirm.edit.title`),
            text: t(`${TRANC_PREFIX}.categories.confirm.edit.text`),
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
                    message: t(`${TRANC_PREFIX}.categories.confirm.edit.success`),
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
            title: t(`${TRANC_PREFIX}.categories.confirm.add.title`),
            text: t(`${TRANC_PREFIX}.categories.confirm.add.text`,),
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
                    message: t(`${TRANC_PREFIX}.categories.confirm.add.success`),
                    progress: true,
                    position: 'top',
                    html: true,
                });
                getFaq()
                closeAddDialog()
            })
            .catch(error => {});
    }
    function deleteQuestion(item){
        openDialogConfirm({
            title: t(`${TRANC_PREFIX}.question.confirm.delete.title`),
            text: t(`${TRANC_PREFIX}.question.confirm.delete.text`,),
            func: deleteQuestionAsync,
            funcParams: item
        })
    }
    async function deleteQuestionAsync(data){
        axios.value.post('/api/faq/delete-faq',{
            question_id: data.id,
        })
            .then(response => {
                Notify.create({
                    color: 'green',
                    message: t(`${TRANC_PREFIX}.question.confirm.delete.success`),
                    progress: true,
                    position: 'top',
                    html: true,
                });
                getFaq()
            })
            .catch(error => {});
    }
    function editQuestion(item){
        editItemQuestion.value = {
            id: item.id,
            faq_category_id: item.faq_category_id,
            label: item.question,
            position: item.position,
            status: !!item.status,
            ru_question: item.ru.question,
            uk_question: item.uk.question,
            en_question: item.en.question,
            ge_question: item.ge.question,
            ru_answer: item.ru.answer,
            uk_answer: item.uk.answer,
            en_answer: item.en.answer,
            ge_answer: item.ge.answer,
        }
        editQuestionDialog.value = true
    }
    function saveEditQuestion(){
        openDialogConfirm({
            title: t(`${TRANC_PREFIX}.question.confirm.edit.title`),
            text: t(`${TRANC_PREFIX}.question.confirm.edit.text`,),
            func: saveEditQuestionAsync,
            funcParams: editItemQuestion.value
        })
    }
    async function saveEditQuestionAsync (data) {
        axios.value.post('/api/faq/change-faq',{
            question_id: data.id,
            category_id: data.faq_category_id,
            position: data.position,
            status: data.status,
            locale_question: {
                ru: data.ru_question,
                uk: data.uk_question,
                en: data.en_question,
                ge: data.ge_question
            },
            locale_answer: {
                ru: data.ru_answer,
                uk: data.uk_answer,
                en: data.en_answer,
                ge: data.ge_answer
            }
        })
            .then(response => {
                Notify.create({
                    color: 'green',
                    message: t(`${TRANC_PREFIX}.question.confirm.edit.success`),
                    progress: true,
                    position: 'top',
                    html: true,
                });
                getFaq()
                closeEditQuestionDialog()
            })
            .catch(error => {});
    }
    function closeEditQuestionDialog(){
        editItemQuestion.value = {}
        editQuestionDialog.value = false
    }
    function addQuestion(){
        addQuestionDialog.value = true
    }
    function closeAddQuestionDialog(){
        addItemQuestion.value = {
            faq_category_id: null,
            position: 1,
            status: true,
            ru_question: '',
            uk_question: '',
            en_question: '',
            ge_question: '',
            ru_answer: '',
            uk_answer: '',
            en_answer: '',
            ge_answer: '',
        }
        addQuestionDialog.value = false
    }
    function saveAddQuestion(){
        console.log(addItemQuestion.value)
        // openDialogConfirm({
        //     title: t(`${TRANC_PREFIX}.question.confirm.add.title`),
        //     text: t(`${TRANC_PREFIX}.question.confirm.add.text`,),
        //     func: saveAddQuestionAsync,
        //     funcParams: addItemQuestion.value
        // })
    }
    async function saveAddQuestionAsync(data){
        axios.value.post('/api/faq/add-faq',{
            category_id: data.faq_category_id,
            position: data.position,
            status: data.status,
            locale_question: {
                ru: data.ru_question,
                uk: data.uk_question,
                en: data.en_question,
                ge: data.ge_question
            },
            locale_answer: {
                ru: data.ru_answer,
                uk: data.uk_answer,
                en: data.en_answer,
                ge: data.ge_answer
            }
        })
            .then(response => {
                Notify.create({
                    color: 'green',
                    message: t(`${TRANC_PREFIX}.question.confirm.add.success`),
                    progress: true,
                    position: 'top',
                    html: true,
                });
                getFaq()
                closeAddQuestionDialog()
            })
            .catch(error => {});
    }
    return {
        getFaq,category,question, deleteCategory, editCategory, addCategory,editItemCategory,editCategoryDialog,
        saveEditCategory,closeEditCategoryDialog,addCategoryDialog,saveAddCategory,addItemCategory,
        closeAddDialog,deleteQuestion,editQuestion,addQuestion, saveEditQuestion,
        closeEditQuestionDialog, editItemQuestion, editQuestionDialog,addQuestionDialog,
        addItemQuestion,closeAddQuestionDialog,saveAddQuestion
    }
})