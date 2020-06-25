import Vue from 'vue';
import Vuex from 'vuex';
import chatStore from './modules/chatStore';

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';


export default new Vuex.Store({
    
    modules: {
        chatStore,
    },
    strict: false,
    // plugin: debug ? [createLogger()] : []
});