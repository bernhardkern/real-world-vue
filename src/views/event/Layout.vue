<template>
  <div v-if="event">
    <h1>{{ event.title }} with id {{ $route.params.id }}</h1>
    <div id="nav">
      <router-link :to="{name: 'EventDetails', props: {id: id}}">Details</router-link>
      |
      <router-link :to="{name: 'EventRegister', props: {id: id}}">Register</router-link>
      |
      <router-link :to="{name: 'EventCreate', props: {id: id}}">Create</router-link>
      |
      <router-link :to="{name: 'EventEdit', props: {id: id}}">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: ['id'],
  computed: mapState(['event']),
  created() {
    this.$store.dispatch('fetchEvent', this.id)
  },
}
</script>
