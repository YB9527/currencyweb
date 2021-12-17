<template>
  <div class="webform" :class="config.class">
    <!-- <div class="title" v-if="title">
      {{ title }}
    </div> -->
    <div
      :class="config.rowcolass?config.rowcolass:'modulerow'"
      v-for="(module, index) in moduleArray"
      :key="index">
        <div class="moduletitle">{{module.title}}</div>
        <div :class="module.class" v-if="module.type === 'slot'" >
          <slot :module="module" :data="data"></slot>
        </div>
        <div v-else class="itemarray">

          <div class="module " v-if="!(item.show === false)" :style="{width: item.type !== 'slot'?100/(item.rowcount?item.rowcount:rowcount)+'%':'100%'}"  v-for="(item, childindex) in module.array" :key="index * 100 + childindex">
             <myformItem    :column="item" :data="data"></myformItem>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myformItem from "./form/FormItem.vue";
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
    
  }
};
</script>

<style lang="scss" scoped>
  .webform{
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
		.module{
			margin-top: 5px;
			margin-bottom: 5px;
		}
  }
  

</style>
