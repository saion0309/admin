<template>
	<div class="rights">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>权限列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		<!-- card 卡片 -->
		<el-card shadow="always">
			<el-table border style="width: 100%" :data="rightsList">
				<el-table-column label="#" type="index" width="48px">
				</el-table-column>
				<el-table-column label="权限名称"   prop="authName">
				</el-table-column>
				<el-table-column label="路径"prop="path">
				</el-table-column>
				<el-table-column label="权限等级">
					<template #default = "{row}">
						<el-tag v-if="row.level == 0">一级</el-tag>
						<el-tag type="success" v-else-if="row.level == 1">二级</el-tag>
						<el-tag type="warning" v-else="row.level == 2">三级</el-tag>
						
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	import {reqGetRights} from 'network/api'
	export default{
		name:'Rights',
		data() {
			return{
				rightsList:[]
			}
		},
		created() {
			this.getRights()
		},
		methods:{
			async getRights(){
			const {meta,data} = await reqGetRights('list')
			if(meta.status !== 200) return this.$message.error(meta.msg)
			this.$message.success(meta.msg)
			this.rightsList = data
			console.log(data)
			}
		}
		
	}
</script>

<style lang="less" scoped>
</style>
