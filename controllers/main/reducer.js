import * as actions from './actions'
import createReducer from 'application/utils/createReducer'
import { fromJS } from 'immutable'

const initialState = fromJS({
    baseInfo: {},
    indexCount: {}
})

const actionHandlers = {
    [actions.SET_BASE_INFO]: (state, { payload }) => {
        return state.set('baseInfo', fromJS(payload))
    },
    [actions.SET_INDEX_COUNT]: (state, { payload }) => {
        return state.set('indexCount', fromJS(payload))
    }
}

export default createReducer(initialState, actionHandlers)
