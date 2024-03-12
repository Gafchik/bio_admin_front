import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'

export const useFaqStore = defineStore('useFaqStore', () => {
    const appStore = useAppStore()
    const {axios} = storeToRefs(appStore)
    const faqData = ref([])
    const faq = ref([])
    async function getFaq(){
        axios.value.post('/api/faq')
            .then(response => {
                faqData.value = response.data.data;
            })
            .catch(error => {});
    }
    return {getFaq,faqData}
})