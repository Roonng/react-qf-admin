import React, { Component } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import { adminRoutes } from './routes'

import { Frame } from './components'

import { connect } from 'react-redux'
class App extends Component {

  render() {
    const menu = adminRoutes.filter(item => item.isNav === true)
    return (
      this.props.isLogin
      ?
      <Frame menu={menu}>
        <Switch>
          { 
            adminRoutes.map(route => {
              return <Route key={route.pathname} path={route.pathname} exact={route.exact} render={(routerProps) => {
                const hasPermission =  route.roles.includes(this.props.role)
                return hasPermission ? <route.component {...routerProps} /> : <Redirect to="/admin/noauth"/>
              }}/>
            })
          }
          <Redirect to={adminRoutes[0].pathname} from="/admin" exact />
          <Redirect to="/404" exact/>
        </Switch>
      </Frame>
      :
      <Redirect to="/login" />     
    )
  }
}

export default connect(
  state => {
    return {
      state,
      isLogin: state.login.isLogin,
      role: state.login.role
    }
  }
)(App)