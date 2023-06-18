import {createStore} from 'vuex'

export default createStore({
    state: {
        info: {
            isMobile:  true,
            subDomain: undefined
        },
        token: null
    },
    getters : {
        info:   function(state) { return state.info; },
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        }
    },
    actions: {
    },
    modules: {
    }
})