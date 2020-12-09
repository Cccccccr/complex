import router from "./router";
import store from "../store";
import { userType } from "@/router/emun";

const state = store.state;

const pathMap = {
  activity: "/user/activity/index",
  login: "/login",
  adminLogin: "/admin/login"
};

router.beforeEach((to, from, next) => {
  // next();
  // return;
  console.log(to);
  if (getByKey(to, "uncheckLogin")) {
    if (!state.user.userId) {
      store.dispatch("user/checkLogin", {});
    }
    next();
  }
  console.log(getByKey(to, "userType"), userType.user);
  switch (getByKey(to, "userType")) {
    case userType.user:
      if (!getByKey(to, "uncheckLogin")) {
        if (!state.user.userId) {
          store
            .dispatch("user/checkLogin", {})
            .then(res => {
              if (state.user.userId) {
                next();
              } else {
                next(pathMap.activity);
              }
            })
            .catch(err => {
              next(pathMap.activity);
            });
        } else {
          next();
        }
      }
      break;
    case userType.admin:
      if (!getByKey(to, "uncheckLogin")) {
        if (!state.admin.adminId) {
          store
            .dispatch("admin/checkLogin", {})
            .then(res => {
              if (state.admin.adminId) {
                // 还需要校验角色权限
                next();
              } else {
                next(pathMap.adminLogin);
              }
            })
            .catch(err => {
              next(pathMap.adminLogin);
            });
        } else {
          // 还需要检查角色权限
          next();
        }
      }
      break;
    default:
      next(pathMap.activity);
      break;
  }
});

function getByKey(to, key) {
  return to.meta && to.meta.routeConfig && to.meta.routeConfig[key];
}

export default router;
