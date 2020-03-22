import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import '../../css/signin.css';

const SignInPage = () => (
  <div className="wrapper columns">
    <div className="topInfo">
      <h1 className="topInfo-h1">Login</h1>
    </div>  
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.PAYMENTS);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <form className="signin" onSubmit={this.onSubmit}>
        
        <label htmlFor="email">Email</label>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          // placeholder="Email Address"
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          // placeholder="Password"
        />
        {error? <p className="errorMsg">{error.message}</p> : <p className="errorMsg"></p>}

        <button disabled={isInvalid} type="submit">
          Login
        </button>
        
      </form>
    );
  }
}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
export default SignInPage;
export { SignInForm };