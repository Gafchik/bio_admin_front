import { defineStore } from 'pinia'
import {ref,computed} from "vue";
import {useAppStore} from '@/store/app-store.js'
import { storeToRefs } from 'pinia'

export const useUserStore = defineStore('useUserStore', () => {
    const appStore = useAppStore()
    const {axios} = storeToRefs(appStore)
    const email = ref('')
    const password = ref('')
    const code = ref('')
    const disableSubmit = computed(() => !email.value.length || !password.value.length || !code.value.length)
    async function loginAsync(){
        axios.value.post('/api/login',{
            email: email.value,
            password: password,
            code: code,
        })
            .then(response => {
                console.log(response.data.data)

            })
            .catch(error => {});
    }

    return { email,password,disableSubmit,loginAsync }
})