import React , {Component} from 'react'
import {
  Redirect
} from 'react-router-dom'
import '../../css/addNew.css';
import { firestore } from 'firebase';

class EditPayment extends Component {
  
state={
        id: '',
        title: '',
        details: '',
        amount: '0',
        date: '',
        dayalert: '0',
        paid: false,
        redirect: false,
        cancel: false,
        errorMsg:''
  }
  
  clearPath = this.props.clearPath;
  renderRedirect = () => {
    if (this.state.redirect || this.state.cancel) {
      this.clearPath();
      return <Redirect to = '/payments' />
    }
  }
  async componentDidMount(){
    //  firestore().collection('documents').get()
     
    const refState = this.state;
    
     const docRef = firestore().collection('documents').doc(this.props.id);

     await docRef.get().then(function (doc) {
       if (doc.exists) {
          refState.title= doc.data().title
          refState.details= doc.data().details
          refState.amount= doc.data().amount
          refState.date= doc.data().date
          refState.dayalert= doc.data().dayalert
          refState.paid= doc.data().paid
          // return this.refState       
       } 
     })     
     .catch(function (error) {
       console.log("Error getting document:", error);
     });
     
     const {title, details, amount, date, dayalert, paid} = refState;
     this.setState({
       id: this.props.id,
       title,
       details,
       amount,
       date,
       dayalert,
       paid
     })
    
  }

  handlePaid = (e)=>{
     this.setState( {
      paid: (e.currentTarget.value==='1' ? true : false)
    })
  }

  handleChange= (e) =>{  
    this.setState( {
      [e.target.id]: e.target.value,
      errorMsg:''
    })
  }

  handleSubmit = (e)=>{
     e.preventDefault();
     if (this.state.title === '' || this.state.amount === '' || parseFloat(this.state.amount) <= 0) {
       this.setState({
         errorMsg: 'The Title field cannot be empty and Amount must be greater than 0'
       })
       return null
     } else {
      this.setState({
        redirect: true
      })     
      this.setState({refState: null})
      this.props.handleSubmitEdit(this.state);   
  }
}

  handleCancel = (e) => {
    this.setState({
      cancel: true
    })
  }

  isPaid = ()=> {
    const ispaid = !this.state.paid ? '0' : '1'; 
    return (
    <label className="form-isPaid">Payment is Paid
          <select name='paid' value={ispaid} onChange={this.handlePaid}>
            <option value='1'>Yes</option>
            <option value='0' >No</option>
            
          </select>
    </label>
  )}

  render(){
    
    return (
      
      <div className='addnewpayment'>
        {  this.renderRedirect()
        }
        
        <form className="addnewpayment-form" onSubmit={this.handleSubmit}>
          <p className="description">Edit Payment Details</p>
          <label htmlFor="title">Title: 
            <input className='input-450' type="text" id="title" onChange={this.handleChange} value={this.state.title}/>
          </label>

          <label className='textarea' htmlFor="details">Details: 
            <textarea className='input-450' id="details" onChange={this.handleChange} value={this.state.details}/>
          </label>

          <div className="form-row">
            <label>Amount:
              <input className="form-amount" type="number" step='0.01' id="amount" min='0' onChange={this.handleChange} value={this.state.amount}/>
            </label>

            <label className="form-label">Date Of Payment:      
              <input className="form-date" type="date" id='date' onChange={this.handleChange} value={this.state.date}/>
            </label>
          </div>
            {this.isPaid()}
          
          {/* <label htmlFor="">Set Alert Before Date of Payment
            <input className='text-right input-250' type="number" id="dayalert" min='0' onChange={this.handleChange} value={this.state.dayalert}/>
          </label> */}

          

          <div className="line"></div>
          <div className="form-btns">
            <button className="btn-save">Zapisz</button>
            <button className="btn-save" onClick={this.handleCancel}>Anuluj</button>
          </div>
      </form>
      <p className='errorMsg'>{this.state.errorMsg ? this.state.errorMsg : ''}</p>   
    </div>
  );

  }
  
}

export default EditPayment;