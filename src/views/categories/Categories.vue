<template>
	<div class="categories">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/categories' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品列表</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- card 卡片 -->
		<el-card shadow="always">

			<el-row>
				<el-col>
					<el-button type="primary">添加分类</el-button>
				</el-col>
			</el-row>

			<!-- table 表格 -->

			<el-table border style="width: 100%" :data="categoriesList"
				:tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="cat_id"
				:header-cell-style="{background:'rgba(248,248,249,1)',color:'#606266'}" ref="cate_table">
				<el-table-column label="序号" width="60px" type="index">
					<!-- <template scope="scope"> <span>{{(pagenum - 1) * pageSize + scope.$index + 1}}</span> </template> -->
				</el-table-column>
				<el-table-column label="分类名称">
					<template slot-scope="scope">
						<!-- <i class="el-icon-circle-plus-outline"></i> -->
						<span>{{scope.row.cat_name}}</span>
					</template>
				</el-table-column>
				<el-table-column label="是否有效">
					<template slot-scope="scope">
						<i class="el-icon-success" style="color:rgba(173,255,47,1)"
							v-if="scope.row.cat_deleted ?'false' : 'true'"></i>
						<i class="el-icon-error" style="color:rgba(247,137,137,1)" v-else></i>
					</template>
				</el-table-column>
				<el-table-column label="排序">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
						<el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
						<el-tag type="danger" v-else="scope.row.cat_level === 2">三级</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<div class="btns">
							<el-button size="mini" type="primary"><i class="el-icon-edit"></i></el-button>
							<el-button size="mini" type="danger"><i class="el-icon-delete"></i></el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页器 -->
			<el-pagination @size-change="sizeChange" @current-change="currentChange" :page-sizes="[3, 5, 10, 15]"
				:page-size="categoriesList.pagesize" :current-page="categoriesList.pagenum"
				layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
	import {
		reqCategories
	} from 'network/api'
	export default {
		name: "Categories",
		data() {
			return {
				categoriesList: [],
				pagenum:1,//当前页数
				pagesize:3,//当前页面的几条数据
				totalPage:10
			}
		},
		created() {
			this.getCategories()
		},
		methods: {
			//改变当前页
			currentChange(page) {
				this.categoriesList.pagenum = page
				this.getCategories()
			},
			//pageSize 改变时会触发
			sizeChange(size) {
				this.categoriesList.pagesize = size
				this.getCategories()
			},
			//请求商品分类数据
			async getCategories() {
				const {
					meta,
					data
				} = await reqCategories()
				if (meta.status !== 200) return this.$message.error(meta.msg)
				this.categoriesList = data
			}
		},

	}
</script>

<style lang="less" scoped>
	//展开图标 旋转
	/deep/.cell .el-table__expand-icon--expanded {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}

	//穿透 图标样式
	/deep/.cell .el-table__expand-icon .el-icon-arrow-right:before {
		content: "\e723";
	}

	/deep/.cell .el-table__expand-icon--expanded .el-icon-arrow-right:before {
		content: "\e722";

	}
</style>
