import * as actions from './actions'
import createReducer from 'application/utils/createReducer'
import { fromJS } from 'immutable'

const initialState = fromJS({
    customerLists: [],
    params: {},
    baseInfo: {},
    collectList: []
})

const actionHandlers = {
    [actions.SET_BASE_INFO]: (state, { payload }) => {
        return state.set('baseInfo', fromJS(payload))
    },
    [actions.SET_PRIVATE_CUSTOMERS]: (state, { payload }) => {
        if (payload.pagination.page === 1) {
            return state.set('customerLists', fromJS(payload.list))
                        .set('params', fromJS(payload.pagination))
        }
        const oldList = state.get('customerLists').toJS()
        const newList = payload.list
        const allList = [...oldList, ...newList]
        return state.set('customerLists', fromJS(allList))
                    .set('params', fromJS(payload.pagination))
    },
    [actions.SET_COLLECT_LIST]: (state, { payload }) => {
        if (payload.pagination.page === 1) {
            return state.set('collectList', fromJS(payload.list))
                        .set('params', fromJS(payload.pagination))
        }
        const oldList = state.get('collectList').toJS()
        const newList = payload.list
        const allList = [...oldList, ...newList]
        return state.set('collectList', fromJS(allList))
                    .set('params', fromJS(payload.pagination))
    },
    [actions.SET_REMARK_COLLECTION]: (state, { payload }) => {
        console.log(payload)
        return state.update('collectList', x => {
            const index = x.findIndex(item => +item.get('coid') === +payload.coid)
            let ditem = x.find(item => +item.get('coid') === +payload.coid)
            ditem = ditem.set('remark', payload.remark)
            return x.update(index, () => ditem)
        })
    }
}

export default createReducer(initialState, actionHandlers)
