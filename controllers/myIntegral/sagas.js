import { take, call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import * as serverApi from 'manager/api'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'
import { actions as messageActions } from 'application/controllers/message'
function* getMyScore() {
    while (true) {
        yield take(actions.GET_MY_SCORE)
        try {
            const { data: { tasks, name, score, avatar } } = yield call(serverApi.getMyScore)
            yield put(actions.setMyScore({ tasks, name, score, avatar }))
        } catch (error) {
            yield put(messageActions.shown(error.msg))
        }
    }
}
function* getScoreTaskList() {
    while (true) {
        yield take(actions.GET_SCORE_TASK_LIST)
        try {
            yield put(dataLoadingActions.start('加载数据中...'))
            const data = yield call(serverApi.getScoreTaskList)
            console.log(data)
             // 将数据放到redux
            yield put(actions.setScoreTaskList(data))
            yield put(dataLoadingActions.done())
        } catch (error) {
            console.log(error)
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* getScoreDetail() {
    while (true) {
        yield take(actions.GET_SCORE_DETAIL)
        try {
            yield put(dataLoadingActions.start('加载数据中...'))
            const data = yield call(serverApi.getScoreDetail)
             // 将数据放到redux
            yield put(actions.setScoreDetail(data))
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}
export default function* mainSaga() {
    yield fork(getScoreTaskList)
    yield fork(getScoreDetail)
    yield fork(getMyScore)
}
