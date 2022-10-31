<template lang="pug">
q-card(:class="{ edit : myinfo.editRight}").mycard
	q-btn(round dense
		icon="mdi-pencil"
		color="primary"
		v-morph:pencil:edit:300="morphGroupModel"
		@click="edit").plus
	q-btn(round dense
		icon="mdi-close"
		color="negative"
		v-morph:close:edit:300="morphGroupModel"
		@click="cancel").close
	transition(name="fade")
		q-btn(unelevated color="primary" label="Сохранить" v-if="myinfo.editRight" @click="cancel").save
	.zg
		q-icon(name="mdi-shield-key-outline").some
		span Права доступа к
		q-icon(name="mdi-bookshelf" v-if="myinfo.currentItem.id === '0'" size="26px").q-mx-sm
		component(:is="SvgIcon" :name="myinfo.currentItem.icon" v-else).icon
		span {{myinfo.currentItem.label}}
	q-separator
	q-markup-table
		thead
			tr
				th Пользователь или группа
				th Полный доступ
				th Чтение
				th Изменение
				th Удаление
				th Владение
				th Особые
				th(v-if="myinfo.editRight")
		tbody
			tr
				td.text-left Everyone
				td(v-for="item in check" :key="item.id")
					q-checkbox(v-model="item.val" dense :disable="!myinfo.editRight")
				td(v-if="myinfo.editRight")
					q-btn(flat round dense icon="mdi-trash-can-outline" size="12px")
	q-checkbox(:model-value="inherit" dense label="Наследование прав" :disable="!myinfo.editRight" @update:model-value="toggle").q-mt-md.q-ml-md
	transition(name="slide-bottom")
		.add(v-if="myinfo.editRight")
			.row.items-center.q-gutter-x-sm
				q-input(v-model="addItem" dense placeholder="Добавить сотрудника, группу или подразделение" clearable).additem
				q-btn(flat round dense)
					component(:is="SvgIcon" name="book-outline")

	q-dialog(v-model="dialog")
		q-card.kill
			.row.justify-between.items-center
				.text
					q-icon(name="mdi-information" color="primary")
					|Отключение наследования
				q-btn(flat round icon="mdi-close" v-close-popup)
			q-separator
			p.q-mt-md Удалить унаследованные права или преобразовать в явные разрешения для этого объекта?
			p Изменения будут применены сразу.
			q-card-actions
				q-btn(label="Отмена" flat color="primary" v-close-popup size="md" @click="otmena")
				q-space
				q-btn(unelevated label="Удалить унаследованные права" color="primary" v-close-popup size="sm" @click="inherit = false")
				q-btn(unelevated label="Преобразовать в явные разрешения" color="primary" v-close-popup size="sm" @click="inherit = false")
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useInfo } from '@/stores/info'
import SvgIcon from '@/components/SvgIcon.vue'

const myinfo = useInfo()
const inherit = ref(true)
const addItem = ref('')
const check = reactive([
	{ id: 0, val: true },
	{ id: 1, val: true },
	{ id: 2, val: true },
	{ id: 3, val: true },
	{ id: 4, val: true },
	{ id: 5, val: false },
])

const dialog = ref(false)

const toggle = () => {
	if (inherit.value === false) {
		inherit.value = true
	} else dialog.value = true
}

const otmena = () => {
	inherit.value = true
	dialog.value = false
}

const morphGroupModel = ref('pencil')
const nextMorphStep: any = {
	pencil: 'close',
	close: 'pencil',
}
const nextMorph = () => {
	morphGroupModel.value = nextMorphStep[morphGroupModel.value]
}
const edit = () => {
	myinfo.setEditRight(true)
	nextMorph()
}
const cancel = () => {
	myinfo.setEditRight(false)
	nextMorph()
	myinfo.setMorf(null)
}
</script>

<style scoped lang="scss">
.q-card.mycard {
	position: relative;
	margin-top: 0;
	border: 1px solid white;
	&.edit {
		border-color: red;
	}
}
.zg {
	font-size: 1.1rem;
	margin-bottom: 1rem;
	.icon {
		font-size: 1rem;
		margin-right: 0.5rem;
		margin-left: 0.9rem;
	}
	.some {
		font-size: 1.8rem;
		margin-right: 0.5rem;
	}
}
tbody {
	border-bottom: 1px solid #ddd;
}
td {
	text-align: center;
	&.text-left {
		text-align: left;
	}
}
.add {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;
	margin-top: 0.5rem;
	margin-left: 1rem;
	flex-wrap: wrap;
	.label {
		color: $primary;
		border-bottom: 1px dotted $primary;
	}
	.icon {
		width: 26px;
		height: 26px;
		margin-top: -2px;
	}
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
.additem {
	font-size: 0.8rem;
	width: 310px;
}
.kill {
	padding: 1rem;
	padding-top: 0.5rem;
	min-width: 600px;
	border-top: 7px solid var(--q-primary);
	.text {
		font-size: 1.1rem;
		margin-left: 0.5rem;
		.q-icon {
			margin-right: 0.5rem;
		}
	}
}
</style>
