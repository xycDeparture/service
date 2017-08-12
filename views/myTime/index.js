import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import styles from './styles.scss'
import TouchRipple from 'material-ui/internal/TouchRipple'
import Checkbox from 'material-ui/Checkbox'

export default class MytimeView extends React.Component {
    static propTypes = {
        allTimes: PropTypes.instanceOf(Immutable.List).isRequired,
        dateTimes: PropTypes.instanceOf(Immutable.List).isRequired,
        getUpdateDetailTimes: PropTypes.func.isRequired,
        setServiceTime: PropTypes.func.isRequired
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context)

        this.state = {
            sundayVisible: false,
            mondayVisible: false,
            tuesdayVisible: false,
            wensdayVisible: false,
            thirsdayVisible: false,
            fridayVisible: false,
            saturdayVisible: false
        }
    }

    submit = () => {
        const checkDayTime = JSON.stringify(this.props.dateTimes.toJS())
        this.props.setServiceTime(checkDayTime)
        this.context.router.push({
            pathname: '/main/appt/index'
        })
    }

    checkDayTime = tid => {
        this.props.getUpdateDetailTimes([tid])
    }

    shiftAllorEmpty = selectedDay => {
        switch (selectedDay) {
            case 'sunday': {
                this.shiftFullOrNull(7)
            }
                break
            case 'monday': {
                this.shiftFullOrNull(1)
            }
                break
            case 'tuesday': {
                this.shiftFullOrNull(2)
            }
                break
            case 'wensday': {
                this.shiftFullOrNull(3)
            }
                break
            case 'thirsday': {
                this.shiftFullOrNull(4)
            }
                break
            case 'friday': {
                this.shiftFullOrNull(5)
            }
                break
            case 'saturday': {
                this.shiftFullOrNull(6)
            }
                break
            default:
                break
        }
    }

    shiftFullOrNull = selectedDay => {
        const dayTimeSettings = this.props.allTimes.filter(item => +item.get('weekday') === selectedDay)
        const dayTimeSettingsSize = dayTimeSettings.size
        const dayTimeSettingsArr = []
        const chosedTime = []
        for (let i = 0; i < this.props.dateTimes.size; i++) {
            if (dayTimeSettings.findIndex(item => item.get('tid') === this.props.dateTimes.get(i)) !== -1) {
                chosedTime.push(this.props.dateTimes.get(i))
            }
        }
        const chosedTimeLength = chosedTime.length
        if (chosedTimeLength < dayTimeSettingsSize && chosedTimeLength > 0) {
            dayTimeSettingsArr.push(...chosedTime)
        } else {
            dayTimeSettings.forEach(item => dayTimeSettingsArr.push(item.get('tid')))
        }
        this.props.getUpdateDetailTimes(dayTimeSettingsArr)
    }

    showDetailTime = selectedDay => {
        switch (selectedDay) {
            case 'sunday':
                this.setState({
                    sundayVisible: true
                })
                break
            case 'monday':
                this.setState({
                    mondayVisible: true
                })
                break
            case 'tuesday':
                this.setState({
                    tuesdayVisible: true
                })
                break
            case 'wensday':
                this.setState({
                    wensdayVisible: true
                })
                break
            case 'thirsday':
                this.setState({
                    thirsdayVisible: true
                })
                break
            case 'friday':
                this.setState({
                    fridayVisible: true
                })
                break
            case 'saturday':
                this.setState({
                    saturdayVisible: true
                })
                break
            default:
                break
        }
    }

    dayTimeSubmit = day => {
        switch (day) {
            case 'sunday':
                this.setState({
                    sundayVisible: false
                })
                break
            case 'monday':
                this.setState({
                    mondayVisible: false
                })
                break
            case 'tuesday':
                this.setState({
                    tuesdayVisible: false
                })
                break
            case 'wensday':
                this.setState({
                    wensdayVisible: false
                })
                break
            case 'thirsday':
                this.setState({
                    thirsdayVisible: false
                })
                break
            case 'friday':
                this.setState({
                    fridayVisible: false
                })
                break
            case 'saturday':
                this.setState({
                    saturdayVisible: false
                })
                break
            default:
                break
        }
    }

    showDiffRound = day => {
        const diffRound = []
        switch (day) {
            case 'sunday':
                diffRound.push(this.produceRound(7))
                break
            case 'monday':
                diffRound.push(this.produceRound(1))
                break
            case 'tuesday':
                diffRound.push(this.produceRound(2))
                break
            case 'wensday':
                diffRound.push(this.produceRound(3))
                break
            case 'thirsday':
                diffRound.push(this.produceRound(4))
                break
            case 'friday':
                diffRound.push(this.produceRound(5))
                break
            case 'saturday':
                diffRound.push(this.produceRound(6))
                break
            default:
                break
        }
        return diffRound
    }

    produceRound = dayNum => {
        let diffRoundOne = null
        const dayTimeSettings = this.props.allTimes.filter(item => +item.get('weekday') === dayNum)
        const dayTimeSettingsSize = dayTimeSettings.size
        const chosedTime = []
        for (let i = 0; i < this.props.dateTimes.size; i++) {
            if (dayTimeSettings.findIndex(item => item.get('tid') === this.props.dateTimes.get(i)) !== -1) {
                chosedTime.push(i)
            }
        }
        const chosedTimeLength = chosedTime.length
        if (dayTimeSettingsSize === chosedTimeLength) {
            const key = `full${dayNum}`
            diffRoundOne = <div className={styles.dayChoseFull} key={key}></div>
        } else if (chosedTimeLength === 0) {
            const key = `null${dayNum}`
            diffRoundOne = <div className={styles.dayChoseNull} key={key}></div>
        } else {
            const key = `half${dayNum}`
            diffRoundOne = <div className={styles.dayChoseHalf} key={key}></div>
        }
        return diffRoundOne
    }

    hasChecked = tid => {
        let isChecked = false
        if (this.props.dateTimes.findIndex(item => item === tid) !== -1) {
            isChecked = true
        }
        return isChecked
    }
    render() {
        // console.log(this.props.dateTimes.toJS())
        return (
            <div>
                <div className={styles.title}>
                    <div className={styles.tips}>设置可预约时间(默认每周重复)</div>
                    <div style={{ position: 'relative' }} onClick={this.submit}>
                        <TouchRipple>
                            <div className={styles.submitBtn}>完成</div>
                        </TouchRipple>
                    </div>
                </div>
                <ul className={styles.worktimeCont}>
                    {
                        this.state.sundayVisible ? '' :
                        <li>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周日
                                </div>
                                <div className={styles.daySetting} onClick={ () => { this.showDetailTime('sunday') } }>
                                    设置时间
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.shiftAllorEmpty('sunday') } }>
                                    <TouchRipple>
                                        {
                                            this.showDiffRound('sunday')
                                        }
                                    </TouchRipple>
                                </div>
                            </div>
                        </li>
                    }
                    {
                        this.state.sundayVisible ?
                        <div className={styles.wortimeSetting}>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周日
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.dayTimeSubmit('sunday') } }>
                                    <TouchRipple>
                                        <div className={styles.daySure}>
                                            确定
                                        </div>
                                    </TouchRipple>
                                </div>
                            </div>
                            <div className={styles.worktimeSettingCont}>
                                {
                                    this.props.allTimes.filter(item => +item.get('weekday') === 7).map(item => {
                                        return (
                                            <div className={styles.worktimeSettingOne} key={item.get('tid') + item.get('weekday')}>
                                                <div className={styles.worktimeSettingTime}>
                                                {item.get('time')}
                                                <Checkbox
                                                    style={{ width: 24, marginLeft: 10, marginTop: 8 }}
                                                    iconStyle={{ fill: '#ff9a00', marginRight: 0 }}
                                                    defaultChecked={this.hasChecked(item.get('tid'))}
                                                    onCheck={() => { this.checkDayTime(item.get('tid')) }}
                                                />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : ''
                    }
                   {
                        this.state.mondayVisible ? '' :
                        <li>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周一
                                </div>
                                <div className={styles.daySetting} onClick={ () => { this.showDetailTime('monday') } }>
                                    设置时间
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.shiftAllorEmpty('monday') } }>
                                    <TouchRipple>
                                        {
                                            this.showDiffRound('monday')
                                        }
                                    </TouchRipple>
                                </div>
                            </div>
                        </li>
                    }
                    {
                        this.state.mondayVisible ?
                        <div className={styles.wortimeSetting}>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周一
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.dayTimeSubmit('monday') } }>
                                    <TouchRipple>
                                        <div className={styles.daySure}>
                                            确定
                                        </div>
                                    </TouchRipple>
                                </div>
                            </div>
                            <div className={styles.worktimeSettingCont}>
                                {
                                    this.props.allTimes.filter(item => +item.get('weekday') === 1).map(item => {
                                        return (
                                            <div className={styles.worktimeSettingOne} key={item.get('tid') + item.get('weekday')}>
                                                <div className={styles.worktimeSettingTime}>
                                                {item.get('time')}
                                                <Checkbox
                                                    style={{ width: 24, marginLeft: 10, marginTop: 8 }}
                                                    iconStyle={{ fill: '#ff9a00', marginRight: 0 }}
                                                    defaultChecked={this.hasChecked(item.get('tid'))}
                                                    onCheck={() => { this.checkDayTime(item.get('tid')) }}
                                                />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : ''
                    }
                     {
                        this.state.tuesdayVisible ? '' :
                        <li>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周二
                                </div>
                                <div className={styles.daySetting} onClick={ () => { this.showDetailTime('tuesday') } }>
                                    设置时间
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.shiftAllorEmpty('tuesday') } }>
                                    <TouchRipple>
                                        {
                                            this.showDiffRound('tuesday')
                                        }
                                    </TouchRipple>
                                </div>
                            </div>
                        </li>
                    }
                    {
                        this.state.tuesdayVisible ?
                        <div className={styles.wortimeSetting}>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周二
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.dayTimeSubmit('tuesday') } }>
                                    <TouchRipple>
                                        <div className={styles.daySure}>
                                            确定
                                        </div>
                                    </TouchRipple>
                                </div>
                            </div>
                            <div className={styles.worktimeSettingCont}>
                                {
                                    this.props.allTimes.filter(item => +item.get('weekday') === 2).map(item => {
                                        return (
                                            <div className={styles.worktimeSettingOne} key={item.get('tid') + item.get('weekday')}>
                                                <div className={styles.worktimeSettingTime}>
                                                {item.get('time')}
                                                <Checkbox
                                                    style={{ width: 24, marginLeft: 10, marginTop: 8 }}
                                                    iconStyle={{ fill: '#ff9a00', marginRight: 0 }}
                                                    defaultChecked={this.hasChecked(item.get('tid'))}
                                                    onCheck={() => { this.checkDayTime(item.get('tid')) }}
                                                />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : ''
                    }
                    {
                        this.state.wensdayVisible ? '' :
                        <li>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周三
                                </div>
                                <div className={styles.daySetting} onClick={ () => { this.showDetailTime('wensday') } }>
                                    设置时间
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.shiftAllorEmpty('wensday') } }>
                                    <TouchRipple>
                                        {
                                            this.showDiffRound('wensday')
                                        }
                                    </TouchRipple>
                                </div>
                            </div>
                        </li>
                    }
                    {
                        this.state.wensdayVisible ?
                        <div className={styles.wortimeSetting}>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周三
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.dayTimeSubmit('wensday') } }>
                                    <TouchRipple>
                                        <div className={styles.daySure}>
                                            确定
                                        </div>
                                    </TouchRipple>
                                </div>
                            </div>
                            <div className={styles.worktimeSettingCont}>
                                {
                                    this.props.allTimes.filter(item => +item.get('weekday') === 3).map(item => {
                                        return (
                                            <div className={styles.worktimeSettingOne} key={item.get('tid') + item.get('weekday')}>
                                                <div className={styles.worktimeSettingTime}>
                                                {item.get('time')}
                                                <Checkbox
                                                    style={{ width: 24, marginLeft: 10, marginTop: 8 }}
                                                    iconStyle={{ fill: '#ff9a00', marginRight: 0 }}
                                                    defaultChecked={this.hasChecked(item.get('tid'))}
                                                    onCheck={() => { this.checkDayTime(item.get('tid')) }}
                                                />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : ''
                    }
                    {
                        this.state.thirsdayVisible ? '' :
                        <li>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周四
                                </div>
                                <div className={styles.daySetting} onClick={ () => { this.showDetailTime('thirsday') } }>
                                    设置时间
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.shiftAllorEmpty('thirsday') } }>
                                    <TouchRipple>
                                        {
                                            this.showDiffRound('thirsday')
                                        }
                                    </TouchRipple>
                                </div>
                            </div>
                        </li>
                    }
                    {
                        this.state.thirsdayVisible ?
                        <div className={styles.wortimeSetting}>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周四
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.dayTimeSubmit('thirsday') } }>
                                    <TouchRipple>
                                        <div className={styles.daySure}>
                                            确定
                                        </div>
                                    </TouchRipple>
                                </div>
                            </div>
                            <div className={styles.worktimeSettingCont}>
                                {
                                    this.props.allTimes.filter(item => +item.get('weekday') === 4).map(item => {
                                        return (
                                            <div className={styles.worktimeSettingOne} key={item.get('tid') + item.get('weekday')}>
                                                <div className={styles.worktimeSettingTime}>
                                                {item.get('time')}
                                                <Checkbox
                                                    style={{ width: 24, marginLeft: 10, marginTop: 8 }}
                                                    iconStyle={{ fill: '#ff9a00', marginRight: 0 }}
                                                    defaultChecked={this.hasChecked(item.get('tid'))}
                                                    onCheck={() => { this.checkDayTime(item.get('tid')) }}
                                                />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : ''
                    }
                     {
                        this.state.fridayVisible ? '' :
                        <li>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周五
                                </div>
                                <div className={styles.daySetting} onClick={ () => { this.showDetailTime('friday') } }>
                                    设置时间
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.shiftAllorEmpty('friday') } }>
                                    <TouchRipple>
                                        {
                                            this.showDiffRound('friday')
                                        }
                                    </TouchRipple>
                                </div>
                            </div>
                        </li>
                    }
                    {
                        this.state.fridayVisible ?
                        <div className={styles.wortimeSetting}>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周五
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.dayTimeSubmit('friday') } }>
                                    <TouchRipple>
                                        <div className={styles.daySure}>
                                            确定
                                        </div>
                                    </TouchRipple>
                                </div>
                            </div>
                            <div className={styles.worktimeSettingCont}>
                                {
                                    this.props.allTimes.filter(item => +item.get('weekday') === 5).map(item => {
                                        return (
                                            <div className={styles.worktimeSettingOne} key={item.get('tid') + item.get('weekday')}>
                                                <div className={styles.worktimeSettingTime}>
                                                {item.get('time')}
                                                <Checkbox
                                                    style={{ width: 24, marginLeft: 10, marginTop: 8 }}
                                                    iconStyle={{ fill: '#ff9a00', marginRight: 0 }}
                                                    defaultChecked={this.hasChecked(item.get('tid'))}
                                                    onCheck={() => { this.checkDayTime(item.get('tid')) }}
                                                />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : ''
                    }
                    {
                        this.state.saturdayVisible ? '' :
                        <li>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周六
                                </div>
                                <div className={styles.daySetting} onClick={ () => { this.showDetailTime('saturday') } }>
                                    设置时间
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.shiftAllorEmpty('saturday') } }>
                                    <TouchRipple>
                                        {
                                            this.showDiffRound('saturday')
                                        }
                                    </TouchRipple>
                                </div>
                            </div>
                        </li>
                    }
                    {
                        this.state.saturdayVisible ?
                        <div className={styles.wortimeSetting}>
                            <div className={styles.worktimeItem}>
                                <div className={styles.day}>
                                    周六
                                </div>
                                <div style={{ position: 'relative' }} onClick={ () => { this.dayTimeSubmit('saturday') } }>
                                    <TouchRipple>
                                        <div className={styles.daySure}>
                                            确定
                                        </div>
                                    </TouchRipple>
                                </div>
                            </div>
                            <div className={styles.worktimeSettingCont}>
                                {
                                    this.props.allTimes.filter(item => +item.get('weekday') === 6).map(item => {
                                        return (
                                            <div className={styles.worktimeSettingOne} key={item.get('tid') + item.get('weekday')}>
                                                <div className={styles.worktimeSettingTime}>
                                                {item.get('time')}
                                                <Checkbox
                                                    style={{ width: 24, marginLeft: 10, marginTop: 8 }}
                                                    iconStyle={{ fill: '#ff9a00', marginRight: 0 }}
                                                    defaultChecked={this.hasChecked(item.get('tid'))}
                                                    onCheck={() => { this.checkDayTime(item.get('tid')) }}
                                                />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : ''
                    }
                </ul>
            </div>
        )
    }
}
