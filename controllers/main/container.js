import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import Immutable from 'immutable'
import MainView from 'manager/views/main'
import Message from 'application/controllers/message'
import LoginLoading from 'application/views/LoginLoading'
@connect(modelSelector, containerActions)
export default class MainComp extends Component {
    static propTypes = {
        message: PropTypes.func,
        location: PropTypes.any,
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
        initialize: PropTypes.instanceOf(Immutable.Map).isRequired,
        logout: PropTypes.func,
        getIndexCount: PropTypes.func,
        getBaseInfo: PropTypes.func
    }
    componentDidMount() {
        // this.props.getBaseInfo()
        this.props.getIndexCount()
    }

    render() {
        const yueLoginLoading = window.sessionStorage.getItem('yueLoginLoading')
        return (
            <div>
            {
                yueLoginLoading ? <MainView {...this.props} /> : <LoginLoading initialize={this.props.initialize.getIn(['img', 'login_img'])} />
            }
            <Message />
            </div>
        )
    }
}
