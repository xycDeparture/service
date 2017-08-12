import React, { PropTypes } from 'react'
import styles from './list.scss'
import Immutable from 'immutable'
import classnames from 'classnames'
import produceStars from 'application/utils/produceStars'
export default class EvaluationListView extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        location: PropTypes.object,
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired
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
    renderSmallStars = (num) => {
        const star = <i className={classnames(styles.icon_sm, styles.icon_star)}></i>
        const halfStar = <i className={classnames(styles.icon_sm, styles.icon_star_half)}></i>
        const grayStar = <i className={classnames(styles.icon_sm, styles.icon_star_gray)}></i>
        return produceStars(num, star, halfStar, grayStar)
    }
    render() {
        const list = this.props.componentModel.get('evaluateList')
        console.log(list.toJS())
        return (
            <div>
                <div id="evaluateList" className={styles.list} style={{ display: list.length === 0 ? 'none' : 'block' }} >
                        {
                            list.map(item => {
                                return (
                                    <div key={item.get('id')} className={styles.item} >
                                        <div className={styles.item_content}>
                                            <div className={styles.item_info}>
                                                <h4>{item.get('nickname')}</h4>
                                                <p>
                                                    <span>
                                                       {this.renderSmallStars(item.get('star'))}
                                                    </span>
                                                    {
                                                        item.get('tag').size > 0 ? item.get('tag').map((tagItem, i) =>
                                                            <span key={`tag${i}`} className={styles.tag_round}>{tagItem}</span>
                                                        ) : ''
                                                    }
                                                </p>
                                                <p>{item.get('comment')}</p>
                                                {
                                                    item.get('reply') ? <p className={styles.text_orange}>回复：{item.get('reply')}</p> : ''
                                                }
                                            </div>
                                            <div className={styles.item_button}>
                                                <p><span className={styles.tag_outline}>{item.get('service_item')}</span>{item.get('evaluate_time')}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                </div>
                <div style={{ textAlign: 'center', padding: 16, marginLeft: -16, marginBottom: -16, background: '#f5f5f5' }}>
                    <p className={styles.text_info}>没有更多评价了哦~</p>
                </div>
            </div>
        )
    }
}
