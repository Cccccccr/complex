import abstractRouter from '@/components/abstractRouter';
import review from './modules/review';
import user from './modules/user';

const admin = {
    path: '/admin',
    name: 'admin',
    component: abstractRouter,
    redirect: '/admin/review',
    children:[
        {
            path: '/admin/index',
            component: () => import('@/views/admin/index.vue'),
            meta: {
                routeConfig: {}
            }
        },
        review,
        user,
    ]
};

export default admin;