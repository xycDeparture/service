import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import TouchRipple from 'material-ui/internal/TouchRipple'
import { Link } from 'react-router'
import DataLoading from 'application/controllers/dataLoading'
import Message from 'application/controllers/message'
import styles from './styles.scss'
import PersonInfo from 'manager/components/PersonInfo'
export default class MyClientsView extends Component {
    static propTypes = {
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }
    render() {
        return (
            <div className={styles.main}>
                <PersonInfo baseInfo={this.props.baseInfo} />
                <div className={styles.lists}>
                    <div style={{ position: 'relative' }} className={styles.listItem}>
                        <TouchRipple>
                            <Link to={{ pathname: 'main/myClients/exclusive' }}>
                                <div className={styles.listInfo}>
                                    <div className={styles.icon_clients}>
                                    </div>
                                    <div className={styles.fontInfo}>
                                        专属客户
                                    </div>
                                    <div className={styles.rightArrow}>
                                    </div>
                                </div>
                            </Link>
                        </TouchRipple>
                    </div>
                    <div style={{ position: 'relative' }} className={styles.listItem}>
                        <TouchRipple>
                            <Link to={{ pathname: 'main/myClients/collect' }}>
                                <div className={styles.listInfo}>
                                    <div className={styles.icon_collect}>
                                    </div>
                                    <div className={styles.fontInfo}>
                                        收藏客户
                                    </div>
                                    <div className={styles.rightArrow}>
                                    </div>
                                </div>
                            </Link>
                        </TouchRipple>
                    </div>
                </div>
                <DataLoading />
                <Message />
            </div>
        )
    }
}
