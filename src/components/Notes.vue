<template lang="pug">
q-page(padding)
	.container
		.zag Служебные записки
		component(:is="Filter4")
		.gridtotal(:class="{ full : grid.fullscreen }")
			.sidebar(v-if="grid.sidebar").flex.flex-center
				p aggregateData
			.main(:class="{ 'fill' : !grid.sidebar }")
				component(:is="GridTable" :columns="columns" :colData="colData" :rows="frows" :total="notes.length" :shown="frows.length" toolbar @sort="sort")
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { columns, notes } from '@/stores/notes'
import GridTable from '@/components/common/GridTable.vue'
import { useGrid } from '@/stores/grid'
import Filter4 from '@/components/common/Filter4.vue'

const grid = useGrid()
const rows = reactive(notes)

function dateFilter(item: Row1) {
	return item.regdate1.includes(grid.filt2)
}
function authorFilter(item: Row1) {
	if (grid.author === 'Все') {
		return true
	}
	return item.author.includes(grid.author)
}
function departmentFilter(item: Row1) {
	if (grid.department === 'Все') {
		return true
	}
	return item.department.includes(grid.department)
}
function toFilter(item: Row1) {
	if (grid.to === 'Все') {
		return true
	}
	return item.to.includes(grid.to)
}
const frows = computed(() => {
	if (
		grid.regDate1 === 'Все' &&
		grid.author === 'Все' &&
		grid.department === 'Все' &&
		grid.to === 'Все'
	) {
		return rows
	} else {
		return rows.filter(dateFilter).filter(authorFilter).filter(departmentFilter).filter(toFilter)
	}
})

const colData1 = (col: any) => {
	return [...new Set(frows.value.map((item: any) => item[col]))]
}
const colData = (col: Column) => {
	// let temp = frows.value.filter((e) => e.regdate.includes(grid.filt1))
	return [...new Set(frows.value.map((item: any) => item[col.name]))]
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
		frows.value.sort(compare)
		sorted.value = !sorted.value
	} else {
		frows.value.reverse()
		sorted.value = !sorted.value
	}
}
</script>

<style scoped lang="scss">
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
