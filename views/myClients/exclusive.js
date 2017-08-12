import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import NoData from 'manager/components/noData'
import styles from './exclusive.scss'
import handleImgOnError from 'application/utils/handleImgOnError'
export default class MyClientsExclusiveView extends Component {
    static propTypes = {
        clientLists: PropTypes.instanceOf(Immutable.List).isRequired,
        params: PropTypes.instanceOf(Immutable.Map).isRequired,
        getPrivateCustomers: PropTypes.func,
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            lastScrollHeight: 0,
            listHeight: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            const obj = document.getElementById('customerList')
            if (!!obj && document.body.scrollTop > this.state.lastScrollHeight + 10) {
                this.state.lastScrollHeight = document.body.scrollTop
                if (obj.scrollHeight - document.body.scrollTop - window.screen.height < 16) {
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

    checkCustomerDetail = id => {
        this.context.router.push({
            pathname: '/main/clientDetail',
            query: {
                Cid: id
            }
        })
    }
    render() {
        return (
            <div className={styles.main}>
                <div className={styles.totalClient}>
                    专属客户数: <b>{ this.props.params.get('total') }</b>
                </div>
                {
                    +this.props.params.get('total') === 0 ?
                    <NoData />
                    :
                     <div className={styles.clientList} id="customerList">
                    {
                        this.props.clientLists.map(item => {
                            return (
                                <div className={styles.clientItem} key={ item.get('id') } onClick={ () => {this.checkCustomerDetail(item.get('id'))} } >
                                    <div className={styles.clientImg}>
                                        <span>
                                            <img src={ process.env.NODE_ENV === 'development' ?
                                                item.get('avatar') || '' : item.get('avatar') || '' }
                                                onError={event => {handleImgOnError(event, this.props.initialize)}}
                                            />
                                        </span>
                                    </div>
                                    <div className={styles.clientInfos}>
                                        <div className={styles.name}><b>{ item.get('nickname') }</b>
                                        { item.get('position') ? item.get('position') : '' }</div>
                                        <div className={styles.company}>{ item.get('corp') ? item.get('corp') : '' }</div>
                                        <div className={styles.serveNums}>服务次数 <b>{ item.get('count') }</b></div>
                                    </div>
                                    <div className={styles.rightArrow}></div>
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
