import { createStructuredSelector } from 'reselect'

export const modelSelector = createStructuredSelector({
    componentModel: state => state.myTime
})
