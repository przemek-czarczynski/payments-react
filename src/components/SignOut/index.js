import React from 'react';
import { withFirebase } from '../Firebase';


const handleClick =( firebase )=>{
firebase.doSignOut();

}
const SignOutButton = ({firebase}) => (
  <button className='x' type="button" onClick={()=>handleClick(firebase)}>
    Sign Out
  </button>
);
export default withFirebase(SignOutButton);