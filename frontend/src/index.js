import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { hot } from "react-hot-loader"
import Home from "./Containers/Home"
import Recipe from "./Containers/Recipe"
import reducers from "./reducers"
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

const WrappedRouter = () => (
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          // cant get /recipe/:id to work, but no idea why
          <Route exact path='/:id'>
            <Recipe />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)


const HotRouter = hot(module)(WrappedRouter)

ReactDOM.render(<HotRouter />, document.getElementById("home"))
