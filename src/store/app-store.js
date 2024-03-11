import {defineStore, storeToRefs} from 'pinia'
import {ref,computed, watch} from "vue";
import axiosInstance from "@/modules/axios.js";
import { useCookies } from "vue3-cookies";
import router from "@/routes/router.js"
export const useAppStore = defineStore('useAppStore', () => {
    const { cookies } = useCookies();
   const jwt = computed(() => cookies.get('jwt'))
    const axios = computed(() =>{
        axiosInstance.interceptors.request.use(config => {
            config.headers['X-Lang-Header'] = 'ru'
            if(!!jwt.value){
                config.headers['Authorization'] = `Bearer ${jwt.value.value}`
            }
            return config;
        }, error => {
            return Promise.reject(error);
        })
        return axiosInstance
    });

    const drawer = ref(false)
    return { drawer,axios }
})