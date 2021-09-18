<template>
  <div class="hello">
      <router-link type="primary" :to="{path:'demo'}">页面配置</router-link>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .hello{
    padding: 20px;
    text-align: center;
  }
</style>
