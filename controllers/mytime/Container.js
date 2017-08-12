import React, { PropTypes } from 'react'
import MytimeView from 'manager/views/myTime'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { containerActions } from './actions'
import { modelSelector } from './selector'

@connect(modelSelector, containerActions)
export default class MytimeComp extends React.Component {
    static propTypes = {
        componentModel: PropTypes.instanceOf(Immutable.Map).isRequired,
        getDetailTimes: PropTypes.func.isRequired,
        getUpdateDetailTimes: PropTypes.func.isRequired,
        getAllTimes: PropTypes.func.isRequired,
        setServiceTime: PropTypes.func.isRequired
    }

    static contextTypes = {
        hideLoading: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getAllTimes()
        this.props.getDetailTimes()
    }

    componentWillUnmount() {
        this.context.hideLoading()
    }
    render() {
        return (
            <div>
                <MytimeView
                    dateTimes={this.props.componentModel.get('dateTimes')}
                    allTimes={this.props.componentModel.get('allTimes')}
                    getUpdateDetailTimes={this.props.getUpdateDetailTimes}
                    setServiceTime={this.props.setServiceTime}
                />
            </div>
        )
    }
}
