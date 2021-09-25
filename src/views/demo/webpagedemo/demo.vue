<template>
	<div class="atlaslistvue"  >
		<el-button type="primary" @click="test">测试</el-button>


		<webpage v-bind="webpage"
			ref="webpage"
			:type="2"
			@searchOk="searchOk"
			@searchClear="searchClear"
			@findData="findData"
			>
			<template  v-slot:listitem="{index,item,datas}">
				<div  class="customname" @click="itemClick(index,item)">
            <div class="box">
              {{item}}
            </div>
				</div>
			</template>
			<template  v-slot="{module,data}">
				<div >
					<div v-if="module.name === 'imagecover'">{{module}}</div>
				</div>
			</template>
		</webpage>
	</div>
</template>

<script>
	import webpage from '@/components/webcommon/web-page'
	import DemoFormData from './DemoFormData.js'

	export default{
		components:{webpage},
		data(){
			let atlasFormData = new DemoFormData("项目");

			return {
        testa: {
            type: "cascader",
            class: "row",
            text: "*cascader:",
            prop: "test",
            value:1,
            options:[
               {
                key: 1,
                value: '指南',
               },
               {
                key: 2,
                value: '指南',
               }
             ],
            error:"",
        },
        dataApi:{},
				searchkey:"",
				webpage:{
					search:{
						placeholder:"项目名称",
					},
					datatotal:-1,
					formdata:atlasFormData,
					tablebutton:{selectshow:true,addshow:true,updateshow:true,deleteshow:false}
				},
			}
		},
		mounted() {
			this.init();
		},
		methods:{
			test(){
         //console.log(2,this.webpage.formdata);
			},
			async init(){
        this.dataApi =  this.webpage.formdata.dataApi;
				this.initData();
			},
			async initData(){
				//查找总数
				await this.findDataTotal();
				await this.$refs.webpage.findOnePageData();
			},
			//查找条目数量
			async findDataTotal(){
				let searchpo = this.getSearchPo();
				this.webpage.datatotal =await this.dataApi.findTotal(searchpo);

			},
			//查找
			async findData(pageindex,pagesize,datacallback){
				let searchpo = this.getSearchPo();
				//let dataArrayTem =await this.dataApi.findPageData(searchpo,pageindex,pagesize);
				let dataArrayTem =await this.dataApi.findDataAll(searchpo);
				datacallback(dataArrayTem);
			},

			searchOk(value,dataCallBack){
				this.searchkey = value;
				this.initData();
			},
			searchClear(dataCallBack){
				this.searchkey = "";
				this.initData();
			},
			getSearchPo(){
				let searchkey =this.searchkey;
        if(searchkey){
          return searchkey;
        }
				return undefined;
			},
			itemClick(index,item){
				this.$refs.webpage.tableItemClick(index,item);
			}
		}
	}
</script>

<style lang="scss">


	.atlaslistvue{
		overflow: auto;
		height: 100%;
		padding: 0 20px;
		.table{
			border-top: 2px solid #FFF;
			margin-top: 10px;
			padding-top: 10px;
		}
		.web-custom-list{
			.list{
				display: flex;
				flex-wrap: wrap;
				.listitem{

					position: relative;
					padding: 10px;
					width: calc(30%);
					min-width: 400px;
					border-radius: 15px;
					box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
					margin-right: 10px;
					margin-bottom: 10px;
					.textitem{
						margin-top: 5px;
						margin-right: 20px;
					}
					.el-image{
						width: 100%;
						height: 200px;
					}
					.state{
						width: 40px;
						height: 40px;
						position: absolute;
						top: 10px;
						right: 10px;
						z-index: 2;

						text-align: center;
						span{
							line-height: 40px;
							color: #fff;
						}
					}
					.xiajia{
						background-color: gray;
					}
					.shangjia{
						background-color: var(--primary);
					}
				}
				.listitem:hover {
					cursor: pointer;
				    transform: translateY(-8px);
					transition: .3s;
				}
			}

		}
	}

</style>
