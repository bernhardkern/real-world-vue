import {createRouter, createWebHistory} from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import NetworkError from '../views/NetworkError.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import NProgress from 'nprogress'
import GStore from '@/store'

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
    component: About,
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
})

router.beforeEach((to) => {
  NProgress.start()
  console.log('meta: ', to.meta)

  if (to.meta.requiresAuth) {
    GStore.flashMessage = 'this requires auth'
  }

  setTimeout(() => {
    GStore.flashMessage = ''
  }, 3000)
})
router.afterEach(() => {
  NProgress.done()
})

export default router
