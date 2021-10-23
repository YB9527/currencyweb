import Vue from 'vue'
import Router from 'vue-router'

import demo from './modules/demo'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:  ()=>import('@/views/demo/index.vue'),
    },
    ...demo,
  ]
})
