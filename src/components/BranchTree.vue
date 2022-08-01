<script setup lang="ts">
import { ref, watchEffect, onMounted, onBeforeUpdate, nextTick } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import WordHighlighter from 'vue-word-highlighter'
import { useInfo } from '@/stores/info'
import TreeMenu from '@/components/TreeMenu.vue'
import type { Ref } from 'vue'
import { uid, useQuasar } from 'quasar'

const myinfo = useInfo()

const expanded = ref(['0', '4'])
const filter = ref('')
const input = ref()
const tree = ref()
const edit = ref(false)
const node: Ref<any[]> = ref([])
const current = ref()

onMounted(() => {
	watchEffect(() => {
		if (filter.value.length > 1) {
			tree.value.expandAll()
		}
	})
})
const expandAll = () => {
	if (expanded.value.length === 0) {
		tree.value.expandAll()
	} else tree.value.collapseAll()
}

const editMode = ref(false)

const editNode = async (e: any) => {
	editMode.value = true
	await nextTick(() => {
		node.value[e.id as any].show()
	})
}

const dialog = ref(false)
const dialog1 = ref(false)

const killNode = (e: Node) => {
	if (e.typ === 1) {
		current.value = e
		dialog.value = true
		return
	} else {
		myinfo.killNode(e.id)
		myinfo.setSelected('0')
	}
}
const $q = useQuasar()
const kill1 = (e: Node) => {
	myinfo.killNode(e.id)
	myinfo.setSelected('0')
	$q.notify({
		message: 'Справочник удален.',
		color: 'negative',
		actions: [
			{
				label: 'Вернуть',
				color: 'white',
				handler: () => undo(e),
			},
		],
	})
}
const undo = (e: Node) => {
	myinfo.addSprav(e)
	myinfo.setSelected(e.id)
}

const addSprav = () => {
	const temp = {
		id: uid(),
		label: 'Новый справочник',
		icon: 'node-folder',
		typ: 1,
		children: [],
	}
	myinfo.addSprav(temp)
	myinfo.setSelected(temp.id)
}
const addCode = (e: Node) => {
	dialog1.value = true
	console.log(e)
	// let temp = {
	// 	id: uid(),
	// 	label: 'Новый справочник',
	// 	icon: 'node-folder',
	// 	typ: 1,
	// 	children: [],
	// }
	// }
	// myinfo.addCode(e, {})
}

onBeforeUpdate(() => {
	node.value = []
})
</script>

<template lang="pug">
.row.justify-between.no-wrap
	.razv(@click="expandAll")
		q-btn(round flat dense icon="mdi-unfold-more-horizontal")
		span Развернуть
	q-input(dense ref="input" debounce="0" hide-bottom-space color="primary" autofocus v-model="filter" clearable @clear="filter = ''").input
		template(v-slot:prepend)
			q-icon(name="mdi-magnify")

q-scroll-area.scroll
	q-tree(:nodes="myinfo.nodes"
		icon="mdi-chevron-right"
		ref="tree"
		node-key="id"
		no-results-label="Ничего не найдено"
		no-selection-unset
		v-model:selected="myinfo.selected"
		v-model:expanded="expanded"
		:filter="filter").tree

		template(v-slot:header-root="prop")
			div(class="row items-center")
				q-icon(name="mdi-bookshelf" size="md").q-mr-sm
				div {{ prop.node.label }}
				q-menu(context-menu)
					q-list
						q-item(clickable v-close-popup @click="addSprav")
							q-item-section(avatar)
								component(:is="SvgIcon" name="node-folder")
							q-item-section Добавить справочник


		template(v-slot:default-header="prop")
			.item
				component(:is="SvgIcon" :name="prop.node.icon").ico
				component(:is="WordHighlighter" :query="filter") {{ prop.node.label }}
				q-popup-edit(v-model="prop.node.label" auto-save v-slot="scope" :ref="(el: any) => {node[prop.node.id] = el}" v-if="editMode"  @hide="editMode = false")
					q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")
				component(:is="TreeMenu"
					:node="prop.node"
					:context="true"
					@add1="addSprav"
					@add2="addCode(prop.node)"
					@kill="killNode(prop.node)"
					@edit="editNode(prop.node)")

q-dialog(v-model="dialog" )
	q-card.kill
		.row.justify-between.items-center
			.text-h6.q-mt-none Удаление справочника
			q-btn(flat round icon="mdi-close" v-close-popup)
		p.q-mt-md Вы уверены что хотите удалить справочник? Данное действие необратимо и уничтожит все данные в справочнике.
		q-card-actions(align="right")
			q-btn(label="Отмена" flat color="primary" v-close-popup)
			q-btn(label="Удалить" flat color="primary" v-close-popup @click="kill1(current)")

q-dialog(v-model="dialog1" )
	q-card.create
		.row.justify-between.items-center
			.text-h6.q-mt-none Новый код полномочий
			q-btn(flat round icon="mdi-close" v-close-popup)
		p.q-mt-md Здесь будет форма создания
		q-card-actions(align="right")
			q-btn(label="Отмена" flat color="primary" v-close-popup)
			q-btn(label="Добавить" flat color="primary" v-close-popup)

</template>

<style scoped lang="scss">
.kill {
	padding: 1rem;
	padding-top: 0.5rem;
	min-width: 400px;
	border-top: 7px solid var(--q-negative);
}
.create {
	padding: 1rem;
	padding-top: 0.5rem;
	min-width: 600px;
	border-top: 7px solid var(--q-primary);
}
.input {
	width: 200px;
}
.item {
	position: relative;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	.hover {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		visibility: hidden;
	}
	&:hover {
		// background: #f5f5f5;
		.hover {
			visibility: visible;
		}
	}
}
.ico {
	font-size: 0.8rem;
	margin-right: 0.5rem;
	flex-shrink: 0;
}
.scroll {
	height: calc(100% - 30px);
}
.razv {
	font-size: 0.7rem;
	color: #666;
	cursor: pointer;
}
.buttons {
	position: absolute;
	top: 0;
	right: 0;
}
.q-item {
	cursor: pointer;
	&:hover {
		background: #f5f5f5;
	}
}
</style>
