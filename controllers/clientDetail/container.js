import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import Immutable from 'immutable'

import ClientDetailView from 'manager/views/clientDetail'

@connect(modelSelector, containerActions)
export default class ClientDetailComp extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired,
        getCustomerInfo: PropTypes.func,
        collectCustomer: PropTypes.func,
        cancelCustomer: PropTypes.func,
        remarkCollection: PropTypes.func,
        commentNum: PropTypes.any
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    componentDidMount() {
        const cid = this.context.location.query
        this.props.getCustomerInfo(cid)
    }

    render() {
        return (
            <ClientDetailView {...this.props} />
        )
    }
}
