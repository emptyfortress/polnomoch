<script setup lang="ts">
import { ref } from 'vue'

const tab1 = ref('cod')
const splitterModel = ref(40)
</script>

<template lang="pug">
q-page
	.container
		.zag
			q-icon(name="mdi-book-open-page-variant-outline").q-mr-sm
			|Коды полномочий

		q-splitter(v-model="splitterModel" )
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
					q-tabs(v-model="tab1" align="left" dense active-color="primary" :stretch="false")
						q-tab(name="cod" label="Сведения о коде")
						q-tab(name="sprav" label="Сведения о справочнике")
					q-card.right
						q-tab-panels(v-model="tab1")
							q-tab-panel(name="cod")
								p cod
							q-tab-panel(name="sprav")
								p sprav

</template>

<style scoped lang="scss">
.center {
	height: calc(100vh - 220px);
	display: flex;
	justify-content: center;
	align-items: center;
}
.left,
.right {
	box-shadow: none;
	border-radius: 4px;
}
.left {
	box-shadow: none;
	border-radius: 4px;
	margin-right: 0.5rem;
	margin-top: 34px;
	padding: 1rem;
	height: calc(100vh - 210px);
}
</style>
