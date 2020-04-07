// import ArticleList from './Article/ArticleList'
// import ArticleEdit from './Article/ArticleEdit'
// import Dashboard from './Dashboard/Dashboard'
// import Login from './Login/Login'
// import NotFound from './NotFound/NotFound'
// import Settings from './Settings/Settings'
// import Notify from './Notify/Notify'
// import NoAuth from './NoAuth/NoAuth'
// import Profile from './Profile/Profile'

import Loadalbe from 'react-loadable'
import { Loading } from '../components'

const ArticleList = Loadalbe({
  loader: () => import('./Article/ArticleList'),
  loading: Loading
})
const ArticleEdit = Loadalbe({
  loader: () => import('./Article/ArticleEdit'),
  loading: Loading
})
const Dashboard = Loadalbe({
  loader: () => import('./Dashboard/Dashboard'),
  loading: Loading
})
const Login = Loadalbe({
  loader: () => import('./Login/Login'),
  loading: Loading
})
const NotFound = Loadalbe({
  loader: () => import('./NotFound/NotFound'),
  loading: Loading
})
const Settings = Loadalbe({
  loader: () => import('./Settings/Settings'),
  loading: Loading
})
const Notify = Loadalbe({
  loader: () => import('./Notify/Notify'),
  loading: Loading
})

const NoAuth = Loadalbe({
  loader: () => import('./NoAuth/NoAuth'),
  loading: Loading
})

const Profile = Loadalbe({
  loader: () => import('./Profile/Profile'),
  loading: Loading
})

export {
  ArticleList,
  ArticleEdit,
  Dashboard,
  Login,
  NotFound,
  Settings,
  Notify,
  NoAuth,
  Profile
}