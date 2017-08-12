import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import styles from './list.scss'
import { orangeA400, grey500 } from 'material-ui/styles/colors'
import SvgIcon from 'material-ui/SvgIcon'
import produceStars from 'application/utils/produceStars'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'manager/components/TextField'
import Checkbox from 'material-ui/Checkbox'
import handleImgOnError from 'application/utils/handleImgOnError'
export default class ApptDetailList extends React.Component {
    static propTypes = {
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired,
        serviceDetails: PropTypes.instanceOf(Immutable.Map).isRequired,
        commentReply: PropTypes.func.isRequired,
        confirmStatus: PropTypes.func.isRequired,
        confirmOverStatus: PropTypes.func.isRequired,
        commentNum: PropTypes.string.isRequired,
        location: PropTypes.object,
        cancelReasonList: PropTypes.any,
        serviceStatusCancel: PropTypes.func.isRequired,
        getInitialize: PropTypes.func.isRequired,
        baseInfo: PropTypes.any
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        message: PropTypes.func.isRequired
    }
    constructor(props, context) {
        super(props, context)

        this.state = {
            id: '',
            evid: '',
            replyDialog: false,
            replyCont: '',
            callDailog: false,
            phoneNum: '',
            completeDailog: false,
            completeStatus: 3,
            checked: true,
            unChecked: false,
            moreNumsVisible: false,
            cancleDialog: false
        }
    }


    componentDidMount() {
        if (!this.props.commentNum) {
            this.props.getInitialize()
        }
    }

    getCompleteCheck = status => {
        this.setState({
            completeStatus: status
        })
    }

    getReplyCont = (event) => {
        const replyCont = event.target.value
        const commentNum = +this.props.commentNum
        let moreNums = false
        if (replyCont.length > commentNum) {
            moreNums = true
        }
        this.setState({
            moreNumsVisible: moreNums,
            replyCont
        })
    }

    replySubmit = () => {
        if (this.state.replyCont === '') {
            this.context.message('请输入您想回复的内容')
            return
        }
        this.setState({
            replyDialog: false,
            replyCont: ''
        })
        const params = { evid: this.props.serviceDetails.get('evid'), reply: this.state.replyCont, id: this.props.location.query.SID }
        this.props.commentReply(params)
    }

    hideDialog = () => {
        this.setState({
            replyDialog: false,
            callDailog: false,
            completeDailog: false,
            cancleDialog: false
        })
    }

