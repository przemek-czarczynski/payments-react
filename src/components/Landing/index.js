import React from 'react'
import paymentImage from '../../images/paymentsListLayout.jpg'
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';


function Landing() {

  return (
      <div className="wrapper columns">
        <div className="topInfo">
          <h1 className="topInfo-h1">Manage your bills</h1>
        </div> 
        <div className="holder columns">
          <p>We’ve all got a ton of bills to juggle and pay every month. So if you struggle to pay your bills on time or you are forgetting your monthly payments, don’t worry we have a solution for you.</p>
          <p>This application help you keep track of them and can serve as a checklist each month to be sure you don’t miss any payments.</p>

          <div className='holder-2col'>   
            <img className='layout-img' src={paymentImage} alt="layout of the main paymnets page with the bills list"/>
            <p className="layout-signup">
              Don't have an account? <Link className="btn-save" to={ROUTES.SIGN_UP}>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>

  )
}

export default Landing