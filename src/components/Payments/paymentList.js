import React, {Component} from 'react';
import PaymentItem from './paymentItem';
import '../../css/paymentList.css';
import '../../css/paymentItem.css';
import left from '../functions/left';

class PaymentList extends Component {
  state={
    notPaid : true,
    startDate : '',
    endDate : ''
  }
  
  getDates = ()=> {
      const pdate =  new Date();
      const year = pdate.getFullYear() ;
      const month = ( (pdate.getMonth()+1) > 9) ? (pdate.getMonth()+1) : `0${(pdate.getMonth()+1)}` ;
      const day = (pdate.getDate() > 9) ? pdate.getDate(): `0${pdate.getDate()};`

      const date1 = `${year}-${month}-${day}`;
      const date2 = `${year}-${month}-${day}`;
      console.log(typeof(date1))
      this.setState({
        startDate: date1,
        endDate: date2
      });
    };

  async componentDidMount() {
    console.log(this.state.startDate)
    await this.getDates()  
  }

  handleChangeDate = (e)=>{
    console.log(typeof(e.target.value))
    this.setState( {
      [e.target.id]: e.target.value
    })
  }

  dateRange = ()=> {
    return (
      <>
        <label>From:           
          <input type="date" id='startDate' onChange={this.handleChangeDate} value={this.state.startDate}/>
        </label>
        
        <label>To:      
          <input type="date" id='endDate' onChange={this.handleChangeDate} value={this.state.endDate}/>
        </label>
      </>
    )
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
          <h1>{this.state.notPaid ? 'Not paid financial commitments' : 'All financial commitments'}</h1>
          <div className='filterRow'>
            {this.dateRange()}
          
            <p className='btn-save' onClick={handleNotPaid}>{!this.state.notPaid ? 'Show Only UnPaid' : 'Show All'}</p>
          </div>
          <div className='tbheader'>
            <p className='itemRow-details'>Title of payment</p>
            <p className='itemRow-details '>Amount</p>
            <p className='itemRow-details'>Date of payment</p>
            <p className='itemRow-details'>Left days to pay</p> 
            <p className='itemRow-details'>Status</p>    
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