<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useInfo } from '@/stores/info'
import SvgIcon from '@/components/SvgIcon.vue'
import CreateCode from '@/components/CreateCode.vue'

const myinfo = useInfo()

const dialog1 = ref(false)

const addCode = () => {
	dialog1.value = true
}

const save = (node: Node) => {
	let id = '4'
	myinfo.addCode(id, node)
	myinfo.setSelected(node.id)
	dialog1.value = false
}

const morphGroupModel = ref('pencil')
const nextMorphStep: any = {
	pencil: 'close',
	close: 'pencil',
}
const nextMorph = () => {
	morphGroupModel.value = nextMorphStep[morphGroupModel.value]
}

watchEffect(() => {
	if (myinfo.getMorf === 'close') {
		morphGroupModel.value = 'close'
	}
})

const edit = () => {
	myinfo.setEditCode(true)
	nextMorph()
}
const cancel = () => {
	myinfo.setEditCode(false)
	nextMorph()
	if (myinfo.currentItem!.typ === 1) {
		cod.value.innerHTML = myinfo.currentItem!.cod
		label.value.innerHTML = myinfo.currentItem!.label
	} else {
		label.value.innerHTML = myinfo.currentItem!.label
		code.value.innerHTML = myinfo.currentItem!.code
		name.value.innerHTML = myinfo.currentItem!.name
		descr.value.innerHTML = myinfo.currentItem!.descr
		doveritel.value.innerHTML = myinfo.currentItem!.doveritel
	}
	myinfo.setMorf(null)
}

const label = ref()
const code = ref()
const name = ref()
const descr = ref()
const doveritel = ref()
const cod = ref()
const comp = ref()

const update = () => {
	myinfo.setEditCode(false)
	nextMorph()
	myinfo.setMorf(null)
}
</script>

<template lang="pug">
q-card(:class="{ edit : myinfo.editCode}").mycard

	q-btn(round dense
		icon="mdi-pencil"
		color="primary"
		v-morph:pencil:edit:300="morphGroupModel"
		@click="edit").plus1

	q-btn(round dense icon="mdi-plus" color="primary" @click="addCode").plus

	q-btn(round dense
		icon="mdi-close"
		color="negative"
		v-morph:close:edit:300="morphGroupModel"
		@click="cancel").close

	transition(name="fade")
		q-btn(unelevated color="primary" label="Сохранить" v-if="myinfo.editCode" @click="update").save

	.zg(:contenteditable="myinfo.editCode" :class="{ editable : myinfo.editCode}")
		q-icon(name="mdi-bookshelf" v-if="myinfo.currentItem.id === '0'").some
		component(:is="SvgIcon" :name="myinfo.currentItem.icon" v-else).icon
		span(ref="label") {{myinfo.currentItem.label}}

	q-separator
	br
	transition(name="slide-top")
		template(v-if="myinfo.currentItem.typ === 0")
			p Список всех справочников
		template(v-else-if="myinfo.currentItem.typ === 1")
			.mygrid(:class="{ edit : myinfo.editCode}")
				div Код справочника:
				div(ref="cod" :contenteditable="myinfo.editCode" :class="{ editable : myinfo.editCode}") {{myinfo.currentItem.cod}}
				div Составитель:
				div(ref="label" :contenteditable="myinfo.editCode" :class="{ editable : myinfo.editCode}") {{myinfo.currentItem.label}}
				div Дата обновления:
				div 22.08.2022

		template(v-else)
			.mygrid(:class="{ edit : myinfo.editCode}")
				div Код полномочия:
				div(ref="code" :contenteditable="myinfo.editCode" :class="{ editable : myinfo.editCode}") {{myinfo.currentItem.code}}
				div Название полномочий:
				div(ref="name" :contenteditable="myinfo.editCode" :class="{ editable : myinfo.editCode}") {{myinfo.currentItem.name}}
				div Описание:
				div(ref="descr" :contenteditable="myinfo.editCode" :class="{ editable : myinfo.editCode}") {{myinfo.currentItem.descr}}
				div Доверитель:
				div(ref="doveritel" :contenteditable="myinfo.editCode" :class="{ editable : myinfo.editCode}") {{myinfo.currentItem?.doveritel}}
				div Дата внесения:
				div 21.05.2022
				div Дата обновления:
				div 01.07.2022

	CreateCode(:dialog1="dialog1" @cancel="dialog1 = false" @save="save")
</template>

<style scoped lang="scss">
.mycard {
	position: relative;
	border: 1px solid white;
	margin-top: 0;
	&.edit {
		border-color: red;
	}
}
.zg {
	font-size: 1.1rem;
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
.editable {
	border-bottom: 1.5px dotted var(--q-primary);
	&:focus {
		background: var(--q-primary-selection);
		outline: none;
	}
}
.mygrid {
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 1rem;
	row-gap: 0.5rem;
	transition: 0.3s ease all;
	&.edit {
		row-gap: 1rem;
	}
}
.plus1 {
	position: absolute;
	bottom: 0.5rem;
	right: 3rem;
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
