import React, {Component} from 'react';
import PaymentItem from './paymentItem';
import '../../css/paymentList.css';
import '../../css/paymentItem.css';
import left from '../functions/left';

class PaymentList extends Component {
  state={
    notPaid : true,
    startDate: new Date().toISOString().substr(0, 10),
    endDate: '',
  }
  
  getDates = (days = 7 )=> {
      let pdate =  new Date();
      let year = pdate.getFullYear() ;
      let month = ( (pdate.getMonth()+1) > 9) ? (pdate.getMonth()+1) : `0${(pdate.getMonth()+1)}`;
      let day = (pdate.getDate() > 9) ? pdate.getDate(): `0${pdate.getDate()}`;
      
      const startDate = `${year}-${month}-${day}`;
      
      let endDate = pdate.getTime() + ((24 * 60 * 60 * 1000) * days)
      pdate = new Date(endDate)
      year = pdate.getFullYear();
      month = ((pdate.getMonth() + 1) > 9) ? (pdate.getMonth() + 1) : `0${(pdate.getMonth()+1)}`;
      day = (pdate.getDate() > 9) ? pdate.getDate() : `0${pdate.getDate()}`;

      endDate = `${year}-${month}-${day}`;

      this.setState({
        startDate,
        endDate
      });
    };

  componentDidMount() {
    this.getDates()  
  }

  handleChangeDate = (e)=>{
    this.setState( {
      [e.target.id]: e.target.value
    })
  }

  

  render() {
    let sortlist=[]
    const props = this.props
    const confirmPaid = props.confirmPaid;
    const handleEdit = props.handleEdit;
    const handleDelete=props.handleDelete;
    
    const compareLeftdays = (a,b)=> {
      return left(a.date) - left(b.date)
    }
  
    sortlist = props.payments.sort(compareLeftdays);
    if (this.state.notPaid) {
      let notpaidlist = [...sortlist]
      sortlist = notpaidlist.filter(item => {
        return item.paid === false && item.date >= this.state.startDate && item.date <= this.state.endDate
      })
    } else {
      sortlist = sortlist.filter(item => {
        return item.date >= this.state.startDate && item.date <= this.state.endDate
      })
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
          handleDelete={handleDelete}
          />
      </tr>  
      
      ));

    const displayh1 = () => {
        const tb = tabheader();
        return (props.payments.length > 0 ? tb : <h1> Empty List </h1>)

        }
    

    const dateRange = () => {
      return (
        <div className="dateRange">
          <label>From:
          <input type="date" id='startDate' onChange={this.handleChangeDate} value={this.state.startDate} />
          </label>

          <label>To:
          <input type="date" id='endDate' onChange={this.handleChangeDate} value={this.state.endDate} />
          </label>
        </div>
      )
    }


  

  const tabheader= ()=>{
    return (
        <div>
          
          <div className='filterRow'>
            <div className="filterRange">
              <p className="description">{this.state.notPaid ? 'Now it shows only NOT Paid your bills ' : 'Now it shows ALL your payments '}</p>
              {dateRange()}
            </div>    
            <p className='btn-save' onClick={handleNotPaid}>{!this.state.notPaid ? 'Show UnPaid' : 'Show All'}</p>
          </div>
          <div className='tbheader'>
            <p className='itemRow-details'>Title of payment</p>
            <p className='itemRow-details '>Amount</p>
            <p className='itemRow-details'>Due Date</p>
            <p className='itemRow-details'>Left days to pay</p> 
            <p className='itemRow-details'>Status</p>    
            <p className='itemRow-trash'></p>    
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