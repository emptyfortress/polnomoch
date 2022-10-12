import { defineStore } from 'pinia'

export const useGrid = defineStore({
	id: 'grid',
	state: () => ({
		sidebar: false,
		lenta: false,
		fullscreen: false,
		items: [],
		filter: true,
		checked: [],
		disable: 0,
		selected: false,
		aggregat: false,
		loading: true,
		regDate: 'сентябрь',
		sender: 'ПАО "Сургутнефтегаз"',
		gip: 'Журавлев А.Н.',
		proekt: '4120',
	}),
	getters: {
		filt1() {
			if (this.regDate === 'сентябрь') {
				return '2022-09'
			} else if (this.regDate === 'август') {
				return '2022-08'
			} else if (this.regDate === 'июль') {
				return '2022-07'
			} else if (this.regDate === 'июнь') {
				return '2022-06'
			} else if (this.regDate === 'май') {
				return '2022-05'
			} else if (this.regDate === 'апрель') {
				return '2022-04'
			} else if (this.regDate === 'март') {
				return '2022-03'
			} else if (this.regDate === 'февраль') {
				return '2022-02'
			} else if (this.regDate === 'январь') {
				return '2022-01'
			} else if (this.regDate === 'Прошлый год') {
				return '2021'
			} else return ''
		},
	},

	actions: {
		setRegDate(payload) {
			this.reDate = payload
		},
		loadingOn() {
			this.loading = true
		},
		loadingOff() {
			this.loading = false
		},
		toggleLoading() {
			this.loading = !this.loading
		},
		switchAggregat() {
			this.aggregat = !this.aggregat
		},
		switchSidebar() {
			this.sidebar = !this.sidebar
		},
		switchFullscreen() {
			this.fullscreen = !this.fullscreen
		},
		showGrid() {
			this.lenta = false
		},
		showLenta() {
			this.lenta = true
		},
		addAggregat(col, el) {
			let temp = this.checked.find((item) => item.col === col)
			if (!temp) {
				this.checked.push({
					col: col,
					items: [el],
				})
			} else {
				temp.items.push(el)
			}
		},
		removeAggregat(col, el) {
			let colIdx = this.checked.findIndex((item) => item.col === col)
			let itemIdx = this.checked[colIdx].items.indexOf(el)
			this.checked[colIdx].items.splice(itemIdx, 1)
			if (this.checked[colIdx].items.length === 0) {
				this.checked.splice(colIdx, 1)
			}
		},
		addChecked(col, items) {
			let temp = this.checked.find((item) => item.id === col.id)
			if (!temp) {
				this.checked.push({
					id: col.id,
					col: col.name,
					items: items,
				})
			} else {
				temp.items = []
				items.forEach((el) => {
					temp.items.push(el)
				})
			}
		},
		clearCheckedColumn(col) {
			let temp = this.checked.indexOf((el) => el.id === col.id)
			this.checked.splice(temp, 1)
		},
		clearCheckedAll() {
			this.checked = []
		},
	},
})
