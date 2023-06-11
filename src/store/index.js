import {createStore} from 'vuex'

export default createStore({
    state: {
        info: {
            isMobile:  true,
            subDomain: undefined
        },
    },
    getters : {
        info:   function(state) { return state.info; },
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})