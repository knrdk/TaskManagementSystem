<template>
  <div id="app">
    <div v-if="isAuthenticated">
      <div  id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/statusBoard">Board</router-link>
      </div>
      <router-view/>
    </div>
    <LoginPage v-if="!isAuthenticated" />
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue';
import { LOAD_TOKEN_FROM_LOCAL_STORAGE } from './constants/actions';

export default {
  components: { LoginPage },
  computed: {
    isAuthenticated() {
      return this.$store.state.authentication.isAuthenticated;
    },
  },
  created() {
    this.$store.dispatch(LOAD_TOKEN_FROM_LOCAL_STORAGE);
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
