import AppComp from '../controllers/app'
import MainComp from '../controllers/main'
import MyClientComp from '../controllers/myClients'
import MyClientsExclusiveComp from '../controllers/myClients/exclusive'
import MyClientsCollectComp from '../controllers/myClients/collect'
import ClientAddComp from '../controllers/clientAdd'
import OrderRecordsComp from '../controllers/orderRecords'
import UpdateInfosComp from '../controllers/updateInfos'
import MyIntegralComp from '../controllers/myIntegral'
import MyIntegralDetailComp from '../controllers/myIntegral/detail.js'
import MyIntegralRuleComp from '../controllers/myIntegral/rule.js'
import MytimeComp from '../controllers/mytime'
import NetWorkTimeComp from '../controllers/netWorkTime'
import integralDetailComp from '../controllers/integralDetail'
import apptComp from '../controllers/appt'
import BookDealComp from '../controllers/appt/bookdeal'
import ManagerAdd from '../controllers/appt/managerAdd'
import MyVisitedCardComp from '../controllers/myVisitedCard'
import MyCardComp from '../controllers/myVisitedCard/mycard'
import managerLoginComp from 'application/controllers/managerLogin'
import clientDetailComp from '../controllers/clientDetail'
import apptDetailComp from '../controllers/apptDetail'

export default [{
    path: '/',
    component: AppComp,
    childRoutes: [{
        path: 'main',
        childRoutes: [{
            path: 'index',
            component: MainComp
        }, {
            path: 'myClients',
            childRoutes: [{
                path: 'index',
                component: MyClientComp
            }, {
                path: 'exclusive',
                component: MyClientsExclusiveComp
            }, {
                path: 'collect',
                component: MyClientsCollectComp
            }]
        }, {
            path: 'clientAdd',
            component: ClientAddComp
        }, {
            path: 'orderRecords',
            component: OrderRecordsComp
        }, {
            path: 'updateInfos',
            component: UpdateInfosComp
        }, {
            path: 'myIntegral',
            childRoutes: [{
                path: 'index',
                component: MyIntegralComp
            }, {
                path: 'rule',
                component: MyIntegralRuleComp
            }, {
                path: 'detail',
                component: MyIntegralDetailComp
            }]
        }, {
            path: 'mytime',
            component: MytimeComp
        }, {
            path: 'netWorkTime',
            component: NetWorkTimeComp
        }, {
            path: 'integralDetail',
            component: integralDetailComp
        }, {
            path: 'appt',
            childRoutes: [{
                path: 'index',
                component: apptComp
                // 我的预约
            }, {
                path: 'deal',
                component: BookDealComp
                // 预约处理
            }, {
                path: 'add',
                component: ManagerAdd
                // 客户经理添加
            }, {
                path: 'collect',
                component: MyClientsCollectComp
            }]
        }, {
            path: 'myVisitedCard',
            childRoutes: [{
                path: 'index',
                component: MyVisitedCardComp
                // 我的名片
            }]
        }, {
            path: 'clientDetail',
            component: clientDetailComp
        }, {
            path: 'apptDetail',
            component: apptDetailComp
        }]
    }] }, {
        path: 'main/myVisitedCard/mycard',
        component: MyCardComp
        // 名片信息
    }, {
        path: 'login',
        component: managerLoginComp
    }]
