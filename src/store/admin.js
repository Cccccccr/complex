import CRPC from '@crpc';

const user = {
    namespaced: true,
    state: {
        adminId: '',
        account: '',
        role: '',
    },
    mutations: {
        setAdminData(state, data) {
            if(data) {
                Object.keys(data).forEach(key => {
                    if(data[key] && state[key] !== undefined) {
                        state[key] = data[key];
                    }
                });
            }
        }
    },
    actions: {
        async adminLogin({ commit }, data) {
            const path = 'admin/login';
            const { reqJson, context } = data;
            try {
                const res = await CRPC.newRequest({
                    ...data,
                    data: reqJson,
                    path
                });
                commit('setAdminData', res);
                return Promise.resolve(res);
            } catch(err) {
                return Promise.reject(err);
            }
        },
        async checkLogin({ commit }, data) {
            const path = 'admin/checkLogin';
            try {
                const res = await CRPC.newRequest({
                    ...data,
                    data: {},
                    path
                });
                commit('setAdminData', res);
                return Promise.resolve(res);
            } catch(err) {
                return Promise.reject(err);
            }
        }
    },
    getters: {

    }
};
export default user;