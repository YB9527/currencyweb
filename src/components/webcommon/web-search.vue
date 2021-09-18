<template>
	<div class="websearchvue">
      <slot name="search">
        <el-input
          v-model="data.value"
          :placeholder="placeholder"
          clearable
          @clear="clear"
          @keyup.enter.native="searchOk(data.value)"></el-input>
        <el-button type="primary" @click="searchOk(data.value)" icon="el-icon-search">{{searchtext}}</el-button>
      </slot>
	</div>
</template>

<script>
	export default {
    props:{
      data:{
        type:Object,
        default:()=>{
          return {value:undefined}
        }
      },
      placeholder:{
        type:String,
        default:'检索'
      },
      searchtext:{
        type:String,
        default:'查询'
      },
      event:{
        type:Object,
        default:()=>{
          return {
            ok:Function,
            clear:Function,
          }
        }
      }
    },
		components:{},
		data() {
			return {

			}
		},
		watch:{

		},
		created() {

		},
		methods:{
      searchOk(value){
        this.event.ok &&  this.event.ok(value);
      },
      clear(){
        this.event.clear &&  this.event.clear();
      }
		}
	}
</script>

<style lang="scss">
  .websearchvue{
    display: flex;
    .el-input{
      width: 300px;
    }
    .el-input__inner{
      border-radius: 4px 0 0 4px;
    }
    .el-button{
       border-radius: 0 4px  4px 0;
    }
  }
</style>
