export default  {
  state:{//存放状态
  	count:1,
	obj:{
		message:"aa",
	}
  },
  getters: {
  	count: state => {   
  		return state.count;
  	},
  },
  //同步
  mutations: {
	['aa'](){
		
	},
  	addCount(state) {
  		state.count++;
  		
  	},
	setMessage(state,message){
		state.obj.message = message;
	}
  },
  //可以异步
  actions: {
      addCount (context) {
		console.log("context",context);
  		context.commit('addCount');
  		context.commit('b');
      }
  }
}