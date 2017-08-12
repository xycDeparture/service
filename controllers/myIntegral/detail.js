import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import Immutable from 'immutable'
import MyPointsDetailView from 'manager/views/myIntegral/detail.js'
@connect(modelSelector, containerActions)
export default class MyIntegralDetailComp extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        getScoreDetail: PropTypes.func
    }

    static contextTypes = {
        hideLoading: PropTypes.func.isRequired
    }
    componentDidMount() {
        this.props.getScoreDetail()
    }

    componentWillUnmount() {
        this.context.hideLoading()
    }
    render() {
        return (
            <MyPointsDetailView {...this.props} />
        )
    }
}
