import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')
const Welcome = () => import('views/welcome/Welcome')
const Users = () => import('views/users/Users')
const Roles = () => import('views/roles/Roles')
const Rights = () => import('views/rights/Rights')
const Goods = () => import('views/goods/Goods')
const Params = () => import('views/params/Params')
const Categories = () => import('views/categories/Categories')
const Orders = () => import('views/orders/Orders')
const Reports = () => import('views/reports/Reports')


const routes = [{
		path: '/',
		redirect: '/login'
	}, {
		path: '/login',
		name: 'Login',
		component: Login
	}, {
		path: '/home',
		name: 'Home',
		component: Home,
		redirect: '/welcome',
		children: [{
				path: '/welcome',
				name: 'Welcome',
				component: Welcome
			},
			{
				path: '/users',
				name: 'Users',
				component: Users
			},
			{
				path: '/roles',
				component: Roles,
				name: 'Roles'
			},
			{
				path: '/rights',
				component: Rights,
				name: 'Rights'
			},
			{
				path: '/goods',
				component: Goods,
				name: 'Goods',
				children: [{
					path: '/add',
					component:() => import('views/goods/add/Add'),
					name: 'Add'
				}]
			},
			{
				path: '/params',
				component: Params,
				name: 'Params'
			},
			{
				path: '/categories',
				component: Categories,
				name: 'Categories'
			},
			{
				path: '/orders',
				component: Orders,
				name: 'Orders'
			},
			{
				path: '/reports',
				component: Reports,
				name: 'Reports'
			},
		]
	}

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	if (to.path !== "/login") {
		//判断登录
		if (sessionStorage.getItem("token")) {
			//已经登录
			next()
		} else {
			next('/login')
		}
	} else {
		next()
	}

})

export default router
