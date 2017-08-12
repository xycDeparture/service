import React, { Component, PropTypes } from 'react'
import styles from './styles.scss'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { modelSelector } from './selector'
import handleImgOnError from 'application/utils/handleImgOnError'
@connect(modelSelector, null)
export default class TextField extends Component {
    static propTypes = {
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired,
        baseInfo: PropTypes.any,
        isShowScore: PropTypes.any
    }
    render() {
        // const demoImg = require('manager/resources/manager.png')
        const baseInfo = this.props.baseInfo
        return (
            <div className={styles.personInfo} style={{ zoom: this.props.baseInfo.get('zoom') }}>
                {
                    baseInfo.get('avatar') &&
                    <img
                        className={styles.personImg}
                        src={ process.env.NODE_ENV === 'development' ?
                        `http://manager.yue.com${this.props.baseInfo.get('avatar')}` : this.props.baseInfo.get('avatar') || '' }
                        onError={event => {handleImgOnError(event, this.props.initialize)}}
                    />
                }
                <img className={styles.card_title}
                    src={require('manager/resources/card_title.png')}
                    style={{ display: 'none' }}
                />
                <div className={styles.infos}>
                    <div className={styles.name}>
                        <p>
                            { baseInfo.get('post_logo') && <img src={baseInfo.get('post_logo')} className={styles.post_logo} />}
                            { baseInfo.get('chname')}
                        </p>
                        <p>
                            {baseInfo.get('post') }
                        </p>
                    </div>
                    <div className={styles.phone}>
                    {/* <i className={styles.icon_phone}></i>
                                        { this.props.baseInfo.get('mobile') }&nbsp; */
                    }
                    <span hidden={this.props.isShowScore}>
                     服务次数: <span className={styles.text_orange}>{ this.props.baseInfo.get('service_times') }</span>
                    </span>
                    <span hidden={!this.props.isShowScore}>我的积分: <span className={styles.text_orange}>{ this.props.baseInfo.get('score') }</span></span>
                    </div>
                    <div className={styles.network}>网点: { this.props.baseInfo.get('network_name') }</div>
                </div>
            </div>
        )
    }
}
