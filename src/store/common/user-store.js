import { defineStore } from 'pinia'
import {ref,computed} from "vue";
import {useAppStore} from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import { useCookies } from "vue3-cookies";
import router from "@/routes/router.js"

export const useUserStore = defineStore('useUserStore', () => {
    const appStore = useAppStore()
    const { cookies } = useCookies();
    const {axios} = storeToRefs(appStore)
    const email = ref('')
    const password = ref('')
    const code = ref('')
    const jwt = ref('')
    const jwtType = ref('')
    const qr = ref('')
    const isLogin = computed(() => cookies.get('jwt'))
    const google2facDialog = ref(false)
    const has2fac = ref(false)
    const disableSubmit = computed(() => !email.value.length || !password.value.length)

    async function loginAsync(){
        axios.value.post('/api/login',{
            email: email.value,
            password: password.value,
        })
            .then(response => {
                jwt.value = response.data.data.authorization.token
                jwtType.value = response.data.data.authorization.type
                has2fac.value = !!response.data.data.has_2fa_code
                qr.value = response.data.data.qr
                google2facDialog.value = true
            })
            .catch(error => {});
    }
    async function sendGoogle2fac(codeValue = '') {
        if(!has2fac.value){
            has2fac.value = true
        }else{
            axios.value.post('/api/google2fac',{
                code: codeValue,
                email: email.value,
            },{
                headers: {
                    'Authorization': 'Bearer '+jwt.value
                }
            })
                .then(response => {
                    google2facDialog.value = false
                    cookies.set('jwt',{
                        value: jwt.value,
                        expiry: '10800s',
                    })
                    router.go('/')
                })
                .catch(error => {});
        }

    }

    return {
        email,password,disableSubmit,loginAsync,jwt, jwtType, isLogin,sendGoogle2fac,google2facDialog,
        qr,has2fac,
    }
})