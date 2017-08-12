import * as actions from './actions'
import createReducer from 'application/utils/createReducer'
import { fromJS } from 'immutable'

const initialState = fromJS({
    inviteList: [],
    params: {},
    inviteMsgUrl: '',
    score: 0,
    url: '',
    residue_degree: 0
})

const actionHandlers = {
    [actions.SET_INVITE_LIST]: (state, { payload }) => {
        if (payload.pagination.page === 1) {
            return state.set('inviteList', fromJS(payload.verified_list))
                        .set('params', fromJS(payload.pagination))
                        .set('residue_degree', fromJS(payload.residue_degree))
        }
        const oldList = state.get('inviteList').toJS()
        const newList = payload.verified_list
        const allList = [...oldList, ...newList]
        return state.set('inviteList', fromJS(allList))
                    .set('params', fromJS(payload.pagination))
                    .set('residue_degree', fromJS(payload.residue_degree))
    },

    [actions.SET_INVITE_URLMSG]: (state, { payload }) => {
        if (+payload.rescode === 0) {
            return state.set('inviteMsgUrl', payload.dialogMsg)
                        .set('score', payload.score)
                        .set('url', payload.url)
        }
        return state.set('inviteMsgUrl', payload.dialogMsg)
    },

    [actions.SET_LOGOOFF_CUSTOMER]: (state, { payload }) => {
        const cid = payload.cid
        let inviteList = state.get('inviteList')
        inviteList = inviteList.filter(item => item.get('cid') !== cid)
        return state.set('inviteList', inviteList)
    },

    [actions.CLEAR_CLIENT_LIST]: state => {
        return state.set('inviteList', fromJS([]))
    },

    [actions.SET_ADD_CLIENT]: (state, { payload }) => {
        return state.set('inviteList', fromJS(payload.list))
    }
}

export default createReducer(initialState, actionHandlers)
