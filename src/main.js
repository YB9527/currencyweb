// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import * as  Tool from '@/common/js/Tool.js'
Vue.prototype.$Tool = Tool;

import DicJson from '@/common/js/DicJson.js'
Vue.prototype.$DicJson = DicJson;

import  Api from '@/api/Api.js'
Vue.prototype.$Api =new  Api;

import FJApi from '@/api/FJApi.js'
Vue.prototype.$FJApi = new FJApi();

import SysApi from '@/api/SysApi.js'
Vue.prototype.$SysApi =new SysApi();

import * as functionTool from '@/common/js/FunctionTool.js'
Vue.prototype.$FunctionTool = functionTool;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
