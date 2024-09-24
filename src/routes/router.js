import Home from "@/components/Home.vue"
import Login from '@/components/pages/Login/Login.vue';
import MainMenu from "@/routes/main-menu.js"
import { createRouter, createWebHistory } from 'vue-router'
import {ref,computed} from "vue";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
// const isLogin = computed(() => cookies.get('jwt')) 123

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
router.beforeEach( (to, from, next) => {
    let isLogin = cookies.get('jwt')
    if (!isLogin) {
        if(to.name !== 'login'){
            next({name: 'login'})
        }
    }else{
        if(to.name === 'login'){
            next({name: 'home'})
        }
    }
    next()
});
export default router