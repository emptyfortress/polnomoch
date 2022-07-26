<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import WordHighlighter from 'vue-word-highlighter'
import { useInfo } from '@/stores/info'

const myinfo = useInfo()

const selected = ref(['0'])
const expanded = ref(['0', '4'])
const filter = ref('')
const input = ref()
const tree = ref()

onMounted(() => {
	watchEffect(() => {
		if (filter.value.length > 1) {
			tree.value.expandAll()
		}
	})
})
</script>

<template lang="pug">
.row
	q-space
	q-input(dense ref="input" debounce="0" hide-bottom-space color="primary" autofocus v-model="filter" clearable @clear="filter = ''").input
		template(v-slot:prepend)
			q-icon(name="mdi-magnify")

q-scroll-area.scroll
	q-tree(:nodes="myinfo.nodes"
		ref="tree"
		node-key="id"
		no-results-label="Ничего нет"
		no-selection-unset
		v-model:selected="selected"
		v-model:expanded="expanded"
		:filter="filter")

		template(v-slot:header-root="prop")
			div(class="row items-center")
				q-icon(name="mdi-bookshelf" size="md").q-mr-sm
				div {{ prop.node.label }}

		template(v-slot:default-header="prop")
			.item
				component(:is="SvgIcon" :name="prop.node.icon").ico
				WordHighlighter(:query="filter").ellipsis {{ prop.node.label }}

</template>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.input {
	width: 200px;
}
.item {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.ico {
	font-size: 0.8rem;
	margin-right: 0.5rem;
	flex-shrink: 0;
}
.scroll {
	height: calc(100% - 20px);
}
</style>
