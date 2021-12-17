<template>
  <div class="web-custom-list">
	<div class="list" v-if="datas.length > 0">
		<div class="listitem" :class="{active:currentitem === item}" v-for="(item,index) in datas" :key="index"  @click="currentitem = item">
			<slot  name="listitem"  :index="index" :item="item" :datas="datas"></slot>
		</div>
		<!-- <component  :is="comp" v-if="comp"></component> -->
	</div>
	<div class="nodata" v-else>
		暂无数据
	</div>
    <el-pagination :page-sizes="pagesizes" layout="total,sizes, prev, pager, next,jumper"
      v-show="total >= 0" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentpage" :page-size.sync="pagesize" :total="total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    props: {
		itemSrc:String,
		datas: {
        // 表格数据源 默认为空数组
			type: Array,
			default: () =>
			  [
				{id:"1",label:"aaa",des:"道可道非常道"},
				{id:"2",label:"aaa",des:"道可道非常道"},
				{id:"3",label:"aaa",des:"道可道非常道"},
				{id:"4",label:"aaa",des:"道可道非常道"},
				{id:"5",label:"aaa",des:"道可道非常道"},
			  ]
      },
      total:{
        type:Number,
        default:-1,
      },
      event:{
        type:Object,
        default:()=>{
          return {
            handleCurrentChange: (index,callback) => {},
            pageSizeChange:(size,callback)=>{},
          }
        }
      },
      pagesizes: {
        type: Array,
        default: () => [5,10, 15, 20, 50],
      },
    },
    data() {
      return {
        currentpage: 1,
        pagesize:this.pagesizes[2],
		comp: undefined,
		currentitem:"",
      }
    },
	created() {
		this.init();
	},
    methods: {
		init(){
			let src = this.itemSrc;
			/* if(src){
				let res=  require(`@/${src}.vue`);
				this.comp=res.default;
			} */
		},
      // 正常
      handleSelectionChange(val) {
        this.$emit("handleSelectionChange", {
          val: val
        });
      },
      // 正常
      clickTable(row, column, event) {
        let index;
        for (var i = 0; i < this.datas.length; i++) {
          if (row === this.datas[i]) {
            index = i;
          }
        }
        this.event.itemClick && this.event.itemClick(index, row);
      },
      handleSizeChange(pagesize) {
		 
        this.event.handleCurrentChange
          && this.event.handleCurrentChange(1,pagesize,this.reFushData);
      },
      handleCurrentChange(pageindex) {
         this.event.handleCurrentChange 
					&& this.event.handleCurrentChange(pageindex,this.pagesize,this.reFushData);
      },
      /**刷新数据
       * @param {Object} datas
       */
      reFushData(datas){
        this.$Tool.arrayReplace(this.datas,datas);
      },
    },
  }
</script>
<style lang="scss" scoped>
	.web-custom-list{
		.active{
			border: 1px solid var(--primary);
		}
		.nodata{
		text-align: center;
		min-height: 200px;
		line-height: 200px;
		color: #999;
		}
	}
 
</style>
