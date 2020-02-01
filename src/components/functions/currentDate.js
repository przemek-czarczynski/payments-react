const currentDate = () => {
    const pdate = new Date();
    const year = pdate.getFullYear();
    const month = ((pdate.getMonth() + 1) > 9) ? (pdate.getMonth() + 1) : `0${(pdate.getMonth()+1)}`;
    const day = pdate.getDate();

    const date = `${year}-${month}-${day}`;
    return date
  };

export default currentDate