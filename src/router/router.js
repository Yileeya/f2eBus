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
                component: () => import('../components/Home/HomePage')
            },
            {
                path: 'search',
                name: 'search',
                component: () => import('../components/Search/SearchBusPage')
            },
            {
                path: 'timeArrival',
                name: 'timeArrival',
                component: () => import('../components/TimeArrivalPage/TimeArrivalPage')
            },
            {
                path: 'schedule',
                name: 'schedule',
                component: () => import('../components/Schedule/SchedulePage')
            },
            {
                path: 'timeArrivalMap',
                name: 'timeArrivalMap',
                component: () => import('../components/TimeArrivalPage/TimeArrivalMapPage')
            },
        ]
    }


];


const router = new VueRouter({
    routes
});

export default router;
