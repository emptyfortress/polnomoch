<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import WordHighlighter from 'vue-word-highlighter'
import { useInfo } from '@/stores/info'
// import TreeMenu from '@/components/TreeMenu.vue'

const emit = defineEmits(['select'])

const myinfo = useInfo()

const selected = ref('4')
const expanded = ref(['0', '4'])
const filter = ref('')
const input = ref()
const tree = ref()
const edit = ref(false)
const node: Ref<any[]> = ref([])

onMounted(() => {
	watchEffect(() => {
		if (filter.value.length > 1) {
			tree.value.expandAll()
		}
		if (selected.value) {
			emit('select', selected.value)
		}
	})
})
const expandAll = () => {
	if (expanded.value.length === 0) {
		tree.value.expandAll()
	} else tree.value.collapseAll()
}

const editNode = async (e: Category) => {
	editMode.value = true
	await nextTick(() => {
		node.value[e.id as any].show()
	})
}

const show = (e) => {
	node.value[e.id].show()
}
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
		v-model:selected="selected"
		v-model:expanded="expanded"
		:filter="filter").tree

		template(v-slot:header-root="prop")
			div(class="row items-center")
				q-icon(name="mdi-bookshelf" size="md").q-mr-sm
				div {{ prop.node.label }}

		template(v-slot:default-header="prop")
			.item
				component(:is="SvgIcon" :name="prop.node.icon").ico
				component(:is="WordHighlighter" :query="filter") {{ prop.node.label }}
				//- q-popup-edit(v-model="prop.node.label" auto-save v-slot="scope" :ref="(el: any) => {node[prop.node.id] = el}")
				//- 	q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")
				//- component(:is="TreeMenu" :node="prop.node" )
				//- .buttons
				//- 	q-btn(flat round dense icon="mdi-trash-can-outline" @click.stop="show(prop.node.id)")

</template>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.input {
	width: 200px;
}
.item {
	position: relative;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
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
</style>
