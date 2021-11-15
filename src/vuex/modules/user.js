import * as userAPI from '@/api/user'

const module = {
    namespaced: true,
    state: () => ({
        followers: [], // 关注人
        following: [], // 粉丝
    }),
    mutations: {
        setFollowers(state, data) {
            state.followers = data
        },

        setFollowing(state, data) {
            state.following = data
        }
    },
    actions: {
        async getFollowers({ commit }) {
            const users = await userAPI.getFollowers()
            commit('setFollowers', users)
        },

        async getFollowingList({ commit }) {
            const users = await userAPI.getFollowingList()
            commit('setFollowing', users)
        }
    }
}

export default module