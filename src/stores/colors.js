import { defineStore } from 'pinia'

export const useColor = defineStore({
	id: 'color',
	state: () => ({
		toolbar: true,
		panel: true,
		reveal: false,
		mini: false,
		info: false,
	}),
	getters: {},
	actions: {
		toggleInfo() {
			this.info = !this.info
		},
	},
})
