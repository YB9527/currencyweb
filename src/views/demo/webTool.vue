<template>
  <div class="model">
    <div>
      <el-button type="primary" @click="showModalTip">showModalTip</el-button>
      <el-button type="primary" @click="notification">notification</el-button>
      <el-button type="primary" @click="message">message</el-button>
      <el-button type="primary" @click="showLoading">showLoading</el-button>
      <el-button type="primary" @click="hideLoading">hideLoading</el-button>
      <div class="st">ADGDGDGHJK</div>
      <div class="st"></div>
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
    computed: {

    },
    watch: {

    },
    filters: {

    },
    created() {

    },
    methods: {
      async showModalTip(){
        await this.$WebTool.showModalTip("a",123);

      },
      notification(){
        this.$WebTool.notification({
          title: 'Info',
          message: '这是一条没有关闭按钮的消息',
        });
      },
      message(){
        this.$WebTool.message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },
      showLoading(){
         this.$WebTool.showLoading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(()=>{
           this.$WebTool.hideLoading();
        },2000)
      },
      hideLoading(){
        this.$WebTool.hideLoading();
      }
    }
  }
</script>

<style lang="scss">
  .model {
    .st{
     
    }
  }
</style>
