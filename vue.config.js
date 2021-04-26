const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('views', resolve('src/views'))
			.set('network', resolve('src/network'))
			.set('utils', resolve('src/utils'))
	},
	devServer: {
		open: true, //浏览器自动打开页面
		host: "localhost", //如果是真机测试，就使用这个IP
		port: 8080,
		https: false,
		hotOnly: false, //热更新（webpack已实现了，这里false即可）
		// Paths
		// proxy: {
		// 	//配置跨域-将所有/api的请求拦截，代理到target上
		// 	'/api': {
		// 		target: "http://127.0.0.1:8888",
		// 		changOrigin: true,
		// 		ws: true
		// 	}
		// }
	}
}
