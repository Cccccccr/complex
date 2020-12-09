import CRPC from '@crpc';

const activity = {
    namespaced: true,
    state: {
        activityList: [],
        count: 0,
    },
    mutations: {
        setActivityData(state, data) {
            if(data) {
                state.activityList = data.infos;
                state.count = data.count || 0;
                console.log(data);
            }
        }
    },
    actions: {
        async getActivityList({ commit }, data) {
            const path = 'user/getActivityList';
            const { reqJson, context } = data;
            try {
                const res = await CRPC.newRequest({
                    ...data,
                    data: reqJson,
                    path
                });
                commit('setActivityData', res);
                return Promise.resolve(res);
            } catch(err) {
                return Promise.reject(err);
            }
        },
        async createActivity({ commit }, data) {
            const path = 'activity/create';
            try {
                const res = await CRPC.newRequest({
                    ...data,
                    data: {},
                    path
                });
                return Promise.resolve(res);
            } catch(err) {
                return Promise.reject(err);
            }
        },
        async activityLike({ commit }, data) {
            const path = 'activity/like';
            try {
                const res = await CRPC.newRequest({
                    ...data,
                    data: {},
                    path
                });
                return Promise.resolve(res);
            } catch(err) {
                return Promise.reject(err);
            }
        },
        async activityFavorite({ commit }, data) {
            const path = 'activity/favorite';
            try {
                const res = await CRPC.newRequest({
                    ...data,
                    data: {},
                    path
                });
                return Promise.resolve(res);
            } catch(err) {
                return Promise.reject(err);
            }
        },
        async activityDetele({ commit }, data) {
            const path = 'activity/delete';
            try {
                const res = await CRPC.newRequest({
                    ...data,
                    data: {},
                    path
                });
                return Promise.resolve(res);
            } catch(err) {
                return Promise.reject(err);
            }
        },
    },
    getters: {

    }
};
export default activity;