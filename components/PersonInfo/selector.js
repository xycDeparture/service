import { createStructuredSelector } from 'reselect'

export const modelSelector = createStructuredSelector({
    initialize: state => state.app.get('initialize')
})
