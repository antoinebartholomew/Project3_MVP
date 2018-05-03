import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import Landing from './components/Landing/Landing.js';
import User from './components/User/User.js';
import Signin from './components/Signin/Signin.js';
import Signup from './components/Signup/Signup.js';
import Find from './components/Find/Find.js';
import Found from './components/Found/Found.js';
import Nopage from './components/Nopage/Nopage.js';
import './App.css';

const isAuthenticated = JSON.parse(sessionStorage.getItem('isAuthenticated'));

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            exact
            {...rest}
            render={(props) => (isAuthenticated)
                ? <Component {...props} />
                : <Redirect to={{pathname: '/signin'}}/>}
        />
    )
};

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            exact
            {...rest}
            render={(props) => (!isAuthenticated) ? <Component {...props} /> : <Redirect to={{pathname: '/user'}} /> }
        />
    )
};

const App = (props) => (
    <div className="routerDiv">
        <Router>
        <Switch>
        <PublicRoute exact path="/" component={Landing}/>
        <PublicRoute exact path="/signup" component={Signup}/>
        <PublicRoute exact path="/signin" component={Signin}/>
        <PrivateRoute exact path="/find" component={Find}/>
        <PrivateRoute exact path="/user" component={User}/>
        <PrivateRoute exact path="/found" component={Found}/>
        <Route component={Nopage}/>
        </Switch>
        </Router>
    </div>

);

export default App;
