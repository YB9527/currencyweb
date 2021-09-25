import  Api from './Api.js'
const baseurl  ="/fj/";
const imgpriewurl  = "/imgpriew/";

const fileHeader = {
  "Content-Type":"multipart/form-data", //文件上传时的格式
};

class FJApi extends Api {

  constructor(data={path:baseurl}) {
    super(data);
    this.imgpriewurl = this.ip + imgpriewurl;
  }
  /**
   * 获取单个文件访问路径
   * @param {Object} path
   */
  getURLByPath(path){
    if(path){
      let url =(this.imgpriewurl +  path).replace(/\\/g,"/");
      return url;
    }
  }
  /**
   * 设置附件的访问路径
   */
  setURL(fjArray,key="url"){
    for (let fj of fjArray){
      let url =  this.getURLByPath(fj.path);
      fj[key] = url;
    }
  }
  /**
   * 上传单个附件
   * @param {Object} file
   * @param {Object} fj
   */
  uploadFile= function(file,fj) {
    if(!(file instanceof  Array)){
      file  = [file];
      fj  = [fj];
    }
    return this.uploadFileArray(file,fj);
  }
  /**
   * 上传多个附件
   * @param {Object} fileArray
   * @param {Object} fjArray
   */
  uploadFileArray(fileArray,fjArray) {
    let url =  "upload";
    const formdata = new FormData();
    for (let i = 0;i < fileArray.length;i++) {
      formdata.append('file', fileArray[i]);
      fjArray[i].size = (fileArray[i].size / 1024 /1024).toFixed(1);
      fjArray[i].extendname = fileArray[i].type;
    }
    formdata.append("fj",JSON.stringify(fjArray));
    return this.post({url,data:formdata});
  }

  findByObjectidAndCustomname(objectid,customname) {
    let url =  "findImageByObjectidAndCustomname";
    return this.get({url,data:{objectid,customname}});
  };


  deleteFJ(fjarray){
    let url = "delete";
    return this.post({url,data:fjarray});
  }

}
export default FJApi = FJApi;
