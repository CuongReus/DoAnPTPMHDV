import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, history } from "./store/index";
import App from "./App";
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';
import { CookiesProvider } from 'react-cookie';

import i18n from './utils/i18n';


ReactDOM.render(
  <Provider store={store}>
      <I18nextProvider i18n={ i18n }>
          <CookiesProvider>
              <ConnectedRouter history={history}>
                  <Switch>
                      <Route path="/" component={App} />
                  </Switch>
              </ConnectedRouter>
          </CookiesProvider>
      </I18nextProvider>
  </Provider>,
  document.getElementById("app")
);
