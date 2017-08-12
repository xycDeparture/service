import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import DataLoading from 'application/controllers/dataLoading'
import Message from 'application/controllers/message'
import MyCardView from 'manager/views/myVisitedCard/mycard'

@connect(modelSelector, containerActions)
export default class MyCardComp extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        getCallingCard: PropTypes.func.isRequired,
        getSignPackage: PropTypes.func,
        hideLoading: PropTypes.func,
        getInitialize: PropTypes.func,
        location: PropTypes.object
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    componentWillMount() {
        this.props.getInitialize()
    }
    componentDidMount() {
        const query = this.props.location.query
        this.props.getSignPackage()
        this.props.getCallingCard(query)
    }
    componentWillUnmount() {
        this.props.hideLoading()
    }
    render() {
        return (
            <span>
                <MyCardView
                    componentModel={this.props.componentModel}
                    getCallingCard={this.props.getCallingCard}
                    location={this.props.location}
                />
                <DataLoading />
                <Message />
            </span>
        )
    }
}
