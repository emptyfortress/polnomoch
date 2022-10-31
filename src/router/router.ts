import { createRouter, createWebHashHistory } from 'vue-router'
import Card from '@/pages/Card.vue'
import Access from '@/pages/Access.vue'
// import Home from '@/pages/Home.vue'

declare module 'vue-router' {
	interface RouteMeta {
		// is optional
		isAdmin?: boolean
		// must be declared by every route
		requiresAuth: boolean
		title: string
	}
}

export const router = createRouter({
	history: createWebHashHistory(),

	routes: [
		{
			path: '/',
			redirect: '/power',
		},
		{
			path: '/power',
			component: Card,
			meta: { transition: 'slide-left', title: 'Коды полномочий', requiresAuth: false },
		},
		{
			path: '/access',
			component: () => import('@/pages/Access.vue'),
			meta: { transition: 'slide-left', title: 'Коды полномочий', requiresAuth: false },
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: '/power',
		},
	],
})

const DEFAULT_TITLE = 'DV Web-Client'
router.beforeEach((to) => {
	document.title = to.meta.title || DEFAULT_TITLE
})
