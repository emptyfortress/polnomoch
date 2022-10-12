<template lang="pug">
div
	.filters
		div
			.label Дата регистрации:
			q-select(dense bg-color="blue-3" filled  v-model="mystore.regDate" :options="options1").sel
				template(v-slot:append)
					q-icon(name="mdi-filter" color="negative")
		div
			.label Организация-отправитель:
			q-select(dense bg-color="blue-3" filled  v-model="mystore.sender" :options="props.sender").sel
				template(v-slot:append)
					q-icon(name="mdi-filter" color="negative")
		div
			.label ГИП:
			q-select(dense bg-color="blue-3" filled  v-model="mystore.gip" :options="props.gip").sel
				template(v-slot:append)
					q-icon(name="mdi-filter" color="negative")
		div
			.label Проект:
			q-select(dense bg-color="blue-3" filled  v-model="mystore.proekt" :options="props.proekt").sel
				template(v-slot:append)
					q-icon(name="mdi-filter" color="negative")
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useGrid } from '@/stores/grid'

const props = defineProps<{
	sender: String[]
	gip: String[]
	proekt: String[]
}>()

const mystore = useGrid()

const options1 = [
	'все',
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
