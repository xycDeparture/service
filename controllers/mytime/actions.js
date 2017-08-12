import { bindActionCreators } from 'redux'

export const GET_DETAIL_TIMES = 'mytime/GET_DETAIL_TIMES'
export const SET_DETAIL_TIMES = 'mytime/SET_DETAIL_TIMES'
export const SET_SERVICE_TIME = 'mytime/SET_SERVICE_TIME'
export const GET_ALL_TIMES = 'mytime/GET_ALL_TIMES'
export const SET_ALL_TIMES = 'mytime/SET_ALL_TIMES'
export const GET_UPDATE_DETAIL_TIMES = 'mytime/GET_UPDATE_DETAIL_TIMES'
export const SET_UPDATE_DETAIL_TIMES = 'mytime/SET_UPDATE_DETAIL_TIMES'


export const getDetailTimes = payload => ({ type: GET_DETAIL_TIMES, payload })
export const setDetailTimes = payload => ({ type: SET_DETAIL_TIMES, payload })
export const setServiceTime = payload => ({ type: SET_SERVICE_TIME, payload })
export const getAllTimes = payload => ({ type: GET_ALL_TIMES, payload })
export const setAllTimes = payload => ({ type: SET_ALL_TIMES, payload })
export const getUpdateDetailTimes = payload => ({ type: GET_UPDATE_DETAIL_TIMES, payload })
export const setUpdateDetailTimes = payload => ({ type: SET_UPDATE_DETAIL_TIMES, payload })

export const containerActions = dispatch => bindActionCreators({
    getDetailTimes,
    setServiceTime,
    getAllTimes,
    getUpdateDetailTimes
}, dispatch)
