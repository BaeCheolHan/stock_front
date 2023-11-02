import {createStore} from 'vuex'

export default createStore({
    state: {
        info: {
            isMobile:  true,
            subDomain: undefined
        },
        userInfo: null
    },
    getters : {
        info:       function(state) { return state.info; },
        userInfo:   function(state) { return state.userInfo; },
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        removeUserInfo(state) {
            state.userInfo = null;
        }
    },
    actions: {
    },
    modules: {
    }
})