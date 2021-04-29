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
			:default-expand-all="true"
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
				:header-cell-style="{background:'rgba(248,248,249,1)',color:'#606266'}">
				<el-table-column label="序号" width="60px" type="index">
				</el-table-column>
				<el-table-column label="分类名称" prop="cat_name">
					
				</el-table-column>
				<el-table-column label="是否有效">
					<template #default="{row}">
						<i class="el-icon-success" style="color:rgba(173,255,47,1)" v-if="row.cat_deleted ?'false' : 'true'"></i>
						<i class="el-icon-error" style="color:rgba(247,137,137,1)" v-else></i>
					</template>
				</el-table-column>
				<el-table-column label="排序">
					<template #default="{row}">
						<el-tag v-if="row.cat_level === 0">一级</el-tag>
						<el-tag type="success" v-else-if="row.cat_level === 1">二级</el-tag>
						<el-tag type="danger"v-else="row.cat_level === 2">三级</el-tag>
					</template>
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
				categoriesList: []
			}
		},
		created() {
			this.getCategories()
		},
		methods: {
			async getCategories() {
				const {
					meta,
					data
				} = await reqCategories()
				if (meta.status !== 200) return this.$message.error(meta.msg)
				this.categoriesList = data
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
