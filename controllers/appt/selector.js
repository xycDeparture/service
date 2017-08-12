import { createStructuredSelector } from 'reselect'

export const modelSelector = createStructuredSelector({
    componentModel: state => state.appt,
    baseInfo: state => state.app.get('baseInfo'),
    initialize: state => state.app.get('initialize')
})
