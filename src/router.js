import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Settings from './views/Settings.vue'
import Card from './views/Card.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      beforeEnter(routeTo, routeFrom, next) {
        if (store.getters['loggedIn']) {
          next('/dashboard')
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/card',
      name: 'card',
      component: Card,
      props: true,
      meta: {
        requiresAuth: true
      },
      beforeEnter(routeTo, routeFrom, next) {
        if (!routeTo.params.card) {
          next({ name: 'dashboard' })
        } else {
          next()
        }
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
