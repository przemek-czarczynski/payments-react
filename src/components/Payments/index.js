import React, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import PaymentList from './paymentList';
import AddNew from './addNew';
import EditPayment from './editPayment'


import { firestore } from 'firebase';

const Payments = () => (
  <div><AuthUserContext.Consumer>
      
      {authUser => 
        
        (authUser) ? <PaymentsAuth authUser={authUser}/> : <PaymentsNonAuth />
      
      }
    </AuthUserContext.Consumer>
  </div>
);

class PaymentsAuth extends Component {

  state = {
    payments: [],
    isFetching: false,
    isFetched: false,
    isEditing: false,
    IdEdit:'',
    isAddingNew: false,
    redirectPath: ''
  }
      
  
  async componentDidMount() {
   
    let payments = [];
    const user = this.props.authUser.email;
    
    this.setState({ isFetching: true }) 

    await firestore().collection('documents').get()  
      .then(function (querySnapshot) {
 
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots

          if (user === doc.data().user) {
            let payment = doc.data();
            payment.id = doc.id
            payments.push(payment);
          }
        
        
        })
        
      
        return payments
      })
      .then(data => {
         
          this.setState({
        payments : data,
        isFetched: true })
      });

    
    this.setState({ isFetching: false })
  }
  
  handleSubmitEdit = (payment)=>{
    const {title, details, amount, date, dayalert, paid} = payment
    firestore().collection('documents').doc(this.state.IdEdit).update({
      title, details, amount, date, dayalert, paid
    })

    let tempPayments = this.state.payments.filter((item)=>(item.id!==this.state.IdEdit))
    tempPayments.push(payment)
    this.setState({
      payments : tempPayments,
      isEditing : false
    })
    
  }  
  
  
  confirmPaid = (id)=> {
    firestore().collection('documents').doc(id).update({
      paid: true
    })

    let index =null; 

    this.state.payments.filter((item, i) => {
      if (item.id===id) {
          index = i;                   
      }
      return null
    });

    if (index > -1) {
      
      const payments = this.state.payments;
      payments[index].paid= true;
        this.setState({
          payments
        })
      }
  }


  addNew = (payment)=>{       
      payment.user=this.props.authUser.email;
      firestore().collection('documents').add(payment)
      .then(function (docRef) {
          // console.log("Document written with ID: ", docRef.id);
          payment.id = docRef.id;
        })
        .catch(function (error) {
          // console.error("Error adding document: ", error);
        });
              
      let payments=[...this.state.payments,payment];    
      
      this.setState({
        payments,
        isAddingNew: false
      });     
  }

  changeFlag = ()=>{
    this.setState({isAddingNew:true})
  }

  handleEdit = (id)=>{
    this.setState({IdEdit:id})
    this.setState({isEditing: true})
    this.setState({redirectPath: 'payments/edit'})
  }

  handleDelete = (id) => {
    let newPayments = this.state.payments.filter(item => (item.id !== id));
    this.setState({payments : newPayments})
    firestore().collection("documents").doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }
  renderRedirect = ()=>{
    const path = this.state.redirectPath
    if (path) return <Redirect to={path}/>
  }

  clearPath = ()=>{
    this.setState({
      redirectPath : '',
      isEditing: false,
      isAddingNew:false
    })
  }

  showMessage = ()=> {
    return (this.state.isFetching ? <div className="center" ><h1>Fetchng Data...</h1></div> : '')
  }
  showList = ()=>{
   
    return (!this.state.isEditing && !this.state.isAddingNew? <PaymentList
                  payments={this.state.payments}
                  confirmPaid={this.confirmPaid}                 
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete} /> : '')
  }
  render(){
    // if (this.isFetched) {this.getData()}
    
    let stylesAddBtn = this.state.isAddingNew || this.state.isEditing ? {
      display: 'none'
    }: {
      display: 'flex'
    }
  
    return(
      <div className="wrapper columns">
            
        <Router>     
          {this.renderRedirect()}
          
            <div className="topInfo">
              <h1 className="topInfo-h1">Your Payments List</h1>
              <div className="topInfo-add">
                <Link to='/payments/add' className="topInfo-add-link" style={stylesAddBtn}>Add New</Link>    
              </div>
            </div>
            
          <Switch>
            <Route path="/payments/add">             
              <AddNew 
                addNew={this.addNew}
                changeFlag={this.changeFlag}
                clearPath={this.clearPath} 
              />
            </Route>    
            <Route path="/payments/edit">             
              <EditPayment 
                id={this.state.IdEdit}
                clearPath={this.clearPath} 
                handleSubmitEdit={this.handleSubmitEdit} 
                />   
            </Route>  
          </Switch> 
                
        </Router>

        {this.showMessage()}
        {this.showList()}
        
      </div>
    
    )
  }
}


const PaymentsNonAuth = () => (
  <div>Access danied. You are not log in. Please Login to your account.</div>
);

export default Payments;