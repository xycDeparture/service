import { bindActionCreators } from 'redux'

export const SET_INVITE_LIST = 'clientAdd/SET_INVITE_LIST'
export const setInviteList = payload => ({ type: SET_INVITE_LIST, payload })

export const SET_INVITE_URLMSG = 'clientAdd/SET_INVITE_ULRMSG'
export const setInviteUrlMsg = payload => ({ type: SET_INVITE_URLMSG, payload })

export const SET_LOGOOFF_CUSTOMER = 'clientAdd/SET_LOGOOFF_CUSTOMER'
export const setLogoOffCustomer = payload => ({ type: SET_LOGOOFF_CUSTOMER, payload })

export const SET_CANCEL_INVITE = 'clientAdd/SET_CANCEL_INVITE'
export const setCancelInvite = payload => ({ type: SET_CANCEL_INVITE, payload })

export const SET_ADD_CLIENT = 'clientAdd/SET_ADD_CLIENT'
export const setAddClient = payload => ({ type: SET_ADD_CLIENT, payload })

export const CLEAR_CLIENT_LIST = 'clientAdd/CLEAR_CLIENT_LIST'
export const clearClientList = () => ({ type: CLEAR_CLIENT_LIST })

export const GET_INVITE_LIST = 'clientAdd/GET_INVITE_LIST'
export const getInviteList = payload => ({ type: GET_INVITE_LIST, payload })

export const GET_INVITE_URL = 'clientAdd/GET_INVITE_URL'
export const getInviteUrl = payload => ({ type: GET_INVITE_URL, payload })

export const GET_LOGOOFF_CUSTOMER = 'clientAdd/GET_LOGOOFF_CUSTOMER'
export const getLogoOffCustomer = payload => ({ type: GET_LOGOOFF_CUSTOMER, payload })

export const containerActions = dispatch => bindActionCreators({
    getInviteList,
    setInviteList,
    getInviteUrl,
    getLogoOffCustomer,
    clearClientList
}, dispatch)
