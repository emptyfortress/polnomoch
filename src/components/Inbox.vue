<template lang="pug">
q-page(padding)
	.container
		.zag Входящие документы
		.gridtotal(:class="{ full : grid.fullscreen }")
			.sidebar(v-if="grid.sidebar").flex.flex-center
				p aggregateData
			.main(:class="{ 'fill' : !grid.sidebar }")
				GridTable(:columns="columns" :colData="colData" :rows="rows" :total="items.length" :shown="rows.length" toolbar @sort="sort")

</template>

<script setup lang="ts">
import { ref, computed, reactive, provide } from 'vue'
import { columns, items } from '@/stores/data'
import GridTable from '@/components/common/GridTable.vue'
import { useGrid } from '@/stores/grid'

const grid = useGrid()

const rows = reactive(items)

provide('filteredRows', rows)

const selected = computed(() => {
	return rows.filter((item) => item.selected === true)
})

const colData = (col: Column) => {
	return [...new Set(rows.map((item: any) => item[col.name]))]
}

const sorted = ref(false)
const sort = () => {
	function compare(a: any, b: any) {
		if (a.unread < b.unread) {
			return 1
		}
		if (a.unread > b.unread) {
			return -1
		}
		return 0
	}
	if (!sorted.value) {
		rows.sort(compare)
		sorted.value = !sorted.value
	} else {
		rows.reverse()
		sorted.value = !sorted.value
	}
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.gridtotal {
	display: grid;
	grid-template-columns: 260px auto;
	grid-gap: 0rem 0.5rem;
	background: var(--main-bg);
	@media screen and (max-width: 1023px) {
		grid-template-columns: 1fr;
	}
	&.full {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 3000;
	}
}
.main {
	position: relative;
	overflow: hidden;
}
.sidebar {
	background: var(--bg-card);
}
.fill {
	grid-column: 1/3;
}
.rel {
	position: relative;
	overflow: hidden;
}
.total {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	border-radius: 12px 12px 0px 0px;
	border-top: 3px solid var(--q-primary);
	background: #e5e5e5;
	transition: 0.3s ease all;
	box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
	body.body--dark & {
		background: var(--my-color-step-150);
	}
	@media screen and (max-width: 1023px) {
		display: none;
	}
}
</style>
