import './frame.less'
import React, { Component } from 'react'
import logo from './logo.png'

import { Layout, Menu, Dropdown, Icon, Avatar, Badge } from 'antd'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { initNotifyList } from '../../actions/notify'

import { logOut } from '../../actions/login'

const { Header, Content, Sider } = Layout


class Frame extends Component {
  menuClick = ({key}) => {
    this.props.history.push(key)
  }
  
  dropDownMenuClick = ({key}) => {
    if(key === '/logout') {
      this.props.logOut()
    }else {
      this.props.history.push(key)
    }
  }

  componentDidMount() {
    this.props.initNotifyList()
  }

  menu = () => (
    <Menu onClick={this.dropDownMenuClick}>
      <Menu.Item key="/admin/notify">
        <Badge dot={Boolean(this.props.notifyCount)}> 
          消息
        </Badge>
      </Menu.Item>
      <Menu.Item key="/admin/profile">
        设置
      </Menu.Item>
      <Menu.Item key="/logout">
        退出
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Layout style={{minHeight: '100%'}}>
        <Header className="header qf-header">
          <div className="qf-logo">
            <img src={logo} alt="QFADMIN"/>
          </div>
          <div>
            <Badge count={this.props.notifyCount}> 
              <Dropdown overlay={this.menu}>
                <div onClick={e => e.preventDefault()}>
                  您好，{this.props.displayName}！<Avatar src={this.props.avatar}/><Icon type="down" />
                </div>
              </Dropdown>
            </Badge>
          </div>
        </Header>
          
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              onClick={this.menuClick}
              mode="inline"
              defaultSelectedKeys={[this.props.menu[0].pathname]}
              style={{ height: '100%', borderRight: 0 }}
            >
             
              {
                this.props.menu.map(item => {
                  return (
                    <Menu.Item key={item.pathname}>
                      <Icon type={item.icon} />
                      {item.title}
                    </Menu.Item>
                    )
                })
              }
              
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }}>
          
            <Content
              style={{
                background: '#fff',
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(
  connect(
    state => {
      const len = state.notify.list.filter(item => item.hasRead === false).length
      return { 
        notifyCount: len,
        avatar: state.login.avatar ,
        displayName: state.login.displayName
      }
    },
    {initNotifyList, logOut}
)(Frame))