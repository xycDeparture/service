import * as actions from './actions'
import createReducer from 'application/utils/createReducer'
import { fromJS } from 'immutable'
const initialState = fromJS({
    serviceList: [
    ],
    params: {
        total: 0,
        pages: 0,
        page: 0
    },
    statusCount: {
        unconfirmed: '',
        undisposed: '',
        all: ''
    },
    commentNum: '',
    managerBiz: [],
    managerPost: {}
})

const actionHandlers = {
    [actions.SET_SERVICE_LIST]: (state, { payload }) => {
        if (payload.pagination.page === 1) {
            return state.set('serviceList', fromJS(payload.service_list))
                        .set('params', fromJS(payload.pagination))
        }
        const oldList = state.get('serviceList').toJS()
        const newList = payload.service_list
        const allList = [...oldList, ...newList]
        return state.set('serviceList', fromJS(allList))
                    .set('params', fromJS(payload.pagination))
    },

    [actions.SET_STATUS_COUNT]: (state, { payload }) => {
        return state.set('statusCount', fromJS(payload))
    },

    [actions.SET_EMPTY_SERVICE_LIST]: (state, { payload }) => {
        return state.set('serviceList', fromJS(payload.service_list))
                    .set('params', fromJS({
                        total: 0,
                        pages: 0,
                        page: 0
                    }))
    },

    [actions.SET_INITIALIZE]: (state, { payload }) => {
        return state.set('commentNum', fromJS(payload.comment_number))
    },

    [actions.SET_MANAGER_PARAMS]: (state, { payload }) => {
        return state.set('managerBiz', fromJS(payload.bizs))
            .set('managerPost', fromJS(payload.positions))
    }
}

export default createReducer(initialState, actionHandlers)
