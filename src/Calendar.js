import React from 'react'
import Calend from './components/Calend';


export const handleSetFirstDayOfMonth = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const newDate = `${month + 1},${1},${year}`
  return new Date(newDate).getTime()
}



const Calendar = ({direction, type, disabled, timestamp, onChangeValue, selectedFrom}) => {

  
  return (
    <Calend
      direction={direction}
      type={type}
      disabled={disabled}
      selectedFrom={selectedFrom}
      timestamp={timestamp}
      onChange={(event) => onChangeValue(event)}
    />

  )
}

export default Calendar
