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
      component: ()=> import("./views/Home.vue")
    }
  ]
})

// Действия с роутером

//

export default router;
