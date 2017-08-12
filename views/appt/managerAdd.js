import React, { Component, PropTypes } from 'react'
import styles from './managerAdd.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class ManagerAddView extends Component {
    static propTypes = {
        getManagerParams: PropTypes.func,
        bizs: PropTypes.any,
        positions: PropTypes.any,
        addManager: PropTypes.func
    }
    constructor(props) {
        super(props)
        this.state = {
            curPos: '',
            mobile: '',
            chname: '',
            tel: '',
            servicesItems: [],
            timebucket: [
                '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
                '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'
            ],
            bizs: [],
            positions: []
        }
    }
    componentWillMount() {
        this.props.getManagerParams()
    }
    componentWillReceiveProps(nextprops) {
        const bizs = nextprops.bizs.toJS()
        const positions = nextprops.positions.size > 0 ? this.mkObjToArr(nextprops.positions.toJS()) : []
        this.setState({
            bizs,
            positions,
            curPos: positions.length > 0 ? positions[0]['key'] : ''
        })
    }
    mkObjToArr = obj => {
        const arr = []
        for (const item in obj) {
            if ({}.hasOwnProperty.call(obj, item)) {
                arr.push({
                    key: item,
                    value: obj[item]
                })
            }
        }
        return arr
    }
    handleClickBiz = (event, value) => {
        const servicesItems = this.state.servicesItems
        if (servicesItems.indexOf(value) > -1) {
            servicesItems.splice(servicesItems.indexOf(value), 1)
        } else {
            servicesItems.push(value)
        }
        this.setState({
            servicesItems
        })
    }
    handleChangePos = (event, index, value) => {
        this.setState({
            curPos: value
        })
    }
    handleChangeMobile = (event) => {
        const mobile = event.target.value
        this.setState({
            mobile
        })
    }
    handleChangeName = (event) => {
        const chname = event.target.value
        this.setState({
            chname
        })
    }
    handleChangeTel = (event) => {
        const tel = event.target.value
        this.setState({
            tel
        })
    }
    handleBtnSubmit = () => {
        const postData = {
            mobile: this.state.mobile,
            chname: this.state.chname,
            tel: this.state.tel,
            post: this.state.curPos,
            timebucket: this.state.timebucket.join(','),
            services_items: this.state.servicesItems.join(',')
        }
        this.props.addManager(postData)
    }
    render() {
        return (
            <div className={styles.managerCon}>
                <div className={styles.formItem}>
                    <label><i>*</i><span>手机</span></label>
                    <div className={styles.textField}>
                        <input onChange={(event) => this.handleChangeMobile(event)} type="text" maxLength="11" />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label><i>*</i><span>真实姓名</span></label>
                    <div className={styles.textField}>
                        <input onChange={(event) => this.handleChangeName(event)} type="text" />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label><span>座机号</span></label>
                    <div className={styles.textField}>
                        <input onChange={(event) => this.handleChangeTel(event)} type="text" />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label><i>*</i><span>职位</span></label>
                    <div className={styles.textField} style={{ height: '2rem', overflow: 'hidden' }}>
                        <SelectField
                            value={this.state.curPos}
                            underlineStyle={{ border: 0 }}
                            style={{ height: '1.6rem', fontSize: '0.8rem', width: '100%' }}
                            labelStyle={{ height: '2rem', lineHeight: '2.2rem' }}
                            iconStyle={{ padding: 0, width: '2rem', height: '2rem' }}
                            onChange={this.handleChangePos}
                        >
                            {
                                this.state.positions.map((item, index) => {
                                    return (
                                        <MenuItem key={`pos_${index}`} value={item.key} primaryText={item.value} />
                                    )
                                })
                        }
                        </SelectField>
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label><span>服务时间</span></label>
                    <div className={styles.textField} style={{ color: '#999' }}>
                        默认时间为周一至周五9:00-17:00
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label><i>*</i><span>服务项目</span></label>
                    <div className={styles.textField}>
                        {
                            this.state.bizs.map((item, index) => {
                                let className = styles.serveItem
                                if (this.state.servicesItems.indexOf(item.biz) > -1) {
                                    className = `${styles.serveItem} ${styles.active}`
                                }
                                return (
                                    <span
                                        className={className}
                                        key={`biz_${index}`}
                                        onClick={(event) => this.handleClickBiz(event, item.biz)}
                                    >
                                        {item.name}
                                        </span>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.formButton}>
                    <button type="button" onClick={() => this.handleBtnSubmit()}>确认添加</button>
                </div>
            </div>
        )
    }
}
