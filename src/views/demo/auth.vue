<template>
  <div class="model">
    <div>
		<el-button type="primary" @click="getToken">获取token</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {

    },
    data() {
      return {

      }
    },
    created() {

    },
    methods: {
      async getToken(){
        let token = await this.$Api.post({url:"/project/findall",data:{}});
        console.log(token);
      }
    }
  }
</script>

<style lang="scss">
  .model {

  }
</style>
