<template lang="pug">
q-page(padding).flex.flex-center
	q-card
		q-card-section.text-center
			h6.q-my-none Для начала работы выберите папку слева.
			q-icon(name="mdi-hand-pointing-left" size="48px")
		//- q-card-section Несколько слов про гипотезу.
		//- q-card-section Выберите папку в панели слева.
</template>

<script>
import { useColor } from '@/stores/colors'
import { ref } from 'vue'

export default {
	setup() {
		const dark = ref(true)

		const colors = useColor()

		return {
			colors,
			dark,
		}
	},
}
</script>

<style scoped lang="scss">
.q-card {
	translate: 0 -100px;
	min-width: 500px;
}
</style>
