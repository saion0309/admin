<template>
	<div class="welcome">
		<div class="content">
			<span>WELCOME,</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Welcome',
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.welcome{
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		span{
			font-size: 2rem;
			font-family: '楷体';
		}
	}
</style>
