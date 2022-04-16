
import Vue from 'vue'
import Router from 'vue-router'

import MainIndex from '@/components/MainIndex.vue'
import Home from '../views/home.vue'
import authority from './models/authority'

Vue.use(Router)

const originalPush = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    hidden: true
  }
 */
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    component: Home,
    alwaysShow: true,
    meta: {
      requireAuth: true
    },
    children: [{
      path: '/',
      name: 'Index',
      component: MainIndex,
      meta: {
        title: '工作桌面',
        defaultTitle: '工作桌面',
        requireAuth: true,
        affix: true
      }
    }]
  }
]

export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/error_page/404',
    hidden: true,
    meta: {
      hidden: true
    }
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes.concat(asyncRoutes, authority)
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

