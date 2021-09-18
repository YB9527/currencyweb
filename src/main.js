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

import * as Api from '@/api/api.js'
Vue.prototype.$Api = Api;

import * as sysApi from '@/api/sysApi.js'
Vue.prototype.$SysApi = sysApi;

import * as functionTool from '@/common/js/FunctionTool.js'
Vue.prototype.$FunctionTool = functionTool;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
