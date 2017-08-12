import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import QRCode from 'qrcode.react'
import NoData from 'manager/components/noData'
import styles from './styles.scss'
import handleImgOnError from 'application/utils/handleImgOnError'
const waringImg = require('manager/resources/warning.png')
export default class ClientAddView extends Component {
    static propTypes = {
        inviteList: PropTypes.instanceOf(Immutable.List).isRequired,
        inviteMsgUrl: PropTypes.string.isRequired,
        invitedScore: PropTypes.number.isRequired,
        invitedUrl: PropTypes.string.isRequired,
        params: PropTypes.instanceOf(Immutable.Map).isRequired,
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired,
        getInviteUrl: PropTypes.func,
        getLogoOffCustomer: PropTypes.func,
        getInviteList: PropTypes.func,
        clearClientList: PropTypes.func,
        residueDegree: PropTypes.any
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        message: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            inputMobile: '',
            inputMobileDialog: false,
            inputMobileTips: '',
            invitedDialog: false,
            invitedScore: 0,
            invitedUrl: '',
            lastScrollHeight: 0,
            listHeight: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            const obj = document.getElementById('clientsCont')
            if (!!obj && document.body.scrollTop > this.state.lastScrollHeight + 10) {
                this.state.lastScrollHeight = document.body.scrollTop
                if (obj.scrollHeight - document.body.scrollTop - window.screen.height < 16) {
                    const total = +this.props.params.get('total')
                    const listSize = this.props.inviteList.size
                    const curPage = +this.props.params.get('page')
                    const nextPage = curPage + 1
                    if (obj.scrollHeight > this.state.listHeight && listSize < total) {
                        this.props.getInviteList({ page: nextPage })
                        this.state.listHeight = obj.scrollHeight
                    }
                }
            }
        })
    }

    componentWillUnmount() {
        this.props.clearClientList()
    }

    handleInputMobile = ({ target: { value } }) => {
        this.setState({
            inputMobile: value.substring(0, 11)
        })
    }

    handleInvite = () => {
        const inputMobile = this.state.inputMobile
        let inputMobileTips = ''
        if (!/^1[34578]\d{9}$/.test(inputMobile)) {
            inputMobileTips = '温馨提示：当前号码输入错误！'
            this.setState({
                inputMobileDialog: true,
                inputMobileTips
            })
        } else {
            this.props.getInviteUrl(inputMobile)
            setTimeout(() => {
                if (this.props.inviteMsgUrl !== '') {
                    inputMobileTips = this.props.inviteMsgUrl
                    this.setState({
                        inputMobileDialog: true,
                        inputMobileTips
                    })
                } else {
                    this.setState({
                        invitedDialog: true,
                        invitedScore: this.props.invitedScore,
                        invitedUrl: this.props.invitedUrl
                    })
                }
            }, 500)
        }
    }
    handleClickInvite = () => {
        const callback = (code) => {
            this.context.router.push({
                pathname: '/main/myVisitedCard/mycard',
                query: { code, mid: this.props.baseInfo.get('mid') }
            })
        }
        this.props.getInviteUrl(callback)
        this.setState({
            invitedDialog: false
        })
    }
    showInviteDialog = () => {
        const customerCanRegister = this.props.initialize.get('customer_can_register')
        if (!customerCanRegister) {
            if (this.props.residueDegree <= 0) {
                this.context.message('您的剩余邀请次数已用完!')
                return false
            }
            this.setState({
                invitedDialog: true
            })
        } else {
            this.handleClickInvite()
        }
        return true
    }
    handleHideDialog = () => {
        this.setState({
            inputMobileDialog: false,
            invitedDialog: false
        })
    }

    handleCancelInvite = inviteId => {
        this.props.getLogoOffCustomer(inviteId)
    }
    checkCustomerDetail = id => {
        this.context.router.push({
            pathname: '/main/clientDetail',
            query: {
                Cid: id
            }
        })
    }
    render() {
        const actions = [
            <RaisedButton label="返回" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ this.handleHideDialog } />
        ]

        const invitedActions = [
            <RaisedButton label="确定" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ this.handleClickInvite } />,
            <RaisedButton label="取消" backgroundColor={'#ff9a00'} labelColor={'#fff'} onClick={ this.handleHideDialog } style={{ marginLeft: 16 }} />
        ]

        const customerCanRegister = this.props.initialize.get('customer_can_register')

        return (
            <div className={styles.main}>
                <div className={styles.client_panel}>
                    <RaisedButton label="邀约客户" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ () => this.showInviteDialog() } />
                </div>
                <div className={styles.title_panel}
                    style={{ display: customerCanRegister === true ? 'none' : 'block' }}
                >
                    <div className={styles.title_panel_item}>剩余邀请次数：<span>{this.props.residueDegree}</span></div>
                </div>
                <div className={styles.clientListTitle}>
                    <div className={styles.clientListImg}>
                    </div>
                    <div className={styles.clientListFont}>
                        邀请列表
                    </div>
                </div>
                {
                    +this.props.params.get('total') === 0 ?
                    <NoData /> :
                    <div className={styles.clientsContianer} id="clientsCont">
                        {
                            this.props.inviteList.map(item => {
                                return (
                                    <div className={styles.client_list} key={ item.get('cid') }
                                        onClick={ () => {this.checkCustomerDetail(item.get('cid'))} }
                                    >
                                        <div className={styles.apptImg}>
                                            <img src={item.get('avatar')}
                                                onError={event => {handleImgOnError(event, this.props.initialize)}}
                                            />
                                        </div>
                                        <div className={styles.clientItem_detail}>
                                            <div className={styles.clientPhone}>{ item.get('nickname') || '匿名用户'}</div>
                                            <div className={styles.clientTime}>注册时间：{ item.get('date') }</div>
                                        </div>
                                        <div style={{ display: 'none' }} className={styles.clientCancelBtn}
                                            onClick={() => { this.handleCancelInvite(item.get('cid')) }}
                                        >
                                            <div className={styles.cancelBtn}>取消邀请</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                <Dialog
                    actions={actions}
                    open={this.state.inputMobileDialog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div>
                        <div style={{ textAlign: 'center' }}>
                            <img src={waringImg} style={{ width: 27, height: 27 }} />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 14, fontFamily: '微软雅黑' }}>
                            {this.state.inputMobileTips}
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    actions={invitedActions}
                    open={this.state.inputMobileDialog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div style={{ position: 'relative' }}>
                        <div className={styles.qrCodeCloesBtn} onClick={this.handleHideDialog}>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 10 }}>
                            <QRCode value={this.state.invitedUrl} style={{ width: 134, height: 134 }} />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12, fontFamily: '微软雅黑', color: '#ff9a00' }}>
                            温馨提示:成功邀请客户后您将扣除{this.state.invitedScore}积分
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    actions={invitedActions}
                    open={this.state.invitedDialog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div style={{ position: 'relative' }}>
                        <div style={{ textAlign: 'center', marginTop: 24, marginBottom: 18, fontSize: 16, color: '#000' }}>
                            确定使用一个客户邀约名额？
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}
