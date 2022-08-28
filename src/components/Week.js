import React, { useState } from "react"


const Week = (props) => {
    // let { daysData, timestamp, updateDate } = this.props

    const [selectedTimestamp, setSelectedTimestamp] = useState()
    const [selectedDay, setSelectedDay] = useState('')
    // const [weekNumber, setWeekNumber] = useState()
    // const [activeWeek, setActiveWeek] = useState()

    const handleValidateDay = (dataKey) => {
        if(dataKey > Date.now()) {
            return true
        } else {
            if(props.type && props.type === 'to') {
                if(dataKey < props.selectedFrom) {
                    return true
                }else {
                    return false
                }
            }else {
                return false
            }
        }
    }

    const handleClick = (event) => {

        props.onclicked(props.weekNumber)
        let clickedDay = parseInt(event.target.value)
        let day = new Date(clickedDay)

        let refreshDate = props.updateDate

        //Adds data active and add styles
        setSelectedTimestamp(clickedDay)
        setSelectedDay(day.getDate())
        refreshDate(clickedDay)
        
    }

    const renderDays = () => {
        let data = props.daysData

        let checkWeek = (key) => {
            if (props.activeWeek == "") {
                if (new Date(data[key]).getDate() == new Date(selectedTimestamp).getDate()) {
                    return true
                }
                else {
                    return false
                }
            }
            else {
                if ((new Date(data[key]).getDate() == new Date(selectedTimestamp).getDate()) && (props.weekNumber == props.activeWeek)) {
                    return true
                }
                else {
                    return false
                }
            }
        }

        //We print the tabs from the array data
        let _renderDays = Object.keys(data).map(key => (
            <button 
                value={data[key]}
                disabled={handleValidateDay(data[key]) }
                type="button" key={`gc-tab-${key}`}
                className={`${handleValidateDay(data[key]) ? 'disabled-button': ""} gc-day ${checkWeek(key) == true ? "active": ""}`}
                onClick={handleClick}>{new Date(data[key]).getDate()}</button>
        ))
        return _renderDays
    }

        

        return (
            <div className="gc-week flex row end">
                {renderDays()}
            </div>
        )
    
}

export default Week
