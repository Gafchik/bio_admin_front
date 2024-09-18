import {UK, RU, EN, GE} from "@/constants/locales.js"

export const DATE_PICKER_LOCALES = {
    [UK]:{
        days: 'Неділя_Понеділок_Вівторок_Середа_Четвер_П’ятниця_Субота'.split('_'),
        daysShort: 'Нед_Пон_Вів_Сер_Чет_П’ят_Суб'.split('_'),
        months: 'Січень_Лютий_Березень_Квітень_Травень_Червень_Липень_Серпень_Вересень_Жовтень_Листопад_Грудень'.split('_'),
        monthsShort: 'Січ_Лют_Бер_Квіт_Трав_Черв_Лип_Серп_Вер_Жовт_Лист_Груд'.split('_'),
        firstDayOfWeek: 1,
        format24h: true,
        pluralDay: 'дні'
    },
    [RU]:{
        days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
        daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
        months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
        monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
        firstDayOfWeek: 1,
        format24h: true,
        pluralDay: 'дней'
    },
    [EN]:{
        days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        firstDayOfWeek: 0, // In English, usually Sunday is the first day of the week
        format24h: false,
        pluralDay: 'days'
    },
    [GE]:{
        days: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
        daysShort: 'კვ_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
        months: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
        monthsShort: 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
        firstDayOfWeek: 1,
        format24h: true,
        pluralDay: 'დღეები'
    },
}