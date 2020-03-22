import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import '../../css/sidebar.css';

const Navigation = () => (
    <AuthUserContext.Consumer>
      {authUser =>         
        (authUser) ? 
          <NavigationAuth authUser={authUser}/> : 
          <NavigationNonAuth />    
      }
    </AuthUserContext.Consumer>
);
class NavigationAuth extends Component { 

  state= {
    isToggled : false,
    className : ''
  }

  handleClass = ()=>{
    if(this.state.isToggled) {
      this.setState({
        isToggled : !this.state.isToggled,
        className: ''
      })
    } else {
      this.setState({
        isToggled: !this.state.isToggled,
        className: 'expanded'
      })
    }
  }
  render(){

    let nav_toggle_Styles = `nav-toggle ${this.state.className}`;
    let nav_Styles = `nav ${this.state.className}`
    
    return(
      <>
        <div className={nav_toggle_Styles} onClick={this.handleClass}>
          <div className="nav-toggle-bar"></div>
        </div>

        <nav className={nav_Styles} onClick={this.handleClass}>
          <ul>
            <li>
              <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            {/* <li>
              <Link to={ROUTES.HOME}>Home</Link>
            </li> */}
            <li>
              <Link to={ROUTES.PAYMENTS}>Payments</Link>
            </li>
            <li>
              <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
              <SignOutButton />
            </li>
          </ul>
        </nav>
      </>
    ) 
  }
};

class NavigationNonAuth extends Component {

  state = {
    isToggled: false,
    className: ''
  }

  handleClass = () => {
    if (this.state.isToggled) {
      this.setState({
        isToggled: !this.state.isToggled,
        className: ''
      })
    } else {
      this.setState({
        isToggled: !this.state.isToggled,
        className: 'expanded'
      })
    }
  }
  render(){
    let nav_toggle_Styles = `nav-toggle ${this.state.className}`;
    let nav_Styles = `nav ${this.state.className}`

    return (
      <>
      <div className={nav_toggle_Styles} onClick={this.handleClass}>
        <div className="nav-toggle-bar"></div>
      </div>
      <nav className={nav_Styles} onClick={this.handleClass}>
        <ul>
          <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
          </li>
          <li>
            <Link to={ROUTES.SIGN_IN}>Login</Link>
          </li>
        </ul>
      </nav>
      </>
    )
  }
}

export default Navigation;