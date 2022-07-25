<script setup lang="ts">
import { ref } from 'vue'

const tab1 = ref('cod')
</script>

<template lang="pug">
q-tabs(v-model="tab1" align="left" dense active-color="primary")
	q-tab(name="cod" label="Сведения о коде")
	q-tab(name="sprav" label="Сведения о справочнике")
q-card.right
	q-tab-panels(v-model="tab1" transition-prev="jump-down" animated transition-next="jump-up")
		q-tab-panel(name="cod")
			p cod
		q-tab-panel(name="sprav")
			p sprav
</template>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.right {
	box-shadow: none;
	border-radius: 4px;
	height: calc(100vh - 211px);
}
</style>
