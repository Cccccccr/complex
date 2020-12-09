import main from '@/components/main';
import abstractRouter from '@/components/abstractRouter';

const activity = {
    path: '/user/activity',
    name: 'activity',
    component: main,
    redirect: '/user/activity/index',
    children:[
        {
            path: '/user/activity/index',
            component: () => import('@/views/activity/index.vue'),
            meta: {
                routeConfig: {
                    uncheckLogin: true,
                }
            }
        },
        {
            path: '/user/activity/create',
            component: () => import('@/views/activity/create.vue'),
            meta: {
                routeConfig: {}
            }
        }
    ]
};

export default activity;