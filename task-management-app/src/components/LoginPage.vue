<template>
  <div>
    <div>
      <label for="uname"><b>Username</b></label>
      <input v-model="userName" type="text" placeholder="Enter Username" name="uname">
    </div>
    <div>
      <label for="pwd"><b>Password</b></label>
      <input v-model="password" type="password" placeholder="Enter Password" name="pwd">
    </div>

    <button @click="login">Login</button>
  </div>
</template>

<script>
import { LOGIN } from '../constants/actions';

export default {
  data() {
    return {
      userName: '',
      password: '',
    };
  },
  methods: {
    login() {
      const user = {
        name: this.userName,
        password: this.password,
      };
      this.$store.dispatch(LOGIN, user);
    },
  },
};
</script>

<style scoped>
</style>
