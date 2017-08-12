import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'

import { Link } from 'react-router'
import styles from './styles.scss'
import classnames from 'classnames'
import PersonInfo from 'manager/components/PersonInfo'

export default class MyIntegralView extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    render() {
        return (
            <div className={styles.main}>
                <PersonInfo baseInfo={this.props.baseInfo} isShowScore />
                <div className={styles.title_link}>
                    <div className={styles.title_link_content}>
                        <Link to={{ pathname: 'main/myIntegral/detail', query: { score: this.props.baseInfo.get('score') } }}>
                            <i className={classnames(styles.icon_lg, styles.icon_sorce_detail)}></i>
                            <span>我的积分明细</span>
                            <i className={classnames(styles.icon, styles.icon_right)}></i>
                        </Link>
                        <Link to={{ pathname: 'main/myIntegral/rule', query: { score: this.props.baseInfo.get('score') } }}>
                            <i className={classnames(styles.icon_lg, styles.icon_sorce_detail)}></i>
                            <span>积分任务规则</span>
                            <i className={classnames(styles.icon, styles.icon_right)}></i>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
