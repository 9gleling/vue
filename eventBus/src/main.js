import Vue from 'vue'
import App from './App'
import router from './router/index'
import moment from 'moment'
// import eventBus from './plugins/directives';

Vue.config.productionTip = false
Vue.prototype.moment = moment

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    // components: { App },
    template: '<App/>',
})



