//引入axios
import axios from 'axios'

export const request = config =>{
	const inst = axios.create({
		baseURL:'http://127.0.0.1:8888/api/private/v1/',//公共路径
		timeout:10000//请求延迟
	})
	//请求拦截
	inst.interceptors.request.use(config => {
		//保存token
		config.headers.Authorization = window.sessionStorage.getItem("token")
		return config
	})
	//响应拦截
	inst.interceptors.response.use(data　=>　{
		return data.data
	})
	return inst(config)
}