import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
// import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';


const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="wrapper columns">
        <div className="topInfo">
          <h1 className="topInfo-h1">Account Details</h1>
        </div>  
        <h3>User name: {authUser.email}</h3>
        {/* <PasswordForgetForm /> */}
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);