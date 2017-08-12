import React, { PropTypes, Component } from 'react'
import styles from './styles.scss'
import Immutable from 'immutable'
import classnames from 'classnames'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

export default class ManagerInfoView extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        setTestInfo: PropTypes.func,
        getTestInfo: PropTypes.func,
        getTopics: PropTypes.func,
        location: PropTypes.object
    }
    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }
    handleBookClick = () => {
        this.context.router.push({
            pathname: '/book',
            query: this.context.location.query
        })
    }
    render() {
        return (
            <div className={styles.main}>
                <div className={styles.banner}>
                        <Link className={styles.more} to={{ pathname: '/managerInfo/detail', query: this.context.location.query }}>
                            详细资料
                        </Link>
                    <div className={styles.avatar}>
                        <img src={ process.env.NODE_ENV === 'development' ?
                                    require('customer/resources/manager.png') :
                                    require('customer/resources/manager.png')
                            }
                        />
                    </div>
                    <div className={styles.info}>
                        <div>
                            <h1 className={styles.info_name}>
                                <i className={classnames(styles.icon, styles.icon_avatar)}></i>
                                <span>何秀权</span>
                                <span className={styles.info_sm}> 服务次数：1000</span>
                            </h1>
                            <div className={styles.info_detail}>
                                <p><i className={classnames(styles.icon_sm, styles.icon_work)}></i>职务：客户经理</p>
                                <p><i className={classnames(styles.icon_sm, styles.icon_location)}></i>网点：越秀白云区支行</p>
                                <p><i className={classnames(styles.icon_sm, styles.icon_tell)}></i>服务宣言：满分服务，微笑服务满分服务，微笑服务满分服务，微笑服务满分服务，微笑服务</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ padding: '10px 16px 0 10px' }}>
                    <RaisedButton label="立即预约" primary fullWidth onClick={() => {this.handleBookClick() }} style={{ height: 44 }} />
                </div>
                <div className={styles.title_link}>
                    <div className={styles.title_link_content}>
                        <i className={classnames(styles.icon_lg, styles.icon_book_record)}></i>
                        <span>预约记录</span>
                    </div>
                </div>
            </div>
        )
    }
}
