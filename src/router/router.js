import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import admin from './admin';
import user from './user';
import { userType } from '@/router/emun';

Vue.use(Router);

const userRouter = [user];
const adminRouter = [admin];

function setUserType(initRouter, type) {
  initRouter.forEach(item => {
    if (item.children) {
      setUserType(item.children, type);
    } else {
      item.meta.routeConfig.userType = type;
    }
  });
}

setUserType(userRouter, userType.user);
setUserType(adminRouter, userType.admin);
console.log(admin);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/login',
      name: 'login',
      component: () => import('@views/login/index'),
      meta: {
        routeConfig: {
            userType: userType.user,
            uncheckLogin: true, // 不需要登录态
        }
      }
    },
    {
      path:'/admin/login',
      name: 'login',
      component: () => import('@views/admin/login/index'),
      meta: {
        routeConfig: {
            userType: userType.admin,
            uncheckLogin: true, // 不需要登录态
        }
      }
    },
    user,
    admin,
  ]
});
