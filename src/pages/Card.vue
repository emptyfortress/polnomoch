<script setup lang="ts">
import { ref } from 'vue'
import BranchTree from '@/components/BranchTree.vue'
import Info from '@/components/Info.vue'

const splitterModel = ref(50)

const selected = ref()

const setSelected = (e: string) => {
	selected.value = e
}
</script>

<template lang="pug">
q-page
	.container
		.zag Коды полномочий

		q-splitter(v-model="splitterModel" )
			template(v-slot:before)
				q-card.q-mr-sm
					component(:is="BranchTree" @select="setSelected")
			template(v-slot:after)
				q-card.q-ml-sm
					component(:is="Info" :selected="selected")

</template>

<style scoped lang="scss">
.center {
	height: calc(100vh - 220px);
	display: flex;
	justify-content: center;
	align-items: center;
}
.q-card {
	box-shadow: none;
	border-radius: 4px;
	box-shadow: none;
	border-radius: 4px;
	margin-top: 1rem;
	padding: 1rem;
	height: calc(100vh - 210px);
}
</style>
