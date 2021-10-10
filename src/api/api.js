import  axios from 'axios'
import hjson from "hjson"

 class Api {
	constructor(data={path:""}) {
    let path = data.path?data.path:''
    this.path = path;
    if( Api.config){
      this.baseurl = Api.config.ip+"/"+this.path;
      this.ip = Api.config.ip;
    }else{
      this.findConfig();
    }
    
  }
  findConfig(){
    if(!Api.config){
      return axios({
        //url:"/h6/static/js/config.json",
        url:"/static/js/config.json",
        method: 'get',
        headers:{ "Content-Type": "application/json"},
      }).then(res=>{
        Api.config =hjson.parse(res.data);
        this.baseurl = Api.config.ip+"/"+this.path;
        this.ip = Api.config.ip;
        console.log(Api.config);
        console.log(res);
      }).catch(e=>{
        Api.config ={};
      });
    }else{
      return true;
    }
  }
  static config;
  static param2URL(url,data){
    if(data){
      url = url + "?";
      for(let key in data){
        url = url + key+"="+data[key]+"&";
      }
      url =url.substring(0,url.length - 1);
    }
    return url;
  };

  /**
   * get请求
   */
  get({url,data,headers}) {
    url = this.baseurl + url;
    url = Api.param2URL(url,data);
    return axios({
      url,
      method: 'get',
    }).then(res=>{
      if(res.data.isOk){
        return res.data.data;
      }
    });
  };
  /**
   * 查找单条数据
   */
  findDataOne({url,data}){
    //debugger
  	return this.get({url,data})
  		.then(data=>{
  			if(data ){
  			  if(data instanceof  Array && data.length > 0){
            return data[data.length-1];
          }else{
  			    return data;
          }
  			}else{
  				return undefined;
  			}
  		});
  };
  /**
   * post请求
   */
  post({url,data,headers}) {
    //debugger
    return axios({
      url:this.baseurl+url,
      method: 'post',
      headers: headers || { "Content-Type": "application/json"},
      data,
    }).then(res=>{
      if(res.data.isOk){
        return res.data.data;
      }else{
        return res.data;
      }
    });
  }
  /**
   * 找到总数
   */
  findTotal(searchdata,url="findTotal"){
    let data ={};
    if(searchdata !== undefined){
      if( searchdata instanceof Array){
          data.searchkey= JSON.stringify(searchdata);
      }else {
        data.searchkey= searchdata;
      }
    }
  	return this.post({url,data});
  }
  /**
   * 根据id查找
   */
  findDataById(id,url="findDataById"){
    return this.findDataOne({url,data:{id}});
  }
  /**
   * 查找分页数据
   */
  findDataPage(searchdata,pagenum,pagecount,url="findDataPage"){
    let querydata = {};
    if(searchdata !== undefined){
      if( searchdata instanceof Array){
          querydata.searchkey= JSON.stringify(searchdata);
      }else {
        querydata.searchkey= searchdata;
      }
    }
    querydata.pagenum = pagenum;
    querydata.pagecount = pagecount;

    return this.post({url,data:querydata});
  }
  /**
   * 查找所有数据
   */
  findDataAll(searchdata,url="findDataAll"){
    let querydata = {};
    if(searchdata !== undefined){
      if( searchdata instanceof Array){
          querydata.searchkey= JSON.stringify(searchdata);
      }else {
        querydata.searchkey= searchdata;
      }
    }
    return this.post({url,data:querydata});
  }
	/**修改对象
	 * @param {Object} data
	 */
	updateData(data,url="updateData"){
	  return this.post({url,data});
	}
	/**保存对象
	 * @param {Object} data
	 */
	saveData(data,url="saveData"){
		return this.post({url,data});
	}
	/**删除对象
	 * @param {Object} data
	 */
	deleteData(data,url="deleteData"){
		return this.post({url,data});
	}
}
export default Api = Api;
