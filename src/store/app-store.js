import {defineStore, storeToRefs} from 'pinia'
import {ref,computed, watch} from "vue";
import axiosInstance from "@/modules/axios.js";
import { useCookies } from "vue3-cookies";
import router from "@/routes/router.js"
import { useI18n } from 'vue-i18n';
import ru from "@assets/image/header/locales/rus.png";
import locales from "@/constants/locales.js";
import {Notify} from "quasar";

export const useAppStore = defineStore('useAppStore', () => {
    const { cookies } = useCookies();
    const email = ref('')
    const password = ref('')
    const code = ref('')
    const jwt = ref('')
    const jwtType = ref('')
    const qr = ref('')
    const user = ref({})
    const isLogin = computed(() => !!cookies.get('jwt'))
    const google2facDialog = ref(false)
    const has2fac = ref(false)
    const disableSubmit = computed(() => !email.value.length || !password.value.length)
    const { locale } = useI18n();
    const currentLocale = computed(() => locale.value);
    const localesModel= ref({})

    const axios = computed(() =>{
        axiosInstance.interceptors.request.use(config => {
            config.headers['Content-Type'] = 'application/json;charset=utf-8'
            config.headers['X-Lang-Header'] = currentLocale.value
            let jwt = cookies.get('jwt')
            if(!!jwt){
                config.headers['Authorization'] = `Bearer ${jwt}`
            }
            return config;
        }, error => {
            return Promise.reject(error);
        })
        axiosInstance.interceptors.response.use(response => {
                return response;
            },
            error => {
                if(error.response.status === 401){
                    cookies.remove('jwt')
                    Notify.create({
                        color: 'negative',
                        message: t('app.session_daed'),
                        progress: true,
                        position: 'top',
                        html: true,
                    });
                } else if (error.response) {
                    // Ошибка с ответом от сервера
                    const errorMessage = error.response.data.textError;
                    Notify.create({
                        color: 'negative',
                        message: errorMessage,
                        progress: true,
                        position: 'top',
                        html: true,
                    });
                } else if (error.request) {
                    // Запрос был сделан, но нет ответа
                    Notify.create({
                        color: 'negative',
                        message: t('app.server_not_response'),
                        progress: true,
                        position: 'top',
                        html: true,
                    });
                } else {
                    // Произошла ошибка настройки запроса
                    Notify.create({
                        color: 'negative',
                        message: t('app.request_error'),
                        progress: true,
                        position: 'top',
                        html: true,
                    });
                }
                return error;
            }
        );
        return axiosInstance
    });
    const drawer = ref(false)
    const selectedMainMenu = ref(null)
    function redirectTo(routeName){
        if(!!routeName){
            router.push({
                name: routeName,
            })
        }
    }
    function showInfoMassage(message){
        Notify.create({
            color: 'green',
            message: message,
            progress: true,
            position: 'top',
            html: true,
        });
    }
    async function getUserInfo(){
        axios.value.post('/api/get-user-info')
            .then(response => {
                user.value = response.data.data
                if(!!user.value.locale){

                    localesModel.value = locales
                        .find((i) => i.value === user.value.locale)

                }else{
                    localesModel.value = {
                        value: 'ru',
                        image: ru
                    }
                }
            })
            .catch(error => {});
    }
    getUserInfo();
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
    async function logout(){
        axios.value.post('/api/logout',{},{
        })
            .then(response => {
                cookies.remove('jwt',)
                user.value = {}
                router.go('/login')
            })
            .catch(error => {
                cookies.remove('jwt',)
                router.push('/login')
            });
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
                    let t = new Date();
                    t.setSeconds(t.getSeconds() + 10800);
                    cookies.set('jwt',jwt.value,t)
                    google2facDialog.value = false
                    router.go('/')
                })
                .catch(error => {});
        }
    }
    watch(localesModel, () => {
        locale.value = localesModel.value.value
    })
    return {
        drawer,axios,selectedMainMenu,redirectTo,localesModel, email,password,disableSubmit,loginAsync,
        jwt, jwtType, isLogin,sendGoogle2fac,google2facDialog, qr,has2fac,logout, user,currentLocale,
        showInfoMassage
    }
})