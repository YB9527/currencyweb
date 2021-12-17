<template>
  <div >
    <el-upload
		:accept = "elupload.listtype === 'text'?elupload.accept:'image/*'"
		:disabled="elupload.disabled"
		:id="idname"
		multiple
		action="#"
		:file-list="filelist"
		:limit="elupload.limit"
		:auto-upload="elupload.autoupload"
		:list-type="elupload.listtype"
		:on-preview="handlePictureCardPreview"
		:on-remove="handleRemove"
		:on-change="onChange"
		:on-exceed="onExceed">

		<el-button plain v-if="elupload.listtype === 'text'" slot="trigger" size="mini" type="primary">选取文件</el-button>

		<i v-else class="el-icon-plus"></i>
<!--      <div slot="file" slot-scope="{file}" style="height: 100%; width: 100%">-->
<!--        <img-->
<!--          class="el-upload-list__item-thumbnail"-->
<!--          :src="file.url" alt="">-->
<!--        <span class="el-upload-list__item-actions">-->
<!--        <span class="el-upload-list__item-preview">-->
<!--          <i class="el-icon-zoom-in"></i>-->
<!--        </span>-->
<!--        <span     class="el-upload-list__item-delete" >-->
<!--          <i class="el-icon-download"></i>-->
<!--        </span>-->
<!--        <span class="el-upload-list__item-delete">-->
<!--          <i class="el-icon-delete"></i>-->
<!--        </span>-->
<!--      </span>-->
<!--        </div>-->
      <div slot="tip" class="el-upload__tip" v-if="tip" v-html="tip"></div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible"  append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: "web-upload-file",
    props: {
      elupload: {
		type:Object,
		default:()=>{
			return {
				disabled:false,
				ok: () => {

				}
			}
		}
      },
	  idname:String,
      tip: String
    },
    data() {

      let defaultvalue = {
          limit:1,
          autoupload:false,
          listtype:'picture-card',
          filelist:[],
		  disabled:false
      };
      if(!this.elupload.limit){
        this.elupload.limit = defaultvalue.limit;
      }
      if(!this.elupload.autoupload){
        this.elupload.autoupload = defaultvalue.autoupload;
      }
      if(!this.elupload.listtype){
        this.elupload.listtype = defaultvalue.listtype;
      }
      if(!this.elupload.filelist){
        this.elupload.filelist = defaultvalue.filelist;
      }
      let filelist =this.elupload.filelist;
      this.elupload.saveAndDelete = this.saveAndDelete;
      return {
        dialogVisible: false,
        dialogImageUrl: "",
        filelist,
        deleteimageValue:[],
        addimageValue:[],
      }
    },
	watch:{
		'filelist.length'(){
			this.lookAddNode();
		},
		'elupload.disabled'(){
			this.lookAddNode();
		}
	},
    created(){
		this.init();

		this.elupload.deleteimageValue = this.deleteimageValue;
		this.elupload.addimageValue = this.addimageValue;
    },
	mounted() {
		this.lookAddNode();
	},
    methods: {
      init(){
        this.clearImage();
        this.findImage();

      },
      clearImage(){

        let addimageValue = this.addimageValue;
        if(addimageValue.length > 0){
          addimageValue.splice(0,addimageValue.length);
        }
        let deleteimageValue = this.deleteimageValue;
        if(deleteimageValue.length > 0){
          deleteimageValue.splice(0,deleteimageValue.length);
        }
      },
      async findImage(){
         /* let fjArray = await this.$FjApi.findImageByObjectidAndCustomname(this.elupload.objectid,this.elupload.customname);
          for (let fj of fjArray){
            fj.url  =  this.$Api.imgpriewurl+fj.path;
            this.filelist.push(fj);
          } */
         // console.log(333,fjArray)
      },
      onChange(file, fileList){
        if(file.status === "ready"){
          this.addimageValue.push(file);
        }
		this.filelist.push(file);
      },
	  lookAddNode(){
		  let display = "";
		 if(this.filelist.length === this.elupload.limit){
		 	this.show = false;
		 	if(this.idname){
				display = 'none';
		 	}
		 }else if(this.elupload.disabled){

			display = 'none';

		 }
		 let addnodedom = document.getElementById(this.idname);
		 //console.log(addnodedom)
		for(let dom of addnodedom.children){
			 if(dom.attributes[0].nodeName === 'tabindex'){
				dom.style.display = display;
			 }
		 }
	  },
      handleRemove(file) {
        if(file.status === "success"){
          this.deleteimageValue.push(file);
        }else  if(file.status === "ready"){
          for (let i = 0; i < this.addimageValue.length; i++) {
            if(this.addimageValue[i].id  === file.id){
              this.addimageValue.splice(i,1);
            }
          }
        }
		let index = this.filelist.indexOf(file);
		this.filelist.splice(index,1);
      },
      handlePictureCardPreview(file) {
        if(file.download){ // 是否需要下载
          this.$emit("download", file);
        }else if(file.url){
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		}
      },
      handleDownload(file) {
        console.log(file);
      },
      async saveAndDelete() {
        if(this.addimageValue.length > 0){
          //this.$FjApi.uploadFile(this.addimageValue[0].raw,{extendname:"AAA.png"});

          let files = [];
          for (let file of  this.addimageValue) {
            files.push(file.raw);
          }
          let  fjArray = this.elupload.getFJArray(this.addimageValue);
          fjArray = await this.$FjApi.uploadFileArray(files,fjArray);
          this.$FjApi.setURL(fjArray);

        }
        if(this.deleteimageValue.length > 0){
          await this.$FjApi.deleteFJ(this.deleteimageValue);
        }
        this.init();
        //console.log("addimageValue",this.addimageValue);
        //console.log("deleteimageValue",this.deleteimageValue);

      },
	  /**
	   * 超出文件个数
	   * @param {Object} files
	   * @param {Object} fileList
	   */
	  onExceed(files, fileList){
		  this.$message.error("最多上传："+this.elupload.limit+"个文件");
	  }
    }
  }
</script>
<style scoped lang="scss">
.el-upload-list__item.is-success .el-upload-list__item-status-label {
  display: none;
}

</style>

