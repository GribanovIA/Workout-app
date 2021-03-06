import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';

Vue.use(Router);

// Записываем в переменную т.к. возможны доп. манипуляции с роутером
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main',
      auth: true,
    },
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'empty',
    },
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/registration',
    name: 'registration',
    meta: {
      layout: 'empty',
    },
    component: () => import('./views/Registration.vue'),
  },
  {
    path: '/newGoals',
    name: 'New Goals',
    meta: {
      layout: 'main',
      auth: true,
    },
    component: () => import('./views/NewGoals.vue'),
  },
  {
    path: '/newGoals/:workoutName',
    name: 'New Goal',
    meta: {
      layout: 'main',
      auth: true,
    },
    component: () => import('./views/EditGoal.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    meta: {
      layout: 'main',
      auth: true,
    },
    component: () => import('./views/Calendar.vue'),
  },
  {
    path: '/calendar/:date',
    name: 'CalendarDate',
    meta: {
      layout: 'main',
      auth: true,
    },
    component: () => import('./views/CalendarDate.vue'),
  },
  {
    path: '/createWorkout',
    name: 'Create Workout',
    meta: {
      layout: 'main',
      auth: true,
    },
    component: () => import('./views/CreateWorkout.vue'),
  },
  {
    path: '/workout',
    name: 'Workout',
    meta: {
      layout: 'main',
      auth: true,
    },
    component: () => import('./views/Workout.vue'),
  },
  {
    path: '/allTrainings',
    name: 'All Trainings',
    meta: {
      layout: 'main',
      auth: true,
    },
    component: () => import('./views/AllTrainings.vue'),
  },

  ],
});

// Действия с роутером

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requireAuth = to.matched.some(record => record.meta.auth);
  if (requireAuth) {
    if (currentUser) {
      next();
    } else {
      next({
        path: '/login',
      });
    }
  } else {
    next();
  }
});

//

export default router;
