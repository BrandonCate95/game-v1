import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { AI } from './middleware'

const loggerMiddleware = createLogger()

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    AI,
    loggerMiddleware // neat middleware that logs actions
  )
)

ReactDOM.render(  
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
)

registerServiceWorker()
