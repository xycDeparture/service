import { bindActionCreators } from 'redux'

export const GET_SERVICE_LIST = 'appt/GET_SERVICE_LIST'
export const SET_SERVICE_LIST = 'appt/SET_SERVICE_LIST'
export const GET_STATUS_COUNT = 'appt/GET_STATUS_COUNT'
export const SET_STATUS_COUNT = 'appt/SET_STATUS_COUNT'
export const CONFIRM_STATUS = 'appt/CONFIRM_STATUS'
export const CONFIRM_OVER_STATUS = 'appt/CONFIRM_OVER_STATUS'
export const CLEAR_SERVICE_LIST = 'appt/CLEAR_SERVICE_LIST'
export const SET_EMPTY_SERVICE_LIST = 'appt/SET_EMPTY_SERVICE_LIST'
export const GET_INITIALIZE = 'appt/GET_INITIALIZE'
export const SET_INITIALIZE = 'appt/SET_INITIALIZE'
export const GET_MANAGER_PARAMS = 'appt/GET_MANAGER_PARAMS'
export const SET_MANAGER_PARAMS = 'appt/SET_MANAGER_PARAMS'
export const ADD_MANAGER = 'appt/ADD_MANAGER'

export const getServiceList = payload => ({ type: GET_SERVICE_LIST, payload })
export const setServiceList = payload => ({ type: SET_SERVICE_LIST, payload })
export const getStatusCount = payload => ({ type: GET_STATUS_COUNT, payload })
export const setStatusCount = payload => ({ type: SET_STATUS_COUNT, payload })
export const confirmStatus = payload => ({ type: CONFIRM_STATUS, payload })
export const confirmOverStatus = payload => ({ type: CONFIRM_OVER_STATUS, payload })
export const clearServiceList = payload => ({ type: CLEAR_SERVICE_LIST, payload })
export const setEmptyServiceList = payload => ({ type: SET_EMPTY_SERVICE_LIST, payload })
export const getInitialize = payload => ({ type: GET_INITIALIZE, payload })
export const setInitialize = payload => ({ type: SET_INITIALIZE, payload })

export const getManagerParams = () => ({ type: GET_MANAGER_PARAMS })
export const setManagerParams = payload => ({ type: SET_MANAGER_PARAMS, payload })
export const addManager = payload => ({ type: ADD_MANAGER, payload })

export const containerActions = dispatch => bindActionCreators({
    getServiceList,
    getStatusCount,
    confirmStatus,
    confirmOverStatus,
    clearServiceList,
    getInitialize,
    getManagerParams,
    addManager
}, dispatch)
