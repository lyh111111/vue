<template>
  <div id="app">
      <h1>用户界面</h1>
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>
    <router-view></router-view>

    <router-view name="a"></router-view>
    <router-view name="b"></router-view>
  </div>
</template>

<script>

export default {
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
