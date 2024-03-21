import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useI18n} from "vue-i18n";
export const useBaseOnlyTextStore = defineStore('useBaseOnlyTextStore', () => {
    const item = ref({})
    async function getItemInfoAsync(routePrefix){

    }
    function saveItem(routePrefix, trancPrefix){

    }
    async function saveItemAsync(routePrefix){

    }
    return {
        item, getItemInfoAsync, saveItem, saveItemAsync
    }
})