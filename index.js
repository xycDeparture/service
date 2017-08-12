import 'reset.css'
import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import routes from './routes'
import redux from './redux'
import sagas from './sagas'
import createStore from 'application/utils/createStore'
const store = createStore(sagas, redux)

if (module.hot) {
    module.hot.accept()
}
injectTapEventPlugin()

const muiTheme = getMuiTheme({
    raisedButton: {
        primaryColor: '#0099ef',
        secondaryColor: '#ff992b'
    }
})

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <Router
                routes={routes}
                history={hashHistory}
            />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
)
