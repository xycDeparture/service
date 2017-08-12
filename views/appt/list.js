import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import styles from './list.scss'
import TouchRipple from 'material-ui/internal/TouchRipple'
import classnames from 'classnames'
import { orangeA400, grey500 } from 'material-ui/styles/colors'
import SvgIcon from 'material-ui/SvgIcon'
import produceStars from 'application/utils/produceStars'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import Checkbox from 'material-ui/Checkbox'

export default class ApptList extends React.Component {
    static propTypes = {
        getServiceList: PropTypes.func.isRequired,
        confirmStatus: PropTypes.func.isRequired,
        confirmOverStatus: PropTypes.func.isRequired,
        statusCount: PropTypes.instanceOf(Immutable.Map).isRequired,
        serviceList: PropTypes.instanceOf(Immutable.List).isRequired,
        params: PropTypes.instanceOf(Immutable.Map).isRequired,
        clearServiceList: PropTypes.func.isRequired
    }
    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context)

        this.state = {
            selectIndex: 'unSure',
            status: 0,
            callDailog: false,
            completeDailog: false,
            phoneNum: '',
            completeStatus: 3,
            checked: true,
            unChecked: false,
            completeParams: {},
            noMoreData: '',
            lastScrollHeight: 0,
            listHeight: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            const obj = document.getElementById('apptCont')
            if (!!obj && document.body.scrollTop > this.state.lastScrollHeight + 10) {
                this.state.lastScrollHeight = document.body.scrollTop
                if (obj.scrollHeight - document.body.scrollTop - window.screen.height < 16) {
                    const total = +this.props.params.get('total')
                    const listSize = this.props.serviceList.toJS().length
                    const curPage = +this.props.params.get('page')
                    const nextPage = curPage + 1
                    if (obj.scrollHeight > this.state.listHeight && listSize < total) {
                        this.props.getServiceList({ status: this.state.status, page: nextPage })
                        this.state.listHeight = obj.scrollHeight
                    }
                }
            }
        })
    }

    getCompleteCheck = status => {
        this.setState({
            completeStatus: status
        })
    }


    checkApptDetail = id => {
        this.context.router.push({
            pathname: 'main/apptDetail',
            query: {
                SID: id
            }
        })
    }

    select = index => {
        switch (index) {
            case 'unSure':
                this.setState({
                    selectIndex: 'unSure',
                    status: 0,
                    noMoreData: ''
                })
                this.props.clearServiceList()
                this.props.getServiceList({ status: 0, page: 1 })
                break
            case 'unHandle':
                this.setState({
                    selectIndex: 'unHandle',
                    status: 1,
                    noMoreData: ''
                })
                this.props.clearServiceList()
                this.props.getServiceList({ status: 1, page: 1 })
                break
            case 'all':
                this.setState({
                    selectIndex: 'all',
                    status: 2,
                    noMoreData: ''
                })
                this.props.clearServiceList()
                this.props.getServiceList({ status: 2, page: 1 })
                break
            default:
                break
        }
    }

    checkStatus = (id, status, phone) => {
        const serviceStatus = []
        switch (status) {
            case 0:
                serviceStatus.push(
                    <div className={styles.apptBtn} key={id}>
                        <div className={styles.sureBtn} onClick={() => { this.confirmApptStatus(id) }}>确认预约</div>
                        <div className={styles.contactBtn} onClick={() => { this.callCustomer(phone) }}>联系客户</div>
                    </div>
                )
                break
            case 1:
                serviceStatus.push(
                    <div className={styles.apptBtn} key={id}>
                        <div className={styles.sureBtn} onClick={() => { this.confirmOverStatus(id) }}>确认完成</div>
                        <div className={styles.contactBtn} onClick={() => { this.callCustomer(phone) }}>联系客户</div>
                    </div>
                )
                break
            case 2:
                serviceStatus.push(
                    <div className={styles.apptBtn} key={id}>
                        <div className={styles.contactBtn} onClick={() => { this.callCustomer(phone) }}>联系客户</div>
                    </div>
                )
                break
            case 3:
            case 5:
            case 6:
                serviceStatus.push(
                    <div className={styles.apptBtnComment} key={id}>
                        <div className={styles.commentBtn}>未获评价</div>
                    </div>
                )
                break
            default:
                break
        }
        return serviceStatus
    }

    confirmApptStatus = (id) => {
        const status = this.state.status
        const params = { id, status }
        this.props.confirmStatus(params)
    }

    confirmOverStatus = (id) => {
        const titleStatus = this.state.status
        const params = { id, titleStatus }
        this.setState({
            completeDailog: true,
            completeParams: params
        })
    }

    submitComplete = () => {
        const params = {
            status: this.state.completeStatus,
            ...this.state.completeParams
        }
        this.setState({
            completeDailog: false
        })
        this.props.confirmOverStatus(params)
    }

    callCustomer = phone => {
        this.setState({
            callDailog: true,
            phoneNum: phone
        })
    }

    callDialog = () => {
        window.location.href = `tel:${this.state.phoneNum}`
        this.setState({
            callDailog: false
        })
    }

    hideDialog = () => {
        this.setState({
            callDailog: false,
            completeDailog: false
        })
    }

    render() {
        const activeStyle = {
            unSure: this.state.selectIndex === 'unSure' ? styles.active : '',
            unHandle: this.state.selectIndex === 'unHandle' ? styles.active : '',
            all: this.state.selectIndex === 'all' ? styles.active : ''
        }

        const StarIcon = (props) => (
            <SvgIcon {...props}>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </SvgIcon>
        )

        const HalfStarIcon = (props) => (
            <SvgIcon {...props}>
                <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22
                         9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
                />
            </SvgIcon>
        )

        const starStyle = {
            width: 16,
            height: 16,
            marginTop: 4,
            marginLeft: 2
        }

        const star = <StarIcon color={orangeA400} style={starStyle} />
        const halfStar = <HalfStarIcon color={orangeA400} style={starStyle} />
        const greyStar = <StarIcon color={grey500} style={starStyle} />

        const actions = [
            <RaisedButton label="拨打" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ this.callDialog } />,
            <RaisedButton label="取消" backgroundColor={'#ff9a00'} labelColor={'#fff'} onClick={ this.hideDialog } style={{ marginLeft: 8 }} />
        ]

        const completeActions = [
            <RaisedButton label="提交" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ this.submitComplete } />,
            <RaisedButton label="取消" backgroundColor={'#ff9a00'} labelColor={'#fff'} onClick={ this.hideDialog } style={{ marginLeft: 8 }} />
        ]

        const noData = []
        const titleStatus = this.state.status
        switch (titleStatus) {
            case 0:
                noData.push(<div key={'nodata0'} className={styles.noData}>
                        <div className={styles.tips}>您暂时没有待确认的预约哦~</div>
                    </div>)
                break
            case 1:
                noData.push(<div key={'nodata1'} className={styles.noData}>
                        <div className={styles.tips}>您暂时没有待办理的预约哦</div>
                    </div>)
                break
            case 2:
                noData.push(<div key={'nodata2'} className={styles.noData}>
                        <div className={styles.tips}>您暂时没有任何预约</div>
                        <div className={styles.tipErr}>(仅保留30天内的历史预约，若有其他查询需求，请联系管理员)</div>
                    </div>)
                break
            default:
                break
        }

        return (
            <div>
                <div className={styles.apptTitle}>
                    <div className={classnames(styles.titleItem, activeStyle.unSure)} onClick={() => {this.select('unSure')} }>
                        <div style={{ position: 'relative' }}>
                            <TouchRipple>
                                <div>待确认<span>{this.props.statusCount.get('unconfirmed')}</span></div>
                            </TouchRipple>
                        </div>
                    </div>
                    <div className={classnames(styles.titleItem, activeStyle.unHandle)} onClick={() => {this.select('unHandle')} }>
                        <div style={{ position: 'relative' }}>
                            <TouchRipple>
                                <div>待办理<span>{this.props.statusCount.get('undisposed')}</span></div>
                            </TouchRipple>
                        </div>
                    </div>
                    <div className={classnames(styles.titleItem, activeStyle.all)} onClick={() => {this.select('all')} }>
                        <div style={{ position: 'relative' }}>
                            <TouchRipple>
                                <div>全部<span>{this.props.statusCount.get('all') > 999 ? '999+' : this.props.statusCount.get('all')}</span></div>
                            </TouchRipple>
                        </div>
                    </div>
                </div>
                <div className={styles.apptCont} id="apptCont">
                    {
                    this.props.serviceList.size ?
                    this.props.serviceList.map(item => {
                        return (
                            <div className={styles.apptOne} key={item.get('id')}>
                                <div className={styles.apptImg}>
                                    <img src={item.get('avatar')} />
                                </div>
                                <div className={styles.apptInfos}>
                                    <div className={styles.apptName}>
                                        <span>{item.get('cname')}</span> {item.get('phone')}
                                    </div>
                                    <div className={styles.apptItem}>
                                        <span>服务类型</span> {item.get('service')}
                                    </div>
                                    <div className={styles.apptItem}>
                                        <span>时间</span> {item.get('date')} {item.get('week')} {item.get('time')}
                                    </div>
                                    <div className={styles.apptItem}>
                                        <span>状态</span> {item.get('status_name')}
                                    </div>
                                    {
                                        +item.get('status') === 4 ?
                                        <div className={styles.apptComment}>
                                            <div className={styles.stars}>
                                                {
                                                    produceStars(item.getIn(['evaluation', 'star']) || 1, star, halfStar, greyStar)
                                                }
                                            </div>
                                            <img src={ process.env.NODE_ENV === 'development' ? require('manager/resources/flower.png') :
                                                        item.getIn(['prop', 'img']) }
                                                className={styles.propItem} alt={item.getIn(['prop', 'img']) ? item.getIn(['prop', 'img']) : ''}
                                            />
                                        </div> :
                                        this.checkStatus(+item.get('id'), +item.get('status'), item.get('phone'))
                                    }
                                </div>
                                <div className={styles.apptDetail} onClick={ () => { this.checkApptDetail(item.get('id')) } }></div>
                            </div>
                        )
                    })
                        :
                        <div>
                            {
                                noData
                            }
                        </div>
                    }
                </div>
                <Dialog
                    actions={actions}
                    open={this.state.callDailog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div>
                    <div style={{ textAlign: 'center' }}>
                        {this.state.phoneNum}
                    </div>
                    </div>
                </Dialog>
                <Dialog
                    actions={completeActions}
                    open={this.state.completeDailog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div className={styles.checkBoxCont}>
                        <Checkbox
                            label="已服务"
                            iconStyle={{ fill: '#ff9a00' }}
                            labelStyle= {{ fontSize: 14 }}
                            style={{ marginTop: 5 }}
                            checked={this.state.completeStatus === 3 ? this.state.checked : this.state.unChecked}
                            onCheck={() => { this.getCompleteCheck(3) }}
                        />
                        <Checkbox
                            label="客户未到网点"
                            iconStyle={{ fill: '#ff9a00' }}
                            labelStyle= {{ fontSize: 14 }}
                            style={{ marginTop: 5 }}
                            checked={this.state.completeStatus === 5 ? this.state.checked : this.state.unChecked}
                            onCheck={() => { this.getCompleteCheck(5) }}
                        />
                        <Checkbox
                            label="无法联系客户"
                            iconStyle={{ fill: '#ff9a00' }}
                            labelStyle= {{ fontSize: 14 }}
                            style={{ marginTop: 5 }}
                            checked={this.state.completeStatus === 6 ? this.state.checked : this.state.unChecked}
                            onCheck={() => { this.getCompleteCheck(6) }}
                        />
                    </div>
                </Dialog>
            </div>
        )
    }
}
