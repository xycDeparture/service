import * as actions from './actions'
import createReducer from 'application/utils/createReducer'
import { fromJS } from 'immutable'

const initialState = fromJS({
    clientInfo: {}
})

const actionHandlers = {
    [actions.SET_CUSTOMER_INFO]: (state, { payload: { result } }) => {
        return state.set('clientInfo', fromJS(result))
    },
    [actions.UPDATE_REMARK_COLLECTION]: (state, { payload }) => {
        return state.update('clientInfo', x => {
            return x.set('remark', payload.remark)
        })
    }
}

export default createReducer(initialState, actionHandlers)
