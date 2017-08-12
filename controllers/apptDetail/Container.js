import React, { PropTypes } from 'react'
import ApptDetailList from 'manager/views/apptDetail/list'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { containerActions } from './actions'
import { modelSelector } from './selector'

@connect(modelSelector, containerActions)
export default class ApptDetail extends React.Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired,
        getSearchService: PropTypes.func.isRequired,
        commentReply: PropTypes.func.isRequired,
        confirmStatus: PropTypes.func.isRequired,
        confirmOverStatus: PropTypes.func.isRequired,
        location: PropTypes.object,
        query: PropTypes.object,
        commentNum: PropTypes.string,
        getInitialize: PropTypes.func.isRequired,
        serviceStatusCancel: PropTypes.func.isRequired,
        getServiceCancelReasonList: PropTypes.func.isRequired,
        baseInfo: PropTypes.any
    }
    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        message: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { SID: sid } = this.props.location.query
        this.props.getSearchService({ sid })
        this.props.getServiceCancelReasonList()
    }
    render() {
        return (
            <div style={{ height: '100vh' }}>
                <ApptDetailList
                    initialize={this.props.initialize}
                    baseInfo={this.props.baseInfo}
                    location={this.props.location}
                    commentReply={this.props.commentReply}
                    confirmStatus={this.props.confirmStatus}
                    confirmOverStatus={this.props.confirmOverStatus}
                    serviceDetails={this.props.componentModel.get('serviceDetails')}
                    cancelReasonList={this.props.componentModel.get('cancelReasonList')}
                    commentNum={this.props.commentNum}
                    getInitialize={this.props.getInitialize}
                    serviceStatusCancel={this.props.serviceStatusCancel}
                    getServiceCancelReasonList={this.props.getServiceCancelReasonList}
                />
            </div>
        )
    }
}
