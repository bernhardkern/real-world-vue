<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link id="page-prev" rel="prev" :to="{name: 'EventList', query: {page: page - 1}}" v-show="page > 1">&#60; Previous </router-link>

      <router-link id="page-next" rel="next" :to="{name: 'EventList', query: {page: page + 1}}" v-show="hasNextPage"> Next &#62; </router-link>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import {mapState} from 'vuex'
import {watchEffect} from 'vue'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  props: ['page'],
  data() {
    return {
      pageSize: 2,
      firstPage: 1,
    }
  },
  computed: {
    ...mapState(['totalEvents', 'events']),
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / this.pageSize)

      return this.page < totalPages
    },
  },

  created() {
    watchEffect(() => this.$store.dispatch('fetchEvents', this.$route.query.page || this.firstPage))
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
