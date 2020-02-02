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
        cancel: false
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
      paid: (e.currentTarget.value ? true : false)
    })
  }

  handleChange= (e) =>{  
    this.setState( {
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e)=>{
      this.setState({
        redirect: true
      })
      e.preventDefault();
      this.setState({refState: null})
      this.props.handleSubmitEdit(this.state);   
  }

  handleCancel = (e) => {
    this.setState({
      cancel: true
    })
  }

  render(){
    return (
      
      <div className='addnewpayment'>
        {  this.renderRedirect()
        }
        <h1>Edit Payment Details</h1>
        <form className="addnewpayment-form" onSubmit={this.handleSubmit}>
        
        <label htmlFor="title">Title: 
          <input className='input-450' type="text" id="title" onChange={this.handleChange} value={this.state.title}/>
        </label>

        <label className='textarea' htmlFor="details">Details: 
          <textarea className='input-450' id="details" onChange={this.handleChange} value={this.state.details}/>
        </label>

        <label htmlFor="amount">Amount:
          <input className='text-right input-250' type="number" step='0.01' id="amount" min='0' onChange={this.handleChange} value={this.state.amount}/>
        </label>

        <label htmlFor="amount">Date Of Payment:      
          <input className='text-right input-250' type="date" id='date' onChange={this.handleChange} value={this.state.date}/>
        </label>

        <label htmlFor="">Set Alert Before Date of Payment
          <input className='text-right input-250' type="number" id="dayalert" min='0' onChange={this.handleChange} value={this.state.dayalert}/>
        </label>

        <label>Payment is Paid
          <select name='paid' onChange={this.handlePaid}>
            <option value='1'>Yes</option>
            <option value=''>No</option>
          </select>
        </label>

        <div className="line"></div>
        <button className="btn-save">Zapisz</button>
        <p className="btn-save" onClick={this.handleCancel}>Anuluj</p>
      
      </form>
        
    </div>
  );

  }
  
}

export default EditPayment;