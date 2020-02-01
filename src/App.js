import React, {Component} from 'react';
import './css/app.css';

import PaymentList from './components/list/PaymentList';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AddNewPayment from './components/AddNewpayment';
import Navbar from './components/Navbar';
import SignUpPage from './components/SignUp/index';
import Navigation from './components/Navigation'

class App extends Component {
    constructor(props){
      super(props);

      // firebase.initializeApp(DB_CONFIG);

      this.state = {
        payments: [
          // {
          //   id: '0',
          //   title: 'Payment for phone',
          //   details: 'need to pay to 10.01.2020',
          //   amount: '123.55',
          //   date: '2020-01-23',
          //   dayalert: '2',
          //   paid: true
          // },
          // {
          //   id: '2',
          //   title: 'Payment for TV',
          //   details: 'need to pay to 10.01.2020',
          //   amount: '123.55',
          //   date: '2020-01-29',
          //   dayalert: '1',
          //   paid: false

          // }
        ]
      }
    }
    


    // componentWillMount() {
    //   const previousPayments = this.state.payments;
    //   this.db.database.on('child_added', snap => {
    //       previousPayments.push({
    //         id: snap.key,
    //         title: snap.val().title,
    //         details: snap.val().details,
    //         amount: snap.val().amount,
    //         date: '2020-01-29',
    //         dayalert: snap.val().dayalert,
    //         paid: false
    //       })

    //       this.setState({
    //         payments : previousPayments
    //       })
    //   })
    // }

    // addNew = (payment) => {
    //   this.database.push().set(payment)
    // }

    // addNew = (payment)=>{
    //   const id = Math.floor(Math.random()*100000);
    //   payment.id = payment.amount + id.toString();

    //   let payments=[...this.state.payments,payment]
    //   this.setState({
    //     payments
    //   })
    // }

    confirmPaid = (id)=> {
      let index =null; 
    
      this.state.payments.filter((item, i) => {
        if (item.id===id) {
            index = i; 
            return                    
        }
      });

      if (index > -1) {
        
        const payments = this.state.payments;
        payments[index].paid= true;
          this.setState({
            payments
          })
        }
      
    }
    

    render() {

      return (
        <div className="App">
         <Router>
          <header className="App-header">
            <p>Manage your paymnets every day</p>
            <Navbar/>
            <Navigation/>
          </header>
         
            <Switch>
              <Route exact path="/list">
                <PaymentList 
                  payments={this.state.payments}
                  confirmPaid={this.confirmPaid} />                
              </Route>
              <Route path="/add">             
                <AddNewPayment addNew={this.addNew}/>
              </Route>
              <Route path='/signup' component={SignUpPage}> 


              </Route>
            </Switch>
          </Router>
        </div>
      );
}
  
}

export default App;