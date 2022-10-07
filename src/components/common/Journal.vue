<template lang="pug">
q-form
	q-card-section.q-pb-none.q-pt-xs
		q-input(dense square
			input-class="filter-input"
			v-model="query"
			autofocus
			clearable
			placeholder="искать"
			).query
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")
q-list(v-if="filteredItems.length")
	q-item(tag="label" v-ripple)
		q-item-section(side top)
			q-checkbox(v-model="all" @update:model-value="toggle" color="grey")
		q-item-section
			q-item-label
				|Выбрано
				span.q-ml-md ({{ checked.length }} / {{ filteredItems.length }})

	q-item(v-for="(dat, index) in filteredItems" :key="index" tag="label" v-ripple ).q-pa-none
		q-item-section(side top)
			q-checkbox(v-model="checked" :val="dat")
		q-item-section.wrp
			q-item-label
				WordHighlighter(:query="query") {{ dat }}
.empty(v-else)
	q-icon(name="mdi-circle-off-outline")
	span Нет совпадений
q-separator
q-card-actions(align="between")
	q-btn(flat round size="12px" icon="mdi-trash-can-outline" color="negative" @click="clearCheckedColumn")
		q-tooltip Очистить и закрыть
	q-btn(flat size="12px" color="primary" @click="applyFilter") Применить
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import WordHighlighter from 'vue-word-highlighter'
import { useGrid } from '@/stores/grid'

export default {
	props: ['data', 'col'],
	emits: ['close'],
	components: {
		WordHighlighter,
	},

	setup(props, context) {
		const grid = useGrid()

		const all = ref(false)
		const query = ref('')
		const checked = ref([])

		const filteredItems = computed(() => {
			return props.data.filter((row) => {
				if (query.value) {
					return row.toLowerCase().includes(query.value.toLowerCase())
				}
				return props.data
			})
		})

		const toggle = () => {
			if (checked.value.length < filteredItems.value.length) {
				checked.value = filteredItems.value
			} else checked.value = []
		}

		const clearCheckedColumn = () => {
			checked.value = []
			grid.clearCheckedColumn(props.col)
			context.emit('close')
		}

		const applyFilter = () => {
			if (checked.value.length === 0) {
				grid.clearCheckedColumn(props.col)
			} else {
				grid.addChecked(props.col, checked.value)
			}
			context.emit('close')
		}

		watchEffect(() => {
			if (
				checked.value.length < props.data.length &&
				checked.value.length !== 0
			) {
				all.value = null
			}
			if (checked.value.length === props.data.length) {
				all.value === true
			}
			if (checked.value.length === 0) {
				all.value = false
			}
			if (grid.reset) {
				checked.value = []
				setTimeout(() => {
					grid.reset = false
				}, 1000)
			}
		})

		return {
			applyFilter,
			clearCheckedColumn,
			filteredItems,
			toggle,
			query,
			checked,
			all,
		}
	},
}
</script>

<style scoped lang="scss">
.q-list {
	max-width: 600px;
	max-height: 300px;
	overflow: auto;
	font-size: 0.8rem;
	font-weight: 400;
	.q-item {
		min-height: 36px;
		padding: 5px 10px;
	}
}
.empty {
	padding: 0.7rem 1rem;
	color: grey;
	font-size: 0.8rem;
	min-height: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
	.q-icon {
		font-size: 1rem;
		margin-right: 0.5rem;
	}
}
.q-item__section.wrp {
	white-space: normal;
}
</style>
