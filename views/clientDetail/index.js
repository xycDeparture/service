import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import classnames from 'classnames'
import styles from './styles.scss'
import TextField from 'manager/components/TextField'
import handleImgOnError from 'application/utils/handleImgOnError'
export default class ClientDetailView extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired,
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
        getCustomerInfo: PropTypes.func,
        collectCustomer: PropTypes.func,
        cancelCustomer: PropTypes.func,
        commentNum: PropTypes.any,
        remarkCollection: PropTypes.func,
        location: PropTypes.object
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }
    state = {
        postscript: '',
        replyCont: '',
        showDailog: false,
        mobileDialog: false,
        remarkDialog: false
    }
    getReplyCont = event => {
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
    callCustomre(phone) {
        window.location.href = `tel:${phone}`
    }
    showDialogCollect() {
        this.setState({
            showDailog: true
        })
    }
    showDialogCall() {
        this.setState({
            mobileDialog: true
        })
    }
    hideDialog() {
        this.setState({
            showDailog: false
        })
    }
    hideMobileDialog() {
        this.setState({
            mobileDialog: false
        })
    }
    handleClickCustomer(baseInfo) {
        const cid = this.props.location.query.Cid
        const callBack = () => {
            this.props.getCustomerInfo({ Cid: cid })
        }
        if (baseInfo.get('coid')) {
            this.props.cancelCustomer({ coid: baseInfo.get('coid'), callBack })
        } else {
            this.props.collectCustomer({ cid, callBack })
        }
        this.setState({
            showDailog: false
        })
    }

    remarkSubmit = () => {
        this.props.remarkCollection({
            coid: this.state.currentId,
            remark: this.state.replyCont
        })
        this.setState({
            remarkDialog: false
        })
    }
    showRemarkDialog = (id, msg) => {
        console.log(msg)
        this.setState({
            remarkDialog: true,
            currentId: id,
            replyCont: msg || ''
        })
    }
    hideRemarkDialog = () => {
        this.setState({
            remarkDialog: false
        })
    }
    render() {
        const baseInfo = this.props.componentModel.get('clientInfo')
        const MobileActions = [
            <RaisedButton label="立即拨打" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ () => this.callCustomre(baseInfo.get('mobile')) } />,
            <RaisedButton label="取消" backgroundColor={'#ff9a00'} labelColor={'#fff'} onClick={ () => this.hideMobileDialog() } style={{ marginLeft: 8 }} />
        ]
        const actions = [
            <RaisedButton label="确定" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ () => this.handleClickCustomer(baseInfo) } />,
            <RaisedButton label="取消" backgroundColor={'#ff9a00'} labelColor={'#fff'} onClick={ () => this.hideDialog() } style={{ marginLeft: 8 }} />
        ]
        const remarkActions = [
            <RaisedButton label="确定" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ () => this.remarkSubmit(baseInfo) } />,
            <RaisedButton label="取消" backgroundColor={'#ff9a00'} labelColor={'#fff'} onClick={ () => this.hideRemarkDialog() } style={{ marginLeft: 8 }} />
        ]
        return (
            <div className={styles.main}>
                <div className={styles.personInfo} style={{ zoom: this.props.baseInfo.get('zoom') }}>
                        <div className={styles.more} onClick={() => {this.showDialogCollect()}}>
                            <i className={classnames(styles.icon_sm, styles.icon_heart)}></i>
                            {!!baseInfo.get('coid') ? '已收藏' : '收藏'}
                        </div>
                    <div className={styles.personImg}>
                        <img src={ baseInfo.get('avatar') }
                            onError={event => {handleImgOnError(event, this.props.initialize)}}
                        />
                    </div>
                    <div className={styles.infos}>
                        <div className={styles.name}>
                            <span className={styles.name_detail}>{baseInfo.get('nickname')}</span>
                            <span className={styles.text_sm}>
                                <i className={styles.icon_phone}></i>{baseInfo.get('mobile')}
                            </span>
                        </div>
                        <div className={styles.infos_panel}>
                            <span hidden={baseInfo.get('corp_logo')} >
                                <i className={styles.icon_member}></i>
                                <span className={styles.text_orange}>
                                {
                                    baseInfo.get('ctype') ?
                                    baseInfo.get('ctype').map((item, index) => {
                                        return (
                                            <b key={index}>{item} </b>
                                        )
                                    }) : ''
                                }
                                </span>
                            </span>
                            <span hidden={!baseInfo.get('corp_logo')}>
                                <img src={baseInfo.get('corp_logo')} className={styles.post_logo} hidden />
                            </span>
                            <span>
                                &ensp;预约次数: <b className={styles.text_orange}>{baseInfo.get('count')}</b>
                            </span>
                        </div>
                        {
                            baseInfo.get('invitation_manager') ?
                            <div className={styles.infos_panel}>
                                <span>邀约人：{baseInfo.get('invitation_manager')}</span>
                            </div> : ''
                        }
                        {
                            baseInfo.get('corp_logo') ? <div className={styles.infos_panel}>
                                <img src={baseInfo.get('corp_logo')} className={styles.post_logo} hidden />
                                <span style={{ color: '#000' }}>{baseInfo.get('corp_name')}</span>
                            </div> : ''
                        }
                    </div>
                </div>
                <div className={styles.detail_panel}>
                    <div className={styles.company}>所在公司</div>
                    <div className={styles.companyName}>{baseInfo.get('corp_name')}</div>
                    <div className={styles.position}>工作职位</div>
                    <div className={styles.companyName}>{baseInfo.get('corp_position')}</div>
                    <div className={styles.product}>感兴趣的理财产品</div>
                    <div className={styles.productName}>
                        {
                            baseInfo.get('uproduct') ?
                            baseInfo.get('uproduct').map((item, index) => {
                                return (
                                    <span key={index} className={styles.product_item}>{item} </span>
                                )
                            }) : ''
                        }
                    </div>
                </div>
                <div className={styles.remark_panel}
                    style={{ display: this.props.location.query.isCollect ? 'block' : 'none' }}
                >
                    <label>备注：
                    <span>{baseInfo.get('remark')}</span>
                    <i className={classnames(styles.icon_sm, styles.icon_edit)}
                        onClick={() => this.showRemarkDialog(baseInfo.get('coid'), baseInfo.get('remark'))}
                    ></i>
                    </label>
                </div>
                <div style={{ padding: 16 }}>
                    <RaisedButton label="立即联系" primary fullWidth onClick={() => this.showDialogCall()} style={{ height: 44 }} />
                </div>
                <Dialog actions={MobileActions} open={this.state.mobileDialog}
                    onRequestClose={this.hideMobileDialog} actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: 8, lineHeight: 1.5 }}>
                        {baseInfo.get('mobile')}
                    </p>
                    </div>
                </Dialog>
                <Dialog actions={actions} open={this.state.showDailog} onRequestClose={this.hideDialog} actionsContainerStyle={{ textAlign: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ margin: 8, lineHeight: 1.5, color: '#000' }}>
                            {
                                !!baseInfo.get('coid') ?
                                <span><p>确定要将{baseInfo.get('nickname')}</p><p>从我的收藏移除吗？</p></span> :
                                <span><p>确定要将{baseInfo.get('nickname')}</p><p>添加到我的收藏吗？</p></span>
                            }
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    actions={remarkActions}
                    open={this.state.remarkDialog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div>
                        <TextField
                            hintText="请输入您想备注的内容..."
                            multiLine
                            rows={2}
                            hintStyle={{ top: 12 }}
                            style={{ width: '100%', fontSize: 14 }}
                            underlineFocusStyle={{ borderColor: '#2196f3' }}
                            onChange={this.getReplyCont}
                            value={this.state.replyCont}
                            maxLength={this.props.commentNum}
                        />
                        <div className={styles.replyTips}>
                            {
                                this.state.moreNumsVisible ? <div className={styles.errTips}>输入超过{this.props.commentNum}字</div> : ''
                            }
                            <div className={styles.replyNum}><span>{this.state.replyCont.length}</span>/{this.props.commentNum}</div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}
