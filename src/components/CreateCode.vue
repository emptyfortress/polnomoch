<template lang="pug">
q-dialog(v-model="props.dialog1" )
	q-card.create
		.row.justify-between.items-center
			.text-h6.q-mt-none
				component(:is="SvgIcon" name="keychain").q-mr-md
				span Новый код полномочий
			q-btn(flat round icon="mdi-close" @click="cancel")

		q-card-section.mygrid
			.label Название:
			q-input(dense v-model="name" ).quick
			.label Код полномочий:
			q-input(dense v-model="code" ).quick
			.label  Описание:
			q-input(dense v-model="descr" ).quick
			.label  Доверитель:
			q-select(dense v-model="doveritel" ).quick
				template(v-slot:prepend)
					q-icon(name="mdi-book-open-page-variant-outline")

		q-card-actions(align="right")
			q-btn(label="Отмена" flat color="primary" @click="cancel")
			q-btn(label="Добавить" flat color="primary" @click="save")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { uid } from 'quasar'

const props = defineProps({
	dialog1: Boolean,
})
const emit = defineEmits(['cancel', 'save'])

const name = ref('')
const code = ref('')
const descr = ref('')
const doveritel = ref('ООО "ДоксВижн"')

const cancel = () => {
	emit('cancel')
}
const save = () => {
	let temp = {
		id: uid(),
		typ: 2,
		icon: 'keychain',
		label: name.value,
		code: code.value,
		name: name.value,
		descr: descr.value,
		doveritel: doveritel.value,
	}
	emit('save', temp)
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.create {
	padding: 1rem;
	padding-top: 0.5rem;
	min-width: 500px;
	border-top: 7px solid var(--q-primary);
}
.mygrid {
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: baseline;
	column-gap: 1rem;
	row-gap: 0.7rem;
}
.label {
	text-align: right;
}
.inp {
	height: 32px;
}
</style>
