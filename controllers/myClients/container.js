import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import Immutable from 'immutable'
import MyClientsView from 'manager/views/myClients'

@connect(modelSelector, containerActions)
export default class MyClientsIndexComp extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
        getPrivateCustomers: PropTypes.func
    }
    static childContextTypes = {
        message: PropTypes.func,
        location: PropTypes.object
    }
    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }
    componentDidMount() {
        // this.props.getPrivateCustomers()
    }

    render() {
        return (
            <div>
                <MyClientsView
                    baseInfo={this.props.baseInfo}
                />
            </div>
        )
    }
}
