import axios from 'axios';
import { Notify } from 'quasar'; // Импортируем компонент Notify из Quasar

// Создаем экземпляр Axios
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL, // Замените на адрес вашего бэкенда
    timeout: 10000, // Установите таймаут
    withCredentials: true // Разрешить передачу куки и заголовков авторизации в запросах
});


// Добавляем интерцептор для всех запросов
instance.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    return config;
}, error => {
    return Promise.reject(error);
});


// Перехватчик для обработки успешных ответов
instance.interceptors.response.use(response => {
        // Вернуть ответ, как есть
        return response;
    },
    error => {
        // Обработка ошибок
        if (error.response) {
            // Ошибка с ответом от сервера
            console.log(error.response.data)
            const errorMessage = error.response.data.textError || 'Произошла ошибка';
            Notify.create({
                color: 'negative',
                message: errorMessage,
                progress: true,
                position: 'top',
                html: true,
            });
        } else if (error.request) {
            // Запрос был сделан, но нет ответа
            Notify.create({
                color: 'negative',
                message: 'Нет ответа от сервера',
                progress: true,
                position: 'top',
                html: true,
            });
        } else {
            // Произошла ошибка настройки запроса
            Notify.create({
                color: 'negative',
                message: 'Ошибка настройки запроса',
                progress: true,
                position: 'top',
                html: true,
            });
        }
        return Promise.reject(error);
    }
);

// Экспортируем созданный экземпляр Axios
export default instance;