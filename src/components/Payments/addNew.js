import React , {Component} from 'react'
import {
  Redirect
} from 'react-router-dom'
import '../../css/addNew.css';

class addNew extends Component {
  
state={
        id: '',
        title: '',
        details: '',
        amount: '0',
        date: new Date().toISOString().substr(0, 10), 
        dayalert: '0',
        paid: false,
        redirect: false,
        cancel: false
  }
  
  componentDidMount() {
    this.props.changeFlag();
  }
  renderRedirect = () => {
    if (this.state.redirect || this.state.cancel) {
      return <Redirect to = '/payments' />
    }
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
      this.props.addNew(this.state);   
  }

    handleCancel = (e) => {
      this.props.clearPath()
      this.setState({
        cancel: true
      })
    }
  render(){
    
    return (
      <div className='addnewpayment'>
        {  this.renderRedirect()
        }
        <h1>Add New Payment To Your List</h1>
        <form className="addnewpayment-form" onSubmit={this.handleSubmit}>
        
        <label htmlFor="title">Title (For): 
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
        {/* this does not work */}
        {/* <label htmlFor="">Set Alert Before the Payment Date
          <input className='text-right input-250' type="number" id="dayalert" min='0' onChange={this.handleChange} placeholder="" value={this.state.dayalert}/>
        </label> */}

        <div className="line"></div>
        <button className="btn-save">Save</button>
        <p className="btn-save" onClick={this.handleCancel}>Cancel</p>
      
      </form>
        
    </div>
  );

  }
  
}

export default addNew;