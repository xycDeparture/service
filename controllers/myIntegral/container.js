import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { containerActions } from './actions'
import { modelSelector } from './selector'
import Immutable from 'immutable'
import MyIntegralView from 'manager/views/myIntegral'

@connect(modelSelector, containerActions)
export default class MyIntegralComp extends Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        baseInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
        getMyScore: PropTypes.func
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getMyScore()
    }

    render() {
        return (
            <div>
                <MyIntegralView
                    {...this.props}
                />
            </div>
        )
    }
}
