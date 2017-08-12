import { take, call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import * as serverApi from 'manager/api'
import { actions as messageActions } from 'application/controllers/message'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'
import { hashHistory } from 'react-router'
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
function* getBaseInfo() {
    while (true) {
        yield take(actions.GET_BASE_INFO)
        try {
            const { data: { result } } = yield call(serverApi.getBaseInfo)
            yield put(actions.setBaseInfo(result))
        } catch (error) {
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* getIndexCount() {
    while (true) {
        yield take(actions.GET_INDEX_COUNT)
        try {
            const { data: { result } } = yield call(serverApi.getIndexCount)
            const yueLoginLoading = window.sessionStorage.getItem('yueLoginLoading')
            if (!yueLoginLoading) {
                yield call(delay, 4000)
                window.sessionStorage.setItem('yueLoginLoading', 1)
            }
            yield put(actions.setIndexCount(result))
        } catch (error) {
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* logout() {
    while (true) {
        yield take(actions.LOGOUT)
        yield put(dataLoadingActions.start('正在退出'))
        try {
            const { data } = yield call(serverApi.logout)
            console.log(data)
            // 防止安卓卡机
            yield call(() => new Promise(resolve => setTimeout(() => resolve(), 1000)))
            if (data.rescode === 0) {
                hashHistory.replace({
                    pathname: '/login',
                    query: { isAgain: 1 }
                })
            }
        } catch (error) {
            yield put(messageActions.shown(error.msg, 2000))
        }
        yield put(dataLoadingActions.done())
    }
}
export default function* mainSagas() {
    yield fork(getBaseInfo)
    yield fork(getIndexCount)
    yield fork(logout)
}
