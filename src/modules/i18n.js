import {createI18n} from "vue-i18n";
import uk from "@/locales/uk/main_locail.js";
import ru from "@/locales/ru/main_locail.js";
import ge from "@/locales/ge/main_locail.js";
import en from "@/locales/en/main_locail.js";
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    allowComposition: true,
    locale: 'uk',
    messages: {
        uk: uk,
        ru: ru,
        ge: ge,
        en: en,
    },
    fallbackLocale: 'uk'
})
export default i18n