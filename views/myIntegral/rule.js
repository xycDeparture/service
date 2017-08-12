import React, { PropTypes, Component } from 'react'
import styles from './styles.scss'
import Immutable from 'immutable'
export default class MyPointsRuleView extends Component {
    static propTypes = {
        getScoreDetail: PropTypes.func,
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired
    }
    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }
    state = {
        lastScrollHeight: 0,
        listHeight: 0
    }
    componentDidMount() {
        window.addEventListener('scroll', () => {
            const obj = document.getElementById('list')
            if (!!obj && document.body.scrollTop > this.state.lastScrollHeight + 10) {
                this.state.lastScrollHeight = document.body.scrollTop
                if (obj.scrollHeight - document.body.scrollTop - window.screen.height < 16) {
                    const pagination = this.props.componentModel.get('pagination')
                    const listSize = this.props.componentModel.get('taskinfo').size
                    if (obj.scrollHeight > this.state.listHeight && listSize < +pagination.get('total')) {
                        this.props.getScoreDetail({ page: ++this.state.page })
                        this.state.listHeight = obj.scrollHeight
                    }
                }
            }
        })
    }
    render() {
        const taskList = this.props.componentModel.get('tasklist')
        return (
            <div className={styles.main}>
                <div className={styles.points_list}>
                    <div className={styles.list_title}>
                        <span>积分任务规则</span>
                    </div>
                    <ul className={styles.points_list_content}>
                        {
                           taskList.map(item =>
                            <li key={item.get('task_id')}>
                                <span>
                                    <h3 className={styles.text_title}>{item.get('description')}</h3>
                                    <h3 className={styles.text_info}>{item.get('score') > 0 ? '+' : '' }{item.get('score')}积分</h3>
                                </span>
                                <span className={styles.text_state}>
                                { item.get('is_finished') ? '已完成' : '未完成'}
                                </span>
                            </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
