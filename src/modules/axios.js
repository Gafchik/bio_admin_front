import axios from 'axios';

// Создаем экземпляр Axios
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL, // Замените на адрес вашего бэкенда
    timeout: 10000, // Установите таймаут
    withCredentials: true // Разрешить передачу куки и заголовков авторизации в запросах
});


// Экспортируем созданный экземпляр Axios
export default instance;