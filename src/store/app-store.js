import {defineStore, storeToRefs} from 'pinia'
import {ref,computed, watch} from "vue";
import axiosInstance from "@/modules/axios.js";
import { useCookies } from "vue3-cookies";
import router from "@/routes/router.js"
export const useAppStore = defineStore('useAppStore', () => {
    const { cookies } = useCookies();

    const axios = computed(() =>{
        axiosInstance.interceptors.request.use(config => {
            config.headers['X-Lang-Header'] = 'ru'
            let jwt = cookies.get('jwt')
            if(!!jwt){
                config.headers['Authorization'] = `Bearer ${jwt}`
            }
            return config;
        }, error => {
            return Promise.reject(error);
        })
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
    return { drawer,axios,selectedMainMenu,redirectTo}
})