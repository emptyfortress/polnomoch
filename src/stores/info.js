import { defineStore } from 'pinia'
import { uid } from 'quasar'

export const useInfo = defineStore({
	id: 'info',
	state: () => ({
		nodes: [
			{
				id: '0',
				label: 'Справочники кодов полномочий',
				header: 'root',
				children: [
					{
						id: uid(),
						icon: 'node-folder',
						label: 'ФНС (федеральная налоговая служба)',
						children: [
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_11 отклонение представляет собой' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_12 вектор угловой скорости' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_13 явно видно по фазовой траектории' },
							{
								id: uid(),
								icon: 'spravochnik',
								label: 'CPDV_14 время набора максимальной скорости',
							},
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_15 согласно третьему закону Ньютона' },
							{
								id: uid(),
								icon: 'spravochnik',
								label: 'CPDV_16 преобразует периодический уход гироскопа',
							},
							{
								id: uid(),
								icon: 'spravochnik',
								label: 'CPDV_17 при малых значениях коэффициента податливости',
							},
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_18 с постоянным ускорением' },
							{
								id: uid(),
								icon: 'spravochnik',
								label: 'CPDV_19 позволяет исключить из рассмотрения',
							},
						],
					},
					{
						id: '2',
						icon: 'node-folder',
						label: 'ФК (федеральное казначейство)',
						children: [
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_21 отклонение представляет собой' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_22 вектор угловой скорости' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_23 явно видно по фазовой траектории' },
							{
								id: uid(),
								icon: 'spravochnik',
								label: 'CPDV_24 время набора максимальной скорости',
							},
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_25 согласно третьему закону Ньютона' },
							{
								id: uid(),
								icon: 'spravochnik',
								label: 'CPDV_26 преобразует периодический уход гироскопа',
							},
							{
								id: uid(),
								icon: 'spravochnik',
								label: 'CPDV_27 при малых значениях коэффициента податливости',
							},
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_28 с постоянным ускорением' },
							{
								id: uid(),
								icon: 'spravochnik',
								label: 'CPDV_29 позволяет исключить из рассмотрения',
							},
						],
					},
					{
						id: '3',
						icon: 'node-folder',
						label: 'МЦР (министерство цифрового развития)',
						children: [
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_31 отклонение представляет собой' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_32 вектор угловой скорости' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_33 явно видно по фазовой траектории' },
							{
								id: uid(),
								icon: 'spravochnik',
								label: 'CPDV_34 время набора максимальной скорости',
							},
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_35 согласно третьему закону Ньютона' },
							{
								id: uid(),
								icon: 'spravochnik',
								label: 'CPDV_36 преобразует периодический уход гироскопа',
							},
							{
								id: uid(),
								icon: 'spravochnik',
								label: 'CPDV_37 при малых значениях коэффициента податливости',
							},
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_38 с постоянным ускорением' },
							{
								id: uid(),
								icon: 'spravochnik',
								label: 'CPDV_39 позволяет исключить из рассмотрения',
							},
						],
					},
					{
						id: '4',
						icon: 'node-folder',
						label: 'ООО "ДоксВижн"',
						children: [
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_1 договоры до 50 т. руб.' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_2 договоры до 100 т. руб.' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_3 договоры от 500 т. руб.' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_4 договоры от 1 млн. руб.' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_5 договоры с зарубежными партнерами' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_6 приказы по группе компаний' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_7 приказы по филиалу' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_8 больничные листы' },
							{ id: uid(), icon: 'spravochnik', label: 'CPDV_9 служебные записки' },
						],
					},
				],
			},
		],
	}),
	getters: {},
	actions: {},
})
