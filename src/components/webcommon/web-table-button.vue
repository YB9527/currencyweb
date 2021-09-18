<template>
  <div class="webtablebuttonvue">
    <div class="btn"  v-if="addshow" @click="addClick()"> {{addtxt}}</div>

    <div class="btn" :class="{active:currentstate.value === selectflag}" v-if="selectshow" @click="okClick(selectflag)">{{selecttxt}}</div>
    <div class="btn" :class="{active:currentstate.value === updateflag}" v-if="updateshow" @click="okClick(updateflag)">{{updatetxt}}</div>
    <div class="btn" :class="{active:currentstate.value === deleteflag}" v-if="deleteshow" @click="okClick(deleteflag)">{{deletetxt}}</div>

  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      currentstate:{
        type:Object,
        default:()=>{
          return{
            value:undefined,
          }
        }
      },
      active:{
        type:String,
        default:'active'
      },
      selectshow:{
        type:Boolean,
        default:true,
      },
     selecttxt: {
        type: String,
        default: "查看"
      },
      addshow:{
        type:Boolean,
        default:true,
      },
      addtxt: {
        type: String,
        default: "添加"
      },
      updateshow:{
        type:Boolean,
        default:true,
      },
      updatetxt: {
        type: String,
        default: "修改"
      },
      deleteshow:{
        type:Boolean,
        default:true,
      },
      deletetxt: {
        type: String,
        default: "删除"
      },
    },
    data() {
      return {
        selectflag:"select",
        addflag:"add",
        updateflag:"update",
        deleteflag:"delete",
      }
    },
    computed: {

    },
    watch: {

    },
    created() {

    },
    methods: {
      addClick(){
        this.$emit("add");
      },
      okClick(flag){
        if( this.currentstate.value === flag){
          this.currentstate.value = undefined;
        }else{
           this.currentstate.value = flag;
        }
      },
    }
  }
</script>

<style lang="scss">
  .webtablebuttonvue {
    display: flex;
    height: 30px;
    .btn{
      width: 100px;
      background: #f1f1f1;
      height: 100%;
      color: #2f2e0f;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #FFFFFF;
    }
    .btn:hover{
      background-color: var(--hovercolor);
      color: #FFFFFF;
      cursor: pointer;
    }
    .btn.active{
      background-color: var(--primary)!important;
      color: #FFFFFF !important;
    }

    .suoding{
      color: #333;
      cursor: pointer;
    }
    .suoding.active{
         color: var(--primary) !important;
    }
  }
</style>
