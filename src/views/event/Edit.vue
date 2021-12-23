<template>
  <div v-if="event">
    <p>Edit the event</p>
  </div>
</template>

<script>
export default {
  props: ['event'],
  data() {
    return {
      unsavedChanges: true,
    }
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.unsavedChanges) {
      const answer = window.confirm('Do you really want to leave? You have unsaved changes!')
      if (answer) {
        next() // <-- Confirms the navigation
      } else {
        next(false) // <-- Cancels the navigation
      }
    } else {
      next() // <-- Confirms the navigation
    }
  },
}
</script>
