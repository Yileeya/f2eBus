import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: '',
        component: () => import('../components/Layouts/AppLayout'),
        children: [
            {
                path: '',
                name: '',
                component: () => import('../components/Home/IndexPage')
            },
            {
                path: 'index',
                name: 'index',
                component: () => import('../components/Home/IndexPage')
            },
            {
                path: 'scenicSpot',
                name: 'scenicSpot',
                component: () => import('../components/Pages/SearchPage')
            },
            {
                path: 'scenicSpot/:name',
                name: 'scenicSpotDetail',
                component: () => import('../components/Pages/DetailPage')
            },
            {
                path: 'restaurant',
                name: 'restaurant',
                component: () => import('../components/Pages/SearchPage')
            },
            {
                path: 'restaurant/:name',
                name: 'restaurantDetail',
                component: () => import('../components/Pages/DetailPage')
            },
            {
                path: 'hotel',
                name: 'hotel',
                component: () => import('../components/Pages/SearchPage')
            },
            {
                path: 'hotel/:name',
                name: 'hotelDetail',
                component: () => import('../components/Pages/DetailPage')
            },
            {
                path: 'activity',
                name: 'activity',
                component: () => import('../components/Pages/SearchPage')
            },
            {
                path: 'activity/:name',
                name: 'activityDetail',
                component: () => import('../components/Pages/DetailPage')
            },
        ]
    }


];


const router = new VueRouter({
    routes
});

export default router;
