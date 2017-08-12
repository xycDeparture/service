import { bindActionCreators } from 'redux'

export const SET_PRIVATE_CUSTOMERS = 'myClients/SET_PRIVATE_CUSTOMERS'
export const setPrivateCustomers = payload => ({ type: SET_PRIVATE_CUSTOMERS, payload })

export const GET_PRIVATE_CUSTOMERS = 'myClients/GET_PRIVATE_CUSTOMERS'
export const getPrivateCustomers = payload => ({ type: GET_PRIVATE_CUSTOMERS, payload })

export const SET_COLLECT_LIST = 'myClients/SET_COLLECT_LIST'
export const setCollectList = payload => ({ type: SET_COLLECT_LIST, payload })

export const GET_COLLECT_LIST = 'myClients/GET_COLLECT_LIST'
export const getCollectList = payload => ({ type: GET_COLLECT_LIST, payload })

export const REMARK_COLLECTION = 'myClients/REMARK_COLLECTION'
export const SET_REMARK_COLLECTION = 'myClients/SET_REMARK_COLLECTION'
export const remarkCollection = payload => ({ type: REMARK_COLLECTION, payload })
export const setremarkCollection = payload => ({ type: SET_REMARK_COLLECTION, payload })
export const containerActions = dispatch => bindActionCreators({
    getPrivateCustomers,
    getCollectList,
    remarkCollection
}, dispatch)
