import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import BookDealListView from 'manager/views/appt/bookdeal'

@connect(modelSelector, containerActions)
export default class BookRecordComp extends React.Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired,
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
        getServiceList: PropTypes.func.isRequired,
        getStatusCount: PropTypes.func.isRequired,
        confirmStatus: PropTypes.func.isRequired,
        confirmOverStatus: PropTypes.func.isRequired,
        clearServiceList: PropTypes.func.isRequired,
        getInitialize: PropTypes.func.isRequired
    }

    static contextTypes = {
        hideLoading: PropTypes.func.isRequired
    }
    componentDidMount() {
        this.props.getStatusCount()
        this.props.getServiceList({ status: 0, page: 1 })
    }

    componentWillUnmount() {
        // this.props.clearServiceList()
        this.context.hideLoading()
    }

    render() {
        return (
            <div style={{ boxSizing: 'border-box' }}>
                <BookDealListView
                    getServiceList={this.props.getServiceList}
                    confirmStatus={this.props.confirmStatus}
                    confirmOverStatus={this.props.confirmOverStatus}
                    statusCount={this.props.componentModel.get('statusCount')}
                    serviceList={this.props.componentModel.get('serviceList')}
                    params={this.props.componentModel.get('params')}
                    clearServiceList={this.props.clearServiceList}
                    initialize={this.props.initialize}
                />
            </div>
        )
    }
}
