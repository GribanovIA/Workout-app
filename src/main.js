import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


//Импорт плагинов

//Импорт глобальных компонентов - например лоадер

//Фильтры

//Директивы

Vue.config.productionTip = false
Vue.use('');
Vue.component();
Vue.filter();
Vue.directive();

const firebaseConfig = {
    apiKey: "AIzaSyDKgyo_mPn2B5s4x_MOclUwT1_foVisjfQ",
    authDomain: "workout-a0171.firebaseapp.com",
    databaseURL: "https://workout-a0171.firebaseio.com",
    projectId: "workout-a0171",
    storageBucket: "workout-a0171.appspot.com",
    messagingSenderId: "793155352576",
    appId: "1:793155352576:web:3b838b677f887925bb40e5",
    measurementId: "G-XV00KY1EVQ"
};

//Инициализация firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Инициализируем приложение только один раз
let app;

firebase.auth().onAuthStateChanged(()=>{
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})



