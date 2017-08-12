import { bindActionCreators } from 'redux'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'
import { actions as messageActions } from 'application/controllers/message'
// reducer
export const SET_BASE_INFO = 'app/SET_BASE_INFO'
export const setBaseInfo = payload => ({ type: SET_BASE_INFO, payload })
export const SET_INVITE_COUNT = 'app/SET_INVITE_COUNT'
export const setInviteCount = payload => ({ type: SET_INVITE_COUNT, payload })
// saga
export const GET_BASE_INFO = 'app/GET_BASE_INFO'
export const getBaseInfo = payload => ({ type: GET_BASE_INFO, payload })
export const GET_INVITE_COUNT = 'app/GET_INVITE_COUNT'
export const getInviteCount = payload => ({ type: GET_INVITE_COUNT, payload })
export const GET_INITIALIZE = 'app/GET_INITIALIZE'
export const SET_INITIALIZE = 'app/SET_INITIALIZE'
export const getInitialize = payload => ({ type: GET_INITIALIZE, payload })
export const setInitialize = payload => ({ type: SET_INITIALIZE, payload })
export const GET_SIGN_PACKAGE = 'app/GET_SIGN_PACKAGE'
export const getSignPackage = () => ({ type: GET_SIGN_PACKAGE })

export const CLEAR_BASE_INFO = 'app/CLEAR_BASE_INFO'
export const clearBaseInfo = payload => ({ type: CLEAR_BASE_INFO, payload })
export const containerActions = dispatch => bindActionCreators({
    message: messageActions.shown,
    hideLoading: dataLoadingActions.done,
    setBaseInfo,
    getBaseInfo,
    getInviteCount,
    getInitialize,
    getSignPackage,
    clearBaseInfo
}, dispatch)
