import React, {Component} from 'react';
import PaymentItem from './paymentItem';
import '../../css/paymentList.css';
import '../../css/paymentItem.css';
import left from '../functions/left'

class PaymentList extends Component {
  state={
    notPaid : false
  }
  
  render() {
    let sortlist=[]
    const props = this.props
    const confirmPaid = props.confirmPaid;
    const handleEdit = props.handleEdit;
    
    const compareLeftdays = (a,b)=> {
      return left(a.date) - left(b.date)
    }
  
    sortlist = props.payments.sort(compareLeftdays);
    if (this.state.notPaid) {
      let notpaidlist = [...sortlist]
      sortlist= notpaidlist.filter(item => { return item.paid===false})
    }
    

    const handleNotPaid = () => {
        this.setState({
          notPaid: !this.state.notPaid
        })
        // sortlist = sortlist.filter( item => {
        //   if (item.paid === false) { return item }
        // })

    }

  let list = sortlist.map(item => (
   
    <tr key={item.id}>
      <PaymentItem 
        item={item}
        confirmPaid={confirmPaid} 
        handleEdit={handleEdit} 
        />
    </tr>  
    
    ));

  const displayh1 = () => {
      const tb = tabheader();
      return (props.payments.length > 0 ? tb : <h1> Empty List </h1>)

      }
  
  const tabheader= ()=>{
    return (
        <div>
          <div className='columns'>
          <h1>{this.state.notPaid ? 'Not paid financial commitments' : 'All financial commitments'}</h1>
            <p className='btn-save' onClick={handleNotPaid}>{!this.state.notPaid ? 'Tylko nie zaplacone' : 'Wszystkie'}</p>
          </div>
          <div className='tbheader'>
            <p className='itemRow-details center'>Title of payment</p>
            <p className='itemRow-details center '>Amount</p>
            <p className='itemRow-details center'>Date of payment</p>
            <p className='itemRow-details center'>Status</p>
            <p className='itemRow-details center'>Left days to pay</p>     
          </div>
      </div>
    )
  }



  return (
      <div>
        <div className='listPage'>
          {displayh1()}     
          {list}    
        </div>
      </div>
    )
}
  
}

export default PaymentList;