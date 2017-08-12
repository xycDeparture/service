import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import QRCode from 'qrcode.react'
import styles from './mycard.scss'
import produceStars from 'application/utils/produceStars'
import SvgIcon from 'material-ui/SvgIcon'
import TouchRipple from 'material-ui/internal/TouchRipple'
import { orangeA400, grey500 } from 'material-ui/styles/colors'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import handleImgOnError from 'application/utils/handleImgOnError'
/* eslint-disable */

export default class MyCardView extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        location: PropTypes.object
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }
    state = {
        qrcodeDialog: false,
        personDialog: false,
        focusDialog: false,
        qrcodeImg: ''
    }
    utf16to8 = str => {
        let out = ''
        const len = str.length
        for (let i = 0; i < len; i++) {
            const c = str.charCodeAt(i)
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i)
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
            }
        }
        return out
    }
    handleBottomClick = url => {
        window.location.href = url
    }
    handleFocusClick = () => {
        this.setState({
            focusDialog: true
        })
    }
    handleImgError = event => {
        const defaultQrcodeImg = this.props.componentModel.getIn(['initialize','img','default_qrcode_img'])
        event.target.src = defaultQrcodeImg
    }

    showQrcodeDialog = () => {
        if (this.state.qrcodeImg === '') {
            const mycanvas = document.getElementById('imgSpan').childNodes[0]
            const imgUrl = mycanvas.toDataURL('image/png')
            this.setState({
                qrcodeImg: <img src={imgUrl} />,
                qrcodeDialog: true
            })
        } else {
            this.setState({
                qrcodeDialog: true
            })
        }
    }
    showPersonDialog = () => {
        this.setState({
            personDialog: true
        })
    }
    handleHideDialog = () => {
        this.setState({
            qrcodeDialog: false,
            personDialog: false,
            focusDialog: false
        })
    }
    render() {
        const baseInfo = this.props.componentModel.get('baseInfo')
        const initialize = this.props.componentModel.get('initialize')
        const defaultQrcodeImg = initialize.getIn(['img','default_qrcode_img'])
        const cardTitleImgUrl = initialize.getIn(['img','card_title_img'])
        const name = this.utf16to8(`${baseInfo.get('name') || ''}`)
        const mobile = this.utf16to8(`${baseInfo.get('mobile')}`)
        const tel = this.utf16to8(`${baseInfo.get('tel') || ''}`)
        const email = this.utf16to8(`${baseInfo.get('email') || ''}`)
        const post = this.utf16to8(`${baseInfo.get('post') || ''}`)
        const addr = this.utf16to8(`${baseInfo.get('project_name') || ''}${baseInfo.get('network') || ''}`)
        const network = this.utf16to8(`${baseInfo.get('network') || ''}`)
        const addrInfo = `
                        BEGIN:VCARD\n
                        VERSION:3.0\n
                        FN;CHARSET=UTF-8:${name}\n
                        TEL;CELL;VOICE:${mobile}\n
                        TEL;WORK;VOICE:${tel}\n
                        EMAIL;PREF;INTERNET:${email}\n
                        orG:${network}\n
                        ROLE:${post}\n
                        ADR;WORK;POSTAL:${addr}\n
                        END:VCARD
                        `
        const StarIcon = (props) => (
            <SvgIcon {...props}>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </SvgIcon>
        )

        const HalfStarIcon = (props) => (
            <SvgIcon {...props}>
                <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22
                         9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
                />
            </SvgIcon>
        )

        const starStyle = {
            width: 16,
            height: 16,
            marginTop: 4,
            marginLeft: 2
        }
        const star = <StarIcon color={orangeA400} style={starStyle} />
        const halfStar = <HalfStarIcon color={orangeA400} style={starStyle} />
        const greyStar = <StarIcon color={grey500} style={starStyle} />
        const actions = [
            <RaisedButton label="返回" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ this.handleHideDialog } />
        ]
        const personActions = [
            <RaisedButton label="返回" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ this.handleHideDialog } />
        ]
        const intros =  baseInfo.get('intros').size > 0 ? baseInfo.get('intros') : [].concat(baseInfo.get('intros') || [])
        return (
            <div className={styles.main}>
                <div className={styles.personInfo} style={{ zoom: (window.screen.width / 375) > 1 ? 1 : window.screen.width / 375 }}>
                    {
                        baseInfo.get('avatar') &&
                        <img className={styles.personImg}
                            src={baseInfo.get('avatar') || '' }
                            onError={event => {handleImgOnError(event, this.props.componentModel.get('initialize'))}}
                        />
                    }
                    <img className={styles.card_title}
                        src={ process.env.NODE_ENV === 'development' ?
                        `http://manager.yue.com${cardTitleImgUrl}` : cardTitleImgUrl }
                    />
                    <div className={styles.infos}>
                        <div className={styles.name}>
                            <p>
                                <img src={baseInfo.get('post_logo')} className={styles.post_logo} hidden={!baseInfo.get('post_logo')} />
                                { baseInfo.get('name')}
                            </p>
                            <p>
                                {baseInfo.get('post') }
                            </p>
                        </div>
                        <div>
                            <span>服务评分：
                            {
                                produceStars(baseInfo.get('service_star') || 1, star, halfStar, greyStar)
                            }
                            </span>
                        </div>
                        <div className={styles.network}>网点: { baseInfo.get('network') }</div>
                    </div>
                </div>
                <div className={styles.info_list}>
                    <div className={styles.info_list_item}>
                        <i className={styles.icon_phone}></i>
                        <span><b className={styles.title}> 电话：</b>{baseInfo.get('mobile')}</span>
                    </div>
                    {
                        intros.size > 0 ? intros.map((item, index) =>
                            <div className={styles.info_list_item} key={index}>
                                <i className={styles.icon_wechat}
                                    style={{ backgroundImage: process.env.NODE_ENV === 'development' ? `url(${require('manager/resources/icon_1.png')})` : `url(${item.get('icon')})` }}
                                >
                                </i>
                                <span><b className={styles.title}> {item.get('name')}：</b><b>{item.get('content')}</b></span>
                            </div>
                         ) : ''
                    }
                    <div hidden className={styles.info_list_item}>
                        <i className={styles.icon_wechat}></i>
                        <span><b className={styles.title}> 微信号：</b>{baseInfo.get('wechat_number')}</span>
                    </div>
                    <div hidden className={styles.info_list_item}>
                        <i className={styles.icon_zhizi}></i>
                        <span><b className={styles.title}> 持证资质：</b>{baseInfo.get('aptitudes')}</span>
                    </div>
                    <div className={styles.info_list_item}>
                        <div className={styles.flex_panel}>
                            <i className={styles.icon_annouce}></i>
                            <span className={styles.flex_item}>
                                <b className={styles.title}> 功能特色：</b>
                                <b>{initialize.getIn(['lang','features'])}</b>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.qrcodeCont}>
                    <div className={styles.Qrcode} onClick={this.showPersonDialog}>
                        <span>
                            {
                                <img src={ process.env.NODE_ENV === 'development' ?
                                    `http://manager.yue.com${baseInfo.get('my_qrcode') || ''}` : baseInfo.get('my_qrcode') || '' }
                                    onError={this.handleImgError}
                                />
                            }
                        </span>
                        <div className={styles.qrcodeTips}>个人二维码</div>
                    </div>
                    <div className={styles.Qrcode} onClick={this.showQrcodeDialog}>
                        <span id="imgSpan">
                            <QRCode id="qrcode" size={112} value={addrInfo} />
                        </span>
                        <div className={styles.qrcodeTips}>通讯录二维码</div>
                    </div>
                </div>
                <div className={styles.logoOutPanel} style={{ display: baseInfo.get('invite_url') ? 'block' : 'none' }} >
                    <div className={styles.logoOut} onClick={() => {this.handleBottomClick(baseInfo.get('invite_url'))}}>
                        <TouchRipple>
                            <div className={styles.logoOutFont}>
                                诚邀您体验约服务
                            </div>
                        </TouchRipple>
                    </div>
                </div>
                <div className={styles.logoOutPanel} style={{ display:
                    (!baseInfo.get('invite_url') || !this.props.location.query.code) ? 'block' : 'none' }}
                >
                    <div className={styles.logoOut} onClick={() => {this.handleFocusClick(baseInfo.get('invite_url'))}}>
                        <TouchRipple>
                            <div className={styles.logoOutFont}>
                                {`关注“${initialize.getIn(['lang','wechat_name']) || ''}”，享专属服务`}
                            </div>
                        </TouchRipple>
                    </div>
                </div>
                <Dialog
                    actions={personActions}
                    open={this.state.personDialog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div className={styles.qrcodeImg} id="qrcodeImg" style={{ minHeight: 223 }}>
                        <img src={ process.env.NODE_ENV === 'development' ?
                            `http://manager.yue.com${baseInfo.get('my_qrcode') || ''}` : baseInfo.get('my_qrcode') || '' }
                            onError={this.handleImgError}
                        />
                    </div>
                    <p className={styles.text_tips}>长按识别添加联系人</p>
                </Dialog>
                <Dialog
                    actions={actions}
                    open={this.state.qrcodeDialog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div className={styles.qrcodeImg} id="qrcodeImg" style={{ minHeight: 223 }}>
                        {this.state.qrcodeImg}
                    </div>
                    <p className={styles.text_tips}>长按识别添加联系人</p>
                </Dialog>
                <Dialog
                    actions={actions}
                    open={this.state.focusDialog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div className={styles.focusImg}>
                        <img src={defaultQrcodeImg} />
                    </div>
                    <p className={styles.text_orange}>{`长按二维码关注“${initialize.getIn(['lang','wechat_name']) || ''}”，使用约服务`}</p>
                </Dialog>
            </div>
        )
    }
}
