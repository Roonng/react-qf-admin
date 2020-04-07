import React from 'react'
import { Form, Input, Button, Checkbox, Card, Spin } from 'antd';

import './login.less'

import { connect } from 'react-redux'
import { login } from '../../actions/login'
import { Redirect } from 'react-router-dom';

class Login extends React.Component {


  render() {
    const onFinish = values => {
      this.props.login(values)
    };

    // const [form] = Form.useForm();
    // form.setFieldsValue({
    //   username: 'Hello world!',
    //   password: 'male',
    // });


    return ( 
      window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken')
      ?
      <Redirect to="/admin"/>
      :
      <Spin spinning={this.props.isLoading}>
        <Card title="QF ADMIN登录" className="qf-login-wrapper">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item  name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    )
  }
}

// const loginForm = Form.useForm()

export default connect(
  state => {
    return {
      isLogin: state.login.isLogin,
      isLoading: state.login.isLoading
    }
  },
  { login }
)(Login)