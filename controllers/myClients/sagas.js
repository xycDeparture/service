import { take, call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import * as serverApi from 'manager/api'
import { actions as messageActions } from 'application/controllers/message'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'

function* getPrivateCustomers() {
    while (true) {
        const { payload: { page } } = yield take(actions.GET_PRIVATE_CUSTOMERS)
        try {
            yield put(dataLoadingActions.start('获取数据中...'))
            const { data: { list, pagination } } = yield call(serverApi.getPrivateCustomers, page)
            yield put(actions.setPrivateCustomers({ list, pagination }))
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}
function* getCollectList() {
    while (true) {
        const { payload: { page } } = yield take(actions.GET_COLLECT_LIST)
        try {
            yield put(dataLoadingActions.start('获取数据中...'))
            const { data: { list, pagination } } = yield call(serverApi.getCollectList, page)
            yield put(actions.setCollectList({ list, pagination }))
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(messageActions.shown(error.msg))
            yield put(dataLoadingActions.done())
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
            yield put(actions.setremarkCollection(payload))
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown('备注成功'))
        } catch (error) {
            console.log(error)
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}
export default function* mainSaga() {
    yield fork(getPrivateCustomers)
    yield fork(getCollectList)
    yield fork(remarkCollection)
}
