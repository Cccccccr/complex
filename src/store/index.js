import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import admin from './admin';
import activity from './modules/activity';
import adminActivity from './admin/activity';
import userManage from './admin/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    admin,
    activity,
    adminActivity,
    userManage,
  }
});
