import CRPC from '@crpc';

const user = {
    namespaced: true,
    state: {
        userId: '',
        email: '',
        name: '',
        avatar: '',
        phone: '',
        commitScore: '',
        commitAuth: '',
        activityScore: '',
        activityAuth: ''
    },
    mutations: {
        setUserData(state, data) {
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
        async userLogin({ commit }, data) {
            const path = 'user/login';
            const { reqJson, context } = data;
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
        async checkLogin({ commit }, data) {
            const path = 'user/checkLogin';
            try {
                const res = await CRPC.newRequest({
                    ...data,
                    data: {},
                    path
                });
                commit('setUserData', res);
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