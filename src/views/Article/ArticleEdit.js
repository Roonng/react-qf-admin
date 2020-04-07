import React, { Component, createRef } from 'react'

import { Button, Card, Form, Input, DatePicker, Spin, message  } from 'antd'

import E from 'wangeditor'
import moment  from 'moment'

import './edit.less'

import { getArticleById, articleEditById } from '../../requests'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

class ArticleEdit extends Component {
  constructor() {
    super()
    this.editorRef = createRef()
    this.state = {
      isLoading: false
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values, {
          createAt: values.createAt.valueOf()
        })
        this.editArticle(this.props.match.params.id, data)
      }
    });
  };


  initEditor = () => {
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = (html) => {
      this.props.form.setFieldsValue({
       content: html
      })
      console.log(html)
    }

    this.editor.create()
    
  }

  
getArticle = (id) => {
  this.setState({
    isLoading: true
  })
  getArticleById(id)
    .then(res => {
      const {id, ...data} = res
      data.createAt = moment(data.createAt)
      this.props.form.setFieldsValue(data)
      this.editor.txt.html(data.content)
    })
    .finally(() => {
      this.setState({
        isLoading: false
      })
    })
}

editArticle = (id, data) => {
  this.setState({
    isLoading: true
  })
  articleEditById(id, data)
    .then(res => {
      message.success(res.msg)
    })
    .finally(() => {
      this.setState({
        isLoading: false
      })
      this.props.history.push('/admin/article')
    })
}

componentDidMount() {
  this.initEditor()
  this.getArticle(this.props.match.params.id)
}

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card 
          title="文章管理"
          bordered={false} 
          style={{ width: '100%' }}
          extra={<Button onClick={this.props.history.goBack}>取消</Button>}
          >
          <Spin spinning={this.state.isLoading}>
            <Form 
              onSubmit={this.handleSubmit} 
              {...formItemLayout}
            >
              <Form.Item 
                label='标题'
              >
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '必填!' }],
                })(
                  <Input
                    placeholder="请输入标题"
                  />,
                )}
              </Form.Item>
              <Form.Item 
                label='作者'
              >
                {getFieldDecorator('author', {
                  rules: [{ required: true, message: '必填!' }],
                })(
                  <Input
                    placeholder="请输入作者"
                  />,
                )}
              </Form.Item>
              <Form.Item 
                label='阅读量'
              >
                {getFieldDecorator('amount', {
                  rules: [{ required: true, message: '必填!' }],
                })(
                  <Input
                    placeholder="请输入阅读量"
                  />,
                )}
              </Form.Item>
              <Form.Item 
                label='发布时间'
              >
                {getFieldDecorator('createAt', {
                  rules: [{ required: true, message: '必填!' }],
                })(
                  <DatePicker showTime placeholder="选择时间"  />
                )}
              </Form.Item>
              <Form.Item 
                label='内容'
              >
                {getFieldDecorator('content', {
                  rules: [{ required: true, message: '必填!' }],
                })(
                  <div className="content" ref={this.editorRef}>内容</div>
                )}
              </Form.Item>

            

              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </div>
    )
  }
}
const ArticleForm = Form.create({ name: 'normal_login' })(ArticleEdit)

export default ArticleForm


