import { take, call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import * as serverApi from 'manager/api'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'
import { actions as messageActions } from 'application/controllers/message'

function* getInviteList() {
    while (true) {
        const { payload: { page } } = yield take(actions.GET_INVITE_LIST)
        try {
            yield put(dataLoadingActions.start('获取数据中...'))
            const { data } = yield call(serverApi.getInviteList, page)
            yield put(actions.setInviteList(data))
            yield put(dataLoadingActions.done())
        } catch (error) {
            console.log(error)
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* getInviteUrl() {
    while (true) {
        const { payload: callBack } = yield take(actions.GET_INVITE_URL)
        try {
            yield put(dataLoadingActions.start('请稍后'))
            const { data } = yield call(serverApi.getInviteUrl)
            if (callBack && data.rescode === 0) {
                yield put(messageActions.shown('生成邀约码成功'))
                setTimeout(() => {
                    callBack(data.code)
                }, 1000)
            }
            // const { data: { list, pagination } } = yield call(serverApi.getInviteList, 1)
            // yield put(actions.setAddClient({ list, pagination }))
            // yield put(actions.setInviteUrlMsg({ dialogMsg: '', score, url, rescode }))
            yield put(dataLoadingActions.done())
        } catch ({ msg, rescode }) {
            yield put(dataLoadingActions.done())
            yield put(actions.setInviteUrlMsg({ dialogMsg: msg, rescode }))
        }
    }
}

function* getLogoOffCustomer() {
    while (true) {
        const { payload: inviteId } = yield take(actions.GET_LOGOOFF_CUSTOMER)
        try {
            yield put(dataLoadingActions.start('请稍后'))
            yield call(serverApi.getLogoOffCustomer, inviteId)
            yield put(actions.setLogoOffCustomer({ inviteId }))
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

export default function* mainSagas() {
    yield fork(getInviteList)
    yield fork(getInviteUrl)
    yield fork(getLogoOffCustomer)
}
