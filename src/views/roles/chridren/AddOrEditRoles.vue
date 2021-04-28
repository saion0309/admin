<template>
	<div class="addOrEditRoles">
		<el-dialog :title="isEdit?'编辑角色':'添加角色'" :visible.sync="dialogVisible" width="50%" :before-close="closeDialog"
			:close-on-click-modal="false">
			<el-form :model="dialogForm" ref="dialogForm" :rules="formRoles">
				<el-form-item prop="roleName">
					<el-input placeholder="请输入角色名称" v-model="dialogForm.roleName">
						<i slot="prefix" class="el-input__icon el-icon-user"></i>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="请输入角色描述" v-model="dialogForm.roleDesc">
						<i slot="prefix" class="el-input__icon el-icon-tickets"></i>
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeDialog">取 消</el-button>
				<el-button type="primary" @click="submitDialog">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		reqAddRoles,
		reqEditRoles
	} from 'network/api'
	export default {
		name: "AddOrEditRoles",
		props: ["cuccenrRoles"],
		data() {
			return {
				dialogVisible: false,
				dialogForm: {
					roleName: '',
					roleDesc: ''
				},
				formRoles: {
					roleName: [{
						required: true,
						message: '请输入角色名称',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			//提交对话框
			submitDialog() {
				this.$refs.dialogForm.validate(async (vaild) => {
					if (!vaild) return this.$refs.dialogForm.resetFields()
					//判断是编辑还是添加
					if (this.isEdit) {
						//编辑角色
						const {
							id
						} = this.cuccenrRoles
						const {
							meta
						} = await reqEditRoles(id, this.dialogForm)
						if (meta.status !== 200) return this.$message.error("编辑失败")
						this.$message.success("编辑成功")
					} else {
						//添加角色
						const {
							meta
						} = await reqAddRoles(this.dialogForm)
						if (meta.status !== 201) return this.$message.error(meta.msg)
						this.$message.success(meta.msg)
					}
					this.$parent.getRoles()
					this.dialogVisible = false
				})
			},
			//关闭对话框
			closeDialog() {
				this.$refs.dialogForm.resetFields()
				this.$emit("currCloseRole")
				this.dialogVisible = false
			}
		},
		computed: {
			isEdit() {
				return !!(this.cuccenrRoles.id || this.cuccenrRoles.roleName)
			}
		},
		watch: {
			cuccenrRoles(newValue) {
				//从传过来的数据中获取参数
				const {
					roleName,
					roleDesc
				} = newValue
				this.dialogForm = {
					roleName,
					roleDesc
				}
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
