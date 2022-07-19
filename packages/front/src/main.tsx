import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './app/app'
import './index.css'
import store from './store'
import { init } from './store/root/actions'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
  () => store.dispatch(init.request()),
)
