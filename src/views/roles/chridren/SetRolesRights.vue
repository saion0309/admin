<template>
	<div class="setroles">
		<!-- dialog对话框 -->
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="50%"
		  :before-close="closeDialog">
		  <el-tree :data="rightsList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

		  <span slot="footer" class="dialog-footer">
		    <el-button @click="closeDialog">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:"SetRolesRights",
		props:["rightsList"],
		data() {
			return{
				dialogVisible:false
			}
		},
		methods:{
			//
			handleNodeClick(){},
			//关闭对话框
			closeDialog(){
				this.dialogVisible = false
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
