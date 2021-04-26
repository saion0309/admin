import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo:{}
	},
	mutations: {
		//用户信息
		changeUserInfo(state,userInfo){
			state.userInfo = userInfo
		}
	},
	actions: {},
	modules: {}
})
