import MyFormData from "@/components/webcommon/form/Formdata.js"
import * as Tool from "@/common/js/Tool.js"
import * as Checker from "@/common/js/Checker.js"

import ProjectApi from '@/api/ProjectApi.js'



class AtlasFormData extends MyFormData {
	constructor(title) {
		super(title,new  ProjectApi());
    this.datakey="id";
	}

	baseModuleArray() {
		this.uploadCoverImg = {
			limit:1,
			filelist:[],
			disabled:true
		};
		let rowcount = 2;
		let moduleArray = [
			{
				title: "基础信息",
				array: [
          {
          		type: "text",
          		class: "row",
          		text: "*cascader:",
          		prop: "seq",
              options:[
                 {
                  key: 1,
                  value: '指南',
                 },
                 {
                  key: 2,
                  value: '指南2',
                 }
               ],
              optionmap:{1:"指南",2:'指南2'},
          		error:"",
          		//check:Checker.checkNull,
          },
          {
						type: "text",
						class: "row",
						text: "*项目名称:",
						prop: "name",
						error:"",
						//check:Checker.checkNull
					},

				],
			},
		]
		return {
			rowcount,
			moduleArray
		};
	}

	getEidtModuleArray(moduleArray){
		for(let module of moduleArray){
			if(!module.array)  continue;
			for(let item of module.array){
				switch(item.type){
					case 'fj':
						item.disabled = false;
						item.upload.disabled = false;
						continue;
				}
				switch(item.prop){
					case '':
						item.show = false;
						break;
					case '':
						item.type = 'radio';
						break;
					case '':
						item.type = 'select';
						break;
           case 'seq':
            item.type = 'cascader';
            break;
					case '':
						item.type = 'textarea';
						break;
					default:
						item.type = 'input';
						break;
				}
			}
		}
	}



	async getUpdateLayout(id) {
		 let formconfig = await super.getUpdateLayout(id);
		 this.getEidtModuleArray(formconfig.moduleArray);
		 return formconfig;
	}
	async getCreateLayout() {
		let formconfig =await super.getCreateLayout();
		this.getEidtModuleArray(formconfig.moduleArray);
		return formconfig;
	}
	async getDeleteLayout(id) {
		let formconfig =await super.getDeleteLayout(id);
		return formconfig;
	}


}
export default AtlasFormData = AtlasFormData;
