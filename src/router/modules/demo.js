
import  config  from '@/views/demo/config.vue'

export default
  [
    {
      path:"/demo/config",
      component: ()=>import('@/views/demo/config.vue'),
    },
    {
      path:"/demo/webtool",
      component: ()=>import('@/views/demo/WebTool.vue'),
    },
    {
      path:"/demo/container",
      component: ()=>import('@/views/demo/container.vue'),
    },
    {
      path:"/demo/auth",
      component: ()=>import('@/views/demo/auth.vue'),
    },
 ]
