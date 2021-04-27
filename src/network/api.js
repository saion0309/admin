//引入 请求
import {request} from './request'

//登录 login
export const reqLogin = (data) => request({url:'login',method:'post',data})

//导航列表 menus
export const reqMenusList = () => request({url:'menus'})

//导航列表 users
export const reqUsers = (params) => request({url:'users',params})

//编辑用户 users/:id
export const reqEditUsers = (id,email,mobile) => request({url:`users/${id}`,method:'put',data:{id,email,mobile}})

//添加用户 users
export const reqAddUsers = (data) => request({url:`users`,method:'post',data})

//更改用户状态 users/:uId/state/:type
export const reqUpdateUsersState = (uId,type) => request({url:`users/${uId}/state/${type}`,method:'put'})

//删除用户 users/:id
export const reqDelUsers = (id) => request({url:`users/${id}`,method:'delete'})



//获取权限列表 rights/:type
export const reqGetRights = (type) => request({url:`rights/${type}`})