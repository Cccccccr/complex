import main from '@/layout/main';

const review = {
    path: '/admin/review',
    name: 'adminReview',
    component: main,
    redirect: '/admin/review/index',
    children:[
        {
            path: '/admin/review/index',
            component: () => import('@/views/admin/review/index.vue'),
            meta: {
                routeConfig: {}
            }
        },
    ]
};

export default review;