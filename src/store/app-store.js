import { defineStore } from 'pinia'
import {ref,computed} from "vue";
import { useI18n } from 'vue-i18n';
import axiosInstance from "@/modules/axios.js";
import router from "@/routes/router.js"
export const useAppStore = defineStore('useAppStore', () => {
    const cookies = computed(() => router.app.config.globalProperties)
    const axios = computed(() =>{
        axiosInstance.interceptors.request.use(config => {
            config.headers['X-Lang-Header'] = 'ru'
            //TODO create cookies
            console.log(cookies['XSRF-TOKEN'])
            return config;
        }, error => {
            return Promise.reject(error);
        })
        return axiosInstance
    });
    axios.value.get('sanctum/csrf-cookie')
        .then(response => {})
        .catch(error => {});
    const drawer = ref(false)
    async function login(email,password){
        axios.value.post('/api/login')
            .then(response => {
                // faq.value = response.data.data;
            })
            .catch(error => {});
    }

    return { drawer,axios,login }
})