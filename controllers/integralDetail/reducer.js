import * as actions from './actions'
import createReducer from 'application/utils/createReducer'
import { fromJS } from 'immutable'

const initialState = fromJS({
    taskLists: [],
    curScore: 0,
    params: {
        total: 0,
        pages: 0,
        page: 0
    }
})

const actionHandlers = {
    [actions.SET_SCORE_DETAIL]: (state, { payload }) => {
        const oldList = state.get('taskLists').toJS()
        const newList = payload.list
        const allList = [...oldList, ...newList]
        return state.set('params', fromJS(payload.pagination))
                    .set('taskLists', fromJS(allList))
                    .set('curScore', fromJS(payload.score))
    },

    [actions.CLEAR_TASK_LIST]: state => {
        return state.set('taskLists', fromJS([]))
    }
}

export default createReducer(initialState, actionHandlers)
