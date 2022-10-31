<script setup lang="ts">
import { ref } from 'vue'
import Info1 from '@/components/Info1.vue'
import { uid } from 'quasar'
import { useInfo } from '@/stores/info'
import BranchTree1 from '@/components/BranchTree1.vue'
import AccessRights from '@/components/AccessRights.vue'

const splitterModel = ref(50)

const name = ref('')
const morphGroupModel = ref('btn')
const nextMorphStep: any = {
	btn: 'card1',
	card1: 'btn',
}
const nextMorph = () => {
	morphGroupModel.value = nextMorphStep[morphGroupModel.value]
}

const myinfo = useInfo()
const addSprav = () => {
	const temp = {
		id: uid(),
		label: name.value,
		icon: 'node-folder',
		typ: 1,
		children: [],
	}
	myinfo.addSprav(temp)
	nextMorph()
	name.value = ''
	myinfo.setSelected(temp.id)
}
const tabs = ref('info')
const filter = ref('')
const expand = ref(false)
</script>

<template lang="pug">
q-page
	.container
		.zag.q-mb-md Коды полномочий 1

		q-splitter(v-model="splitterModel" )
			template(v-slot:before)

				.myrow
					.razv(@click="expand = !expand")
						q-btn(round flat dense icon="mdi-unfold-more-horizontal")
						span Развернуть
					q-input(dense ref="input" debounce="0" hide-bottom-space color="primary" autofocus v-model="filter" clearable @clear="filter = ''").input
						template(v-slot:prepend)
							q-icon(name="mdi-magnify")
				q-card.left
					component(:is="BranchTree1" :filter="filter" :expand="expand")

			template(v-slot:after)
				.pad
					q-tabs(v-model="tabs" active-color="primary" align="left").text-grey-9
						q-tab(name="info" label="Иформация")
						q-tab(name="right" label="Права доступа")

				q-tab-panels(v-model="tabs" animated)
					q-tab-panel(name="info")
						component(:is="Info1")
					q-tab-panel(name="right")
						component(:is="AccessRights")

</template>

<style scoped lang="scss">
.myrow {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 1.5rem;
}
.left {
	margin-right: 0.5rem;
	position: relative;
}
.q-card.first {
	position: absolute;
	bottom: 0.5rem;
	left: 0.5rem;
	width: 300px;
	height: auto;
	border-radius: 4px;
	border-bottom-left-radius: 1em;
	background: var(--q-primary);
	color: #fff;
	padding: 0.5rem;
	.close {
		position: absolute;
		bottom: 5px;
		left: 5px;
	}
}
.fab1 {
	position: absolute;
	bottom: 0.5rem;
	left: 0.5rem;
}
.q-card {
	box-shadow: none;
	border-radius: 4px;
	box-shadow: none;
	border-radius: 4px;
	margin-top: 1rem;
	padding: 1rem;
	height: calc(100vh - 245px);
}
.input {
	width: 200px;
}
.razv {
	font-size: 0.7rem;
	color: #666;
	cursor: pointer;
}
.pad {
	padding-left: 0.5rem;
}
.q-tab-panels {
	margin: 0;
	padding: 0;
	margin-left: 0.5rem;
}
.q-tab-panel {
	margin: 0;
	padding: 0;
}
</style>
