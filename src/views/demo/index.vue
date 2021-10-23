<template>
  <div class="hello">
    <div> <router-link type="primary" :to="{path:'/demo/config'}">页面配置</router-link></div>
    <div><router-link type="primary" :to="{path:'/demo/webtool'}">WEBTOOL</router-link></div>
    <div><router-link type="primary" :to="{path:'/demo/container'}">布局配置</router-link></div>
    <div><router-link type="primary" :to="{path:'/demo/auth'}">权限测试</router-link></div>



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
