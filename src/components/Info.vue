<script setup lang="ts">
import { ref, computed } from 'vue'
import { useInfo } from '@/stores/info'
import SvgIcon from '@/components/SvgIcon.vue'

const myinfo = useInfo()
</script>

<template lang="pug">
q-card.q-ml-sm.rel.q-pa-md
	transition(name="fade")
		q-btn(round dense icon="mdi-pencil" color="primary" v-if="myinfo.currentItem.typ === 2").plus
		q-btn(round dense icon="mdi-plus" color="primary" v-else).plus
	.zg
		q-icon(name="mdi-bookshelf" v-if="myinfo.currentItem.id === '0'").some
		component(:is="SvgIcon" :name="myinfo.currentItem.icon" v-else).icon
		|{{myinfo.currentItem.label}}

	q-separator
	br
	transition(name="slide-top")
		template(v-if="myinfo.currentItem.typ === 1")
			.mygrid
				div Код справочника:
				div PDDV_02
				div Составитель:
				div ООО "ДоксВижн"
				div Дата обновления:
				div 21.03.2022
		template(v-else)
			.mygrid
				div Код полномочия:
				div CDDV_02
				div Название полномочий:
				div Подписание договоров от 100 т.руб.
				div Описание:
				div Подписание и отправка договоров от 100 т.руб.
				div Доверитель:
				div ООО "ДоксВижн"
				div Дата внесения:
				div 21.05.2022
				div Дата обновления:
				div 01.07.2022
</template>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.zg {
	font-size: 1.1rem;
	// font-weight: bold;
	margin-bottom: 1rem;
	.icon {
		margin-right: 0.7rem;
		margin-top: -7px;
	}
	.some {
		font-size: 1.8rem;
		margin-right: 0.5rem;
	}
}
.mygrid {
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.plus {
	position: absolute;
	bottom: 0.5rem;
	right: 0.5rem;
}
</style>
