<template>
  <h1>Opps - a network error</h1>
  <h3>
    There was a network error, sorry, please try to go back with this link:
    <a href="#" @click="this.$router.go(-1)">click here</a>
  </h3>
</template>
