<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import WordHighlighter from 'vue-word-highlighter'

const selected = ref(['0'])
const expanded = ref(['0', '1'])
const filter = ref('')
const nodes = [
	{
		id: '0',
		label: 'Справочники кодов полномочий',
		header: 'root',
		children: [
			{
				id: '1',
				icon: 'node-folder',
				label: 'ФНС (федеральная налоговая служба)',
				children: [
					{
						id: '5',
						icon: 'spravochnik',
						label: 'Fuck',
						children: [],
						body: 'story',
						story: 'this is story',
					},
				],
			},
			{
				id: '2',
				icon: 'node-folder',
				label: 'ФК (федеральное казначейство)',
				children: [],
			},
			{
				id: '3',
				icon: 'node-folder',
				label: 'МЦР (министерство цифрового развития)',
				children: [],
			},
			{
				id: '4',
				icon: 'node-folder',
				label: 'ООО "ДоксВижн"',
				children: [],
			},
		],
	},
]
</script>

<template lang="pug">
.row
	q-space
	q-input(dense debounce="0" hide-bottom-space color="primary" autofocus v-model="filter" clearable).input
		template(v-slot:prepend)
			q-icon(name="mdi-magnify")

q-tree(:nodes="nodes"
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
		div(class="row items-center")
			component(:is="SvgIcon" :name="prop.node.icon").ico
			WordHighlighter(:query="filter").ellipsis {{ prop.node.label }}

	template(v-slot:body-story="prop")
		span {{ prop.node.story }}

</template>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.input {
	width: 200px;
}
.ico {
	font-size: 0.8rem;
	margin-right: 0.5rem;
}
</style>
