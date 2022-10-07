<template lang="pug">
.multi(:class="{ big : big }")
	.ro
		q-btn(flat round dense icon="mdi-close" @click="clear")
		.tot {{ selected }}
		.arr &rarr;
		q-btn(v-for="bt in btn" unelevated color="primary" size="12px" :key="bt").action {{ bt }}
		.up
		q-btn(round flat dense icon="mdi-chevron-up" @click="setBig").chev
	.ro.bottom
		q-btn(unelevated size="12px" v-for="n in 4" color="grey" v-show="!delegation" :key="n").action Кнопка действий
		p(v-show="delegation") здесь выбор из справочника сотрудников
</template>

<script>
import { ref, inject } from 'vue'

export default {
	emits: ['clear'],

	props: {
		selected: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	setup(props, context) {
		const big = ref(false)
		const delegation = ref(false)

		const btn = inject('bon', ['Кнопка действий'])

		const setBig = () => {
			delegation.value = false
			big.value = !big.value
		}

		const deleg = () => {
			big.value = !big.value
			delegation.value = !delegation.value
		}

		const clear = () => {
			context.emit('clear')
		}

		return {
			big,
			delegation,
			setBig,
			deleg,
			clear,
			btn,
		}
	},
}
</script>

<style scoped lang="scss">
.multi {
	height: 48px;
	width: 100%;
	background: #e5e5e5;
	box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2);
	border-radius: 12px 12px 0px 0px;
	transition: 0.3s ease all;
	overflow: hidden;
	body.body--dark & {
		background: var(--my-color-step-150);
	}
	.ro {
		width: 100%;
		padding: 0.5rem;
		padding-bottom: 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		&.bottom {
			margin-left: 96px;
		}
	}
	&.big {
		height: 100px;
	}
}
.tot {
	font-size: 1.1rem;
	font-weight: bold;
}
.arr {
	font-size: 1.2rem;
	margin: 0 1rem;
}
.action {
	margin: 0 0.25rem;
}
.up {
	flex-grow: 1;
}
.chev {
	transition: 0.2s ease all;
	.big & {
		transform: rotate(180deg);
	}
}
</style>
