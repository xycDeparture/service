import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import Immutable from 'immutable'

import IntegralDetailView from 'manager/views/integralDetail'

@connect(modelSelector, containerActions)
export default class IntegralDetailComp extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        getScoreDetail: PropTypes.func,
        clearTaskList: PropTypes.func
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getScoreDetail({ page: 1 })
    }

    render() {
        return (
            <div>
                <IntegralDetailView
                    componentModel={this.props.componentModel}
                    getScoreDetail={this.props.getScoreDetail}
                    clearTaskList={this.props.clearTaskList}
                    params={this.props.componentModel.get('params')}
                />
            </div>
        )
    }
}
