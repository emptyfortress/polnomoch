<template lang="pug">
.toolbar.gt-sm
	.left
		q-btn(flat round dense @click="grid.switchSidebar")
			q-icon(name="mdi-backburger" v-if="grid.sidebar")
			q-icon(name="mdi-forwardburger" v-else)
		q-checkbox(dense v-if="lenta" :model-value="grid.selected" @update:model-value="toggleSel")
		transition(name="slide-left")
			.total(v-if="shown === total") Всего:
				span {{ total }}
			.total(v-else) Показано:
				span {{ shown }}
				span.iz ({{ total }})
				q-btn(unelevated size="12px" @click="showAll").q-ml-sm Показать все
	.center
		q-btn-group(unelevated).group
			q-btn(:flat="grid.lenta" dense color="btn-group" icon="mdi-table" size="10px" @click="grid.showGrid")
				q-tooltip(:delay="600") Грид
			q-btn(:flat="!grid.lenta" dense color="btn-group" icon="mdi-format-list-bulleted" size="10px" @click="grid.showLenta")
				q-tooltip(:delay="600") Лента
	.right
		q-btn(flat round dense v-for="button in buttons" @click="callback(button)" :key="button.id" :class="button.class")
			q-tooltip(:delay="600") {{ button.tooltip}}
			SvgIcon(:name="button.icon" :spin="button.spin")
		q-btn(flat round dense v-if="!grid.fullscreen" icon="mdi-fullscreen" @click="grid.switchFullscreen")
			q-tooltip(:delay="600") Полный экран
		q-btn(flat round dense v-else icon="mdi-fullscreen-exit" @click="grid.switchFullscreen")
			q-tooltip(:delay="600") Вернуть

.toolbar.lt-md
	.left
		q-btn(flat round dense @click="grid.switchAggregat")
			q-icon(name="mdi-forwardburger" v-if="grid.aggregat")
			q-icon(name="mdi-backburger" v-else)
		q-checkbox(dense v-if="lenta" :model-value="grid.selected" @update:model-value="toggleSel")
		.total(v-if="shown === total") Всего:
			span {{ total }}
		.total(v-else)
			span {{ shown }}
			span.iz ({{ total }})
			q-icon(name="mdi-close" @click="showAll" size="sm")
			//- q-btn(flat round :size="xs" icon="mdi-close" @click="showAll").q-mr-sm
	q-space
	div
		q-btn(round v-if="grid.lenta" flat dense icon="mdi-table" @click="grid.showGrid")
		q-btn(round v-if="!grid.lenta" flat dense icon="mdi-format-list-bulleted" @click="grid.showLenta")
		q-btn(flat round dense icon="mdi-dots-vertical")
			q-menu(auto-close)
				q-list
					q-item(clickable v-for="item in buttons" :key="item.id" @click="callback(item)")
						q-item-section(avatar)
							SvgIcon(:name="item.icon")
						q-item-section {{ item.tooltip }}

					q-item(clickable v-if="!grid.fullscreen" @click="grid.switchFullscreen")
						q-item-section(avatar)
							q-icon(name="mdi-fullscreen")
						q-item-section Развернуть
					q-item(clickable v-if="grid.fullscreen" @click="grid.switchFullscreen")
						q-item-section(avatar)
							q-icon(name="mdi-fullscreen-exit")
						q-item-section Свернуть

</template>

<script>
import { useGrid } from '@/stores/grid'
import SvgIcon from '@/components/SvgIcon.vue'
import { reactive } from 'vue'

export default {
	props: {
		total: Number,
		shown: Number,
		lenta: Boolean,
	},
	emits: ['readAll', 'selNone', 'selAll', 'toggleLoad'],
	components: {
		SvgIcon,
	},

	setup(props, context) {
		const grid = useGrid()

		const callback = (e) => {
			if (e.id === 1) {
				context.emit('readAll')
			}
			if (e.id === 2) {
				context.emit('toggleLoad')
				e.spin = true
				setTimeout(() => {
					context.emit('toggleLoad')
					e.spin = false
				}, 3000)
			}
		}

		const showAll = () => {
			let list = document.querySelectorAll(
				'.reset > .q-checkbox__inner--truthy'
			)
			list.forEach((el) => {
				el.classList.remove('q-checkbox__inner--truthy')
				el.classList.add('q-checkbox__inner--falsy')
			})
			grid.clearCheckedAll()
			grid.disable = 0
		}

		const buttons = reactive([
			{
				id: 0,
				icon: 'sort-variant',
				tooltip: 'Сортировка',
				action: '',
				grid: false,
			},
			{ id: 1, icon: 'readAll', tooltip: 'Прочитать все', action: 'clear' },
			{
				id: 2,
				icon: 'refresh',
				tooltip: 'Обновить',
				action: 'refresh',
				spin: false,
			},
			{
				id: 3,
				icon: 'xls-export',
				tooltip: 'Экспорт',
				action: '',
			},
			// { id: 4, icon: 'sliders-reload', tooltip: 'Сброс настроек', action: '' },
			{ id: 5, icon: 'sliders-vertical', tooltip: 'Настройки', action: '' },
		])

		const toggleSel = () => {
			if (grid.selected) {
				context.emit('selNone')
				grid.selected = false
			} else {
				context.emit('selAll')
				grid.selected = true
			}
		}
		return {
			toggleSel,
			grid,
			buttons,
			props,
			callback,
			showAll,
		}
	},
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/theme.scss';

.toolbar {
	border-top: 1px solid var(--my-border-color);
	border-bottom: 1px solid var(--my-border-color);
	background: var(--bg-card);
	width: 100%;
	height: 42px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.total {
	display: inline-block;
	line-height: 42px;
	margin: 0 1rem;
	span {
		font-weight: 600;
		margin-left: 0.5rem;
		&.iz {
			font-weight: 300;
			margin-right: 6px;
		}
	}
}
.group {
	border: 1px solid var(--my-border-color);
}
</style>
