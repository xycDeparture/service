import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import classnames from 'classnames'

import NoData from 'manager/components/noData'

import styles from './styles.scss'

export default class IntegralDetailView extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        getScoreDetail: PropTypes.func,
        params: PropTypes.instanceOf(Immutable.Map).isRequired,
        clearTaskList: PropTypes.func
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            noMoreData: '',
            lastScrollHeight: 0,
            listHeight: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            const params = this.props.componentModel.get('params')
            const obj = document.getElementById('detailContainer')
            if (!!obj && document.body.scrollTop > this.state.lastScrollHeight + 10) {
                this.state.lastScrollHeight = document.body.scrollTop
                if (obj.scrollHeight - document.body.scrollTop - window.screen.height < 16) {
                    const total = +params.get('total')
                    const listSize = this.props.componentModel.get('taskLists').size
                    const curPage = +params.get('page')
                    const nextPage = curPage + 1
                    if (obj.scrollHeight > this.state.listHeight && listSize < total) {
                        this.props.getScoreDetail({ page: nextPage })
                        this.state.listHeight = obj.scrollHeight
                    }
                }
            }
        })
    }

    componentWillUnmount() {
        this.props.clearTaskList()
    }
    render() {
        const taskLists = this.props.componentModel.get('taskLists')
        const curScore = this.props.componentModel.get('curScore')
        return (
            <div className={styles.main}>
                <div className={styles.curIntegral}>
                    当前积分：<p>{curScore}</p>
                </div>
                {
                    taskLists.size === 0 ?
                    <NoData /> :
                    <div className={styles.detailContainer} id="detailContainer">
                        {
                            taskLists.map(item => {
                                return (
                                    <div className={styles.detailItem} key={item.get('task_id')}>
                                        <div className={styles.itemDetail}>
                                            <div className={styles.itemCont}>{item.get('detail')}</div>
                                            <div className={styles.itemTime}>{item.get('date')}</div>
                                        </div>
                                        {
                                            item.get('score') > 0 ?
                                            <div className={classnames(styles.itemIntegral, styles.blue)}>
                                                +{item.get('score')}积分
                                            </div> :
                                            <div className={styles.itemIntegral}>
                                                {item.get('score')}积分
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}
