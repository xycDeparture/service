import * as actions from './actions'
import createReducer from 'application/utils/createReducer'
import { fromJS } from 'immutable'
const initialState = fromJS({
    serviceDetails: {
        status: 0,
        evaluation: {
            reply: null,
            star: ''
        },
        prop: []
    },
    cancelReasonList: []
})

const actionHandlers = {
    [actions.SET_SEARCH_SERVICE]: (state, { payload }) => {
        return state.set('serviceDetails', fromJS(payload))
    },
    [actions.SET_SERVICECANCELREASONLIST]: (state, { payload }) => {
        console.log('payload', payload)
        return state.set('cancelReasonList', fromJS(payload.cancel_reason))
    },
    [actions.SET_CANCEL_STATUS]: (state, { payload }) => {
        console.log('payload', payload)
        return state.updateIn(['serviceDetails', 'status'], 2)
    }
}

export default createReducer(initialState, actionHandlers)
