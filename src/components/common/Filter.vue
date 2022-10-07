<template lang="pug">
q-card.quick.shadow-3(v-if="filterByIndex === col.id" @click.stop)
	template(v-if="datum")
		.q-pa-sm
			.q-gutter-sm
				q-radio(v-model="dateView" val="shab" label="Шаблон")
				q-radio(v-model="dateView" val="jur" label="Журнал")
				q-radio(v-model="dateView" val="cal" label="Дата")
		q-separator
		q-tab-panels(v-model="dateView")
			q-tab-panel(name="shab")
				q-option-group(:options="shablonOptions" type="checkbox" v-model="shablon").opList
				q-separator
				q-card-actions(align="between")
					q-btn(flat round size="12px" icon="mdi-trash-can-outline" color="negative" @click="clearAll")
						q-tooltip Очистить и закрыть
					q-btn(flat size="12px" color="primary" @click="applyFilter") Применить
			q-tab-panel(name="jur")
				Journal(:data="data" :col="col" @close="$emit('close')")
			q-tab-panel(name="cal")
				.cal
					q-date(v-model="mydate" flat range today-btn)
					q-separator
					q-card-actions(align="between")
						q-btn(flat round size="12px" icon="mdi-trash-can-outline" color="negative" @click="clearAll")
							q-tooltip Очистить и закрыть
						q-btn(flat size="12px" color="primary" @click="applyFilter") Применить
	template(v-else)
		Journal(:data="data" :col="col" @close="$emit('close')")
</template>

<script>
import { ref } from 'vue'
import Journal from '@/components/common/Journal.vue'

export default {
	props: ['filterByIndex', 'col', 'data', 'datum' ],
	emits: ['close'],
	components: {
		Journal,
	},
	setup(props) {

		const mydate = ref({from: '2021/08/01', to: '2021/08/07'})
		const shablon = ref(['2'])

		const dateView = ref('shab')

		const applyFilter = () => {
			console.log(props.col.name)
		}
		const clearAll = () => {
			console.log('test')
		}
		
		return {
			clearAll,
			applyFilter,
			mydate,
			dateView,
			shablon,
			shablonOptions: [
				{ label: 'Прошлый месяц', value: '0' },
				{ label: 'Текущий месяц', value: '3', },
				{ label: 'Прошлая неделя', value: '1', },
				{ label: 'Текущая неделя', value: '2', },
				{ label: 'Вчера', value: '4', },
				{ label: 'Сегодня', value: '5', },
			]
		}
	},

}
</script>

<style scoped lang="scss">

.fixhd thead tr:first-child th:last-child .quick {
	left: initial;
	right: 0;
}
.quick {
	position: absolute;
	top: 36px;
	left: 0;
	min-width: 230px;
	padding: .5rem .25rem 0;
	border-radius: 0 0 6px 6px;
}
.cal {
	white-space: normal;
}
.opList {
	margin-left: 0.25rem;
}
.q-tab-panel {
	padding-bottom: 0;
}
</style>
