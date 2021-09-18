<template>
	<div class="webpagevue">
    <el-button type="warning" @click="newData">创建对象</el-button>
		<div class="search">
      <websearch  v-bind="search" :event="searchEvent"></websearch>
      <webtablebutton v-bind="tablebutton" :currentstate="tablestate" @add="addData()" ></webtablebutton>
		</div>
    <div class="table">
      <webtable :total="91" :datas="dataArray" :columns="columns"  :event="tableEvent" ></webtable>
    </div>
    <div class="dialog">
       
      <webdialog :dialog="dialog" >
        <webform slot="body" ></webform>
      </webdialog>
    </div>
	</div>
</template>

<script>
  import websearch from './web-search.vue'
  import webtablebutton from './web-table-button.vue'
  import webtable from './web-table.vue'
  import webdialog from './web-dialog.vue'
  import webform from './web-form.vue'

  import FormData from './form/Formdata.js'

	export default {
		components:{websearch,webtablebutton,webtable,webdialog,webform},
    props:{
      search:Object,
      dataArray:Array,
      columns:Array,
      formdata:FormData,
      tablebutton:{
        type:Object,
        default:()=> {
          return {selectshow:true,addshow:true,updateshow:true,deleteshow:true};
        }
      },
    },
		data() {
			return {
         tablestate:{
           select:"select",
           add:"add",
           update:"update",
           delete:"delete",
           value:undefined,
         },
         searchEvent:{
           ok:(value)=>{
            //console.log("查询",value);
            this.$emit("searchOk",value,this.reFushData);
           },
           clear:()=>{
              //console.log("清除");
              this.$emit("clear",this.reFushData);
           }
         },
         /**刷新数据
          * @param {Object} datas
          */
         reFushData(datas){
           this.$Tool.arrayReplace(this.datas,datas);
         },
         tableEvent:{
           itemClick:this.tableItemClick,
           handleCurrentChange:async (index,datacallback) => {
              this.$emit("findData",index,datacallback);

           },
           pageSizeChange:async (size,datacallback) => {
              this.$emit("initFindData",size,datacallback);
           },
         },
         dialog:{
           title:"添加",
           show:false
         }
			}
		},
		computed:{

		},
		watch:{

		},
		created() {

		},
		methods:{
      newData(){
        let data = new FormData();
        console.log(data.sum(1,2));
      },
      tableItemClick(index,data){
        let tablestate = this.tablestate;
        if(!tablestate.value){
          return;
        }
        switch(tablestate.value){
          case tablestate.select:
            this.selectData(index,data);
            break;
          case tablestate.add:
            this.addData(index,data);
            break;
          case tablestate.update:
            this.updateData(index,data);
            break;
          case tablestate.delete:
            this.deleteData(index,data);
            break;
        }
      },
      selectData(index,data){
        console.log("查看对象",index,data);
      },
      addData(){
        console.log("添加对象");
        this.dialog.show = true;
      },
      updateData(index,data){
        console.log("修改对象",index,data);
      },
      deleteData(index,data){

      },
		}
	}
</script>

<style lang="scss">
  .webpagevue{
    height: 100%;
    width: 100%;
    background-color: #F1F1F1;

    .search{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: 40px;
    }
  }
</style>
