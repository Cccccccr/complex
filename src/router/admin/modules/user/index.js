import main from '@/layout/main';

const user = {
    path: '/admin/user',
    name: 'adminUser',
    component: main,
    redirect: '/admin/user/index',
    children:[
        {
            path: '/admin/user/index',
            component: () => import('@/views/admin/user/index.vue'),
            meta: {
                routeConfig: {}
            }
        },
    ]
};

export default user;