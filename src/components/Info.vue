<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
	selected: {
		type: String,
		default: 'test',
	},
})

const tab1 = ref('cod')
</script>

<template lang="pug">
//- q-tabs(v-model="tab1" align="left" dense active-color="primary")
//- 	q-tab(name="cod" label="Сведения о коде")
//- 	q-tab(name="sprav" label="Сведения о справочнике")
p {{props.selected}}
	//- q-tab-panels(v-model="tab1" transition-prev="jump-down" animated transition-next="jump-up")
	//- 	q-tab-panel(name="cod")
	//- 		p
	//- 			|{{props.selected}}
	//- 		q-menu(context-menu)
	//- 			q-list
	//- 				q-item(v-for="n in 5" clickable v-close-popup)
	//- 					q-item-section
	//- 						q-label lakjslaj {{n}}

	//- 	q-tab-panel(name="sprav")
	//- 		p sprav
</template>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.right {
	box-shadow: none;
	border-radius: 4px;
	height: calc(100vh - 211px);
}
</style>
