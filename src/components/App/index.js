import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import PaymentsPage from '../Payments';
import EditPaymentPage from '../Payments/editPayment';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';

// import {
//   AuthUserContext
// } from '../Session';
// import withAuthentication from './withAuthentication';
import { withAuthentication } from '../Session';


const App = () => (
      <Router>
        <div>
          <Navigation />
           
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.PAYMENTS} component={PaymentsPage} />
            <Route path={ROUTES.EDITPAYMENT} component={EditPaymentPage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
           
        </div>
      </Router>
 );

 export default withAuthentication(App);