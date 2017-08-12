import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import Immutable from 'immutable'
import MyClientsExclusiveView from 'manager/views/myClients/exclusive'

@connect(modelSelector, containerActions)
export default class MyClientsExclusiveComp extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired,
        getPrivateCustomers: PropTypes.func
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        hideLoading: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getPrivateCustomers({ page: 1 })
    }

    componentWillUnmount() {
        this.context.hideLoading()
    }
    render() {
        return (
            <div>
                <MyClientsExclusiveView
                    clientLists={this.props.componentModel.get('customerLists')}
                    params={this.props.componentModel.get('params')}
                    getPrivateCustomers={this.props.getPrivateCustomers}
                    initialize={this.props.initialize}
                />
            </div>
        )
    }
}
