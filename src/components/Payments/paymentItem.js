import React from 'react';
import '../../css/paymentItem.css'

import left from '../functions/left'

const paymentItem = (props)=>{
  const {id, title, amount, date, paid } = props.item;
  const confirmPaid = props.confirmPaid;
  const handleEdit = props.handleEdit;

  const handlePaid = ()=>{
    confirmPaid(id)
  }

  const handleIdEdit = () => {
    handleEdit(id)
  }
  const didpaid= paid ? 
    <p className='btn-confirmed center'>Paid</p>
    :<p className='btn-not-confirmed center' onClick={handlePaid}>Mark as Paid</p>
  
  let styles = {}
  
  if (left(date) < 0 && !paid )
  {
    styles= {
    backgroundColor: 'rgb(200, 21, 21)',
    color : 'white'
    }
  } else if (left(date)===0) {
    styles = {
      backgroundColor: 'rgb(240, 191, 30)',
      color: 'white'
    }
  }  

  return (
    
    <div className='itemRow' style={styles} >
      <p className='itemRow-details ' onClick={handleIdEdit}>{title}</p>
      <p className='itemRow-details center' onClick={handleIdEdit} >{parseFloat(amount).toFixed(2)}</p>
      <p className='itemRow-details center' onClick={handleIdEdit} >{date}</p>
      <p className='itemRow-details center' onClick={handleIdEdit} >{left(date)}</p>
      {didpaid}
    </div>
    
  )
}

export default paymentItem;