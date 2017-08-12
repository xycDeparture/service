import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import Immutable from 'immutable'
import MyClientsCollectView from 'manager/views/myClients/collect'

@connect(modelSelector, containerActions)
export default class MyClientsCollectComp extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired,
        getCollectList: PropTypes.func,
        remarkCollection: PropTypes.func
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        hideLoading: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getCollectList({ page: 1 })
    }

    componentWillUnmount() {
        this.context.hideLoading()
    }
    render() {
        return (
            <div>
                <MyClientsCollectView
                    clientLists={this.props.componentModel.get('collectList')}
                    params={this.props.componentModel.get('params')}
                    getPrivateCustomers={this.props.getCollectList}
                    remarkCollection={this.props.remarkCollection}
                    commentNum={this.props.initialize.getIn(['word_count', 'remark_number'])}
                    initialize={this.props.initialize}
                />
            </div>
        )
    }
}
