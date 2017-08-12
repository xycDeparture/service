import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import ManagerAddView from '../../views/appt/managerAdd'
import { containerActions } from './actions'
import { modelSelector } from './selector'

@connect(modelSelector, containerActions)
export default class ManagerAdd extends Component {
    static propTypes = {
        componentModel: PropTypes.any,
        getManagerParams: PropTypes.func,
        addManager: PropTypes.func
    }
    constructor(props) {
        super(props)
        this.state = {
            bizs: fromJS([]),
            positions: fromJS({})
        }
    }
    componentWillReceiveProps(nextprops) {
        this.setState({
            bizs: nextprops.componentModel.get('managerBiz'),
            positions: nextprops.componentModel.get('managerPost')
        })
    }
    render() {
        return (
            <ManagerAddView
                getManagerParams={this.props.getManagerParams}
                bizs={this.state.bizs}
                positions={this.state.positions}
                addManager={this.props.addManager}
            />
        )
    }
}
