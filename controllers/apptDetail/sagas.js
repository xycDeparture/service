import { take, call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import * as serverApi from 'manager/api'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'
import { actions as messageActions } from 'application/controllers/message'
import { actions as errorActions } from 'application/controllers/error'

function* getSearchService() {
    while (true) {
        // const { payload: { sid: id } } = yield take(actions.GET_SEARCH_SERVICE)
        const { payload } = yield take(actions.GET_SEARCH_SERVICE)
        const { sid: id } = payload
        try {
            yield put(dataLoadingActions.start('获取数据中...'))
            const { data: result } = yield call(serverApi.getSearchService, id)
            yield put(actions.setSearchService(result.result))
            yield put(dataLoadingActions.done())
            // throw new Error(123)
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
            yield put(errorActions.save({ action: actions.GET_SEARCH_SERVICE, payload }))
        }
    }
}
function* getServiceCancelReasonList() {
    while (true) {
        // const { payload: { sid: id } } = yield take(actions.GET_SEARCH_SERVICE)
        yield take(actions.GET_SERVICECANCELREASONLIST)
        try {
            yield put(dataLoadingActions.start('获取数据中...'))
            const { data: result } = yield call(serverApi.getServiceCancelReasonList)
            yield put(actions.setServiceCancelReasonList(result))
            yield put(dataLoadingActions.done())
            // throw new Error(123)
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}
function* commentReply() {
    while (true) {
        const { payload: { evid, reply, id } } = yield take(actions.COMMENT_REPLY)
        try {
            yield put(dataLoadingActions.start('数据提交中...'))
            yield call(serverApi.commentReply, evid, reply)
            const { data: result } = yield call(serverApi.getSearchService, id)
            yield put(actions.setSearchService(result.result))
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown('回复成功'))
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* confirmStatus() {
    while (true) {
        const { payload: id } = yield take(actions.CONFIRM_STATUS)
        try {
            yield put(dataLoadingActions.start('数据提交中...'))
            yield call(serverApi.confirmStatus, id)
            const { data: result } = yield call(serverApi.getSearchService, id)
            yield put(actions.setSearchService(result.result))
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown('确认预约成功'))
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}
function* serviceStatusCancel() {
    while (true) {
        const { payload } = yield take(actions.CANCEL_STATUS)
        try {
            yield put(dataLoadingActions.start('数据提交中...'))
            const { data } = yield call(serverApi.serviceStatusCancel, payload)
            console.log(data)
            if (data.rescode === 0) {
                const { data: result } = yield call(serverApi.getSearchService, payload.sid)
                yield put(actions.setSearchService(result.result))
                // yield put(actions.setServiceStatusCancel())
                yield put(messageActions.shown('取消预约成功'))
            }
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}
function* confirmOverStatus() {
    while (true) {
        const { payload: { id, status } } = yield take(actions.CONFIRM_OVER_STATUS)
        try {
            yield put(dataLoadingActions.start('数据提交中...'))
            yield call(serverApi.confirmOverStatus, id, status)
            const { data: result } = yield call(serverApi.getSearchService, id)
            yield put(actions.setSearchService(result.result))
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown('提交成功'))
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

export default function* mainSagas() {
    yield fork(getSearchService)
    yield fork(commentReply)
    yield fork(confirmStatus)
    yield fork(confirmOverStatus)
    yield fork(getServiceCancelReasonList)
    yield fork(serviceStatusCancel)
}
