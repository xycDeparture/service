import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import NoData from 'manager/components/noData'
import styles from './collect.scss'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'manager/components/TextField'
import handleImgOnError from 'application/utils/handleImgOnError'
export default class MyClientsCollectView extends Component {
    static propTypes = {
        clientLists: PropTypes.instanceOf(Immutable.List).isRequired,
        params: PropTypes.instanceOf(Immutable.Map).isRequired,
        getPrivateCustomers: PropTypes.func,
        remarkCollection: PropTypes.func,
        commentNum: PropTypes.any,
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired
    }
    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        message: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            lastScrollHeight: 0,
            listHeight: 0,
            remarkDialog: false,
            replyCont: ''
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            const obj = document.getElementById('customerList')
            if (!!obj && document.body.scrollTop > this.state.lastScrollHeight + 10) {
                this.state.lastScrollHeight = document.body.scrollTop
                if (obj.scrollHeight - document.body.scrollTop - window.screen.height < 6) {
                    const total = +this.props.params.get('total')
                    const listSize = this.props.clientLists.size
                    const curPage = +this.props.params.get('page')
                    const nextPage = curPage + 1
                    if (obj.scrollHeight > this.state.listHeight && listSize < total) {
                        this.props.getPrivateCustomers({ page: nextPage })
                        this.state.listHeight = obj.scrollHeight
                    }
                }
            }
        })
    }

    getReplyCont = event => {
        const replyCont = event.target.value
        const commentNum = +this.props.commentNum
        let moreNums = false
        if (replyCont.length > commentNum) {
            moreNums = true
        }
        this.setState({
            moreNumsVisible: moreNums,
            replyCont: replyCont.substring(0, commentNum)
        })
    }
    checkCustomerDetail = id => {
        this.context.router.push({
            pathname: '/main/clientDetail',
            query: {
                Cid: id,
                isCollect: 1
            }
        })
    }
    remarkSubmit = () => {
        if (this.state.replyCont === '') {
            this.context.message('请输入您想备注的内容')
            return
        }
        this.props.remarkCollection({
            coid: this.state.currentId,
            remark: this.state.replyCont
        })
        this.setState({
            remarkDialog: false,
            replyCont: ''
        })
    }
    showRemarkDialog = (event, id) => {
        event.stopPropagation()
        this.setState({
            remarkDialog: true,
            currentId: id
        })
    }
    hideDialog = () => {
        this.setState({
            remarkDialog: false
        })
    }
    render() {
        const actions = [
            <RaisedButton label="确定" backgroundColor={'#2196f3'} labelColor={'#fff'} onClick={ this.remarkSubmit } />,
            <RaisedButton label="取消" backgroundColor={'#ff9a00'} labelColor={'#fff'} onClick={ this.hideDialog } style={{ marginLeft: 8 }} />
        ]
        return (
            <div className={styles.main}>
                <div className={styles.totalClient}>
                    收藏客户数: <b>{ this.props.params.get('total') }</b>
                </div>
                {
                    +this.props.params.get('total') === 0 ?
                    <NoData />
                    :
                     <div className={styles.clientList} id="customerList">
                    {
                        this.props.clientLists.map(item => {
                            return (
                                <div className={styles.clientItem} key={ item.get('cid') } onClick={ () => {this.checkCustomerDetail(item.get('cid'))} } >
                                    <div className={styles.clientImg}>
                                        <span>
                                            <img src={ process.env.NODE_ENV === 'development' ?
                                                item.get('avatar') || '' : item.get('avatar') || '' }
                                                onError={event => {handleImgOnError(event, this.props.initialize)}}
                                            />
                                        </span>
                                    </div>
                                    <div className={styles.clientInfos}>
                                        <div className={styles.name}><b>{ item.get('name') }</b>
                                            { item.get('corp_position') ? `${item.get('corp_position')}` : '' }
                                        </div>
                                        <div className={styles.company}>{ item.get('corp_name') ? `公司：${item.get('corp_name')}` : '' }</div>
                                    </div>
                                    <div className={styles.text_remark}>{item.get('remark')}</div>
                                    <div hidden={item.get('remark')} className={styles.btn_remark}
                                        onClick={(event) => this.showRemarkDialog(event, item.get('coid'))}
                                    >备注</div>
                                </div>
                            )
                        })
                    }
                    </div>
                }
                <Dialog
                    actions={actions}
                    open={this.state.remarkDialog}
                    actionsContainerStyle={{ textAlign: 'center' }}
                >
                    <div>
                        <TextField
                            hintText="请输入您想备注的内容..."
                            multiLine
                            rows={2}
                            hintStyle={{ top: 12 }}
                            style={{ width: '100%', fontSize: 14 }}
                            underlineFocusStyle={{ borderColor: '#2196f3' }}
                            onChange={this.getReplyCont}
                            value={this.state.replyCont}
                        />
                        <div className={styles.replyTips}>
                            {
                                this.state.moreNumsVisible ? <div className={styles.errTips}>输入达到{this.props.commentNum}字</div> : ''
                            }
                            <div className={styles.replyNum}><span>{this.state.replyCont.length}</span>/{this.props.commentNum}</div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}
