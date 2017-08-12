import { bindActionCreators } from 'redux'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'
import { actions as messageActions } from 'application/controllers/message'

export const SET_CALLING_CARD = 'myVisitedCard/SET_CALLING_CARD'
export const setCallingCard = payload => ({ type: SET_CALLING_CARD, payload })

export const GET_CALLING_CARD = 'myVisitedCard/GET_CALLING_CARD'
export const getCallingCard = payload => ({ type: GET_CALLING_CARD, payload })
export const GET_SIGN_PACKAGE = 'mycard/GET_SIGN_PACKAGE'
export const getSignPackage = () => ({ type: GET_SIGN_PACKAGE })
export const GET_INITIALIZE = 'myVisitedCard/GET_INITIALIZE'
export const SET_INITIALIZE = 'myVisitedCard/SET_INITIALIZE'
export const getInitialize = payload => ({ type: GET_INITIALIZE, payload })
export const setInitialize = payload => ({ type: SET_INITIALIZE, payload })
export const containerActions = dispatch => bindActionCreators({
    message: messageActions.shown,
    hideLoading: dataLoadingActions.done,
    getCallingCard,
    getSignPackage,
    getInitialize
}, dispatch)
