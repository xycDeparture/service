import { createStructuredSelector } from 'reselect'

export const modelSelector = createStructuredSelector({
    componentModel: state => state.myIntegral,
    baseInfo: state => state.app.get('baseInfo')
})
