import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import PrivateRoute from './components/PrivateRoute';
import './App.scss';

const loading = () => (
  <div className='animated fadeIn pt-3 text-center'>Loading...</div>
);

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading,
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading,
});

const ForgotPassword = Loadable({
  loader: () => import('./views/Pages/ForgotPassword/ForgotPassword'),
  loading,
});

const ResetPassword = Loadable({
  loader: () => import('./views/Pages/ForgotPassword/ResetPassword'),
  loading,
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading,
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading,
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading,
});

const EmployHis = Loadable({
  loader: () => import('./views/Drivers/EmployHis'),
  loading,
});

const LetterIn = Loadable({
  loader: () => import('./views/Drivers/LetterIn'),
  loading,
});

const LetterInAndEmployHis = Loadable({
  loader: () => import('./views/Drivers/LetterInAndEmployHis'),
  loading,
});

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/login' name='Login Page' component={Login} />
          <Route
            exact
            path='/resetPassword/:token'
            name='ResetPassword Page'
            component={ResetPassword}
          />
          <Route
            exact
            path='/login:token'
            name='Login Page'
            component={Login}
          />
          <Route
            exact
            path='/forgotPassword'
            name='ForgotPassword Page'
            component={ForgotPassword}
          />
          <Route
            exact
            path='/register'
            name='Register Page'
            component={Register}
          />
          <Route exact path='/404' name='Page 404' component={Page404} />
          <Route exact path='/500' name='Page 500' component={Page500} />
          <Route
            exact
            path='/EmployHistory/:x'
            name='EmployHistory'
            component={EmployHis}
          />
          <Route
            exact
            path='/LetterOfInquiry/:x'
            name='LetterOfInquiry'
            component={LetterIn}
          />
          <Route
            exact
            path='/LetterInAndEmployHis/:x'
            name='LetterInAndEmployHis'
            component={LetterInAndEmployHis}
          />
          <PrivateRoute path='/' name='Home' component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
