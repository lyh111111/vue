import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Home from '../../views/home.vue'

export const setRoutes = [
  {
    path: '/set',
    component: Home,
    name: 'set',
    alwaysShow: true,
    meta: {
      title: '设置',
      defaultTitle: '设置',
      icon: 'el-icon-s-tools'
    },
    children: [
      {
        path: 'user',
        name: 'user_manage',
        alwaysShow: true,
        redirect: 'noRedirect',
        meta: {
          title: '用户管理',
          defaultTitle: '用户管理'
        },
        component: {
          render(h) {
            return h('router-view')
          }
        },
        children: [
          {
            path: 'staff_set',
            name: 'staff_set',
            component: r => require.ensure([], () => r(require('../../views/user/staff.vue')), 'set'),
            meta: {
              keepAlive: false,
              title: '员工管理',
              defaultTitle: '员工管理',
              requireAuth: true
            }
          },
          {
            path: 'role_set',
            name: 'role_set',
            component: r => require.ensure([], () => r(require('../../views/user/role.vue')), 'set'),
            meta: {
              keepAlive: true,
              title: '角色管理',
              defaultTitle: '角色管理',
              requireAuth: true
            }
          }    
        ]
      }
    ]
  }
]

export default setRoutes