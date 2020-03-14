import React from 'react';
import { withAuthorization } from '../Session';
const HomePage = () => (
  <div className="wrapper columns">
    <div className="topInfo">
      <h1 className="topInfo-h1">Home Page</h1>
    </div>
    <div className="holder columns">
      <p>The Home Page is accessible by every signed in user.</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim sapiente placeat quisquam modi maxime unde aspernatur natus mollitia quos laborum dignissimos animi minima molestias, totam cum nemo, accusamus, recusandae velit.</p>
    </div>
   
  </div>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);