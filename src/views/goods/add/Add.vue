<template>
	<div class="add">
		<!-- Alert 警告 -->
		<el-alert title="添加商品信息" type="info" center show-icon>
		</el-alert>

		<!-- stps 步骤条 -->
		<el-steps :active="active" finish-status="success" align-center :before-leave="leaveTab">
			<el-step title="基本信息"></el-step>
			<el-step title="商品参数"></el-step>
			<el-step title="商品属性"></el-step>
			<el-step title="商品图片"></el-step>
			<el-step title="商品内容"></el-step>
			<el-step title="完成"></el-step>
		</el-steps>

		<!-- 表单 -->
		<el-form :rules="productForm">
			<!-- 标签分页 -->
			<el-tabs tab-position="left">
				<el-tab-pane label="基本信息">
					<el-form-item label="商品名称" prop="productName">
						<el-input v-model="productName"></el-input>
					</el-form-item>
					<el-form-item label="商品价格" prop="productPrice">
						<el-input v-model="productPrice" type="number"></el-input>
					</el-form-item>
					<el-form-item label="商品重量" prop="productWeight">
						<el-input v-model="productWeight" type="number"></el-input>
					</el-form-item>
					<el-form-item label="商品数量" prop="productNum">
						<el-input v-model="productNum" type="number"></el-input>
					</el-form-item>
					<el-form-item label="商品分类" prop="productCate">
						<el-cascader  v-model="productClass.cat_id" :options="productClass"
							:props="defaultParams"></el-cascader>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="商品参数">
					<el-form-item label="Swisse鱼油">
						 <el-radio :v-model="1" label="1" border="">包邮包税鱼油双瓶装,包邮包税鱼油单瓶装</el-radio>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="商品属性">
					<el-form-item label="主体参数-品牌" >
						<el-input v-model="mainParams"></el-input>
					</el-form-item>
					<el-form-item label="规格参数-包装" >
						<el-input v-model="normParams"></el-input>
					</el-form-item>
					<el-form-item label="特性参数-蓝帽标识" >
						<el-input v-model="featureParams"></el-input>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="商品图片">
					<el-button type="primary">点击上传</el-button>
				</el-tab-pane>
				<el-tab-pane label="商品内容">
				</el-tab-pane>
			</el-tabs>
		</el-form>
	</div>
</template>

<script>
	import {
		reqCategories
	} from 'network/api'
	export default {
		name: "Add",
		data() {
			return {
				active: 0,
				productClass: [], //商品分类
				productName: '', //商品名称
				productPrice: '1', //商品价格
				productWeight: '0', //商品重量
				productNum: '0', //商品数量
				productForm: { //验证规则
					productName: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}],
					productPrice: [{
						required: true,
						message: '请输入商品价格',
						trigger: 'blur'
					}],
					productWeight: [{
						required: true,
						message: '请输入商品重量',
						trigger: 'blur'
					}],
					productNum: [{
						required: true,
						message: '请输入商品数量',
						trigger: 'blur'
					}],
					productCate: [{
						required: true,
						trigger: 'blur'
					}]
				},
				defaultParams: {
					label: 'cat_name', //要显示元素的名称
					value: 'cat_id', //显示元素对应的id
					children: 'children', //子集名称
					expandTrigger: 'hover'
				},
				mainParams:'',			//主体参数
				normParams:'瓶装',			//规格参数
				featureParams:'普通膳食补充剂（非健字号）',		//特性参数
			}
		},
		created() {
			this.getCategories()
		},
		methods: {
			//离开当前的选项卡
			leaveTab() {

			},
			//获取商品分类列表
			async getCategories() {
				// const res = await reqCategories()
				// console.log(res)
				const {
					meta,
					data
				} = await reqCategories()
				if (meta.status !== 200) return this.$message.error(meta.msg)
				// this.$message.success(meta.msg)
				this.productClass = [...data]
			}
		}

	}
</script>

<style lang="less" scoped>
	.el-steps {
		margin: 0.3rem 0;
	}
</style>
