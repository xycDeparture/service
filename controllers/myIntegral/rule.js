import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import Immutable from 'immutable'
import MyPointsRuleView from 'manager/views/myIntegral/rule.js'
@connect(modelSelector, containerActions)
export default class MyIntegralRuleComp extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        getScoreTaskList: PropTypes.func
    }

    static contextTypes = {
        hideLoading: PropTypes.func.isRequired
    }
    componentDidMount() {
        this.props.getScoreTaskList()
    }

    componentWillUnmount() {
        this.context.hideLoading()
    }
    render() {
        return (
            <MyPointsRuleView {...this.props} />
        )
    }
}
