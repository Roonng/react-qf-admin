import React, { Component } from 'react'

import { Card, Table, Tag, Button, Modal, Typography } from 'antd'

import { getArticles, deleteArticle } from '../../requests'

import moment from 'moment'
// import ButtonGroup from 'antd/lib/button/button-group'

const ButtonGroup = Button.Group

const columnsMap = {
  'id': 'id',
  'title': '标题',
  'author': '作者',
  'amount': '阅读量',
  'createAt': '创建时间'
}

export default class Article extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isLoading: false
    }
  }

  getColums = (columnsKets) => {
   const columns = columnsKets.map(item => {

    if(item === 'amount'){
      return {
        title: columnsMap[item],
        key: item,
        render: (text, record) => {
          const { amount } = record
          return <Tag color={ amount > 220 ? 'red' : 'green' }>{record.amount}</Tag>
        }
      }
    }

    if(item === 'createAt'){
      return {
        title: columnsMap[item],
        key: item,
        render: (text, record) => {
          const { createAt } = record
          return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
        }
      }
    }
     return {
      title: columnsMap[item],
      dataIndex: item,
      key: item,
     }
   })
   columns.push({
     title: '操作',
     ket: 'action',
     render: (text, record) => {
       return (
        <ButtonGroup>
          <Button size="small" type="primary" onClick={this.editArticle.bind(this, record.id)}>编辑</Button>
          <Button size="small" type="danger" onClick={this.deleteArticle.bind(this, record)}>删除</Button>
        </ButtonGroup>
       )
     }
   })
   return columns
  }

  editArticle = (id) => {
    this.props.history.push(`/admin/article/edit/${id}`)
  }

  deleteArticle = (record) => {
    Modal.confirm({
      title: <Typography>确定删除<span style={{color: '#f00'}}>{record.title}</span>吗？</Typography>,
      onOk: () =>{
        deleteArticle(record.id).then(res => console.log(res))
      }
    })
  }

  getArticleData = () => {
    this.setState({
      isLoading: true
    })
    getArticles()
    .then(res => {
      const columnsKets = Object.keys(res.list[0])
      const columns = this.getColums(columnsKets)
      console.log(columns)
      this.setState({
        total: res.total,
        columns,
        dataSource: res.list
      })
    })
    .finally(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  componentDidMount() {
   this.getArticleData()
  }

  render() {
    return (
      <>
        <Card 
          title="文章管理"
          bordered={false} 
          style={{ width: '100%' }}
          extra={<Button>导出excel</Button>}
          >
          <Table 
            dataSource={this.state.dataSource} 
            columns={this.state.columns}
            isLoading={this.isLoading}
            pagination={{
              total: this.state.total
            }}
          />
        </Card>
      </>
    )
  }
}
