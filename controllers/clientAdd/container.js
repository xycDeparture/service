import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import Immutable from 'immutable'
import ClientAddView from 'manager/views/clientAdd'

@connect(modelSelector, containerActions)
export default class ClientAddComp extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired,
        getInviteList: PropTypes.func,
        getInviteUrl: PropTypes.func,
        getLogoOffCustomer: PropTypes.func,
        clearClientList: PropTypes.func
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        hideLoading: PropTypes.func.isRequired,
        message: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getInviteList({ page: 1 })
    }
    componentWillUnmount() {
        this.props.clearClientList()
        this.context.hideLoading()
    }
    render() {
        return (
            <div>
                <ClientAddView
                    inviteList={this.props.componentModel.get('inviteList')}
                    inviteMsgUrl={this.props.componentModel.get('inviteMsgUrl')}
                    invitedScore={this.props.componentModel.get('score')}
                    invitedUrl={this.props.componentModel.get('url')}
                    params={this.props.componentModel.get('params')}
                    baseInfo={this.props.baseInfo}
                    initialize={this.props.initialize}
                    getInviteUrl={this.props.getInviteUrl}
                    getInviteList={this.props.getInviteList}
                    getLogoOffCustomer={this.props.getLogoOffCustomer}
                    clearClientList={this.props.clearClientList}
                    residueDegree={this.props.componentModel.get('residue_degree')}
                />
            </div>
        )
    }
}
