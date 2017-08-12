import { take, call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import * as serverApi from 'manager/api'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'
import { actions as messageActions } from 'application/controllers/message'

function* getAllTimes() {
    while (true) {
        yield take(actions.GET_ALL_TIMES)
        try {
            yield put(dataLoadingActions.start('获取数据中...'))
            const { data: { timebucket: allTimes } } = yield call(serverApi.getAllTimes)
            yield put(actions.setAllTimes(allTimes))
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* getDetailTimes() {
    while (true) {
        yield take(actions.GET_DETAIL_TIMES)
        try {
            yield put(dataLoadingActions.start('获取数据中...'))
            const { data: { tid: detailTimes } } = yield call(serverApi.getDetailTimes)
            yield put(actions.setDetailTimes(detailTimes))
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* setServiceTime() {
    while (true) {
        const { payload: timebucket } = yield take(actions.SET_SERVICE_TIME)
        try {
            // console.log(timebucket, 'YJF')
            yield put(dataLoadingActions.start('数据提交中...'))
            yield call(serverApi.setServiceTime, timebucket)
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* getUpdateDetailTimes() {
    while (true) {
        const { payload: newDetailTimes } = yield take(actions.GET_UPDATE_DETAIL_TIMES)
        yield put(actions.setUpdateDetailTimes(newDetailTimes))
    }
}

export default function* mainSagas() {
    yield fork(getAllTimes)
    yield fork(getDetailTimes)
    yield fork(setServiceTime)
    yield fork(getUpdateDetailTimes)
}
