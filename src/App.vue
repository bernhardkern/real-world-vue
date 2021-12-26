<template>
  <div id="app">
    <div id="flashMessage" v-if="flashMessage">
      {{ flashMessage }}
    </div>
    <div id="nav">
      <router-link :to="{name: 'EventList'}">Events</router-link> |
      <router-link :to="{name: 'About'}">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: mapState(['flashMessage']),
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 4s;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
