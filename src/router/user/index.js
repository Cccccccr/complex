import main from '@/components/main';
import activity from './modules/activity';

const user = {
    path: '/user',
    name: 'user',
    component: main,
    redirect: '/user/activity/index',
    children:[
        activity
    ]
};

export default user;