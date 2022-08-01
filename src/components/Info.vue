<script setup lang="ts">
import { ref, computed } from 'vue'
import { useInfo } from '@/stores/info'
import SvgIcon from '@/components/SvgIcon.vue'

const myinfo = useInfo()
const editMode = ref(false)

const morphGroupModel = ref('pencil')
const nextMorphStep: any = {
	pencil: 'close',
	close: 'pencil',
}
const nextMorph = () => {
	morphGroupModel.value = nextMorphStep[morphGroupModel.value]
}
const edit = () => {
	editMode.value = true
	nextMorph()
}
const cancel = () => {
	editMode.value = false
	nextMorph()
}
</script>

<template lang="pug">
q-card(:class="{ edit : editMode}").mycard
	transition(name="fade")

		q-btn(round dense
			icon="mdi-pencil"
			color="primary"
			v-if="myinfo.currentItem.typ === 2"
			v-morph:pencil:edit:300="morphGroupModel"
			@click="edit").plus

		q-btn(round dense icon="mdi-plus" color="primary" v-else).plus

	q-btn(round dense
		icon="mdi-close"
		color="negative"
		v-morph:close:edit:300="morphGroupModel"
		@click="cancel").close

	transition(name="fade")
		q-btn(unelevated color="primary" label="Сохранить" v-if="editMode").save

	.zg(:contenteditable="editMode" :class="{ editable : editMode}")
		q-icon(name="mdi-bookshelf" v-if="myinfo.currentItem.id === '0'").some
		component(:is="SvgIcon" :name="myinfo.currentItem.icon" v-else).icon
		span {{myinfo.currentItem.label}}

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
.mycard {
	margin-left: 0.5rem;
	padding: 1rem;
	position: relative;
	border: 1px solid white;
	&.edit {
		border-color: red;
	}
}
.zg {
	font-size: 1.1rem;
	margin-bottom: 1rem;
	&.editable {
		border-bottom: 1.5px dotted var(--q-primary);
		background: var(--q-primary-selection);
		&:focus {
			outline: none;
		}
	}
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
.close {
	position: absolute;
	bottom: 0.5rem;
	left: 0.5rem;
}
.save {
	position: absolute;
	bottom: 0.5rem;
	right: 0.5rem;
}
</style>
