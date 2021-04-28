<template>
	<div class="usersDialog">
		<el-dialog :title="isEdit ?'编辑用户':'添加用户'" :visible.sync="dialogVisible" width="50%" :before-close="handleClose"
			:close-on-click-modal="false">
			<el-form :model="dialogForm" ref="dialogForm" :rules="formRules">
				<el-form-item prop="username">
					<el-input placeholder="请输入用户名"  v-model="dialogForm.username" :disabled="isEdit">
						<i slot="prefix" class="el-input__icon el-icon-user"></i>
					</el-input>
				</el-form-item>
				<el-form-item v-if="!isEdit" prop="password">
					<el-input placeholder="请输入密码"  v-model="dialogForm.password">
						<i slot="prefix" class="el-input__icon el-icon-lock"></i>
					</el-input>
				</el-form-item>
				<el-form-item prop="email">
					<el-input placeholder="请输入邮箱"  v-model="dialogForm.email">
						<i slot="prefix" class="el-input__icon el-icon-message"></i>
					</el-input>
				</el-form-item>
				<el-form-item prop="mobile" >
					<el-input placeholder="请输入手机号" v-model="dialogForm.mobile">
						<i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="submitClick">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		mobileRule
	} from 'utils/rules'
	import {
		reqEditUsers,
		reqAddUsers
	} from 'network/api'
	export default {
		name: 'UsersDialog',
		props: ["currentUsersInfo","clearChangeUsersInfo"],
		data() {
			return {
				dialogVisible: false,
				dialogForm: {
					username: '',
					password: '',
					email: '',
					mobile: ''
				},
				formRules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 4,
							max: 10,
							message: '长度在 4 到 10 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 16,
							message: '长度在 6 到 16 个字符',
							trigger: 'blur'
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: 'blur'
						}
					],
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							validator: mobileRule,
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			//点击 ‘x’ 关闭
			handleClose() {
				this.$refs.dialogForm.resetFields()
				this.$emit("clearChangeUsersInfo")
				this.dialogVisible = false
			},
			//点确定关闭 
			submitClick() {
				//先对整个表单开始校验
				this.$refs.dialogForm.validate(async (valid) => {
					if(!valid) return this.$refs.dialogForm.resetFields()
					//判断是编辑还算添加
					if(this.isEdit){
						//编辑用户
						//获取参数
						const {id} = this.currentUsersInfo
						const {mobile,email} = this.dialogForm
						//发请求
						const {meta} = await reqEditUsers(id,email,mobile)
						//判断状态
						if(meta.status !== 200) return this.$message.error(meta.msg)
						this.$message.success(meta.msg)
						
					}else{
						//添加用户
						const {meta,data} = await reqAddUsers(this.dialogForm)
						if(meta.status !== 201)  return this.$message.error(meta.msg)
						this.$message.success(meta.msg)
					}
					//子组件拿去父组件的方法
					this.$parent.getUsers()
					this.dialogVisible = false
				})
				
				this.dialogVisible = false
			},
			//点击取消按钮关闭
			handleClose() {
				this.$refs.dialogForm.resetFields()
				this.dialogVisible = false
			}
		},
		computed: {
			//是否来自编辑
			isEdit() {
				const {
					id,
					username
				} = this.currentUsersInfo
				return !!(id || username)
			}
		},
		watch:{
			currentUsersInfo(newValue){
				//从传过来的数据中获取参数
				const {username,mobile,email} = newValue
				this.dialogForm={username,mobile,email,password:''}
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-form {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		flex-wrap: wrap;
	}
</style>
