<template>
	<el-dialog class="webdialogvue"
		:close-on-click-modal="false"
		v-if="dialog.show" append-to-body :title="dialog.title" :visible.sync="dialog.show" :width="width">
		<slot name="body"></slot>
		<div slot="footer" class="dialog-footer">
			<slot name="footer" v-if="showfooter && (showcancel || showok) ">
				<el-button type="info" v-if="showcancel" @click="cancel">{{canceltext}}</el-button>
				<el-button type="primary" v-if="showok" @click="ok">{{oktext}}</el-button>
			</slot>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: {
			dialog: {
				type: Object,
				default: () => {
					return {
						show: false,
						title: "标题"
					}
				}
			},
			
			width: {
				type: String,
				default: "600px",
			},
			height: {
				type: String,
				default: "600px",
			},
			showfooter: {
				type: Boolean,
				default: true,
			},
			showcancel: {
				type: Boolean,
				default: true,
			},
			canceltext: {
				type: String,
				default: "取 消"
			},
			showok: {
				type: Boolean,
				default: true,
			},
			oktext: {
				type: String,
				default: "确 定"
			},
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
			cancel() {
				this.dialog.show = false;
				this.$emit("cancel");
			},
			 ok() {
				 this.$emit("ok",flag=>{
					 if (flag === false) {
					 	return;
					 }else{
						this.dialog.show = false;
					 }
				 });
			},
		}
	}
</script>

<style lang="scss" scoped>
	.webdialogvue{
		.el-dialog__body {
			padding: 0 !important;
		}
		.el-dialog__body{
			padding: 5px;
			height: 100%;
		}
	}
	
	/* .el-dialog__body{
    padding: 0;
    height: calc(100% - 110px);
    overflow-y: auto;

  }

  .el-dialog{
    margin-top: 5% !important;
    height: 82%;
   } */
</style>
