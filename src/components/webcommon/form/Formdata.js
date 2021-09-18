import * as Tool from "@/common/js/Tool.js"
class FormData {
  static SELECT="SELECT";
  static CREATE="CREATE";
  static UPDATE="UPDATE";
  static DELETE="DELETE";
  title = "";
  constructor(title) {

  }
  baselayout(){

  }
  getSelectLayout(){

  }
  getUpdateLayout(){

  }
  getCreateLayout(){

  }
  getDeleteLayout(){

  }
  getLayoutByState(state,title){
    let layout;
    if(state === SELECT){
      if(!title) title = this.title+"编辑";
    	layout = getSelectLayout();
    }else if(state === CREATE){
      if(!title) title = this.title+"添加";
    	layout = getCreateLayout();
    }else if(state === UPDATE){
      if(!title) title = this.title+"修改";
    	layout = getUpdateLayout();
    }else if(state === DELETE){
      if(!title) title = this.title+"删除";
    	layout = getDeleteLayout();
    }
    return layout;
  }
  sum(a, b) {
    return a + b;
  }
}
export default FormData= FormData;
