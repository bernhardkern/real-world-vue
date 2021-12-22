<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in eventsOfPage" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link id="page-prev" rel="prev" :to="{name: 'EventList', query: {page: page - 1}}" v-if="page > 0">&#60; Previous</router-link>

      <router-link id="page-next" rel="next" :to="{name: 'EventList', query: {page: page + 1}}" v-if="hasNextPage">Next &#62; </router-link>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import {watchEffect} from 'vue'

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
      totalCount: 0,
    }
  },
  computed: {
    hasNextPage() {
      return this.page < Math.ceil(this.totalCount / this.pageSize)
    },
  },
  created() {
    watchEffect(() => {
      console.log('page in list: ', this.page)
      this.eventsOfPage = null
      EventService.getEvents(this.pageSize, this.page)
        .then((response) => {
          this.eventsOfPage = response.data
          this.totalCount = response.headers['x-total-count']
        })
        .catch((error) => {
          console.log(error)
        })
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
