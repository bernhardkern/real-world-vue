<template>
  <p>Register for the event</p>
  <button @click="register">register</button>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    register() {
      this.$store.dispatch('displayFlashMessage', 'You have registered successfully to ' + this.event.title)
      console.log('successfully registered (no api yet)')
      this.$router.push({name: 'EventDetails'})
    },
  },
}
</script>
