import * as actions from './actions'
import createReducer from 'application/utils/createReducer'
import { fromJS } from 'immutable'
const initialState = fromJS({
    allTimes: [],
    dateTimes: []
})

const actionHandlers = {
    [actions.SET_ALL_TIMES]: (state, { payload }) => {
        return state.set('allTimes', fromJS(payload))
    },

    [actions.SET_DETAIL_TIMES]: (state, { payload }) => {
        return state.set('dateTimes', fromJS(payload))
    },

    [actions.SET_UPDATE_DETAIL_TIMES]: (state, { payload }) => {
        let dateTimes = state.get('dateTimes').toJS()
        payload.forEach(x => {
            const index = dateTimes.findIndex(item => item === x)
            if (index === -1) {
                dateTimes.push(x)
            } else {
                dateTimes = dateTimes.filter(item => item !== x)
            }
        })
        return state.set('dateTimes', fromJS(dateTimes))
    }
}

export default createReducer(initialState, actionHandlers)
