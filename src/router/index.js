import {createRouter, createWebHistory} from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import NetworkError from '../views/NetworkError.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'

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

export default router
