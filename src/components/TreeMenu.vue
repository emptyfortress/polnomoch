<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps<{
	node: {
		id: String
		label: String
		typ: Number
	}
}>()

const emit = defineEmits(['add1', 'add2', 'kill', 'edit', 'edit1'])

const calcClass = (e: number) => {
	if (props.node?.typ === 2 && e === 0) {
		return 'hid'
	}
	if (props.node?.typ === 2 && e === 3) {
		return 'hid'
	}
	if (props.node?.typ === 1 && e === 0) {
		return 'hid'
	}
}

const action = (item: any) => {
	if (item.id === 3) {
		return
	}
	if (props.node.typ === 2 && item.id === 2) {
		return edit1()
	}
	return item.action()
}

const add1 = () => {
	emit('add1')
}
const add2 = () => {
	confirmMode.value = false
	emit('add2')
}
const kill = () => {
	emit('kill')
}
const edit = () => {
	emit('edit')
}
const edit1 = () => {
	emit('edit1')
}

const menu = [
	{
		id: 0,
		label: 'Добавить справочник',
		icon: 'node-folder',
		action: add1,
		className: calcClass(0),
	},
	{
		id: 1,
		label: 'Добавить код полномочий',
		icon: 'keychain',
		action: add2,
	},
	{ id: 2, label: 'Редактировать', icon: 'mdi-pencil', action: edit },
	{
		id: 3,
		label: 'Синхронизировать',
		icon: 'mdi-reload',
		className: calcClass(3),
	},
	// { id: 5, label: 'Удалить', icon: 'mdi-trash-can-outline', action: kill },
]
const confirmMode = ref(false)
const men = ref(false)
const cancel = () => {
	confirmMode.value = false
	men.value = false
}
</script>

<template lang="pug">
q-menu(context-menu v-model="men")
	q-list
		q-item(v-for="item in menu" clickable v-close-popup :key="item.id" @click="action(item)" :class="item.className")
			q-item-section(avatar)
				component(:is="SvgIcon" :name="item.icon" v-if="item.id < 2")
				q-icon(:name="item.icon" v-else)
			q-item-section
				q-item-label {{item.label}}

		template(v-if="props.node.typ === 2")
			q-item(clickable @click="confirmMode = !confirmMode" v-if="!confirmMode")
				q-item-section(avatar)
					q-icon(name="mdi-trash-can-outline")
				q-item-section
					q-item-label Удалить
			q-item(clickable v-close-popup  v-else)
				.confirm
					q-btn(label="Отмена" flat color="primary" @click="cancel" v-close-popup)
					q-btn(label="Подтверждаю" flat color="negative" @click="kill")

		template(v-if="props.node.typ === 1")
			q-item(clickable @click="kill")
				q-item-section(avatar)
					q-icon(name="mdi-trash-can-outline")
				q-item-section
					q-item-label Удалить

</template>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.q-item:last-child {
	border-top: 1px solid #ccc;
	color: darkred;
}
.disab {
	opacity: 0.5;
	cursor: not-allowed !important;
}
.hid {
	display: none;
}
.confirm {
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
}
</style>
