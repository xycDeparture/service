import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import DataLoading from 'application/controllers/dataLoading'
import Message from 'application/controllers/message'
import IconHome from 'application/views/iconHome'
import ErrorPage from 'application/controllers/error'

@connect(modelSelector, containerActions)
export default class AppComp extends Component {
    static propTypes = {
        message: PropTypes.func,
        hideLoading: PropTypes.func,
        children: PropTypes.any,
        location: PropTypes.any,
        getBaseInfo: PropTypes.func,
        getInitialize: PropTypes.func,
        getSignPackage: PropTypes.func,
        getInviteCount: PropTypes.func
    }
    static childContextTypes = {
        message: PropTypes.func,
        hideLoading: PropTypes.func,
        location: PropTypes.object
    }
    getChildContext() {
        return {
            message: this.props.message,
            hideLoading: this.props.hideLoading,
            location: this.props.location
        }
    }
    componentWillMount() {
        this.props.getInitialize()
        if (this.props.location.pathname !== '/login') {
            this.props.getBaseInfo()
        }
    }
    render() {
        return (
            <div>
                <IconHome location={this.props.location} />
                {this.props.children}
                <DataLoading />
                <Message />
                <ErrorPage />
            </div>
        )
    }
}
