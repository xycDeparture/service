import { bindActionCreators } from 'redux'
import { getInitialize } from 'manager/controllers/appt/actions'

export const GET_SEARCH_SERVICE = 'comment/GET_SEARCH_SERVICE'
export const GET_SERVICECANCELREASONLIST = 'comment/GET_SERVICECANCELREASONLIST'
export const SET_SERVICECANCELREASONLIST = 'comment/SET_SERVICECANCELREASONLIST'
export const SET_SEARCH_SERVICE = 'comment/SET_SEARCH_SERVICE'
export const COMMENT_REPLY = 'comment/COMMENT_REPLY'
export const CONFIRM_STATUS = 'comment/CONFIRM_STATUS'
export const CANCEL_STATUS = 'comment/CANCEL_STATUS'
export const SET_CANCEL_STATUS = 'comment/SET_CANCEL_STATUS'
export const CONFIRM_OVER_STATUS = 'comment/CONFIRM_OVER_STATUS'

export const getSearchService = payload => ({ type: GET_SEARCH_SERVICE, payload })
export const getServiceCancelReasonList = payload => ({ type: GET_SERVICECANCELREASONLIST, payload })
export const setServiceCancelReasonList = payload => ({ type: SET_SERVICECANCELREASONLIST, payload })
export const setSearchService = payload => ({ type: SET_SEARCH_SERVICE, payload })
export const commentReply = payload => ({ type: COMMENT_REPLY, payload })
export const confirmStatus = payload => ({ type: CONFIRM_STATUS, payload })
export const serviceStatusCancel = payload => ({ type: CANCEL_STATUS, payload })
export const setServiceStatusCancel = payload => ({ type: SET_CANCEL_STATUS, payload })
export const confirmOverStatus = payload => ({ type: CONFIRM_OVER_STATUS, payload })

export const containerActions = dispatch => bindActionCreators({
    getSearchService,
    commentReply,
    confirmStatus,
    confirmOverStatus,
    getInitialize,
    serviceStatusCancel,
    getServiceCancelReasonList
}, dispatch)
