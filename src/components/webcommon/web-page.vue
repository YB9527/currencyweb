<template>
	<div class="webpagevue">
		<!-- <el-button type="warning" @click="newData">创建对象</el-button> -->
		<div class="search">
			<websearch v-bind="search" :event="searchEvent"></websearch>
			<webtablebutton v-bind="tablebutton" :currentstate="tablestate" @add="addData()"></webtablebutton>
		</div>
		<div class="table">
			<webtable ref="table" v-if="type === 1" :total="datatotal" :datas="dataArray" :columns="columns" :event="tableEvent">
			</webtable>
			<webcustomlist ref="table" v-else-if="type === 2" :itemSrc="customlistItemSrc" :total="datatotal" :datas="dataArray" :columns="columns" :event="tableEvent">
				<template v-slot:listitem="{index,item,datas}" >
					<slot   name="listitem" :index="index" :item="item" :datas="datas"></slot>
				</template>
			</webcustomlist>
		</div>
		<div class="dialog">
			<webdialog :dialog="dialog" v-bind="dialog" @ok="dialogEvent.ok" @cancel="dialogEvent.cancel">
				<webform slot="body" v-bind="formconfig" >
					<template v-slot="{module,data}" >
						<slot  :module="module" :data="data" ></slot>
					</template>
				</webform>
			</webdialog>
		</div>
	</div>
</template>

<script>
	import websearch from './web-search.vue'
	import webtablebutton from './web-table-button.vue'
	import webtable from './web-table.vue'
	import webcustomlist from './web-custom-list.vue'
	import webdialog from './web-dialog.vue'
	import webform from './web-form.vue'

	import FormData from './form/Formdata.js'


	export default {
		components: {
			websearch,
			webtablebutton,
			webtable,
			webcustomlist,
			webdialog,
			webform
		},
		props: {
			search: Object,
			type:{
				type:Number,
				default:1,//1表格，2自定义列表
			},
			customlistItemSrc:String,//自定义item组件的路径，不要前缀'@/'
			datatotal: {
				type: Number,
				default: 91,
			},
			dataArray: {
				type: Array,
				default: ()=>[],
			},
			columns: Array,
			formdata: {
        type:FormData
      },
			tablebutton: {
				type: Object,
				default: () => {
					return {
						selectshow: true,
						addshow: true,
						updateshow: true,
						deleteshow: true
					};
				}
			},
		},
		data() {
			return {
				tablestate: {
					select: "select",
					add: "add",
					update: "update",
					delete: "delete",
					value: "update",
				},
				searchEvent: {
					ok: (value) => {
						//console.log("查询",value);
						this.$emit("searchOk", value, this.reFushData);

					},
					clear: () => {
						//console.log("清除");
						this.$emit("searchClear", this.reFushData);
					}
				},

				tableEvent: {
					itemClick: this.tableItemClick,
					handleCurrentChange: async (pageindex,pagesize, datacallback) => {
						this.$emit("findData", pageindex,pagesize, datacallback);
					},
				},
				dialog: {
					title: "添加",
					show: false,
					showfooter:false,
				},
				dialogEvent:{
					ok:(callback)=>{
						this.$emit("dialogOk");


						this.formdata.ok((state,data)=>{

							if(state === false){
								callback(false);
								return;
							}
							switch(state){
								case FormData.UPDATE:
									this.$Tool.replaceModel(this.dataArray,data,this.formdata.datakey);
									break;
								case FormData.CREATE:
									this.dataArray.unshift(data);
									break;
								case FormData.DELETE:
									this.$Tool.arrayDeleteModel(this.dataArray,data,this.formdata.datakey);
									break;
								case FormData.SELECT:
									break;
							}
							callback(true);
						});

					},
					cancel:()=>{
						this.$emit("dialogCancel");
					}
				},
				formconfig:{},
			}
		},
		computed: {

		},
		watch: {

		},
		created() {

		},
		methods: {
			/**刷新数据
			 * @param {Object} datas
			 */
			reFushData(datas) {
				this.$Tool.arrayReplace(this.datas, datas);
			},
			newData() {
				let data = new FormData();
				console.log(data);
			},
			tableItemClick(index, data) {
				let tablestate = this.tablestate;
				if (!tablestate.value) {
					return;
				}
				switch (tablestate.value) {
					case tablestate.select:
						this.selectData(index, data);
						break;
					case tablestate.add:
						this.addData(index, data);
						break;
					case tablestate.update:
						this.updateData(index, data);
						break;
					case tablestate.delete:
						this.deleteData(index, data);
						break;
				}
			},
			async selectData(index, data) {
				this.dialog.showfooter = false,
				this.formconfig =await this.formdata.getSelectLayout(data[this.formdata.datakey]);
				//console.log(this.formconfig)
				this.showFormDialog(this.formconfig);
				//console.log("查看对象", index, data);
			},
			async addData() {
				this.dialog.showfooter = true,
				this.formconfig =await this.formdata.getCreateLayout();
				//console.log(this.formconfig)
				this.showFormDialog(this.formconfig);
				//console.log("添加对象",this.formconfig);
			},
			async updateData(index, data) {
				this.dialog.showfooter = true,
				this.formconfig = await this.formdata.getUpdateLayout(data[this.formdata.datakey]);
				this.showFormDialog(this.formconfig);
				//console.log("修改对象", index, data);
			},
			async deleteData(index, data) {
				this.dialog.showfooter = true,
				this.formconfig =await this.formdata.getDeleteLayout(data[this.formdata.datakey]);
				this.showFormDialog(this.formconfig);
			},
			//弹出对象窗口
			showFormDialog(formconfig){
				this.dialog.title = this.formconfig.title;
				this.dialog.show = true;
				//console.log(this.dialog);
			},

			findOnePageData(){
				 this.$refs.table.handleCurrentChange(1);
			},
		}
	}
</script>

<style lang="scss">
	.webpagevue {
		height: 100%;
		width: 100%;
		.search {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			height: 40px;
		}


	}

	.webform {
		.modulerow {
			padding: 5px;
			border-radius: 5px;
			background-color: #f1f1f1;
			box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
			margin-bottom: 10px;
		}
	}
</style>
