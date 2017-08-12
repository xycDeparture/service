import { bindActionCreators } from 'redux'

export const SET_MY_SCORE = 'myIntegral/SET_MY_SCORE'
export const setMyScore = payload => ({ type: SET_MY_SCORE, payload })

export const GET_MY_SCORE = 'myIntegral/GET_MY_SCORE'
export const getMyScore = payload => ({ type: GET_MY_SCORE, payload })

export const SET_SCORE_TASK_LIST = 'main/SET_SCORE_TASK_LIST'
export const setScoreTaskList = payload => ({ type: SET_SCORE_TASK_LIST, payload })
export const SET_SCORE_DETAIL = 'main/SET_SCORE_DETAIL'
export const setScoreDetail = payload => ({ type: SET_SCORE_DETAIL, payload })

// saga
export const GET_SCORE_TASK_LIST = 'main/GET_SCORE_TASK_LIST'
export const getScoreTaskList = () => ({ type: GET_SCORE_TASK_LIST })
export const GET_SCORE_DETAIL = 'main/GET_SCORE_DETAIL'
export const getScoreDetail = () => ({ type: GET_SCORE_DETAIL })
export const containerActions = dispatch => bindActionCreators({
    getMyScore,
    getScoreTaskList,
    getScoreDetail
}, dispatch)
