import { defineStore } from 'pinia'
import { uid } from 'quasar'
import { deleteNodeFromTree, insertNodeIntoTree, getNodeFromTree } from '@/utils/utils'

export const useInfo = defineStore({
	id: 'info',
	state: () => ({
		selected: '4',
		nodes: [
			{
				id: '0',
				label: 'Справочники кодов полномочий',
				header: 'root',
				typ: 0,
				children: [
					{
						id: '1',
						icon: 'node-folder',
						label: 'ФНС (федеральная налоговая служба)',
						typ: 1,
						children: [
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_11 отклонение представляет собой',
							},
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_12 вектор угловой скорости' },
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_13 явно видно по фазовой траектории',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_14 время набора максимальной скорости',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_15 согласно третьему закону Ньютона',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_16 преобразует периодический уход гироскопа',
							},
							{
								id: uid(),
								icon: 'keychain',
								typ: 2,
								label: 'CPDV_17 при малых значениях коэффициента податливости',
							},
							{ id: uid(), icon: 'keychain', label: 'CPDV_18 с постоянным ускорением' },
							{
								id: uid(),
								icon: 'keychain',
								typ: 2,
								label: 'CPDV_19 позволяет исключить из рассмотрения',
							},
						],
					},
					{
						id: '2',
						icon: 'node-folder',
						label: 'ФК (федеральное казначейство)',
						typ: 1,
						children: [
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_11 отклонение представляет собой',
							},
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_12 вектор угловой скорости' },
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_13 явно видно по фазовой траектории',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_14 время набора максимальной скорости',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_15 согласно третьему закону Ньютона',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_16 преобразует периодический уход гироскопа',
							},
							{
								id: uid(),
								icon: 'keychain',
								typ: 2,
								label: 'CPDV_17 при малых значениях коэффициента податливости',
							},
							{ id: uid(), icon: 'keychain', label: 'CPDV_18 с постоянным ускорением' },
							{
								id: uid(),
								icon: 'keychain',
								typ: 2,
								label: 'CPDV_19 позволяет исключить из рассмотрения',
							},
						],
					},
					{
						id: '3',
						icon: 'node-folder',
						label: 'МинЦифры (министерство цифрового развития)',
						typ: 1,
						children: [
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_11 отклонение представляет собой',
							},
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_12 вектор угловой скорости' },
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_13 явно видно по фазовой траектории',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_14 время набора максимальной скорости',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_15 согласно третьему закону Ньютона',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_16 преобразует периодический уход гироскопа',
							},
							{
								id: uid(),
								icon: 'keychain',
								typ: 2,
								label: 'CPDV_17 при малых значениях коэффициента податливости',
							},
							{ id: uid(), icon: 'keychain', label: 'CPDV_18 с постоянным ускорением' },
							{
								id: uid(),
								icon: 'keychain',
								typ: 2,
								label: 'CPDV_19 позволяет исключить из рассмотрения',
							},
						],
					},
					{
						id: '4',
						icon: 'node-folder',
						label: 'ООО "ДоксВижн"',
						typ: 1,
						children: [
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_1 договоры до 50 т. руб.' },
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_2 договоры до 100 т. руб.' },
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_3 договоры от 500 т. руб.' },
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_4 договоры от 1 млн. руб.' },
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_5 договоры с зарубежными партнерами',
							},
							{
								id: uid(),
								typ: 2,
								icon: 'keychain',
								label: 'CPDV_6 приказы по группе компаний',
							},
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_7 приказы по филиалу' },
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_8 больничные листы' },
							{ id: uid(), typ: 2, icon: 'keychain', label: 'CPDV_9 служебные записки' },
						],
					},
				],
			},
		],
	}),
	getters: {
		currentItem: (state) => {
			return getNodeFromTree(state.nodes[0], state.selected)
		},
	},
	actions: {
		addSprav(payload) {
			this.nodes[0].children.push(payload)
		},
		addCode(id, node) {
			console.log(id)
			console.log(node)
			insertNodeIntoTree(this.nodes[0], id, node)
		},
		killNode(id) {
			deleteNodeFromTree(this.nodes[0], id)
		},
		setSelected(payload) {
			this.selected = payload
		},
	},
})
