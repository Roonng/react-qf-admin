import React, { Component } from 'react'

import {Card, Button, List, Badge, Spin} from 'antd'

import { connect } from 'react-redux'
import { markNotify, markAllNotify, startMark, finishMark } from '../../actions/notify'

class Notify extends Component {
  render() {
    return (
      <Spin spinning={this.props.isLoading}>
        <Card 
            title="消息通知"
            bordered={false} 
            style={{ width: '100%' }}
            extra={
              <Button 
                disabled={this.props.list.every(item => item.hasRead === true )}
                onClick={this.props.markAllNotify}
              >
                全部标记已读
              </Button>
            }
            >

          <List
              itemLayout="horizontal"
              dataSource={this.props.list}
              renderItem={item => (
                <List.Item extra={ item.hasRead? '' : <Button onClick={this.props.markNotify.bind(this, item.id)}>标记为已读</Button>}>
                  <List.Item.Meta
                    title={<a href="https://ant.design"><Badge dot={!item.hasRead}>{item.title}</Badge></a>}
                    description={item.desc}
                  />
                </List.Item>
              )}
            />
        </Card>
      </Spin>
    )
  }
}

export default connect(
  state => {
    const { list, isLoading } = state.notify
    return { list, isLoading }
  },
  { markNotify, markAllNotify, startMark, finishMark }
)(Notify)