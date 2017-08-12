import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import styles from './styles.scss'
import { Link } from 'react-router'
import TouchRipple from 'material-ui/internal/TouchRipple'
import PersonInfo from 'manager/components/PersonInfo'

export default class ApptIndexView extends Component {
    static propTypes = {
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }
    render() {
        return (
            <div className={styles.main}>
                <PersonInfo baseInfo={this.props.baseInfo} />
                <div className={styles.toolbars}>
                    <div className={styles.barItem}>
                        <Link to={{ pathname: '/main/clientAdd' }}>
                            <div className={styles.barItemFont}>
                                邀请人数
                            </div>
                            <div className={styles.barItemNums}>
                              {this.props.baseInfo.get('invite_count')}
                            </div>
                        </Link>
                    </div>
                    <div className={styles.barItem}>
                        <Link to={{ pathname: '/main/myIntegral/index' }}>
                            <div className={styles.barItemFont}>
                                我的积分
                            </div>
                            <div className={styles.barItemNums}>
                                {this.props.baseInfo.get('score')}
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
                            <Link to={{ pathname: 'main/mytime' }}>
                                <div className={styles.listInfo}>
                                    <div className={styles.clientImg}>
                                    </div>
                                    <div className={styles.fontInfo}>
                                        预约设置
                                    </div>
                                    <div className={styles.rightArrow}>
                                    </div>
                                </div>
                            </Link>
                        </TouchRipple>
                    </div>
                    <div style={{ position: 'relative' }} className={styles.listItem}>
                        <TouchRipple>
                            <Link to={{ pathname: 'main/orderRecords' }}>
                                <div className={styles.listInfo}>
                                    <div className={styles.recordImg}>
                                    </div>
                                    <div className={styles.fontInfo}>
                                        预约记录
                                    </div>
                                    <div className={styles.rightArrow}>
                                    </div>
                                </div>
                            </Link>
                        </TouchRipple>
                    </div>
                    <div style={{ position: 'relative' }} className={styles.listItem}>
                        <TouchRipple>
                            <Link to={{ pathname: 'main/appt/deal' }}>
                                <div className={styles.listInfo}>
                                    <div className={styles.intergralImg}>
                                    </div>
                                    <div className={styles.fontInfo}>
                                        预约处理
                                    </div>
                                    <div className={styles.rightArrow}>
                                    </div>
                                </div>
                            </Link>
                        </TouchRipple>
                    </div>
                    <div style={{ position: 'relative', display: this.props.baseInfo.get('is_supervisor') ? 'block' : 'none'
                        }} className={styles.listItem}
                    >
                        <TouchRipple>
                            <Link to={{ pathname: 'main/netWorkTime' }}>
                                <div className={styles.listInfo}>
                                    <div className={styles.clientImg}>
                                    </div>
                                    <div className={styles.fontInfo}>
                                        网点预约设置
                                    </div>
                                    <div className={styles.rightArrow}>
                                    </div>
                                </div>
                            </Link>
                        </TouchRipple>
                    </div>
                    <div style={{ position: 'relative' }} className={styles.listItem}>
                        <TouchRipple>
                            <Link to={{ pathname: 'main/appt/add' }}>
                                <div className={styles.listInfo}>
                                    <div className={styles.recordImg}>
                                    </div>
                                    <div className={styles.fontInfo}>
                                        添加客户经理
                                    </div>
                                    <div className={styles.rightArrow}>
                                    </div>
                                </div>
                            </Link>
                        </TouchRipple>
                    </div>
                </div>
            </div>
        )
    }
}
