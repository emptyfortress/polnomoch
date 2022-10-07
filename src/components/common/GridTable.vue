<template lang="pug">
.grid
	q-table(ref="itemTable"
		:columns="columns"
		:rows="items"
		row-key="id"
		flat
		binary-state-sort
		:hide-pagination="true"
		:pagination="pagination"
		selection="multiple"
		color="primary"
		:loading="loading"
		).fixhd

		template(v-slot:header="props")
			q-tr(:props="props" v-click-away="toggleFilter")
				th(@click="sort").small
				q-th(auto-width)
					q-checkbox(:model-value="all" @update:model-value="toggleSel")

				q-th(v-for="col in props.cols" :props="props" :key="col.name").hov
					span {{ col.label }}
					span
						q-icon(name="mdi-filter" color="negative" v-if="showFilt(col)" @click.stop="clearFilter(col)").filt
						q-icon(name="mdi-filter-outline" @click.stop="toggleFilter(col.id)" v-if="!showFilt(col)").sort

					transition(name="slide-top")
						Filter(:filterByIndex="filterByIndex" :col="col" @close="filterByIndex = null" :data="colData(col)" :datum="col.datum")

		template(v-slot:top).gt-sm
			Toolbar(:total="total" :shown="shown" @readAll="readAll" @toggleLoad="loading = !loading")

		template(v-slot:loading)
			.ld
				q-linear-progress(indeterminate)

		template(v-slot:body="props")
			q-tr(:props="props" :key="props.row.id" :class="rowClass(props.row)").rowslide
				q-td(key="read" :class="unreadClass(props.row)" @click="toggle(props.row.id)").small
				q-td(auto-width)
					q-checkbox(v-model="props.row.selected" :val="props.row.id")
				q-td(v-for="col in props.cols" :key="col.name" :class="col.classname") {{ props.row[col.name] }}
		template(v-slot:bottom v-if="selectedArray.length")
			.zaglushka
	transition(name="sliding")
		.total(v-if="selectedArray.length")
			Total(:selected="selectedArray.length" @clear="clearSelected")

</template>

<script setup lang="ts">
import { ref, computed, reactive, watchEffect, onMounted } from 'vue'
import Toolbar from '@/components/common/Toolbar.vue'
import Total from '@/components/common/Total.vue'
import Filter from '@/components/common/Filter.vue'
import { useGrid } from '@/stores/grid'
import anime from 'animejs'
import type { Ref } from 'vue'

const props = defineProps<{
	columns: Column[]
	rows: Row[]
	shown: Number
	colData: Function
	total: Number
	toolbar: Boolean
}>()

// const props = defineProps({
//   foo: {
// 		type: String,
// 		default: 'test'
// 	}
// })

const pagination = {
	page: 1,
	rowsPerPage: 0,
}
const emit = defineEmits(['sort'])
const sort = () => {
	emit('sort')
}

const grid = useGrid()

const all = ref(false)
const toggleSel = () => {
	if (all.value === true) {
		items.value.map((item) => (item.selected = false))
		all.value = false
	} else {
		items.value.map((item) => (item.selected = true))
		all.value = true
	}
}

const itemTable = ref()

const loading = ref(true)

const rowClass = (row: Row) => {
	if (row.unread && row.selected) return 'both'
	else if (row.selected) return 'bg-primary-selection'
	else if (row.unread) return 'bold'
	else return ''
}

const toggle = (e: number) => {
	const current = items.value.find((b) => b.id === e)
	current!.unread = !current!.unread
}
const clearSelected = () => {
	items.value.map((item) => (item.selected = false))
	all.value = false
}

interface Checked {
	col: string
	id: number
	items: String[]
}
const items = computed(() => {
	if (grid.checked.length) {
		let filter = {} as any
		let temp = Object.values(grid.checked)
		for (let el of temp as any) {
			filter[el.col] = el.items
		}

		return props.rows.filter((item: any) => {
			for (let [key, value] of Object.entries(filter)) {
				const cool = (element: any) => element === item[key]
				if (item[key] === undefined) return false
				if (value instanceof Array && !value.some(cool)) return false
			}
			return true
		})
	}
	return props.rows
})

onMounted(() => {
	setTimeout(() => {
		loading.value = !loading.value
	}, 1500)
	anime({
		targets: '.rowslide',
		translateY: [30, 0],
		opacity: [0, 1],
		delay: anime.stagger(120, { start: 1000, easing: 'easeInQuad' }),
	})
})

const unreadClass = (e: Row) => {
	if (e.unread === true) {
		return 'unread'
	} else return ''
}
const readAll = () => {
	items.value.map((row) => (row.unread = false))
}

const filterByIndex: Ref<null | number> = ref(null)

const clearFilter = (col: Column) => {
	grid.clearCheckedColumn(col)
}
const toggleFilter = (e: number) => {
	filterByIndex.value === e ? (filterByIndex.value = null) : (filterByIndex.value = e)
}
const showFilt = (col: Column) => {
	if (grid.checked.length) {
		let ids = grid.checked.map((item: Checked) => item.id)
		let id = (el: number) => el === col.id
		return ids.some(id)
	}
	return false
}
const selectedArray = computed(() => {
	return items.value.filter((item) => item.selected)
})
</script>

<style scoped lang="scss">
.grid {
	position: relative;
}
.full .fixhd {
	height: 100vh;
}
.fixhd.popup {
	height: 500px;
}
.q-table.fixhd th {
	padding: 4px !important;
}
.small {
	min-width: 7px;
	padding: 0;
	cursor: pointer;
}
td.small {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAAXNSR0IArs4c6QAAABpJREFUGFdjZEACjCD2jh07/nt4eDCCOTAAAEsRBAT/WuYQAAAAAElFTkSuQmCC);
	&.unread {
		background-color: var(--q-primary);
	}
}
.bold {
	font-weight: bold;
	color: var(--text-color-bright);
}

.both {
	font-weight: bold;
	color: var(--text-color-bright);
	background: var(--q-primary-selection);
}
.hov {
	position: sticky;
	.filt {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
	}
	.sort {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		display: none;
		body.body--dark & {
			background: var(--bg-dark);
		}
		.q-icon {
			transition: 0.3s ease all;
			&.up {
				transform: rotate(180deg);
			}
			&.down {
				transform: rotate(0deg);
			}
		}
	}
	&:hover {
		.sort {
			display: flex;
			z-index: 2;
			justify-content: flex-end;
			align-items: center;
			padding-right: 3px;
		}
	}
}
.ld {
	position: absolute;
	top: 76px;
	width: 100%;
	left: 0;
	height: 3px;
	z-index: 2;
	&.notoolbar {
		top: 32px;
	}
}
.list-complete-enter-from,
.list-complete-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

.list-complete-leave-active {
	position: absolute;
}
.rowslide {
	transition: transform 0.2s;
}
.fixhd tbody td.nowrap {
	white-space: nowrap;
}
.zaglushka {
	position: absolute;
	bottom: 0;
	left: 0;
	height: 52px;
	width: 100%;
	background: transparent;
}
.total {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
}
</style>
