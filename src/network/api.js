//引入 请求
import {request} from './request'

//登录 login
export const reqLogin = (data) => request({url:'login',method:'post',data})

//导航列表 menus
export const reqMenusList = () => request({url:'menus'})