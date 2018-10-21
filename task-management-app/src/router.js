import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/HomePage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/statusBoard',
      name: 'statusBoard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/StatusBoard.vue'),
      children: [
        {
          path: '/statusBoard/:todoId',
          name: 'todoDetails',
          component: () => import(/* webpackChunkName: "about" */ './components/TodoDetails.vue'),
        },
      ],
    },
  ],
});
