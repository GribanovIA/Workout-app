import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import auth from './auth';
import workout from './workout';
// Подключаем дополнительные модули

//
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: 'Hello from vuex again',
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth,
    workout,
  },
});
