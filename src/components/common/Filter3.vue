<template lang="pug">
.filters
	div
		.label Дата регистрации:
		q-select(dense bg-color="blue-3" filled  v-model="mystore.regDate" :options="options1").sel
			template(v-slot:append)
				q-icon(name="mdi-filter" color="negative")
	div
		.label Организация-отправитель:
		q-select(dense bg-color="blue-3" filled  v-model="mystore.sender" :options="options1").sel
			template(v-slot:append)
				q-icon(name="mdi-filter" color="negative")
	div
		.label ГИП:
		q-select(dense bg-color="blue-3" filled  v-model="model1" :options="options1").sel
			template(v-slot:append)
				q-icon(name="mdi-filter" color="negative")
	div
		.label Проект:
		q-select(dense bg-color="blue-3" filled  v-model="model1" :options="options1").sel
			template(v-slot:append)
				q-icon(name="mdi-filter" color="negative")
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useGrid } from '@/stores/grid'

const props = defineProps<{
	fil1: String[]
	fil2: String[]
	fil3: String[]
}>()

const mystore = useGrid()

const model1 = ref('сентябрь')
const options1 = [
	'сентябрь',
	'август',
	'июль',
	'июнь',
	'май',
	'апрель',
	'март',
	'февраль',
	'январь',
	'Прошлый год',
]
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
