import React, { PropTypes } from 'react'
import styles from './list.scss'
import Immutable from 'immutable'
import classnames from 'classnames'
import RaisedButton from 'material-ui/RaisedButton'
import produceStars from 'application/utils/produceStars'
export default class ManagerListView extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        location: PropTypes.object,
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired
    }
    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context)
        this.state = {
            listHeight: 0,
            lastScrollHeight: 0,
            page: 1
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', () => {
            // const obj = document.getElementById('evaluateList')
            // if (!!obj && document.body.scrollTop > this.state.lastScrollHeight + 10) {
            //     this.state.lastScrollHeight = document.body.scrollTop
            //     if (obj.scrollHeight - document.body.scrollTop - window.screen.height < 16) {
            //         const pagination = this.props.componentModel.get('pagination')
            //         const listSize = this.props.componentModel.get('evaluateList').size
            //         if (obj.scrollHeight > this.state.listHeight && listSize < +pagination.get('total')) {
            //             this.props.actions.getInfoEvaluateList({ page: ++this.state.page, mid: this.props.location.query.mid })
            //             this.state.listHeight = obj.scrollHeight
            //             console.log('loading More......')
            //         }
            //     }
            // }
        })
    }
    checkInfo = (id) => {
        console.log(id)
        this.context.router.push({
            pathname: '/managerInfo/index',
            query: {
                mid: id
            }
        })
    }
    goBook = (event, id) => {
        console.log(id)
        this.context.router.push({
            pathname: '/book',
            query: { mid: id }
        })
        event.preventDefault()
        event.stopPropagation()
    }
    renderManager = (managerList, label, keyAlias) => {
        return (
            <div className={styles.manager_list}>
                {
                    managerList ? managerList.map(item => {
                        return (
                            <div key={`${keyAlias}${item.get('id')}`} className={styles.item} onClick={() => {this.checkInfo(item.get('id'))}}>
                                <div className={styles.avatar}>
                                    <img src={
                                        process.env.NODE_ENV === 'development' ? require('customer/resources/manager.png') : item.get('avatar')}
                                    />
                                </div>
                                <div className={styles.item_content}>
                                    <div className={styles.item_info}>
                                        <h3>
                                        {item.get('chname')}
                                        <span> {item.get('post')}</span>
                                        </h3>
                                        <p>
                                            服务评分：
                                            <span>
                                                {
                                                    produceStars(
                                                        item.get('service_star'),
                                                        <i className={classnames(styles.icon_sm, styles.icon_star)}></i>,
                                                        <i className={classnames(styles.icon_sm, styles.icon_star_half)}></i>,
                                                        <i className={classnames(styles.icon_sm, styles.icon_star_gray)}></i>
                                                    )
                                                }
                                            </span>
                                        </p>
                                        <p>服务次数：<span className={styles.text_orange}> {item.get('service_times')}</span> </p>
                                    </div>
                                    <div className={styles.item_button}>
                                        <RaisedButton label="立即预约" primary onClick={(event) => {this.goBook(event, item.get('id'))}} />
                                    </div>
                                </div>
                            </div>
                        )
                    }) : ''
                }
            </div>
        )
    }
    render() {
        const managerList = this.props.componentModel.get('managerList')
        return (
            <div className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.content}>
                        <div className={styles.user_info}>
                            <h1><i className={classnames(styles.icon, styles.icon_home)}></i>建设银行员村支行</h1>
                            <h3>网点客户经理人数：<sapn className={styles.text_orange}>1234</sapn></h3>
                            <h3><i className={classnames(styles.icon_sm, styles.icon_location)}></i>广州市天河区员村建设银行员村支行</h3>
                        </div>
                    </div>
                </div>
                <div className={styles.my_title}>
                    <div className={styles.my_title_content}>
                        <span>可预约的客户经理</span>
                    </div>
                </div>
                <div id="managerList" className={styles.list} style={{ display: managerList.size === 0 ? 'none' : 'block' }} >
                    { this.renderManager(managerList, '', 'managerList') }
                </div>
                <div hidden={managerList.size > 0} style={{ textAlign: 'center', padding: 16, marginLeft: -16, marginBottom: -16, background: '#f5f5f5' }}>
                    <p className={styles.text_info}>没有更多评价了哦~</p>
                </div>
            </div>
        )
    }
}
