<template lang="pug">
div
	.filters
		div
			.label Дата регистрации:
			q-select(dense bg-color="blue-3" filled  v-model="grid.regDate1" :options="grid.options").sel
				template(v-slot:prepend)
					q-icon(name="mdi-calendar").cal
				template(v-slot:append v-if="grid.regDate1 !== 'Все'")
					q-icon(name="mdi-filter" color="negative" @click.stop="clear")
</template>

<script setup lang="ts">
// import { computed } from 'vue'
import { useGrid } from '@/stores/grid'

const grid = useGrid()
const clear = () => {
	grid.regDate1 = 'Все'
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
.cal {
	transform: translateY(6px);
}
</style>
