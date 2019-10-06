import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Импорт плагинов

//Импорт глобальных компонентов - например лоадер

//Фильтры

//Директивы

Vue.config.productionTip = false
Vue.use('');
Vue.component();
Vue.filter();
Vue.directive();

// Инициализируем приложение только один раз
let app;
if(!app){
    app = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
}
