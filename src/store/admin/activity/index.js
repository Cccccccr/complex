import CRPC from '@crpc';

const adminActivity = {
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
            }
        }
    },
    actions: {
        async getActivityList({ commit }, data) {
            const path = 'admin/getActivityList';
            const { reqJson = {}, context } = data;
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
        async reviewActivity({ commit }, data) {
            const path = 'admin/reviewActicity';
            const { reqJson = {}, context } = data;
            try {
                const res = await CRPC.newRequest({
                    ...data,
                    data: reqJson,
                    path
                });
                return Promise.resolve(res);
            } catch(err) {
                return Promise.reject(err);
            }
        }
    },
    getters: {

    }
};
export default adminActivity;