    commentReply = (evid, id) => {
        this.setState({
            evid,
            id,
            replyDialog: true
        })
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

    confirmApptStatus = id => {
        console.log(id)
        this.props.confirmStatus(this.props.location.query.SID)
    }
    showCancelDialog = () => {
        this.setState({
            cancleDialog: true,
            completeStatus: this.props.cancelReasonList.get(0)
        })
    }
    confirmOverStatus = id => {
        this.setState({
            id,
            completeDailog: true
        })
    }

    submitCancel = () => {
        const params = {
            reason: this.state.completeStatus,
            sid: this.props.location.query.SID
        }
        this.setState({
            cancleDialog: false
        })
        this.props.serviceStatusCancel(params)
    }
    submitComplete = () => {
        const params = {
            status: this.state.completeStatus,
            id: this.props.location.query.SID
        }
        this.setState({
            completeDailog: false
        })
        this.props.confirmOverStatus(params)
    }
    handleImgErorr = (event) => {
        event.target.src = require('manager/resources/flower.png')
    }
    render() {
        const serviceDetails = this.props.serviceDetails
        const statusCode = +serviceDetails.get('status')
        const evaluation = serviceDetails.get('reply') || -1
        let isReply = null
        let evid = ''
        if (evaluation !== -1) {
            isReply = evaluation.get('reply') || null
            evid = serviceDetails.get('evid')
        }
        let infoStatus = null
        switch (statusCode) {
            case 0:
                infoStatus = (
                    <div className={styles.infoBtn}>
                        <div className={styles.sureBtn} onClick={() => { this.confirmApptStatus(serviceDetails.get('id')) }}>确认预约</div>
                        <div className={styles.cancelBtn}
                            onClick={() => { this.showCancelDialog(serviceDetails.get('id')) }}
                        >取消预约</div>
                        <div className={styles.contactBtn} onClick={() => { this.callCustomer(serviceDetails.get('customer_moblie')) }}>联系客户</div>
                    </div>)
                break
            case 1:
                infoStatus = (
                    <div className={styles.infoBtn}>
                        <div className={styles.sureBtn}
                            onClick={() => { this.confirmOverStatus(serviceDetails.get('id')) }}
                        >确认完成</div>
                        <div className={styles.cancelBtn}
                            onClick={() => { this.showCancelDialog(serviceDetails.get('id')) }}
                        >取消预约</div>
                        <div className={styles.contactBtn} onClick={() => { this.callCustomer(serviceDetails.get('customer_moblie')) }}>联系客户</div>
                    </div>)
                break
            case 2:
                infoStatus = (
                    <div className={styles.infoBtn}>
                        <div className={styles.contactBtn} onClick={() => { this.callCustomer(serviceDetails.get('customer_moblie')) }}>联系客户</div>
                    </div>)
                break
            case 3:
                infoStatus = (
                    <div className={styles.infoBtn}>
                        <div className={styles.commentBtn}>未获评价</div>
                    </div>)
                break
            case 4:
                if (isReply === null) {
                    infoStatus = (
                        <div className={styles.infoBtn}>
                            <div className={styles.replyBtn} onClick={() => {this.commentReply(evid, serviceDetails.get('id'))}}>回复</div>
                        </div>)
                }
                break
            default:
                break
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
            <RaisedButton label="确定" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ this.replySubmit } />,
            <RaisedButton label="取消" backgroundColor={'#ff9a00'} labelColor={'#fff'} onClick={ this.hideDialog } style={{ marginLeft: 8 }} />
        ]

        const callActions = [
            <RaisedButton label="拨打" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ this.callDialog } />,
            <RaisedButton label="取消" backgroundColor={'#ff9a00'} labelColor={'#fff'} onClick={ this.hideDialog } style={{ marginLeft: 8 }} />
        ]

        const cancelActions = [
            <RaisedButton label="提交" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ this.submitCancel } />,
            <RaisedButton label="取消" backgroundColor={'#ff9a00'} labelColor={'#fff'} onClick={ this.hideDialog } style={{ marginLeft: 8 }} />
        ]
        const completeActions = [
            <RaisedButton label="确认" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ this.submitComplete } />,
            <RaisedButton label="取消" backgroundColor={'#ff9a00'} labelColor={'#fff'} onClick={ this.hideDialog } style={{ marginLeft: 8 }} />
        ]

        const multiLineBool = true
