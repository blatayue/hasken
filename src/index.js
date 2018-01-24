// import * as OfflinePluginRuntime from 'offline-plugin/runtime'
// OfflinePluginRuntime.install();
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import  {createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App/App'
import { reddit } from './components/Reddit/RedditRedux/RedditReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
const reducers = combineReducers({
  reddit,
})
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/App/App', () => { render(App) })
}
