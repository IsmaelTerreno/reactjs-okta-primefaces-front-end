import React from 'react'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
import config from './.config'
import './App.css'
import reducer from './ducks/app/app.reducer'
import ProtectedInfo from './components/protected-info/protected-info'
import Home from './containers/home/home'
import Registration from './containers/registration/registration';
import ChangePassword from './containers/change-password/change-password';
const middleware = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk, createLogger())
    )
);

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Security
                    issuer={config.oidc.issuer}
                    client_id={config.oidc.clientId}
                    redirect_uri={config.oidc.redirectUri}
                >
                    <Route path="/" exact={true} component={Home} />
                    <Route path="/registration" exact={true} component={Registration} />
                    <Route path='/credits-developer' component={() => window.location = 'https://github.com/IsmaelTerreno'}/>
                    <Route path="/implicit/callback" component={ImplicitCallback} />
                    <SecureRoute path="/protected-info" component={ProtectedInfo} />
                    <SecureRoute path="/change-password" component={ChangePassword} />
                </Security>
            </Router>
        </Provider>
    );
};

export default App;
