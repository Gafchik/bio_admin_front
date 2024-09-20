import {defineStore, storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
import {ref} from "vue";

export const useQuestionStore = defineStore('useQuestionStore', () => {
    const {t} = useI18n()
    const appStore = useAppStore()
    const {showInfoMassage} = appStore;
    const {axios,currentLocale} = storeToRefs(appStore)
    const question = ref([])
    const answerDialog = ref(false)
    const questionIdFromAnswer = ref(null)
    async function getQuestionAsync(){
        return await axios.value.post('/api/question/get')
            .then(response => {
                question.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function deleteQuestionAsync(id){
        return await axios.value.post('/api/question/delete',{id:id})
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    function openAnswerDialog(id){
        answerDialog.value = true
        questionIdFromAnswer.value = id
    }
    function closeAnswerDialog(){
        answerDialog.value = false
        questionIdFromAnswer.value = null
    }
    async function answerQuestionAsync(payload){
        return await axios.value.post('/api/question/send-answer',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    return {
        getQuestionAsync,question,deleteQuestionAsync,openAnswerDialog,answerDialog,questionIdFromAnswer,
        closeAnswerDialog,answerQuestionAsync
    }
})