import Home from "@/components/Home.vue"
import Login from '@/components/pages/Login/Login.vue';
import MainMenu from "@/routes/main-menu.js"
import { createRouter, createWebHistory } from 'vue-router'

const baseRoutes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
    },
];


const routes = [
    ...baseRoutes,
    ...MainMenu,
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router