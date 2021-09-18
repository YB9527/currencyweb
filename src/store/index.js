
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import A from './module/A.js'
import B from './module/B.js'


const store = new Vuex.Store({
    modules: {
       a: A,
       b: B
     }
})
export default store
