import { bindActionCreators } from 'redux'

// reducer
export const SET_BASE_INFO = 'main/SET_BASE_INFO'
export const setBaseInfo = payload => ({ type: SET_BASE_INFO, payload })
export const SET_INDEX_COUNT = 'main/SET_INDEX_COUNT'
export const setIndexCount = payload => ({ type: SET_INDEX_COUNT, payload })
// saga
export const GET_BASE_INFO = 'main/GET_BASE_INFO'
export const getBaseInfo = payload => ({ type: GET_BASE_INFO, payload })
export const GET_INDEX_COUNT = 'main/GET_INDEX_COUNT'
export const getIndexCount = () => ({ type: GET_INDEX_COUNT })
export const LOGOUT = 'mainPage/LOGOUT'
export const logout = () => ({ type: LOGOUT })
export const containerActions = dispatch => bindActionCreators({
    setBaseInfo,
    getBaseInfo,
    logout,
    getIndexCount
}, dispatch)
