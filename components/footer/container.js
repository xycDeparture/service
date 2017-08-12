import React, { Component } from 'react'
import styles from './styles.scss'

export default class FooterComp extends Component {
    render() {
        return (
            <ul className={styles.footer}>
                <li className={styles.footItem}>
                    首页
                </li>
                <li className={styles.footItem}>
                    客户
                </li>
                <li className={styles.footItem}>
                    消息
                </li>
                <li className={styles.footItem}>
                    我的
                </li>
            </ul>
        )
    }
}
