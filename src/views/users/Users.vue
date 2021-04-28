<template>
	<div class="users">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片 -->
		<el-card shadow="always">
			<el-row :gutter="20">
				<el-col :span="10">
					<el-input placeholder="请输入内容" v-model="usersParams.query" class="input-with-select" clearable
						@clear="clearKey">
						<el-button slot="append" icon="el-icon-search" @click="searchClick"
							:disabled="usersParams.query.length <= 0"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addUsers">添加用户</el-button>
				</el-col>
			</el-row>

			<el-table :data="usersList" border style="width: 100%">
				<el-table-column label="#" type="index" width="48px">
				</el-table-column>
				<el-table-column label="姓名" prop="username">
				</el-table-column>
				<el-table-column label="邮箱" prop="email">
				</el-table-column>
				<el-table-column label="电话" prop="mobile">
				</el-table-column>
				<el-table-column label="角色" prop="role_name">
				</el-table-column>
				<el-table-column label="状态">
					<template #default="{row}">
						<el-switch v-model="row.mg_state" @change="changeUsersState(row)">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template #default="{row}">
						<div class="cell-btns">
							<el-button type="primary" icon="el-icon-edit" size="mini" @click="editUsers(row)">
							</el-button>
							<el-button type="danger" icon="el-icon-delete" size="mini" @click="delUsers(row)">
							</el-button>
							<el-button type="warning" icon="el-icon-setting" size="mini"
								@click="settingUsersState(row)"></el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页 -->
			<el-pagination @size-change="sizeChange" @current-change="currentChange" :page-sizes="[2, 3, 5, 10]"
				:page-size="usersParams.pagesize" :current-page="usersParams.pagenum"
				layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
			</el-pagination>
		</el-card>

		<!-- diglog 弹出框 -->
		<users-dialog ref="dialog" :currentUsersInfo="currentUsersInfo" @clearChangeUsersInfo="clearChangeUsersInfo">
		</users-dialog>
		<set-users ref="setUsers" :setUsersVal='setUsersVal' :rolesList= "rolesList"></set-users>
	</div>
</template>

<script>
	import UsersDialog from './chirdren/UsersDialog.vue'
	import SetUsers from './chirdren/SetUsers.vue'
	import {
		reqUsers,
		reqUpdateUsersState,
		reqDelUsers,
		reqRoles
	} from 'network/api'
	export default {
		name: 'Users',
		components: {
			UsersDialog,
			SetUsers
		},
		data() {
			return {
				//用户列表
				usersList: [],
				//用户参数
				usersParams: {
					query: '',
					pagenum: 1,
					pagesize: 2
				},
				//多少条数据
				totalPage: 0,
				//当前用户信息
				currentUsersInfo: {},
				//设定角色
				setUsersVal: {},
				rolesList: []
			}
		},
		created() {
			this.getUsers()
		},
		methods: {
			//获取角色列表
			async getRolesList() {
				const {
					meta,
					data
				} = await reqRoles()
				if (meta.status !== 200) return this.$message.error(meta.msg)
				this.rolesList = data
			},
			//设置用户状态
			settingUsersState(row) {
				this.getRolesList()
				this.setUsersVal = row
				this.$refs.setUsers.dialogVisible = true
			},
			//点击按钮 删除 当前的用户数据
			async delUsers(row) {
				const {
					id
				} = row
				const {
					meta
				} = await reqDelUsers(id)
				if (meta.status !== 200) return this.$message.error(meta.msg)
				this.$message.success(meta.msg)
				//删除一页当中一条数据 应该让请求页数回到第一页
				this.usersParams.pagenum = 1
				this.getUsers()
			},
			//改变用户的状态
			async changeUsersState(row) {
				const {
					id: uid,
					mg_state: type
				} = row
				const {
					meta
				} = await reqUpdateUsersState(uid, type)
				if (meta.status !== 200) return this.$message.error(meta.msg)
				this.$message.success(meta.msg)
				this.getUsers()
			},
			//更改当前用户 解决 dialog编辑用户点击多次数据为空的问题
			clearChangeUsersInfo() {
				this.currentUsersInfo = {}
			},
			//编辑用户
			editUsers(row) {
				//row 当前用户的所有参数
				this.currentUsersInfo = row
				this.$refs.dialog.dialogVisible = true
			},
			//添加用户
			addUsers() {
				// this.$message.success("1")
				this.currentUsersInfo = {}
				this.$refs.dialog.dialogVisible = true

			},
			//清除关键字
			clearKey() {
				//每次请求都把页面跳转到第一页
				this.usersParams.pagenum = 1
				this.getUsers()
			},
			//点击search
			searchClick() {
				//每次请求都把页面跳转到第一页
				this.usersParams.pagenum = 1
				this.getUsers()
			},
			//改变当前页
			currentChange(page) {
				this.usersParams.pagenum = page
				this.getUsers()
			},
			//pageSize 改变时会触发
			sizeChange(size) {
				this.usersParams.pagesize = size
				this.getUsers()
			},
			//请求用户列表数据
			async getUsers() {
				const {
					meta,
					data
				} = await reqUsers(this.usersParams)
				if (meta.status !== 200) return this.$message.error(meta.msg)
				this.usersList = data.users
				this.totalPage = data.total
			}
		}
	}
</script>

<style lang="less" scoped>
	.users {
		.cell-btns {
			display: flex;
			justify-content: space-between;
		}
	}
</style>
