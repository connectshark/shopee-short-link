<template>
<div class="record">
	<ul class="list-group">
		<Link v-for="(item, index) in list" :key="index"
			:url="item.url"
			:subIds="item.subids"
		/>
	</ul>
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
.record{
	margin-top: -30px;
	.list-group{
    width: 90%;
    margin: auto;
    max-width: 600px;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
}
</style>