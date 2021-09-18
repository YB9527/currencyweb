<template>
  <div :class="config.class">
    <div class="title" v-if="title">
      {{ title }}
    </div>
    <div
      :class="config.rowcolass?config.rowcolass:'modulerow'"
      v-for="(module, index) in moduleArray"
      :key="index">
        <div class="moduletitle">{{module.title}}</div>
        <div :class="module.class" v-if="module.type === 'slot'" >
          <slot ></slot>
        </div>
        <div v-else class="itemarray">

          <div class="module " :style="{width:item.type !== 'slot'?100/rowcount+'%':'100%'}"  v-for="(item, childindex) in module.array" :key="index * 100 + childindex">
             <myformItem   :column="item" :data="data"></myformItem>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myformItem from "./form/formItem.vue";
export default {
  props: {
    data: {
      type:Object,
      default:()=>{
        return {}
      }
    },
    rowcount:{
      type:Number,
      default:2
    },
    config:{
      type:Object,
      default:()=>{
        return {
          class:"webform",
        }
      }
    },

    title:String,
    moduleArray: {
      type:Array,
      default:()=>{
        return [
          {
            title: "我是模块标题",
            titleclass: "",
            class: "",

            array: [
              {
                type: "slot",
                name:"title",
                title: "户主信息"
              },
              {
                type: "input",
                class: "row",
                labelclass: "",
                valueclass: "",
                text: "户主姓名1333",
                prop: "sqhhzxm",
                error: "",
                check(value){
                  console.log(11,value);
                  return "aa";
                }
              },
              {
                type: "input",
                class: "row",
                labelclass: "",
                valueclass: "",
                text: "户主姓名2",
                prop: "sqhhzxm",
                error: "",
              },
              {
                type: "input",
                class: "row",
                labelclass: "",
                valueclass: "",
                text: "户主姓名3",
                prop: "sqhhzxm",
                error: "",
              },
              {
                type: "input",
                class: "row",
                labelclass: "",
                valueclass: "",
                text: "户主姓名4",
                prop: "sqhhzxm",
                error: "",
              },
              ],
          },
          {
            title: "我是模块标题",
            titleclass: "",
            class: "",
            array: [
              {
                type: "slot",
                name:"title",
                title: "户主信息"
              },
              {
                type: "input",
                class: "row",
                labelclass: "",
                valueclass: "",
                text: "户主姓名",
                prop: "sqhhzxm",
                error: "",

              },
              {
                type: "input",
                class: "row",
                labelclass: "",
                valueclass: "",
                text: "户主姓名2",
                prop: "sqhhzxm",
                error: "",
              },
              {
                type: "input",
                class: "row",
                labelclass: "",
                valueclass: "",
                text: "户主姓名3",
                prop: "sqhhzxm",
                error: "",
              },
              {
                type: "input",
                class: "row",
                labelclass: "",
                valueclass: "",
                text: "户主姓名4",
                prop: "sqhhzxm",
                error: "",
              },
              ],
          },
          {
            title: "我是模块标题",
            titleclass: "",
            class: "",

            array: [
              {
                type: "slot",
                name:"title",
                title: "户主信息"
              },
              {
                type: "input",
                class: "row",
                labelclass: "",
                valueclass: "",
                text: "户主姓名13333333",
                prop: "sqhhzxm",
                error: "",
              },
              {
                type: "input",
                class: "row",
                labelclass: "",
                valueclass: "",
                text: "户主姓名2",
                prop: "sqhhzxm",
                error: "",
              },
              {
                type: "input",
                class: "row",
                labelclass: "",
                valueclass: "",
                text: "户主姓名3",
                prop: "sqhhzxm",
                error: "",
              },
              {
                type: "input",
                class: "row",
                labelclass: "",
                valueclass: "",
                text: "户主姓名4",
                prop: "sqhhzxm",
                error: "",
              },
              ],
          }
        ]
      }
    }
  },
  components: { myformItem },
  created() {
    this.test();
  },
  data() {
    return {

    }
  },
  methods:{
    test(){

    },
    check(){
    	let flag = true;
    	for (let module of this.moduleArray) {
    		if(module.show === false){
    			continue;
    		}
    		for(let item of module.array){
    			if(item.show === false){
    				continue;
    			}
    			let error = this.childCheck(item);
    			if(error){
    				flag = false;
    			}
    		}
    	}
    	if(!flag){
    		return false;
    	}else{
    		return true;
    	}
    },
    childCheck(item){
    	let data = this.data;
    	let error="";
    	if(item.check && item.prop){
    		if(item.check instanceof Array){
    			error  = item.check[0](this.data[item.prop],item.check[1]);
    		}else{
    			error  = item.check(this.data[item.prop]);
    		}
    	}
    	item.error = error;
    	return error;
    }
  }
};
</script>

<style lang="scss" >
  .webform{

  }
  .itemarray{
    display: flex;
    flex-wrap: wrap;
  }
  .modulerow{
      padding: 5px;
      border-radius: 5px;
      box-shadow: 2px 2px 2px  2px rgba(0, 0, 0, 0.1);
      margin-bottom: 10px;
  }
.label-input {
  color: #999999;
  font-size: 14px;
  margin-right: 20px;
}
.drawercontent .formitem {
  margin-bottom: 10px;
  height: 40px;
}

.el-row {
  display: flex;
  align-items: center;
}

div {
  word-break: break-word;
}
.box{
  padding: 5px;
}
.box .formitem {
  height: 30px;
  margin: 10px;
}
.title {
  font-size: 18px;
  line-height: 40px;
}
.moduletitle{
  border-left: 3px solid var(--primary);
  color: #333;
  font-weight: 500;
  padding-left: 3px;
  letter-spacing: 2px;
}
</style>
