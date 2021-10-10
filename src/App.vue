<template>
  <div id="app">
    <router-view v-if="show" />
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      show:false,
    }
  },
  created() {
    this.$Api.findConfig().then(res=>{
      this.show = true;
      console.log(this.$Api)
    });
  }
}
</script>

<style >
@import "../static/css/glob.css";
body {
    display: block;
    margin: 0px;
}
#app {

}
</style>
