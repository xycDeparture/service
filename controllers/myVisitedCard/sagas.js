import { take, call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import * as serverApi from 'manager/api'
import { actions as dataLoadingActions } from 'application/controllers/dataLoading'
import { actions as messageActions } from 'application/controllers/message'
import { getSignPackage } from 'application/api'

function* getInitialize() {
    while (true) {
        yield take(actions.GET_INITIALIZE)
        try {
            yield put(dataLoadingActions.start('加载数据中...'))
            const { data: initialSet } = yield call(serverApi.getInitialize)
            yield put(actions.setInitialize(initialSet))
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* getCallingCard() {
    while (true) {
        const { payload } = yield take(actions.GET_CALLING_CARD)
        try {
            yield put(dataLoadingActions.start('获取数据中...'))
            const { data: { result } } = yield call(serverApi.getCallingCard, payload)
            yield put(actions.setCallingCard(result))
            const { data: initializeResult } = yield call(serverApi.getInitialize)
            const shareConfig = initializeResult.lang
            const mylink = location.origin + location.pathname + location.hash
            let shareTitle = ''
            let shareDesc = ''
            if (payload.code) {
                shareTitle = shareConfig.share_title
                shareDesc = `${shareConfig.project_name || ''}${result.network}${result.post}${result.name}诚邀您体验预约服务`
            } else {
                shareTitle = `${shareConfig.project_name || ''}${result.name}的名片`
                shareDesc = shareConfig.share_descr
            }
            window.wx.ready(() => {
                const setting = {
                    title: shareTitle, // 分享标题
                    link: mylink, // 分享链接
                    imgUrl: window.location.origin + initializeResult.img.yue_link_img, // 分享图标
                    desc: shareDesc,
                    success: () => {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: () => {
                        // 用户取消分享后执行的回调函数
                    }
                }
                window.wx.hideAllNonBaseMenuItem()
                window.wx.showMenuItems({
                    menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
                })
                window.wx.onMenuShareTimeline(setting)
                window.wx.onMenuShareAppMessage(setting)
                window.wx.onMenuShareQQ(setting)
                window.wx.onMenuShareWeibo(setting)
                window.wx.onMenuShareQZone(setting)
            })
            yield put(dataLoadingActions.done())
        } catch (error) {
            yield put(dataLoadingActions.done())
            yield put(messageActions.shown(error.msg))
        }
    }
}

function* getWxSignPackage() {
    while (true) {
        yield take(actions.GET_SIGN_PACKAGE)
        const { data } = yield call(getSignPackage)
        // console.log('..........', data)
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
    yield fork(getInitialize)
    yield fork(getCallingCard)
    yield fork(getWxSignPackage)
}
