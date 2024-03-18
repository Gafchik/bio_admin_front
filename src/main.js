import { createApp } from 'vue'
import VueCookies from 'vue3-cookies'
import "../src/modules/quasar.js"
import { Quasar, Notify, Dialog } from 'quasar'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { createPinia } from 'pinia'
const pinia = createPinia()
import CKEditor from '@ckeditor/ckeditor5-vue';
import i18n from "../src/modules/i18n.js"

import router from "@/routes/router.js"

import App from './App.vue'
const myApp = createApp(App)

myApp.use(pinia)
    .component('QuillEditor', QuillEditor)
    .use( CKEditor )
    .use(i18n)
    .use(VueCookies)
    .use(router)
    .use(Quasar, {
        plugins: {
            Notify,Dialog
        },
        config: {
            brand: {
            },
        }
    })
myApp.mount('#app')
