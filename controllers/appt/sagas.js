import { take, call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import * as serverApi from 'manager/api'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'
import { actions as messageActions } from 'application/controllers/message'

function* getStatusCount() {
    while (true) {
        yield take(actions.GET_STATUS_COUNT)
        const { data: statusCount } = yield call(serverApi.getStatusCount)
        yield put(actions.setStatusCount(statusCount))
    }
}

function* getServiceList() {
    while (true) {
        const { payload: { status, page } } = yield take(actions.GET_SERVICE_LIST)
        try {
            yield put(dataLoadingActions.start('获取数据中...'))
            const { data: serviceList } = yield call(serverApi.getServiceList, { status, page })
            yield put(actions.setServiceList(serviceList))
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(dataLoadingActions.done())
            if (error.rescode === 1101) {
                yield put(actions.setServiceList([]))
            } else {
                yield put(messageActions.shown(error.msg))
            }
        }
    }
}

function* confirmStatus() {
    while (true) {
        const { payload: { id, status } } = yield take(actions.CONFIRM_STATUS)
        try {
            yield put(dataLoadingActions.start('数据提交中...'))
            yield call(serverApi.confirmStatus, id)
            yield put(actions.setEmptyServiceList({ service_list: [] }))
            const { data: serviceList } = yield call(serverApi.getServiceList, { status, page: 1 })
            yield put(actions.setServiceList(serviceList))
            const { data: statusCount } = yield call(serverApi.getStatusCount)
            yield put(actions.setStatusCount(statusCount))
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown('确认预约成功'))
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* confirmOverStatus() {
    while (true) {
        const { payload: { id, status, titleStatus } } = yield take(actions.CONFIRM_OVER_STATUS)
        try {
            yield put(dataLoadingActions.start('数据提交中...'))
            yield call(serverApi.confirmOverStatus, id, status)
            yield put(actions.setEmptyServiceList({ service_list: [] }))
            const { data: serviceList } = yield call(serverApi.getServiceList, { titleStatus, page: 1 })
            yield put(actions.setServiceList(serviceList))
            const { data: statusCount } = yield call(serverApi.getStatusCount)
            yield put(actions.setStatusCount(statusCount))
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown('提交成功'))
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* clearServiceList() {
    while (true) {
        yield take(actions.CLEAR_SERVICE_LIST)
        yield put(actions.setEmptyServiceList({ service_list: [] }))
    }
}

function* getInitialize() {
    while (true) {
        yield take(actions.GET_INITIALIZE)
        try {
            const { data: initialSet } = yield call(serverApi.getInitialize)
            yield put(actions.setInitialize(initialSet))
        } catch (error) {
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* getManagerParams() {
    while (true) {
        yield take(actions.GET_MANAGER_PARAMS)
        try {
            const { data } = yield call(serverApi.getManagerParams)
            yield put(actions.setManagerParams(data))
        } catch (error) {
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* addManager() {
    while (true) {
        try {
            const { payload } = yield take(actions.ADD_MANAGER)
            if (payload.mobile === '') {
                yield put(messageActions.shown('手机号码不能为空'))
            } else if (!/1[3|4|5|7|8]\d{9}/.test(payload.mobile)) {
                yield put(messageActions.shown('请填写正确的手机号码'))
            } else if (payload.chname === '') {
                yield put(messageActions.shown('姓名不能为空'))
            } else if (payload.post === '') {
                yield put(messageActions.shown('职位不能为空'))
            } else if (payload.services_items === '') {
                yield put(messageActions.shown('服务项目不能为空'))
            } else {
                yield put(dataLoadingActions.start('数据提交中...'))
                const { data } = yield call(serverApi.addManager, payload)
                yield put(dataLoadingActions.done())
                yield put(messageActions.shown(data.msg))
            }
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

export default function* mainSagas() {
    yield fork(getStatusCount)
    yield fork(getServiceList)
    yield fork(confirmStatus)
    yield fork(confirmOverStatus)
    yield fork(clearServiceList)
    yield fork(getInitialize)
    yield fork(getManagerParams)
    yield fork(addManager)
}
