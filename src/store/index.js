import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        photos: {}
    },
    mutations: {
        user (state, data) {
            for (const key of Object.keys(data)) {
                state.user[key] = data[key]
            }
        },
        photos (state, data) {
            for (const key of Object.keys(data)) {
                state.photos[key] = data[key]
            }
        }
    },
    actions: {
    },
    modules: {
    }
})
