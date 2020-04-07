import actionTypes from './actionTypes'

import { loginRequest } from '../requests'

const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN,
  }
}

const loginSuccess = (userInfo) => ({ 
  type: actionTypes.LOGIN_SUCCESS, 
  playLoad: {
    userInfo
  }
})

export const changeAvatar = (avatarUrl) => ({
  type: actionTypes.CHANGE_AVATAR,
  playLoad: {
    avatarUrl
  }
})

const loginFaild = () =>  {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('userInfo')
  window.sessionStorage.removeItem('authToken')
  window.sessionStorage.removeItem('userInfo')
  return{ 
    type: actionTypes.LOGIN_FAILD 
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch(loginFaild())
  }
}

export const login = (loginInfo) => {
  return dispatch => {
    dispatch(startLogin())
    loginRequest(loginInfo)
      .then(res => {
        if(res.data.code === 200){
          const {authToken, ...userInfo} = res.data.data
          if(loginInfo.remember === true) {
            window.localStorage.setItem('authToken', authToken)
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          }else {
            window.sessionStorage.setItem('authToken', authToken)
            window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          }
          dispatch(loginSuccess(res.data.data))
        } else{
          dispatch(loginFaild())
        }
      })
  }
}