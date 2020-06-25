import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import moment from 'moment'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.moment = moment

new Vue({
    store,
    el: '#app',
    render: h => h(App),
    router,
    // components: { App },
    template: '<App/>',
})



