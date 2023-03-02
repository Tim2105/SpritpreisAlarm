import { createRouter, createWebHistory} from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/details',
        name: 'Details',
        component: () => import('../views/Details.vue')
    },
    {
        path: '/stationOpeningTimes/:id',
        name: 'StationOpeningTimes',
        component: () => import('../views/StationOpeningTimes.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})

export default router;