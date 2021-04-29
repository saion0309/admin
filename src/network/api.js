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


//角色列表 roles
export const reqRoles = () => request({url:`roles`})

//分配用户角色 users/:id/role
export const reqUsersRoles = (id,rid) => request({url:`users/${id}/role`,method:'put',data:{rid}})

//获取权限列表 rights/:type
export const reqGetRights = (type) => request({url:`rights/${type}`})

//添加角色 roles
export const reqAddRoles = (data) => request({url:`roles`,method:'post',data})

//添加角色 roles/:id
export const reqEditRoles = (id,data) => request({url:`roles/${id}`,method:'put',data})

//删除角色 roles/:id
export const reqDelRoles = (id) => request({url:`roles/${id}`,method:'delete'})

//删除角色指定权限 roles/:roleId/rights/:rightId
export const reqDelUsersRights = (roleId,rightId) => request({url:`roles/${roleId}/rights/${rightId}`,method:'delete'})

//商品列表数据 goods
export const reqGoods = (params) => request({url:`goods`,params})

//商品分类数据列表 categories
export const reqCategories= () => request({url:`categories`,})












//请求 数据统计 reports/type/1
export const reqReports = () => request({url:`reports/type/1`})