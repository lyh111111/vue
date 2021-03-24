<template>
  <div class="error-404">
    <img :src="src" style="width: 600px;"/>
  </div>
</template>
<script>
export default {
  data(){
    return{
      src:require('../../assets/404.png'),
    }
  }
}
</script>
<style lang="scss" scoped>
.error-404 {
  margin: 50px;
  text-align: center;
}
</style>