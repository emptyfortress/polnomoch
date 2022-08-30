<script setup lang="ts">
import { ref } from 'vue'
import BranchTree from '@/components/BranchTree.vue'
import Info from '@/components/Info.vue'
import { uid } from 'quasar'
import { useInfo } from '@/stores/info'

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
</script>

<template lang="pug">
q-page
	.container
		.zag Коды полномочий

		q-splitter(v-model="splitterModel" )
			template(v-slot:before)
				q-card.left

					component(:is="BranchTree")

					//- q-btn(round
						dense icon="mdi-plus"
						v-morph:btn:mygroup:200.resize="morphGroupModel"
						@click="nextMorph"
						color="primary" size="md").fab1
					q-card(v-morph:card1:mygroup:200.resize="morphGroupModel").first
						.zg Название справочника
						q-input(v-model="name" outlined dense bg-color="white" autofocus hide-bottom-space)
						q-card-actions(align="right")
							q-btn(flat label="Создать" @click="addSprav")
						q-btn(round flat icon="mdi-close" @click="nextMorph" size="sm").close

			template(v-slot:after)
				component(:is="Info")

</template>

<style scoped lang="scss">
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
.center {
	height: calc(100vh - 220px);
	display: flex;
	justify-content: center;
	align-items: center;
}
.q-card {
	box-shadow: none;
	border-radius: 4px;
	box-shadow: none;
	border-radius: 4px;
	margin-top: 1rem;
	padding: 1rem;
	height: calc(100vh - 210px);
}
</style>
