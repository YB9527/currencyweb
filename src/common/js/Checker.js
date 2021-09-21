

var checkNull = function(value,errortip="不能为空"){
	if(!value){
		return errortip;
	}
}
exports.checkNull = checkNull;


var checkZJHM = function(value,errortip="证件号码必须是18位"){
	if (!value || value.length !== 18) {
		return errortip;
	}
}
exports.checkZJHM = checkZJHM;

var checkPhoneNuber = function(value,errortip="联系电话必须是11位"){
	if (!value || value.length !== 11) {
		return errortip;
	}
}
exports.checkPhoneNuber = checkPhoneNuber;

/**
 * 大于0
 */
var moreThan0 = function(value,errortip="值必须大于0"){
	if (!value || parseInt(value) <= 0) {
		return errortip;
	}
}
exports.moreThan0 = moreThan0;

var checkLength = function(value,{len,errortip}){
	if (!value || value.length !== len) {
		return errortip?errortip:"长度必须是："+len+"位";
	}
}
exports.checkLength = checkLength;
