<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps<{
	node: {
		id: String
		label: String
		typ: Number
	}
}>()

const emit = defineEmits(['add1', 'add2', 'kill', 'edit'])

const calcClass = (e: number) => {
	if (props.node?.typ === 2 && e === 0) {
		return 'disab'
	} else if (props.node?.typ === 2 && e === 1) {
		return 'disab'
	} else if (props.node?.typ === 2 && e === 3) {
		return 'disab'
	} else return ''
}

const action = (item: any) => {
	if (props.node?.typ === 2 && item.id === 0) {
		return
	}
	if (props.node?.typ === 2 && item.id === 1) {
		return
	}
	if (props.node?.typ === 2 && item.id === 3) {
		return
	}
	return item.action()
}

const add1 = () => {
	emit('add1')
}
const add2 = () => {
	emit('add2')
}
const kill = () => {
	emit('kill')
}
const edit = () => {
	emit('edit')
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
		icon: 'spravochnik',
		action: add2,
		className: calcClass(1),
	},
	{ id: 2, label: 'Редактировать', icon: 'mdi-pencil', action: edit },
	{ id: 3, label: 'Синхронизировать', icon: 'mdi-reload', className: 'disab' },
	{ id: 5, label: 'Удалить', icon: 'mdi-trash-can-outline', action: kill },
]
</script>

<template lang="pug">
q-menu(context-menu)
	q-list
		q-item(v-for="item in menu" :key="item.id" @click="action(item)" :class="item.className")
			q-item-section(avatar)
				component(:is="SvgIcon" :name="item.icon" v-if="item.id < 2")
				q-icon(:name="item.icon" v-else)
			q-item-section
				q-item-label {{item.label}}
</template>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.q-item {
	cursor: pointer;
	&:hover {
		background: #ececec;
	}
}
.q-item:last-child {
	border-top: 1px solid #ccc;
	color: darkred;
}
.disab {
	opacity: 0.5;
	cursor: not-allowed !important;
}
</style>
