<script setup lang="ts">
import { ref, computed } from 'vue'
import { useInfo } from '@/stores/info'
import SvgIcon from '@/components/SvgIcon.vue'

const myinfo = useInfo()
const current = ref(myinfo.currentItem)
</script>

<template lang="pug">
.q-ma-md
	.zg
		q-icon(name="mdi-bookshelf" v-if="myinfo.currentItem.id === '0'").some
		component(:is="SvgIcon" :name="myinfo.currentItem.icon" v-else).icon
		|{{myinfo.currentItem.label}}
	//- p {{current}}
</template>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.zg {
	font-size: 1.1rem;
	// font-weight: bold;
	margin-bottom: 1rem;
	.icon {
		margin-right: 0.7rem;
		margin-top: -7px;
	}
	.some {
		font-size: 1.8rem;
		margin-right: 0.5rem;
	}
}
</style>
