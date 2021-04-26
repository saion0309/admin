<template>
	<div class="login">
		<div class="login-box">
			<div class="login-logo">
				<img src="~assets/img/logo.png" alt="">
			</div>

			<!-- 登录框 -->
			<el-form :model="userInfo" :rules="loginRules" ref="loginForm">
				<el-form-item prop="username">
					<el-input type="text" v-model="userInfo.username" prefix-icon="el-icon-user-solid"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" v-model="userInfo.password" prefix-icon="el-icon-search"></el-input>
				</el-form-item>
				<el-form-item class="login-btns">
					<el-button type="primary" @click="loginClcik">登录</el-button>
					<el-button type="info" @click="resetClick">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import {
		reqLogin
	} from 'network/api'
	export default {
		name: 'Login',
		data() {
			return {
				userInfo: {
					username: '', //用户名
					password: '' //密码
				},
				loginRules: {
					username: [{
							required: true,
							message: '用户名不能为空',
							trigger: 'blur'
						},
						{
							min: 4,
							max: 8,
							message: '用户名长度在 4 到 8 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '密码不能为空',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 10,
							message: '密码长度在 6 到 10 个字符',
							trigger: 'blur'
						}
					],
				} //校验规则
			}
		},
		methods: {
			...mapMutations(["changeUserInfo"]),
			//重置按钮
			resetClick() {
				//重置所有
				// this.userInfo.username = this.userInfo.password = ''
				this.$refs.loginForm.resetFields()
			},
			//登录按钮
			loginClcik() {
				//对整个表单进行验证 element-ui框架 form自带的校验方法validate
				this.$refs.loginForm.validate(async (valid) => {
					//判断表单是否有数据
					if(!valid) return
					//查看状态
					// const res = await reqLogin(this.userInfo)
					// console.log(res)
					const {meta,data} = await reqLogin(this.userInfo)
					if(meta.status !== 200) return this.$message.error("登录失败")
					this.$message.success("登录成功")
					sessionStorage.setItem("token",data.token)
					this.changeUserInfo(data)
					this.userInfo.username = this.userInfo.password = ''
					this.$router.replace('/home')
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login {
		position: relative;
		height: 100%;
		background-color: #2b4b6b;

		.login-box {
			width: 9rem;
			height: 6rem;
			background-color: #fff;
			border-radius: 0.1rem;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);

			.login-logo {
				width: 2.6rem;
				height: 2.6rem;
				box-shadow: 0 0 .2rem rgba(100, 100, 100, .4);
				border-radius: 50%;
				background-color: #fff;
				border: 1px solid #eee;
				padding: 0.2rem;
				position: absolute;
				left: 50%;
				transform: translate(-50%, -50%);

				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					background-color: #eee;
				}
			}

			.el-form {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				padding: 0 0.2rem;

				.login-btns {
					text-align: right;
				}
			}
		}
	}
</style>
