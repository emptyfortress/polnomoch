<script setup lang="ts">
import { ref } from 'vue'
import BranchTree from '@/components/BranchTree.vue'
import Info from '@/components/Info.vue'

const splitterModel = ref(40)
</script>

<template lang="pug">
q-page
	.container
		.zag Коды полномочий

		q-splitter(v-model="splitterModel" )
			template(v-slot:before)
				q-card.left
					BranchTree
			template(v-slot:after)
				.q-pl-sm
					Info

</template>

<style scoped lang="scss">
.center {
	height: calc(100vh - 220px);
	display: flex;
	justify-content: center;
	align-items: center;
}
.left {
	box-shadow: none;
	border-radius: 4px;
	box-shadow: none;
	border-radius: 4px;
	margin-right: 0.5rem;
	margin-top: 34px;
	padding: 1rem;
	height: calc(100vh - 210px);
}
</style>
