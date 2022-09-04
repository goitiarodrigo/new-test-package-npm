import React from 'react'
import Calend from './components/Calend';


export const handleSetFirstDayOfMonth = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const newDate = `${month + 1},${1},${year}`
  return new Date(newDate).getTime()
}



const Calendar = (props) => {
  const {
    direction,
    type,
    disabled,
    timestamp,
    onChangeValue,
    selectedFrom,
    styles,
    backgroundMonth,
    svgFile,
    widthContainer,
    heightContainer
  } = props

  return (
    <div style={{width: widthContainer ?? '50px', height: heightContainer ?? '55px'}}>
      <Calend
        direction={direction}
        type={type}
        disabled={disabled}
        selectedFrom={selectedFrom}
        timestamp={timestamp}
        onChange={(event) => onChangeValue(event)}
        backgroundMonth={backgroundMonth}
        svgFile={svgFile}
      />
    </div>

  )
}

export default Calendar
