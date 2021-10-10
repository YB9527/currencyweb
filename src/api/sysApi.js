import Api from './Api.js';

export default class SysApi extends Api{
	constructor() {
		super({path:"sys"});
	}
	getSystemDateTime(){
		return this.get({url:"/getdatetime"});
	}
}


