import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import ApptIndexView from 'manager/views/appt'

@connect(modelSelector, containerActions)
export default class ApptComp extends React.Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
        getServiceList: PropTypes.func.isRequired,
        getStatusCount: PropTypes.func.isRequired,
        confirmStatus: PropTypes.func.isRequired,
        confirmOverStatus: PropTypes.func.isRequired,
        clearServiceList: PropTypes.func.isRequired,
        getInitialize: PropTypes.func.isRequired
    }

    componentDidMount() {
        // this.props.getStatusCount()
        // this.props.getServiceList({ status: 0, page: 1 })
        // this.props.getInitialize()
    }

    componentWillUnmount() {
        // this.props.clearServiceList()
    }

    render() {
        return (
            <div style={{ boxSizing: 'border-box' }}>
                <ApptIndexView
                    baseInfo={this.props.baseInfo}
                    componentModel={this.props.componentModel}
                />
            </div>
        )
    }
}
