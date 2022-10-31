<template lang="pug">
q-card.mycard
	.zg
		q-icon(name="mdi-shield-key-outline").some
		span Права доступа к
		q-icon(name="mdi-bookshelf" v-if="myinfo.currentItem.id === '0'" size="26px").q-mx-sm
		component(:is="SvgIcon" :name="myinfo.currentItem.icon" v-else).icon
		span {{myinfo.currentItem.label}}
	q-separator
</template>

<script setup lang="ts">
import { useInfo } from '@/stores/info'
import SvgIcon from '@/components/SvgIcon.vue'

const myinfo = useInfo()
</script>

<style scoped lang="scss">
.q-card.mycard {
	margin-top: 0;
}
.zg {
	font-size: 1.1rem;
	margin-bottom: 1rem;
	.icon {
		font-size: 1rem;
		margin-right: 0.5rem;
		margin-left: 0.9rem;
	}
	.some {
		font-size: 1.8rem;
		margin-right: 0.5rem;
	}
}
</style>