//      const demoImg = require('manager/resources/demo.jpg')
        const prop = serviceDetails.get('prop')
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <img src={ serviceDetails.get('manager_avatar') }
                        onError={event => {handleImgOnError(event, this.props.initialize)}}
                    />
                    <div>
                        <div className={styles.name}>姓名：{serviceDetails.get('manager_name')}</div>
                        <div className={styles.phone}>{serviceDetails.get('manager_mobile')}</div>
                    </div>
                </div>
                <div className={styles.infos}>
                    <div className={styles.infoDetail}>
                        <div className={styles.infoItem}>
                            <div className={styles.itemName}>服务单号:</div>{serviceDetails.get('serial')}
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.itemName}>预约时间:</div>{serviceDetails.get('date')}&nbsp;{serviceDetails.get('week')}
                            &nbsp;{serviceDetails.get('time')}
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.itemName}>服务类型:</div>
                            <div className={styles.itemPostscript}>
                            {serviceDetails.get('service_type')}
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.itemName}>姓&emsp;&emsp;名:</div>{serviceDetails.get('customer_name')}
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.itemName}>联系方式:</div>{serviceDetails.get('customer_moblie')}
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.itemName}>电话联系:</div>{+serviceDetails.get('need_callback') === 1 ? '需要' : '不需要'}
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.itemName}>附&emsp;&emsp;言:</div>
                            <div className={styles.itemPostscript}>{serviceDetails.get('postscript')}</div>
                        </div>
                    </div>
                    <div className={styles.infoStatus}>
                        <div className={styles.statusName}>预约状态:</div>
                        <div className={styles.statusInfo}>{serviceDetails.get('status_name')}</div>
                    </div>
                </div>
                <div className={styles.myinfos} style={{ display: serviceDetails.get('star') || prop ? 'block' : 'none' }}>
                    {
                        prop ?
                        <div className={styles.proPanel}>
                            <span className={styles.proText}>客户打赏：</span>
                            <span className={styles.infoImg}>
                            <img className={styles.propImg} src={ process.env.NODE_ENV === 'development' ?
                                `http://manager.yue.com${prop.get('image')}` : prop.get('image')}
                                onError={this.handleImgErorr}
                            />
                            </span>
                        </div> : ''
                    }
                    <div className={styles.infoBottom} style={{ display: serviceDetails.get('star') ? 'block' : 'none' }}>
                        <span className={styles.statusName}>服务评分：</span>
                        <span className={styles.infoStar}>{produceStars(serviceDetails.get('star'), star, halfStar, greyStar)}</span>
                    </div>
                    <div className={styles.infoBottom} style={{ display: serviceDetails.get('comment') ? 'block' : 'none' }}>
                        <span className={styles.statusName}>服务评价：</span>
                        <span className={styles.infoSevice}> {serviceDetails.get('comment')}</span>
                    </div>
                    <div className={styles.reply_list}>
                        {
                            serviceDetails.get('reply') ? serviceDetails.get('reply').map((item, key) => {
                                return +item.get('replyer') === 1 ? <div key={key} className={styles.reply_list_item}>
                                    <div className={styles.manager_text}>回复：
                                        <span>{item.get('message')}</span>
                                    </div>
                                </div> :
                                <div key={key} className={styles.reply_list_item}>
                                    <div className={styles.customer_text}>客户：
                                        <span>{item.get('message')}</span>
                                    </div>
                                </div>
                            }
                            ) : ''
                        }
                    </div>
                </div>
                {
                    infoStatus
                }
                <Dialog
                    actions={callActions}
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
                    actions={actions}
                    open={this.state.replyDialog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div>
                        <TextField
                            hintText="请输入您想回复的内容..."
                            multiLine={multiLineBool}
                            rows={4}
                            hintStyle={{ top: 12 }}
                            style={{ width: '100%', fontSize: 14 }}
                            underlineFocusStyle={{ borderColor: '#2196f3' }}
                            onChange={this.getReplyCont}
                            value={this.state.replyCont}
                            maxLength={10}
                        />
                        <div className={styles.replyTips}>
                            {
                                this.state.moreNumsVisible ? <div className={styles.errTips}>输入超过{this.props.commentNum}字</div> : ''
                            }
                            <div className={styles.replyNum}><span>{this.state.replyCont.length}</span>/{this.props.commentNum}</div>
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    actions={cancelActions}
                    open={this.state.cancleDialog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div className={styles.checkBoxCont}>
                        { this.props.cancelReasonList.size > 0 ? (
                            this.props.cancelReasonList.map((item, index) =>
                                <Checkbox
                                    key={index}
                                    label={item}
                                    iconStyle={{ fill: '#ff9a00' }}
                                    labelStyle= {{ fontSize: 14 }}
                                    style={{ marginTop: 5 }}
                                    checked={this.state.completeStatus === item ? this.state.checked : this.state.unChecked}
                                    onCheck={() => { this.getCompleteCheck(item) }}
                                />
                                )
                            ) : ''}
                    </div>
                </Dialog>
                <Dialog
                    actions={completeActions}
                    open={this.state.completeDailog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div className={styles.checkBoxCont}>
                        <p className={styles.text_sure}>确认完成此次预约？</p>
                    </div>
                </Dialog>
            </div>
        )
    }
}
