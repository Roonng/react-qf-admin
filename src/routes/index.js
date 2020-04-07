import {
  ArticleList,
  ArticleEdit,
  Dashboard,
  Login,
  NotFound,
  Settings,
  Notify,
  NoAuth,
  Profile
} from '../views'

export const mainRoutes = [{
  pathname: '/login',
  component: Login
},{
  pathname: '/404',
  component: NotFound
},]

export const adminRoutes = [{
  pathname: '/admin/dashboard',
  component: Dashboard,
  title: '仪表盘',
  icon: 'dashboard',
  isNav: true,
  roles: ['001', '002', '003']
},{
  pathname: '/admin/article',
  component: ArticleList,
  title: '文章管理',
  icon: 'unordered-list',
  exact: true,
  isNav: true,
  roles: ['001', '002']
},{
  pathname: '/admin/article/edit/:id',
  component: ArticleEdit,
  roles: ['001']
},{
  pathname: '/admin/notify',
  component: Notify,
  roles: ['001', '002', '003']
},{
  pathname: '/admin/noauth',
  component: NoAuth,
  roles: ['001', '002', '003']
},{
  pathname: '/admin/profile',
  component: Profile,
  roles: ['001', '002', '003']
},{
  pathname: '/admin/settings',
  component: Settings,
  icon: 'setting',
  title: '设置',
  isNav: true,
  roles: ['001', '002']
}]