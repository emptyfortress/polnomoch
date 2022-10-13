interface Node {
	id: string | number
	label: string
	group: string
}

interface Edge {
	from: number
	to: number
	color: string
	title?: string
	semantics: number
}

interface MyNode {
	id: number
	active: boolean
	label: string
	title?: string
	desc?: string
	first: boolean
	last: boolean
	StartCondition: number
	group: string
	level?: number
	repeat?: number
}

interface Column {
	id?: number
	name: string
	label: string
	field: string | ((row: any) => any)
	required?: boolean
	align?: 'left' | 'right' | 'center'
	sortable?: boolean
	sort?: (a: any, b: any, rowA: any, rowB: any) => number
	sortOrder?: 'ad' | 'da'
	format?: (val: any, row: any) => any
	style?: string | ((row: any) => string)
	classes?: string | ((row: any) => string)
	headerStyle?: string
	headerClasses?: string
}
interface Row {
	id: number
	unread: boolean
	selected: boolean
	vid: string
	regnumber: number
	regdate: string
	sender: string
	ishnumber: string
	ishdate: string
	theme: string
	gip: string
	proekt: string
	otvet: string
	votvet: string
	connected: string
	linked: string
	control: string
	needotvet: string
	notfinished: string
}
interface Row1 {
	id: number
	unread: boolean
	selected: boolean
	vid: string
	regnum: string
	regdate1: string
	theme: string
	author: string
	department: string
	prednum: string
	state: string
	to: string
	notfinished: string
	due: string
	gip: string
	proekt: string
	doctype: string
	comments: string
	created: string
}
