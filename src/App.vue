<template>
  <div id="app">   
    <router-view></router-view>
    <!-- <Home /> -->
  </div>
</template>

<script>
import Rune from './components/Rune.vue'
import Home from './components/Home.vue'
import Artifact from './components/Artifact.vue'


export default {
  name: 'app',
  // components: {
  //   Home
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  
}
</style>
