<template>
	<div class="setUsers">
		<el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="closeDialog">
			<el-row>
				<el-col>
					<span>当前用户是 :</span>{{setUsersVal.username}}
				</el-col>
			</el-row>
			<el-row>
				<el-col><span>当前角色是 :</span>{{setUsersVal.role_name}}
				</el-col>
			</el-row>
			<el-row>
				<el-col>
					<span>分配角色 :</span>
					<el-select v-model="roleId" placeholder="请选择">
						<el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeDialog">取 消</el-button>
				<el-button type="primary" @click="submitClick">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		reqUsersRoles
	} from 'network/api'
	export default {
		name: "SetUsers",
		props: ["setUsersVal", 'rolesList'],
		data() {
			return {
				dialogVisible: false,
				roleId: ''
			}
		},
		methods: {
			//点击确定
			async submitClick() {
				if (!this.roleId) return this.$message.error('请选择角色')
				const {
					meta
				} = await reqUsersRoles(this.setUsersVal.id, this.roleId)
				if (meta.status !== 200) return this.$message.error(meta.msg)
				this.$message.success(meta.msg)
				this.$parent.getUsers()
				this.dialogVisible = false
			},
			//关闭对话框
			closeDialog() {
				this.dialogVisible = false
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-row {
		margin: 0.4rem 0;

		span {
			margin-right: 0.2rem;
		}
	}
</style>
