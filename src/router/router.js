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
                path: 'timeFrequency',
                name: 'timeFrequency',
                component: () => import('../components/TimeFrequency/TimeFrequencyPage')
            },
        ]
    }


];


const router = new VueRouter({
    routes
});

export default router;
