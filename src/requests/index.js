import { message } from "antd"
import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL : isDev? 'http://rap2api.taobao.org/app/mock/244475' : ''
})

const service1 = axios.create({
  baseURL : isDev? 'http://rap2api.taobao.org/app/mock/244475' : ''
})

service.interceptors.request.use((config) => {
  config.data = Object.assign({}, config.data, {
    authToken: 'itisatokenplaceholder'
  })
  return config
})

service.interceptors.response.use((resp) => {
  if(resp.data.code === 200){
    return resp.data.data
  }else{
    message.error(resp.data.errMsg)
  }
})

export const getArticles = () => {
  return service.post('/api/v1/articleList')
}

export const deleteArticle = (id) => {
  return service.post('/api/v1/articleDelete')
}

export const getArticleById = (id) => {
  return service.post(`/api/v1/article/${id}`)
}

export const articleEditById = (id, data) => {
  return service.post(`/api/v1/articleEdit/${id}`, data)
}

export const getNotifyList = (id, data) => {
  return service.post('/api/v1/notifyList')
}

export const loginRequest = (userInfo) => {
  return service1.post('/api/v1/login', userInfo)
}
