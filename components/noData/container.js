import React, { Component } from 'react'
import styles from './styles.scss'

export default class NoDataComp extends Component {
    render() {
        return (
            <div className={styles.noData}>
                <div className={styles.noDataImg}></div>
                <div className={styles.noDataTips}>暂无数据哦~</div>
            </div>
        )
    }
}
