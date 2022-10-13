<template lang="pug">
div
	.filters
		div
			.label Дата регистрации:
			q-select(dense bg-color="blue-3" filled  v-model="grid.regDate1" :options="grid.options").sel
				template(v-slot:append v-if="grid.regDate1 !== 'Все'")
					q-icon(name="mdi-filter" color="negative")
		div
			.label Автор:
			q-select(dense bg-color="blue-3" filled  v-model="grid.author" :options="author").sel
				template(v-slot:append v-if="grid.author !== 'Все'")
					q-icon(name="mdi-filter" color="negative")
		div
			.label Подразделение:
			q-select(dense bg-color="blue-3" filled  v-model="grid.department" :options="department").sel
				template(v-slot:append v-if="grid.department !== 'Все'")
					q-icon(name="mdi-filter" color="negative")
		div
			.label В отделы:
			q-select(dense bg-color="blue-3" filled  v-model="grid.to" :options="to").sel
				template(v-slot:append v-if="grid.to !== 'Все'")
					q-icon(name="mdi-filter" color="negative")
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGrid } from '@/stores/grid'

const props = defineProps<{
	author: String[]
	department: String[]
	to: String[]
}>()

const grid = useGrid()

const author = computed(() => {
	return ['Все', ...props.author]
})
const department = computed(() => {
	return ['Все', ...props.department]
})
const to = computed(() => {
	return ['Все', ...props.to]
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
