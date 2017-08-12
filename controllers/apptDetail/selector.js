import { createStructuredSelector } from 'reselect'

export const modelSelector = createStructuredSelector({
    componentModel: state => state.apptDetail,
    baseInfo: state => state.app.get('baseInfo'),
    commentNum: state => state.appt.get('commentNum'),
    initialize: state => state.app.get('initialize')
})
