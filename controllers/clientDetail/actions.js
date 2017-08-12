import { bindActionCreators } from 'redux'

export const SET_CUSTOMER_INFO = 'integral/SET_CUSTOMER_INFO'
export const setCustomerInfo = payload => ({ type: SET_CUSTOMER_INFO, payload })

export const GET_CUSTOMER_INFO = 'integral/GET_CUSTOMER_INFO'
export const getCustomerInfo = payload => ({ type: GET_CUSTOMER_INFO, payload })

export const COLLECT_CUSTOMER = 'integral/COLLECT_CUSTOMER'
export const collectCustomer = payload => ({ type: COLLECT_CUSTOMER, payload })

export const CANCEL_CUSTOMER = 'integral/CANCELL_CUSTOMER'
export const cancelCustomer = payload => ({ type: CANCEL_CUSTOMER, payload })
export const REMARK_COLLECTION = 'myClients/REMARK_COLLECTION'
export const UPDATE_REMARK_COLLECTION = 'myClients/UPDATE_REMARK_COLLECTION'
export const remarkCollection = payload => ({ type: REMARK_COLLECTION, payload })
export const updateRemarkCollection = payload => ({ type: UPDATE_REMARK_COLLECTION, payload })

export const containerActions = dispatch => bindActionCreators({
    getCustomerInfo,
    collectCustomer,
    remarkCollection,
    cancelCustomer
}, dispatch)
