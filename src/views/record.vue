<template>
<div class="record">
	<ul class="content" v-if="list.length > 0">
		<Link v-for="(item, index) in list" :key="index"
			:url="item.url"
			:subIds="item.subids"
			:index="index"
		/>
	</ul>
	<div class="content" v-else>
		<p class="tip"><i class='bx bx-error-alt'></i>尚無轉換連結</p>
	</div>
</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Link from '../components/link.vue'
export default {
	components: {
		Link
	},
	setup () {
		const store = useStore()
		const list = computed(() => store.state.links)
		return {
			list
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';
.record{
  width: 90%;
  max-width: 600px;
  margin: auto;
	.content{
    @include box;
		.tip{
			font-size: 20px;
			line-height: 1.1;
			text-align: center;
		}
	}
}
</style>