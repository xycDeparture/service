import { createStructuredSelector } from 'reselect'

export const modelSelector = createStructuredSelector({
    componentModel: state => state.clientDetail,
    baseInfo: state => state.app.get('baseInfo'),
    commentNum: state => state.app.getIn(['initialize', 'word_count', 'remark_number']),
    initialize: state => state.app.get('initialize')
})
