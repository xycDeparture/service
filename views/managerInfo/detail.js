import React, { PropTypes, Component } from 'react'
import styles from './styles.scss'
import Immutable from 'immutable'
import classnames from 'classnames'
import { Link } from 'react-router'
export default class ManagerInfoDetailView extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        setTestInfo: PropTypes.func,
        getTestInfo: PropTypes.func,
        getTopics: PropTypes.func
    }
    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }
    handleCollectClick = () => {
        console.log('收藏', this.context.location.query)
    }
    handleBookClick = () => {
        console.log('立即预约')
    }
    render() {
        const infoList = [
            { id: 0, title: '擅长领域', detail: '什么都会啊哈哈' },
            { id: 1, title: '从业经历', detail: '什么都会啊哈哈' },
            { id: 2, title: '理财资质', detail: '什么都会啊哈哈' },
            { id: 3, title: '服务宣言', detail: '满分服务，微笑服务满分服务，微笑服务满分服务，微笑服务满分服务，微笑服务' }
        ]
        return (
            <div className={styles.main} style={{ marginBottom: 52 }}>
                <div className={styles.banner}>
                        <Link style={{ display: 'none' }} className={styles.more} to={{ pathname: '/managerInfo/detail', query: { mid: 1 } }}>
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
                            <div className={styles.btn_collect} onClick={() => {this.handleCollectClick()}}>
                                <p><i className={classnames(styles.icon_sm, styles.icon_heart)}></i>收藏</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                {
                    infoList.map((item, key) =>
                        <div key={key} className={styles.title_link}>
                            <div className={styles.title_link_content}>
                                <i className={classnames(styles.icon_lg, styles.icon_hat)}></i>
                                <span>{item.title}</span>
                            </div>
                            <div className={styles.title_link_detail}>
                                <h3>{item.title}</h3>
                                <p>{item.detail}</p>
                            </div>
                        </div>
                    )
                }
                </div>

            </div>
        )
    }
}
