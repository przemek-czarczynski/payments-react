
import currentDate from '../functions/currentDate'

const left = (date) => {
  const longCdate = new Date(currentDate(new Date()))
  const longPdate = new Date(date)
  return ((longPdate - longCdate) / (24 * 60 * 60 * 1000)).toFixed();

}

export default left