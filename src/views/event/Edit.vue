<template>
  <div v-if="event">
    <p>Edit the event</p>
  </div>
</template>

<script>
export default {
  props: ['event'],
}
</script>
