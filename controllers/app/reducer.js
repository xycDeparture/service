import * as actions from './actions'
import createReducer from 'application/utils/createReducer'
import { fromJS } from 'immutable'

const initialState = fromJS({
    baseInfo: {},
    invitcount: 0,
    initialize: {
        word_count: {
            intro_number: 500,
            remark_number: 10,
            comment_number: 100
        }
    },
    zoom: (window.screen.width / 375) > 1 ? 1 : window.screen.width / 375
})

const actionHandlers = {
    [actions.SET_BASE_INFO]: (state, { payload }) => {
        payload.zoom = state.get('zoom')
        return state.set('baseInfo', fromJS(payload))
    },
    [actions.SET_INVITE_COUNT]: (state, { payload }) => {
        return state.update('invitcount', payload.invite_count)
    },
    [actions.SET_INITIALIZE]: (state, { payload }) => {
        return state.set('initialize', fromJS(payload))
    },
    [actions.CLEAR_BASE_INFO]: (state, { payload }) => {
        return state.set('baseInfo', fromJS(payload))
    }
}

export default createReducer(initialState, actionHandlers)
