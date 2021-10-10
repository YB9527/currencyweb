
/**
 * 根据key 获取 strongdata
 * @param {Object} key
 */
export var getStorageData = function (key) {
	return new Promise((resole,reject)=>{
		uni.getStorage({
				key,
				success:  (storage)=> {
					resole(storage.data);
				},fail(e) {
					resole(undefined);
				}
			});
	});

};


/**
 * 设置 strong
 * @param {Object} key
 * @param {Object} data
 */
export var setStorageData = function(key,data){
	uni.setStorage({
	    key,
	    data
	});
}


/**
 * 弹出确定按钮
 * @param {Object} tip
 */
export var showModalTip = function(tip,data={showCancel:false}){
	return new Promise((resole,reject)=>{
		uni.showModal({
			content:tip,
			showCancel:data.showCancel,
			success(){
				resole(true);
			}
		});
	})
}

export var showMoal = function(content,data={}){
	return new Promise((resole,reject)=>{
		uni.showModal({
			title:data.title?data.title:"提示",
			content:content,
			showCancel:data.showCancel,
			 success: function (res) {
			        if (res.confirm) {
			            resole(true);
			        } else if (res.cancel) {
			            resole(false);
			        }
			    }
		});
	})
}


export var showToast = function(title,data={icon:"none"}){
	 uni.showToast({
	 	title,
		icon:data.icon
	 })
 }

var isShowLoading = false;


/**
 * 显示loading
 */
export var showLoading = function(title="载入中...",showcover=true){


}
/**
 * 隐藏loading
 */
export var hideLoading = function(){

}



/**
 * 预览对象里面的图片
 */
var previewImageInDataArray = function(index,dataArray,key="url"){
	if(dataArray){
		let urls = [];
		dataArray.forEach(data=>{
			urls.push(data[key]);
		});
		previewImage(urls[0],urls);
	}
}
exports.previewImageInDataArray = previewImageInDataArray;

/**
 * 预览图片
 * @param {Object} url
 * @param {Object} urlArray
 */
var previewImage = function(url,urlArray){
	uni.previewImage({current:url,urls:urlArray});
}
exports.previewImage = previewImage;


var downloadFile = function(url){
	window.open(url);


}
exports.downloadFile = downloadFile;
