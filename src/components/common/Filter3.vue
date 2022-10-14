<template lang="pug">
div
	.filters
		div
			.label Дата регистрации:
			q-select(dense bg-color="blue-3" filled  v-model="grid.regDate" :options="grid.options").sel
				template(v-slot:append v-if="grid.regDate !== 'Все'")
					q-icon(name="mdi-filter" color="negative")
		div
			.label Организация-отправитель:
			q-select(dense bg-color="blue-3" filled  v-model="grid.sender" :options="sender").sel
				template(v-slot:append v-if="grid.sender !== 'Все'")
					q-icon(name="mdi-filter" color="negative")
		div
			.label ГИП:
			q-select(dense bg-color="blue-3" filled  v-model="grid.gip" :options="gip").sel
				template(v-slot:append v-if="grid.gip !== 'Все'")
					q-icon(name="mdi-filter" color="negative")
		div
			.label Проект:
			q-select(dense bg-color="blue-3" filled  v-model="grid.proekt" :options="proekt").sel
				template(v-slot:append v-if="grid.proekt !== 'Все'")
					q-icon(name="mdi-filter" color="negative")
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useGrid } from '@/stores/grid'

const props = defineProps<{
	sender: String[]
	gip: String[]
	proekt: String[]
}>()

const grid = useGrid()

const sender = computed(() => {
	return ['Все', ...props.sender]
})
const gip = computed(() => {
	return ['Все', ...props.gip]
})
const proekt = computed(() => {
	return ['Все', ...props.proekt]
})

watchEffect(() => {
	if (grid.regDate !== 'Все') {
		grid.sender = 'Все'
		grid.gip = 'Все'
		grid.proekt = 'Все'
	} else if (grid.sender !== 'Все') {
		grid.regDate = 'Все'
		grid.gip = 'Все'
		grid.proekt = 'Все'
	}
})
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.filters {
	display: flex;
	justify-content: flex-start;
	gap: 1rem;
	margin: 0.5rem 0 1rem 0;
}
.sel {
	width: 250px;
}
</style>
