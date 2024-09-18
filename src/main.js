import { createApp } from 'vue'
import VueCookies from 'vue3-cookies'
import "../src/modules/quasar.js"
import { Quasar, Notify, Dialog } from 'quasar'
import { Quill, QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { createPinia } from 'pinia'
const pinia = createPinia()
import i18n from "../src/modules/i18n.js"
// import { CKEditor } from '@ckeditor/ckeditor5-vue';
import router from "@/routes/router.js"
import VueApexCharts from "vue3-apexcharts";

import App from './App.vue'
const myApp = createApp(App)

const Block = Quill.import('blots/block');
Block.tagName = 'DIV';
Quill.register(Block, true);

myApp.use(pinia)
    .component('QuillEditor', QuillEditor)
    .use(i18n)
    .use(VueCookies)
    .use(VueApexCharts)
    // .use(CKEditor)
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
