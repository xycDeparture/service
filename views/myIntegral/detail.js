import React, { PropTypes, Component } from 'react'
import styles from './styles.scss'
import Immutable from 'immutable'
export default class MyPointsDetailView extends Component {
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
        const pointsList = this.props.componentModel.get('taskinfo')
        return (
            <div className={styles.main}>
                <div className={styles.title_link}>
                    <div className={styles.list_title}>
                        <span>当前积分：<b className={styles.text_orange}>{this.context.location.query.score}</b></span>
                    </div>
                </div>
                <div className={styles.points_list} id="list">
                    <ul className={styles.points_list_content}>
                        {
                            pointsList.map(item =>
                                <li key={item.get('task_id')}>
                                    <span>
                                        <h3 className={styles.text_title}>{item.get('detail')}</h3>
                                        <h3 className={styles.text_info}> {item.get('date')}</h3>
                                    </span>
                                    {
                                        item.get('score') > 0 ? <span className={styles.text_state}>+{item.get('score')}积分</span> :
                                        <span className={styles.text_scorce}>{item.get('score')}积分</span>
                                    }
                                </li>
                            )
                        }
                    </ul>
                    {
                        !pointsList.size ?
                            <div className={styles.nodata}>
                                <img className={styles.nodataImg} src={require('customer/resources/cry.png')} />
                                <br />
                                <p>抱歉！暂无积分明细信息</p>
                            </div> : null
                    }
                </div>
            </div>
        )
    }
}
