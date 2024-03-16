import {createI18n} from "vue-i18n";
import ru from "@/locales/ru/main_locail.js";
import en from "@/locales/en/main_locail.js";
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    allowComposition: true,
    locale: 'ru',
    messages: {
        ru: ru,
        en: en,
    },
    fallbackLocale: 'ru'
})
export default i18n