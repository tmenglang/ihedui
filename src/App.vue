<template>
  <div id="app">
    <app-header v-on:titleChanged="updateTitle($event)" v-bind:title="title"></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'app',
  data() {
    return {
      title: "1112"
    }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  created() {
    if (localStorage.iToken) {
      // this.$store.dispatch('UserLogin', localStorage.iToken);
      // this.$store.dispatch('UserName', localStorage.userName)
    }
  },
  methods: {
    isEmpyt(value) {
      return (value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)); 
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  background: #000032;
  font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,PingFangSC-Regular,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}
h1, h2, h3, p {
  margin: 0;
  padding: 0;
}
</style>
