import React from 'react';
import {
  FirebaseContext
} from './Firebase/index';
import { firestore } from 'firebase';

const AddToDb = () =>{ 


  return (
  
<FirebaseContext.Consumer>

 {firebase => {

   // add to database
    const ref = firestore().collection('documents').doc('payment');
    ref.set({
      key:"12345"
    });
    console.log('added')
    {/* return <div> Saved to Firebase.</div>; */}
  }} 

  </FirebaseContext.Consumer>
)};

export default AddToDb;