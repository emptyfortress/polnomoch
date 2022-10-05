import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
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
			component: Home,
			meta: { transition: 'slide-left', title: 'Гипотеза', requiresAuth: false },
			// redirect: '/power',
		},
		{
			path: '/inbox',
			component: () => import('@/components/Inbox.vue'),
			meta: { transition: 'slide-left', title: 'Входящие документы', requiresAuth: false },
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: '/',
		},
	],
})

const DEFAULT_TITLE = 'DV Web-Client'
router.beforeEach((to) => {
	document.title = to.meta.title || DEFAULT_TITLE
})
