import * as actions from './actions'
import createReducer from 'application/utils/createReducer'
import { fromJS } from 'immutable'
const initialState = fromJS({
    baseInfo: {
        intros: []
    },
    initialize: {}
})

const actionHandlers = {
    [actions.SET_CALLING_CARD]: (state, { payload }) => {
        return state.set('baseInfo', fromJS(payload))
    },
    [actions.SET_INITIALIZE]: (state, { payload }) => {
        return state.set('initialize', fromJS(payload))
    }
}

export default createReducer(initialState, actionHandlers)
