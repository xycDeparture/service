import { take, call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import * as serverApi from 'manager/api'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'
import { actions as messageActions } from 'application/controllers/message'
import { actions as errorActions } from 'application/controllers/error'

function* getCustomerInfo() {
    while (true) {
        const { payload: { Cid } } = yield take(actions.GET_CUSTOMER_INFO)
        try {
            yield put(dataLoadingActions.start('获取数据中...'))
            const { data: { result } } = yield call(serverApi.getCustomerInfo, Cid)
            yield put(actions.setCustomerInfo({ result }))
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(messageActions.shown(error.msg))
            yield put(dataLoadingActions.done())
            yield put(errorActions.save({ action: actions.GET_CUSTOMER_INFO, payload: { Cid } }))
        }
    }
}
function* collectCustomer() {
    while (true) {
        const { payload } = yield take(actions.COLLECT_CUSTOMER)
        try {
            yield put(dataLoadingActions.start('正在提交...'))
            const { callBack } = payload
            const data = yield call(serverApi.collectCustomer, { cid: payload.cid })
            yield put(messageActions.shown(data.data.msg))
            setTimeout(() => {
                if (callBack) {
                    callBack()
                }
            }, 1000)
            yield put(dataLoadingActions.done())
        } catch (error) {
            console.log(error)
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}
function* cancelCustomer() {
    while (true) {
        const { payload } = yield take(actions.CANCEL_CUSTOMER)
        try {
            yield put(dataLoadingActions.start('正在提交...'))
            const { callBack } = payload
            const data = yield call(serverApi.cancelCustomer, { coid: payload.coid })
            yield put(messageActions.shown(data.data.msg))
            setTimeout(() => {
                if (callBack) {
                    callBack()
                }
            }, 1000)
            yield put(dataLoadingActions.done())
        } catch (error) {
            console.log(error)
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}
function* remarkCollection() {
    while (true) {
        const { payload } = yield take(actions.REMARK_COLLECTION)
        try {
            yield put(dataLoadingActions.start('正在提交...'))
            const data = yield call(serverApi.remarkCollection, payload)
            console.log(data)
            yield put(actions.updateRemarkCollection(payload))
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown('备注成功'))
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}
export default function* mainSagas() {
    yield fork(getCustomerInfo)
    yield fork(collectCustomer)
    yield fork(cancelCustomer)
    yield fork(remarkCollection)
}
