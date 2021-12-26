import {createRouter, createWebHistory} from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventCreate from '../views/event/Create.vue'
import EventEdit from '../views/event/Edit.vue'
import NetworkError from '../views/NetworkError.vue'
import NotFound from '../views/NotFound.vue'
import NProgress from 'nprogress'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({page: parseInt(route.query.page) || 1}),
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'create',
        name: 'EventCreate',
        component: EventCreate,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: {requiresAuth: true},
      },
    ],
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => '/events/' + to.params.afterEvent,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/*webpackChunkName: "about"*/ '../views/About.vue'),
  },
  {
    name: 'NotFound',
    path: '/:catchAll(.*)',
    component: NotFound,
    props: {resource: 'page'},
  },
  {
    name: '404Resource',
    path: '/404/:resource',
    component: NotFound,
    props: true,
  },
  {
    name: 'NetworkError',
    path: '/network-error',
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
      }
    }
  },
})

router.beforeEach((to) => {
  NProgress.start()
  console.log('meta: ', to.meta)

  if (to.meta.requiresAuth) {
    store.state.flashMessage = 'this requires auth'
  }

  setTimeout(() => {
    store.state.flashMessage = ''
  }, 3000)
})
router.afterEach(() => {
  NProgress.done()
})

export default router
