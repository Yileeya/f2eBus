import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// 解决跳轉報錯
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if(onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};

//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if(onResolve || onReject)
        return originalReplace.call(this, location, onResolve, onReject);
    return originalReplace.call(this, location).catch(err => err);
};

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
                component: () => import('../components/TimeArrival/TimeArrivalPage')
            }
        ]
    }
];


const router = new VueRouter({
    routes
});

export default router;
