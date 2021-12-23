<template>
  <h1>Opps</h1>
  <p>The {{ resource }} you are looking for is not available</p>
  <router-link :to="{name: 'EventList'}">Go back to the EventList</router-link>
</template>

<script>
export default {
  props: {
    resource: {
      required: true,
      default: 'page',
    },
  },
}
</script>
