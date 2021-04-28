<template>
	<div class="roles">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片 -->
		<el-card>

			<!-- 按钮 -->
			<el-row>
				<el-col>
					<el-button type="primary" @click="addRoles">添加角色</el-button>
				</el-col>
			</el-row>

			<!-- 表格 -->
			<el-table :data="rolesList" border>
				<el-table-column type="expand">
					<template #default='{row}'>
						<el-row v-for="(item,index) in row.children" :key='item.id' class="b_border" :class="{ t_border: index === 0 }">
							<el-col :span="5">
								<el-tag closable @close="delRights(row,item.id)">
									{{item.authName}}
								</el-tag>
								<i class="el-icon-caret-right"></i>
							</el-col>
							<el-col :span="19">
								<el-row v-for="(citem,index) in item.children" :key='citem.id' :class="{t_border : index !==0}">
									<el-col :span="5">
										<el-tag type="success" closable @close="delRights(row,citem.id)">
											{{citem.authName}}
										</el-tag>
										<i class="el-icon-caret-right"></i>
									</el-col>
									<el-col :span="19">
										<el-tag type="warning" v-for="ccitem in citem.children" :key='ccitem.id'
											closable @close="delRights(row,ccitem.id)">
											{{ccitem.authName}}
										</el-tag>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column label="#" type="index">
				</el-table-column>
				<el-table-column label="角色名称" prop="roleName">
				</el-table-column>
				<el-table-column label="角色描述" prop="roleDesc">
				</el-table-column>
				<el-table-column label="操作">
					<template #default="{row}">
						<div class="rolesbtn">
							<el-button size="mini" type="primary" @click="editRoles(row)"><i class="el-icon-edit"></i>编辑
							</el-button>
							<el-button size="mini" type="danger" @click="delRoles(row)"><i class="el-icon-delete"></i>删除
							</el-button>
							<el-button size="mini" type="warning" @click="setRights(row)"><i
									class="el-icon-setting"></i>设置权限</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<add-or-edit-roles ref="rolesDialog" :cuccenrRoles="cuccenrRoles" @currCloseRole='currCloseRole'>
		</add-or-edit-roles>
		<set-roles-rights ref="setUsersRights" :rightsList="rightsList"></set-roles-rights>
	</div>
</template>

<script>
	import {
		reqRoles,
		reqDelRoles,
		reqDelUsersRights,
		reqGetRights
	} from 'network/api'
	import AddOrEditRoles from './chridren/AddOrEditRoles.vue'
	import SetRolesRights from './chridren/SetRolesRights.vue'
	export default {
		name: "Roles",
		components: {
			AddOrEditRoles,
			SetRolesRights
		},
		data() {
			return {
				//角色列表
				rolesList: [],
				//传给子组件的数据
				cuccenrRoles: {},
				//权限列表
				rightsList:[]
			}
		},
		created() {
			this.getRoles()
		},
		methods: {
			//设置角色权限
			async setRights(row) {
			const {meta,data} =	await reqGetRights("tree")
			if (meta.status !== 200) return this.$message.error(meta.msg)
			this.rightsList = data
				this.$refs.setUsersRights.dialogVisible = true
			},
			//删除用户指定权限
			async delRights(row,rightId){
				const result = await this.$confirm(
				  '确定要删除该权限? 是否继续?',
				  '提示',
				  {
				    confirmButtonText: '确定',
				    cancelButtonText: '取消',
				    type: 'warning',
				  }
				).catch((err) => {})
				if (result !== 'confirm') return
				const {id:roleId} = row
				const {meta,data} = await reqDelUsersRights(roleId,rightId)
				if (meta.status !== 200) return this.$message.error(meta.msg)
				this.$message.success(meta.msg)
				row.children = data
			},
			//重置状态
			currCloseRole() {
				this.cuccenrRoles = {}
			},
			//删除角色
			async delRoles(row) {
				const result = this.$confirm('确定要删除该角色吗? 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).catch(err => {})
				if (result !== "confirm") return
				const {
					id
				} = row
				const {
					meta
				} = await reqDelRoles(id)
				if (meta.status !== 200) return this.$message.error(meta.msg)
				this.$message.success(meta.msg)
				this.getRoles()
			},
			//编辑角色
			editRoles(row) {
				this.cuccenrRoles = row
				this.$refs.rolesDialog.dialogVisible = true
			},
			//添加角色
			addRoles() {
				this.cuccenrRoles = {}
				this.$refs.rolesDialog.dialogVisible = true
			},
			//请求角色列表数据
			async getRoles() {
				const {
					meta,
					data
				} = await reqRoles()
				if (meta.status !== 200) return this.$message.error(meta.msg)
				this.rolesList = data
			}
		}
	}
</script>

<style lang="less" scoped>
	.rolesbtn {
		display: flex;
		justify-content: space-evenly;
	}

	.b_border {
		border-bottom: 1px solid #ddd;
	}

	.t_border {
		border-top: 1px solid #ddd;
	}

	.el-row {
		display: flex;
		justify-content: center;
		align-items: center;
		
		.el-tag{
			margin: 10px 0;
			margin-right: 0.2rem;
		}
	}
	
</style>
