import { createApp } from 'vue'
import VueCookies from 'vue3-cookies'
import "../src/modules/quasar.js"
import { Quasar, Notify, Dialog } from 'quasar'

import { createPinia } from 'pinia'
const pinia = createPinia()

import i18n from "../src/modules/i18n.js"

import router from "@/routes/router.js"

import App from './App.vue'
const myApp = createApp(App)

myApp.use(pinia)
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

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
