import * as actions from './actions'
import createReducer from 'application/utils/createReducer'
import { fromJS } from 'immutable'

const initialState = fromJS({
    tasks: [],
    name: '',
    score: '',
    avatar: '',
    info: {
        avatar: '',
        score: 0,
        nickname: '',
        mobile: '',
        action: ''
    },
    tasklist: [],
    taskinfo: [],
    pagination: {
        page: 1,
        pageSize: 1,
        pages: 1,
        total: 0
    }
})

const actionHandlers = {
    [actions.SET_SCORE_DETAIL]: (state, { payload: data }) => {
        console.log(data.data)
        if (+data.data.pagination.total === state.get('taskinfo').size) {
            return state
        }
        if (data.data.pagination.page === 1) {
            return state.set('taskinfo', fromJS(data.data.list))
                        .set('pagination', fromJS(data.data.pagination))
        }
        return state.update('taskinfo', x => fromJS(x.toJS().concat(data.data.list)))
                    .set('pagination', fromJS(data.data.pagination))
    },
    [actions.SET_SCORE_TASK_LIST]: (state, { payload }) => {
        return state.set('tasklist', fromJS(payload.data.tasks))
    },
    [actions.SET_MY_SCORE]: (state, { payload }) => {
        return state.set('tasks', fromJS(payload.tasks))
                    .set('name', payload.name)
                    .set('score', payload.score)
                    .set('avatar', payload.avatar)
    }
}

export default createReducer(initialState, actionHandlers)
