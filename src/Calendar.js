import React from 'react'
import Calend from './components/Calend';

export const handleSetFirstDayOfMonth = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const newDate = `${month + 1},${1},${year}`
  return new Date(newDate).getTime()
}

const Calendar = ({direction, type, disabled, timestamp, onChangeValue}) => {

  
  return (
    <Calend
      direction={direction}
      type={type}
      disabled={disabled}
      timestamp={timestamp}
      onChange={(event) => onChangeValue(event)}
    />
    // <h1>Hola</h1>
  )
}

export default Calendar
