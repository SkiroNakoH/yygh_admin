import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
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
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/yygh/hospitalSet',
    component: Layout,
    redirect: '/yygh/hospitalSet/list',
    alwaysShow: true,
    meta: { title: '医院信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/yygh/hospitalSet/list'),
        meta: { title: '医院列表', icon: 'table' }
      },
      {
        path: 'insert',
        component: () => import('@/views/yygh/hospitalSet/form'),
        meta: { title: '医院新增', icon: 'table' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/yygh/hospitalSet/form'),
        meta: { title: '医院修改', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/yygh/dict',
    component: Layout,
    redirect: '/yygh/dict/list',
    alwaysShow: true,
    meta: { title: '数据字典管理', icon: 'example' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: '数据字典',
        component: () => import('@/views/yygh/dict/list'),
        meta: { title: '数据字典', icon: 'table' }
      }
    ]
  },
  {
    path: '/yygh/hospital',
    component: Layout,
    redirect: '/yygh/hospital/list',
    meta: { title: '医院信息', icon: 'el-icon-s-help' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/yygh/hospital/list'),
        meta: { title: '医院列表', icon: 'table' }
      },
      {
        path: 'show/:id',
        component: () => import('@/views/yygh/hospital/show'),
        meta: { title: '医院详情', noCache: true },
        hidden: true
      },
      {
        path: 'schedule/:hoscode',
        component: () => import('@/views/yygh/hospital/schedule'),
        meta: { title: '排班安排', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/user/userInfo',
    component: Layout,
    redirect: '/user/userInfo/list',
    alwaysShow: true,
    meta: { title: '用户信息管理', icon: 'table' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/yygh/userInfo/list'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'show/:id',
        component: () => import('@/views/yygh/userInfo/show'),
        meta: { title: '用户详情', noCache: true },
        hidden: true
      },
      {
        path: 'authList',
        name: '认证审批列表',
        component: () => import('@/views/yygh/userInfo/authList'),
        meta: { title: '认证审批列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/yygh/statistics',
    component: Layout,
    redirect: '/yygh/statistics/order',
    meta: { title: '统计管理', icon: 'el-icon-s-help' },
    alwaysShow: true,
    children: [
      {
        path: 'order',
        component: () => import('@/views/yygh/statistics/order'),
        meta: { title: '预约统计', icon: 'table' }
      },
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
