<template>
  <p>Register for the event</p>
  <button @click="register">register</button>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'],
  methods: {
    register() {
      this.GStore.flashMessage = 'You have registered successfully to ' + this.event.title

      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)

      console.log('successfully registered (no api yet)')
      this.$router.push({name: 'EventDetails'})
    },
  },
}
</script>
