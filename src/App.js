import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import Main from "./containers/main";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div></div>} persistor={persistor}>
        <Router>
          <div>
            <ToastsContainer
              store={ToastsStore}
              position={ToastsContainerPosition.BOTTOM_RIGHT}
            />
            <Switch>
              <Route exact path="*" component={Main} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
