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
        amount: '0.00',
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
        
        <form className="addnewpayment-form" onSubmit={this.handleSubmit}>
          <p className="description">Add New Payment To Your List</p>
          <label htmlFor="title">Title (For): </label>
          <input type="text" id="title" onChange={this.handleChange} value={this.state.title}/>
          

          <label className='textarea' htmlFor="details">Details:</label> 
          <textarea id="details" onChange={this.handleChange} value={this.state.details}/>
          
          <div className="form-row">
            <label>Amount:
              <input className="form-amount" type="number" step='0.01' id="amount" min='0' onChange={this.handleChange} value={this.state.amount}/>
            </label>

            <label className="form-label">Date Of Payment:     
              <input className="form-date" type="date" id='date' onChange={this.handleChange} value={this.state.date}/>
            </label> 
          </div>
          {/* this does not work */}
          {/* <label htmlFor="">Set Alert Before the Payment Date
            <input className='text-right input-250' type="number" id="dayalert" min='0' onChange={this.handleChange} placeholder="" value={this.state.dayalert}/>
          </label> */}

          <div className="line"></div>
          <div className="form-btns">
            <button className="btn-save">Save</button>
            <button className="btn-save" onClick={this.handleCancel}>Cancel</button>
          </div>
      </form>
        
    </div>
    
  );

  }
  
}

export default addNew;