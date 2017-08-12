import { take, call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import * as serverApi from 'manager/api'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'
import { actions as messageActions } from 'application/controllers/message'
import { getSignPackage } from 'application/api'

function* getBaseInfo() {
    while (true) {
        yield take(actions.GET_BASE_INFO)
        try {
            const { data: { result } } = yield call(serverApi.getBaseInfo)
            const { data } = yield call(serverApi.getInviteCount)
            result.invite_count = data.invite_count
            yield put(actions.setBaseInfo(result))
        } catch (error) {
            console.error(error)
            yield put(messageActions.shown(error.msg))
        }
    }
}
function* getInitialize() {
    while (true) {
        yield take(actions.GET_INITIALIZE)
        try {
            yield put(dataLoadingActions.start('加载数据中...'))
            const { data: initialSet } = yield call(serverApi.getInitialize)
            yield put(actions.setInitialize(initialSet))
            yield put(dataLoadingActions.done())
        } catch (error) {
            console.log(error)
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* getWxSignPackage() {
    while (true) {
        yield take(actions.GET_SIGN_PACKAGE)
        const { data } = yield call(getSignPackage)
        window.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'hideAllNonBaseMenuItem',
                'showMenuItems'
            ]
        })
    }
}
export default function* mainSagas() {
    yield fork(getBaseInfo)
    yield fork(getInitialize)
    yield fork(getWxSignPackage)
}
