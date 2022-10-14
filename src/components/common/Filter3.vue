<template lang="pug">
div
	.filters
		div
			.label Дата регистрации:
			q-select(dense filled  :model-value="grid.regDate" @update:model-value="update1" :options="grid.options" :class="{ blue : grid.regDate !== 'Все'}").sel
				template(v-slot:append v-if="grid.regDate !== 'Все'")
					q-icon(name="mdi-filter" color="negative")
		div
			.label Организация-отправитель:
			q-select(dense filled :model-value="grid.sender" @update:model-value="update2"  :options="sender" :class="{ blue : grid.sender !== 'Все'}").sel
				template(v-slot:append v-if="grid.sender !== 'Все'")
					q-icon(name="mdi-filter" color="negative")
		div
			.label ГИП:
			q-select(dense filled  :model-value="grid.gip" @update:model-value="update3"  :options="gip" :class="{ blue : grid.gip !== 'Все'}").sel
				template(v-slot:append v-if="grid.gip !== 'Все'")
					q-icon(name="mdi-filter" color="negative")
		div
			.label Проект:
			q-select(dense filled  :model-value="grid.proekt" @update:model-value="update4"  :options="proekt" :class="{ blue : grid.proekt !== 'Все'}").sel
				template(v-slot:append v-if="grid.proekt !== 'Все'")
					q-icon(name="mdi-filter" color="negative")
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

const update1 = (e: string) => {
	if (e !== 'Все') {
		grid.sender = 'Все'
		grid.gip = 'Все'
		grid.proekt = 'Все'
		grid.regDate = e
	}
}
const update2 = (e: string) => {
	if (e !== 'Все') {
		grid.gip = 'Все'
		grid.proekt = 'Все'
		grid.regDate = 'Все'
		grid.sender = e
	}
}
const update3 = (e: string) => {
	if (e !== 'Все') {
		grid.proekt = 'Все'
		grid.regDate = 'Все'
		grid.sender = 'Все'
		grid.gip = e
	}
}
const update4 = (e: string) => {
	if (e !== 'Все') {
		grid.regDate = 'Все'
		grid.sender = 'Все'
		grid.gip = 'Все'
		grid.proekt = e
	}
}
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
.blue {
	background: $blue-3;
}
</style>
