<template>
	<div class="goods">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{path:'/goods'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>{{fromAdd?'商品列表':'添加商品'}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- card 卡片 -->
		<el-card shadow="always">

			<template v-if="fromAdd">
				<el-row :gutter="20">
					<el-col :span="10">
						<el-input placeholder="请输入内容" v-model="goodsParams.query" class="input-with-select" clearable
							@clear="clearKey">
							<el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
						</el-input>
					</el-col>
					<el-col :span="4">
						<el-button type="primary" @click='addGoods'>添加商品</el-button>
					</el-col>
				</el-row>
				
				<!-- table 表格 -->
				<el-table border :data="goodsList" style="width: 100%">
					<el-table-column type="index">
					</el-table-column>
					<el-table-column label="商品名称" prop="goods_name" width="500px">
					</el-table-column>
					<el-table-column label="商品价格(元)" prop="goods_price">
					</el-table-column>
					<el-table-column label="重量(kg)" prop="goods_weight">
					</el-table-column>
					<el-table-column label="创建时间" prop="upd_time">
					</el-table-column>
					<el-table-column label="操作">
						<template #default>
							<div class="btns">
								<el-button size="mini" type="primary"><i class="el-icon-edit"></i></el-button>
								<el-button size="mini" type="danger"><i class="el-icon-delete"></i></el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
				
				<!-- 分页 -->
				<el-pagination @size-change="sizeChange" @current-change="currentChange" :page-sizes="[5, 10, 15, 20]"
					:page-size="goodsParams.pagesize" :current-page="goodsParams.pagenum"
					layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</template>
			
			<template v-else>
				<router-view/>
			</template>
			
		</el-card>
		
	</div>
</template>

<script>
	import {
		reqGoods
	} from 'network/api'
	export default {
		name: "Goods",
		data() {
			return {
				//商品列表参数
				goodsParams: {
					query: '',
					pagenum: 1,
					pagesize: 5
				},
				//商品数据列表
				goodsList: [],
				//多少条数据
				total:0
			}
		},
		created() {
			this.getGoods()
		},
		methods: {
			//点击添加商品
			addGoods(){
				this.$router.push('/add')
			},
			//搜索带key的商品
			searchClick(){
				this.goodsParams.pagenum = 1
				this.getGoods()
			},
			//清除搜索关键字
			clearKey(){
				this.goodsParams.pagenum = 1
				this.getGoods()
			},
			//改变当前页
			currentChange(page) {
				this.goodsParams.pagenum = page
				this.getGoods()
			},
			//pageSize 改变时会触发
			sizeChange(size) {
				this.goodsParams.pagesize = size
				this.getGoods()
			},
			//请求商品列表
			async getGoods() {
				const {
					meta,
					data
				} = await reqGoods(this.goodsParams)
				if (meta.status !== 200) return this.$message.error(meta.msg)
				this.$message.success(meta.msg)
				// const res = await reqGoods(this.goodsParams)
				// console.log(res)
				this.goodsList = data.goods
				this.total = data.total
			}
		},
		computed:{
			fromAdd(){
				return this.$route.path === '/goods'
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
