<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in eventsOfPage" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link id="page-prev" rel="prev" :to="{name: 'EventList', query: {page: page - 1}}" v-show="page > 1">&#60; Previous </router-link>

      <router-link id="page-next" rel="next" :to="{name: 'EventList', query: {page: page + 1}}" v-show="hasNextPage"> Next &#62; </router-link>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import NProgress from 'nprogress'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  props: ['page'],
  data() {
    return {
      eventsOfPage: null,
      pageSize: 2,
      totalEvents: 0,
    }
  },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / 2)

      return this.page < totalPages
    },
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start()
    console.log('beforeRouteEnter page: ', routeTo.query.page)
    EventService.getEvents(2, routeTo.query.page)
      .then((response) => {
        next((viewModel) => {
          viewModel.eventsOfPage = response.data
          viewModel.totalEvents = response.headers['x-total-count']
        })
      })
      .catch((error) => {
        console.log(error)
        next({name: 'NetworkError'})
      })
      .finally(() => {
        NProgress.done()
      })
  },
  beforeRouteUpdate(routeTo) {
    NProgress.start()
    console.log('beforeRouteUpdate page: ', routeTo.query.page)
    EventService.getEvents(2, routeTo.query.page)
      .then((response) => {
        this.eventsOfPage = response.data
        this.totalEvents = response.headers['x-total-count']
      })
      .catch((error) => {
        console.log(error)
        return {name: 'NetworkError'}
      })
      .finally(() => {
        NProgress.done()
      })
  },
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
