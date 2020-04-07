import actionTypes from '../actions/actionTypes'

const isLogin = Boolean(window.localStorage.getItem('authToken')) || Boolean(window.sessionStorage.getItem('authToken'))

const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'))
const initState = {
  ...userInfo,
  role: '001',
  isLogin,
  isLoading: false
}

export default (state = initState, action) => {
  switch(action.type){
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.LOGIN_SUCCESS: 
      return {
        ...state,
        ...action.playLoad.userInfo,
        isLoading: false,
        isLogin: true
      }
    case actionTypes.LOGIN_FAILD: 
      return {
        id: '',
        avatar: '',
        displayName: '',
        isLogin: false,
        isLoading: false,
        role: ''
      }
    case actionTypes.CHANGE_AVATAR:
      return {
        ...state,
        avatar: action.playLoad.avatarUrl
      }
    default: 
      return state
  }
}