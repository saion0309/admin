<template>
	<div class="home">
		<el-container>
			<el-header>
				<div class="logo">
					<img src="~assets/img/logo.png" alt="">
					<span>电商后台管理系统</span>
				</div>
				<el-button type="info" @click="Logiout">退出</el-button>
			</el-header>
			<el-container>
				<el-aside :width="isCollapse ? '60px' : '200px'">
					<div class="toggleCollapse" @click="isCollapse = !isCollapse">
					  |||
					</div>
					<el-menu 
					default-active="2" 
					background-color="#333744"
					active-text-color="#3d9eff" 
					unique-opened 
					router
					:collapse="isCollapse"
					:collapse-transition="false"
					text-color="#fff"
					:default-active="activePath"
					>
						<el-submenu 
						:index="item.id+''" 
						v-for="item in menusList" 
						:key="item.id"
						>
							<template slot="title">
								<i :class="iconObj[item.id]"></i>
								<span>{{item.authName}}</span>
							</template>
							<el-menu-item-group v-for="citem in item.children" :key="citem.id">
								
								<el-menu-item :index="citem.path" @click='menuItem'>
									<i class="el-icon-menu"></i>
									<span slot='title'>{{citem.authName}}</span>
								</el-menu-item>
							</el-menu-item-group>

						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import {
		reqMenusList
	} from 'network/api'
	export default {
		name: 'Home',
		data() {
			return {
				//左侧菜单
				menusList: [],
				//是否展开
				isCollapse:false,
				//字体图标
				iconObj:{
					125:'el-icon-user-solid',
					103:'el-icon-warning',
					101:'el-icon-s-goods',
					102:'el-icon-s-order',
					145:'el-icon-s-platform'
				},
				//默认活动样式
				activePath:''
			}
		},
		created() {
			this.activePath = sessionStorage.getItem("activePath")
			this.getMenusList()
		},
		methods: {
			//点击菜单每一项
			menuItem(){
				//将当前活动的那一项 存入本地存储
				sessionStorage.setItem("activePath",path)
				//默认活动的那一项 
				this.activePath = path
			},
			//登出
			Logiout(){
				//清除本地存储
				sessionStorage.clear()
				//清除store
				// this.changeUserInfo({})
				this.$store.state.userInfo = {}
				//路由跳转
				this.$router.replace("/login")
			},
			//请求导航列表数据
			async getMenusList() {
				// const res = await reqMenusList()
				// console.log(res)
				const {
					meta,
					data
				} = await reqMenusList()
				if (meta.status !== 200) return this.$message.error(meta.msg)
				this.$message.success(meta.msg)
				this.menusList = data
			}
		},
		computed:{
		}
	}
</script>

<style lang="less" scoped>
	.home {
		height: 100%;
		height: 100%;

		::-webkit-scrollbar {
			display: none;
			/* Chrome Safari */
		}

		.el-container {
			height: 100%;

			.el-header {
				height: 1.2rem;
				background-color: rgba(55, 61, 65, 1);
				display: flex;
				justify-content: space-between;
				align-items: center;

				.logo {
					display: flex;
					align-items: center;
					justify-content: space-between;

					img {
						height: 1.1rem;
						width: 1.1rem;
						margin: 0 0.2rem;
					}

					span {
						color: #fff;
						font-size: 0.48rem;
					}
				}
			}

			.el-aside {
				background-color: rgba(51, 55, 68, 1);
				.el-menu{
				  border-right: none;
				}
				.toggleCollapse{
					background-color: #4a5064;
					text-align: center;
					line-height: 25px;
					color: #fff;
					font-size: 10px;
					letter-spacing: 2px;
					cursor: pointer;
				}
			}

			.el-main {
				background-color: rgba(234,237,241,1);
			}
		}

	}
</style>
