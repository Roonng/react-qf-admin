import actionTypes from './actionTypes'

import { getNotifyList } from '../requests'

export const startMark = () => ({type: actionTypes.START_MARK_AS_READ})
export const finishMark = () =>({type: actionTypes.FINISH_MARK_AS_READ})
export const markNotify = (id) =>{
  return dispatch => {
    dispatch(startMark())
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFY_AS_BY_ID,
        playload: {
          id
        }
      })
      dispatch(finishMark())
    }, 2000)
  }
}

export const markAllNotify = () =>{
  return dispatch => {
    dispatch(startMark())
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_ALL_NOTIFY,
      })
      dispatch(finishMark())
    }, 2000)
  }
}

export const initNotifyList = () =>{
  return dispatch => {
    dispatch(startMark())
    getNotifyList()
      .then(res => {
        dispatch({
          type: actionTypes.RECIVED_NOTIFY_LIST,
          playload:{
            list: res.list
          }
        })
        dispatch(finishMark())
      })
  }
}



