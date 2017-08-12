import { take, call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import * as serverApi from 'manager/api'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'
import { actions as messageActions } from 'application/controllers/message'

function* getScoreDetail() {
    while (true) {
        const { payload: { page } } = yield take(actions.GET_SCORE_DETAIL)
        try {
            yield put(dataLoadingActions.start('获取数据中...'))
            const { data: { list, score, pagination } } = yield call(serverApi.getScoreDetail, page)
            yield put(actions.setScoreDetail({ list, score, pagination }))
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

export default function* mainSagas() {
    yield fork(getScoreDetail)
}
