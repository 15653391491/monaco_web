import * as API from '@/api/monico/home'

const module = {
    namespaced: true,
    state: () => ({
        topics: [],
    }),
    mutations: {
        setTopics(state, data) {
            state.topics = data
        },
    },
    actions: {
        async getTopics({ commit }) {
            commit('setTopics', await API.getTipic().then(res => res?.data?.data || []))
        },
    }
}

export default module