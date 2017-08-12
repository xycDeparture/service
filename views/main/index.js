import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import TouchRipple from 'material-ui/internal/TouchRipple'
import { Link } from 'react-router'
import DataLoading from 'application/controllers/dataLoading'
import Message from 'application/controllers/message'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import styles from './styles.scss'
import PersonInfo from 'manager/components/PersonInfo'
export default class MainView extends Component {
    static propTypes = {
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        logout: PropTypes.func
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    state = {
        showDailog: false
    }
    handleLogoutClick = () => {
        this.setState({
            showDailog: true
        })
    }
    handleClose = () => {
        this.setState({
            showDailog: false
        })
    }
    handleSetLogout = () => {
        this.setState({
            showDailog: false
        })
        this.props.logout()
    }
    render() {
        const actions = [
            <RaisedButton label="确定" primary onClick={ () => {this.handleSetLogout()} } />,
            <RaisedButton label="取消" style={{ marginLeft: 8 }} secondary onClick={ this.handleClose } />
        ]
        const indexCount = this.props.componentModel.get('indexCount')
        return (
            <div className={styles.main}>
                <PersonInfo baseInfo={this.props.baseInfo} />
                <div className={styles.toolbars}>
                    <div className={styles.barItem}>
                        <Link to={{ pathname: '/main/appt/deal' }}>
                            <div className={styles.barItemFont}>
                                未处理的预约
                            </div>
                            <div className={styles.barItemNums}>
                                { indexCount.get('service_waiting_count') }
                            </div>
                        </Link>
                    </div>
                    <div className={styles.barItem}>
                        <Link to={{ pathname: '/main/myClients/exclusive' }}>
                            <div className={styles.barItemFont}>
                                专属客户数
                            </div>
                            <div className={styles.barItemNums}>
                                { indexCount.get('private_customer_count') }
                            </div>
                        </Link>
                    </div>
                    <div className={styles.barItem} style={{ display: 'none' }}>
                        <Link to={{ pathname: '/main/clientAdd' }}>
                            <div className={styles.barItemFont}>
                                邀约客户数
                            </div>
                            <div className={styles.barItemNums}>
                                { this.props.baseInfo.get('invite_customer_count') }
                            </div>
                        </Link>
                    </div>
                </div>

                <div className={styles.lists}>
                    <div style={{ position: 'relative' }} className={styles.listItem}>
                        <TouchRipple>
                            <Link to={{ pathname: 'main/myClients/index' }}>
                                <div className={styles.listInfo}>
                                    <div className={styles.clientImg}>
                                    </div>
                                    <div className={styles.fontInfo}>
                                        我的客户
                                    </div>
                                    <div className={styles.rightArrow}>
                                    </div>
                                </div>
                            </Link>
                        </TouchRipple>
                    </div>
                    <div style={{ position: 'relative' }} className={styles.listItem}>
                        <TouchRipple>
                            <Link to={{ pathname: 'main/appt/index' }}>
                                <div className={styles.listInfo}>
                                    <div className={styles.recordImg}>
                                    </div>
                                    <div className={styles.fontInfo}>
                                        预约管理
                                    </div>
                                    <div className={styles.rightArrow}>
                                    </div>
                                </div>
                            </Link>
                        </TouchRipple>
                    </div>
                    <div style={{ position: 'relative' }} className={styles.listItem}>
                        <TouchRipple>
                            <Link to={{ pathname: 'main/myVisitedCard/index' }}>
                                <div className={styles.listInfo}>
                                    <div className={styles.intergralImg}>
                                    </div>
                                    <div className={styles.fontInfo}>
                                        邀请客户
                                    </div>
                                    <div className={styles.rightArrow}>
                                    </div>
                                </div>
                            </Link>
                        </TouchRipple>
                    </div>
                    <div style={{ position: 'relative' }} className={styles.listItem}>
                        <TouchRipple>
                            <Link to={{ pathname: 'main/myIntegral/index' }}>
                                <div className={styles.listInfo}>
                                    <div className={styles.infoImg}>
                                    </div>
                                    <div className={styles.fontInfo}>
                                        我的积分
                                    </div>
                                    <div className={styles.rightArrow}>
                                    </div>
                                </div>
                            </Link>
                        </TouchRipple>
                    </div>
                </div>

                <div className={styles.logoOut} onClick={() => {this.handleLogoutClick()}} style={{ display: 'none' }}>
                    <TouchRipple>
                        <div className={styles.logoOutFont}>
                            退出登陆
                        </div>
                    </TouchRipple>
                </div>
                <Dialog actions={actions} open={this.state.showDailog} onRequestClose={this.handleClose} actionsContainerStyle={{ textAlign: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <i className={styles.icon_warning}></i>
                        <div style={{ margin: 8, lineHeight: 1.5, color: '#000' }}>
                            <p>确定退出登录吗？</p>
                        </div>
                    </div>
                </Dialog>
                <DataLoading />
                <Message />
            </div>
        )
    }
}
