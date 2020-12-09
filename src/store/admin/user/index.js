import CRPC from '@crpc';

const userManage = {
    namespaced: true,
    state: {
        userList: [],
        count: 0,
    },
    mutations: {
        setUserData(state, data) {
            if(data) {
                state.userList = data.infos;
                state.count = data.count || 0;
            }
        }
    },
    actions: {
        async getUserList({ commit }, data) {
            const path = 'user/getUserList';
            const { reqJson = {}, context } = data;
            try {
                const res = await CRPC.newRequest({
                    ...data,
                    data: reqJson,
                    path
                });
                commit('setUserData', res);
                return Promise.resolve(res);
            } catch(err) {
                return Promise.reject(err);
            }
        },
        async deleteUser ({ commit }, data) {
            const path = 'user/deleteUser';
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
        },
        async authManage ({ commit }, data) {
            const path = 'user/authManage';
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
        },
    },
    getters: {

    }
};
export default userManage;