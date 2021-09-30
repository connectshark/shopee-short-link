<template>
<li class="link">
	<p class="url">{{url}}</p>
	<p class="sub-group">
		<template v-for="item in subIds" :key="item">
			<span class="sub-item" v-if="item">{{item}}</span>
		</template>
	</p>
</li>
</template>

<script>
export default {
  props: {
		url: {
			type: String
		},
		subIds: {
			type: Array
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/color.scss';
@import '../assets/scss/media.scss';
.link{
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
	@include desktops {
		display: block;
	}

	.url{
		font-size: 18px;
		list-style: 1.5;
		padding: 10px;
		border-radius: 20px;
	}
	.sub-group{
		padding: 10px;
		.sub-item{
			display: inline-block;
			background-color: $main;
			color: #fff;
			padding: 5px;
			border-radius: 30px;
			margin: 0 5px;
		}
	}
}
</style>