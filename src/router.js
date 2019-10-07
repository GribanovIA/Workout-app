import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Записываем в переменную т.к. возможны доп. манипуляции с роутером
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
          layout: 'main'
      },
      component: ()=> import("./views/Home.vue")
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            layout: 'empty'
        },
        component: ()=> import('./views/Login.vue')
    },
    {
        path: '/registration',
        name: 'registration',
        meta: {
            layout: 'empty'
        },
        component: ()=> import('./views/Registration.vue')
    },
    {
        path: '/newGoals',
        name: 'newGoals',
        meta: {
            layout: 'main'
        },
        component: () => import('./views/NewGoals.vue')
    },
    {
        path: '/calendar',
        name: 'calendar',
        meta: {
            layout: 'main'
        },
        component: () => import('./views/Calendar.vue')
    },
    {
        path: '/createWorkout',
        name: 'createWorkout',
        meta: {
            layout: 'main'
        },
        component: ()=> import('./views/CreateWorkout.vue')
    }

  ]
})

// Действия с роутером

//

export default router;
