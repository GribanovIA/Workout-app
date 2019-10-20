import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
// Подключаем дополнительные модули

//
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        message: 'Hello from vuex again',
        workouts: []
    },
    mutations: {
        addWorkout(state, payload){
            state.workouts.push(payload);
        }
    },
    actions: {

    },
    modules:{
        auth
    }
})
