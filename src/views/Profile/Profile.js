import React, { Component } from 'react'
import axios from 'axios'
import { Card, Upload, Spin } from 'antd'

import { changeAvatar } from '../../actions/login'
import { connect } from 'react-redux'

import './profile.less'

class Profile extends Component {

  state = {
    isUploadig: false,
    avatarUrl: ''
  }

  handleUploadAvatar = ({ file }) => {
    const data = new FormData()
    data.append('Token', '593cf3a82c63d25413c66bfdf471677565b7ef2a:ML8IH_HcJTcrYOJKjtEP-X-Pfb4=:eyJkZWFkbGluZSI6MTU4MjYwMTE3MCwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzEwNzUyIiwiYWlkIjoiMTY2NTkzMSIsImZyb20iOiJmaWxlIn0=')
    data.append('file', file)
    this.setState({
      isUploadig: true
    })
    axios.post('http://up.imgapi.com/', data)
      .then(res => {
        this.setState({
          isUploadig: false,
        })
        this.props.changeAvatar(res.data.linkurl)
      })
  }


  render() {
    return (
      <Card title="个人设置" bordered={false}>
        <Upload className="upload"
          showUploadList={false}
          customRequest={this.handleUploadAvatar}
        >

          <Spin spinning={this.state.isUploadig}>
            {
              this.props.avatarUrl ? <img className="avatar" src={this.props.avatarUrl} alt="头像" /> : <span>点击上传</span>
            }
          </Spin>
        </Upload>
      </Card>
    )
  }
}

export default connect(
  state => {
    return {
      avatarUrl: state.login.avatar
    }
  },
  { changeAvatar }
)(Profile)