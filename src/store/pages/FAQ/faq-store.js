import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'

export const useFaqStore = defineStore('useFaqStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale} = storeToRefs(appStore)

    const faq = ref([])
    const question = ref([])
    const category = computed(() => faq.value[currentLocale.value]?.category ?? [])
    const selectedCategoryId = ref(category.value?.[0]?.faq_category_id ?? null)
    async function getFaq(){
        axios.value.post('/api/faq')
            .then(response => {
                faq.value = response.data.data;
            })
            .catch(error => {});
    }
    function selectCategory(faq_category_id){
        selectedCategoryId.value = faq_category_id
        let allFaq = faq.value[currentLocale.value]?.faq ?? []
        question.value = allFaq.filter(q => {
            if(q.faq_category_id === faq_category_id){
                return q
            }
        })
    }
    watch(category, (state) => {
        let faq_category_id = state[0]?.faq_category_id
        if(!!faq_category_id){
            selectCategory(faq_category_id)
        }
    })
    return {getFaq,category,selectCategory,selectedCategoryId,question}
})