import { makeRequest } from 'application/utils/restApi'

/* 首页获取客户经理详细信息 */
export function getBaseInfo() {
    return makeRequest({
        url: '/manager/get-base-info'
    })
}

/* 专属客户*/
export function getPrivateCustomers(page) {
    return makeRequest({
        url: '/manager/private-customer-list',
        data: {
            page
        }
    })
}
/* 收藏客户列表*/
export function getCollectList(page) {
    return makeRequest({
        url: '/manager/collect-list',
        data: {
            page
        }
    })
}
/* 获取客户详情 */
export function getCustomerInfo(cid) {
    return makeRequest({
        url: '/manager/customer-info',
        method: 'post',
        data: {
            cid
        }
    })
}

/* 邀约客户数 */
export function getInviteList(page) {
    return makeRequest({
        url: '/manager/invite-list',
        data: {
            page
        }
    })
}

/* 生成邀约url */
export function getInviteUrl() {
    return makeRequest({
        url: '/manager/get-invite-url'
    })
}

/* 取消邀约 */
export function getLogoOffCustomer(inviteId) {
    return makeRequest({
        url: '/manager/logoff-customer',
        method: 'post',
        data: {
            inviteId
        }
    })
}

/* 我的积分 */
export function getMyScore() {
    return makeRequest({
        url: '/manager/score-task'
    })
}
/* 我的积分规则 */
export function getScoreTaskList() {
    return makeRequest({
        url: '/manager/score-task'
    })
}
/* 积分详情 */
export function getScoreDetail(page) {
    return makeRequest({
        url: '/manager/score-detail',
        data: {
            page
        }
    })
}

/* 获取经理资料 */
export function getIntroModules() {
    return makeRequest({
        url: '/manager/get-intro-modules'
    })
}

/* 编辑经理资料 */
export function getEditIntro(data) {
    return makeRequest({
        url: '/manager/edit-intro',
        method: 'post',
        data: { ...data }
    })
}

/* 获取经理服务详细时间 */
export function getDetailTimes() {
    return makeRequest({
        url: '/manager/get-detail-times'
    })
}

/* 所有详细时间段 */
export function getAllTimes() {
    return makeRequest({
        url: '/manager/get-all-timebucket'
    })
}

/* 设置服务时间段 */
export function setServiceTime(detailTime) {
    return makeRequest({
        url: '/manager/set-service-time',
        method: 'post',
        data: {
            timebucket: detailTime
        }
    })
}

/* 获取经理服务详细时间 */
export function getNetWorkTimebuckets() {
    return makeRequest({
        url: '/manager/get-network-timebuckets'
    })
}

/* 所有详细时间段 */
export function getAllTimes2() {
    return makeRequest({
        url: '/manager/get-all-timebucket'
    })
}

/* 设置服务时间段 */
export function setNetWorkTimebucket(detailTime) {
    return makeRequest({
        url: '/manager/set-network-timebucket',
        method: 'post',
        data: {
            timebucket: detailTime
        }
    })
}
export function getInitialize() {
    return makeRequest({
        url: '/index/initialize'
    })
}

/* 获取预约列表 Start*/
export function getServiceList({ status = 1, page = 1 }) {
    return makeRequest({
        url: '/service/get-service-list',
        data: {
            status,
            page
        }
    })
}

export function getStatusCount() {
    return makeRequest({
        url: '/service/status-count'
    })
}

/* 查看预约单 详细信息 */
export function getSearchService(id) {
    return makeRequest({
        url: '/service/search-service',
        method: 'post',
        data: {
            sid: id
        }
    })
}

/* 预约列表确认预约状态 */
export function confirmStatus(id) {
    return makeRequest({
        url: '/service/status-confirm',
        method: 'post',
        data: {
            sid: id
        }
    })
}

/* 预约列表确认完成状态 */
export function confirmOverStatus(id, status) {
    return makeRequest({
        url: '/service/status-complete',
        method: 'post',
        data: {
            sid: id,
            status
        }
    })
}

/* 预约回复 */
export function commentReply(evid, reply) {
    return makeRequest({
        url: '/comment/reply',
        method: 'post',
        data: {
            evid,
            reply
        }
    })
}
/* 获取预约列表 End*/


/* 我的名片 */
export function getCallingCard(data) {
    return makeRequest({
        url: '/manager/calling-card',
        method: 'get',
        data: { invite_code: data.code, mid: data.mid }
    })
}

// 退出登录
export function logout() {
    return makeRequest({
        url: '/index/login-by-mobile'
    })
}
// 获取首页信息
export function getIndexCount() {
    return makeRequest({
        url: '/manager/get-index-count'
    })
}

// 收藏客户
export function collectCustomer(data) {
    return makeRequest({
        data,
        method: 'post',
        url: '/manager/collect-customer'
    })
}
// 收藏客户
export function cancelCustomer(data) {
    return makeRequest({
        data,
        method: 'post',
        url: '/manager/cancel-collect'
    })
}

// 备注收藏客户
export function remarkCollection(data) {
    return makeRequest({
        method: 'post',
        data: {
            ...data
        },
        url: '/manager/remark-collection'
    })
}
// 获取邀约人数
export function getInviteCount() {
    return makeRequest({
        url: '/manager/get-invite-count'
    })
}
// 经理对客户留言
export function commentLeaveMessage(data) {
    return makeRequest({
        method: 'post',
        data: {
            ...data
        },
        url: '/comment/leave-message'
    })
}
// 可选取消预约原因
export function getServiceCancelReasonList() {
    return makeRequest({
        url: '/service/cancel-reason-list'
    })
}
// 取消预约
export function serviceStatusCancel(data) {
    return makeRequest({
        method: 'post',
        data,
        url: '/service/status-cancel'
    })
}

// 获取添加经理所需参数
export function getManagerParams() {
    return makeRequest({
        method: 'get',
        url: '/manager/add-manager-params'
    })
}

// 添加经理
export function addManager(data) {
    return makeRequest({
        method: 'post',
        data,
        url: '/manager/add-manager'
    })
}
