import actionTypes from '../actions/actionTypes'

const initState = {
  isLoading: false,
  list: [{
    id: 1,
    title: '我是标题1',
    desc: '1  Ant Design, a design language for background applications, is refined by Ant UED Team',
    hasRead: false
  },{
    id: 2,
    title: '我是标题2',
    desc: '2  Ant Design, a design language for background applications, is refined by Ant UED Team',
    hasRead: true
  }]
}

export default (state = initState, action) => {
  switch(action.type){
    case actionTypes.RECIVED_NOTIFY_LIST: 
      return {
        ...state,
        list: action.playload.list
      }
    case actionTypes.START_MARK_AS_READ: 
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FINISH_MARK_AS_READ: 
    return {
      ...state,
      isLoading: false
    }
    case actionTypes.MARK_NOTIFY_AS_BY_ID:
      const newList = state.list.map(item => {
        if(item.id === action.playload.id){
          item.hasRead = true
        }
        return item
      }) 
      return {
        ...state,
        list: newList
      }

    case actionTypes.MARK_ALL_NOTIFY:
      return {
        ...state,
        list: state.list.map(item => {
          item.hasRead = true
          return item
        })
      }
    default:
      return state
  }
      
}