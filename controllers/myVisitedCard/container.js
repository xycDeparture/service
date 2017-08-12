import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import MyVisitedCardView from 'manager/views/myVisitedCard'
@connect(modelSelector, containerActions)
export default class MyVisitedCardComp extends React.Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired,
        hideLoading: PropTypes.func,
        getSignPackage: PropTypes.func
    }

    componentDidMount() {
        // this.props.getStatusCount()
        // this.props.getServiceList({ status: 0, page: 1 })
        // this.props.getInitialize()
    }
    componentWillUnmount() {
        this.props.hideLoading()
    }
    render() {
        return (
            <div style={{ boxSizing: 'border-box' }}>
                <MyVisitedCardView
                    {...this.props}
                />
            </div>
        )
    }
}
