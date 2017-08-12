import { bindActionCreators } from 'redux'

export const SET_SCORE_DETAIL = 'integral/SET_SCORE_DETAIL'
export const setScoreDetail = payload => ({ type: SET_SCORE_DETAIL, payload })

export const CLEAR_TASK_LIST = 'integral/CLEAR_TASK_LIST'
export const clearTaskList = () => ({ type: CLEAR_TASK_LIST })

export const GET_SCORE_DETAIL = 'integral/GET_SCORE_DETAIL'
export const getScoreDetail = payload => ({ type: GET_SCORE_DETAIL, payload })

export const containerActions = dispatch => bindActionCreators({
    getScoreDetail,
    clearTaskList
}, dispatch)
