<script setup lang="ts">
import { ref, computed } from 'vue'

const tab1 = ref('cod')
const splitterModel = ref(50)

const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 180) + 'px;'
})
</script>

<template lang="pug">
q-page
	.container
		.zag
			q-icon(name="mdi-book-open-page-variant-outline").q-mr-sm
			|Коды полномочий

		q-splitter(v-model="splitterModel" :style="hei")
			template(v-slot:before)
				q-card.left
					p laksjl
					p laksjl
					p laksjl
					p laksjl
					p laksjl
					p laksjl
					p laksjl
					p laksjl
			template(v-slot:after)
				.q-pl-sm
					q-tabs(v-model="tab1" align="left" dense)
						q-tab(name="cod" label="Сведения о коде")
						q-tab(name="sprav" label="Сведения о справочнике")
						q-tab()

</template>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.center {
	height: calc(100vh - 220px);
	display: flex;
	justify-content: center;
	align-items: center;
}
.left {
	box-shadow: none;
	border-radius: 0.5rem;
	margin-right: 0.5rem;
	margin-top: 2rem;
}
</style>
