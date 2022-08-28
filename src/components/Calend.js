import React, {useEffect, useRef, useState} from 'react'
import {humanMonth} from './humanMonth'
import Week from './Week'
import '../styles/calendar.scss'



const Calendar = (props) => {
    // const [control, setControl] = useState('')
    const [open, setOpen] = useState(props.open)
    
    const [timestamp, setTimesstamp] = useState(props.timestamp ? props.timestamp : new Date().getTime())
    const [activeWeek, setActiveWeek] = useState('')

   

    const nodeRef = useRef()

    useEffect(() => {
        window.addEventListener('mousedown', handleClose, false)
        return () => window.removeEventListener('mousedown', handleClose, false)
    }, [])

    const renderCalendar = () => {
        let month
        let year
        let day
        let day_week

        const getDateData = (stampToProcess) => {
            day_week = stampToProcess.getDay()
            month = stampToProcess.getMonth()
            year = stampToProcess.getFullYear()
            day = stampToProcess.getDate()
            return {day_week, month, year, day}
        }
        getDateData(new Date(timestamp))

        // Get the data of all days of processed date before
        let daysMonth = []
        const getDaysInMonth = (month, year) => {
            const d = new Date(year, month, 1)
            while (d.getMonth() === month) {
                daysMonth.push(new Date(d).getTime())
                d.setDate(d.getDate() + 1)
            }
            return daysMonth
        }
        getDaysInMonth(month, year)

        // Obtaining the correct format for each week
        const weeksStamps = []
        const getWeeks = () => {
            const stamp = new Date(daysMonth[0])
            const firstDay = stamp.getDay()
            const monthDays = daysMonth.length
            // Generates an array with arrays of weeks and weeks with days
            const getArrayWeeks = (times) => {
                const firstNumber = 7 * times
                const lastNumber = (times * 7) + 7
                weeksStamps.push(daysMonth.slice(firstNumber, lastNumber))
            }

            // Changes the first week approach for each first day case
            switch (firstDay) {
                // Month starts with...
                case 0: // Sunday
                    for (let times = 0; times < (daysMonth.length / 7); times++) {
                        if (times == 0) {
                            weeksStamps.push(daysMonth.slice(0, 1))
                            daysMonth = daysMonth.slice(1, monthDays)
                        }
                        getArrayWeeks(times)
                    }
                    break
                case 1: // Monday
                    for (let times = 0; times < (daysMonth.length / 7); times++) {
                        getArrayWeeks(times)
                    }
                    break
                case 2: // Tuesday
                    for (let times = 0; times < (daysMonth.length / 7); times++) {
                        if (times == 0) {
                            weeksStamps.push(daysMonth.slice(0, 6))
                            daysMonth = daysMonth.slice(6, monthDays)
                        }
                        getArrayWeeks(times)
                    }
                    break
                case 3: // Wendesday
                    for (let times = 0; times < (daysMonth.length / 7); times++) {
                        if (times == 0) {
                            weeksStamps.push(daysMonth.slice(0, 5))
                            daysMonth = daysMonth.slice(5, monthDays)
                        }
                        getArrayWeeks(times)
                    }
                    break
                case 4: // Thursday
                    for (let times = 0; times < (daysMonth.length / 7); times++) {
                        if (times == 0) {
                            weeksStamps.push(daysMonth.slice(0, 4))
                            daysMonth = daysMonth.slice(4, monthDays)
                        }
                        getArrayWeeks(times)
                    }
                    break
                case 5: // Friday
                    for (let times = 0; times < (daysMonth.length / 7); times++) {
                        if (times == 0) {
                            weeksStamps.push(daysMonth.slice(0, 3))
                            daysMonth = daysMonth.slice(3, monthDays)
                        }
                        getArrayWeeks(times)
                    }
                    break
                case 6: // Saturday
                    for (let times = 0; times < (daysMonth.length / 7); times++) {
                        if (times == 0) {
                            weeksStamps.push(daysMonth.slice(0, 2))
                            daysMonth = daysMonth.slice(2, monthDays)
                        }
                        getArrayWeeks(times)
                    }
                    break
            }
            return weeksStamps
        }
        getWeeks()

        // Renders the week on the div calendar
        const renderWeek = Object.keys(weeksStamps).map(key => (
            <Week onclicked={handleWeekClick}
                  selectedFrom={props.selectedFrom ? props.selectedFrom : null}
                  updateDate={handleClick} weekNumber={key} timestamp={timestamp} key={`gc-week-${key}`}
                  daysData={weeksStamps[key]} activeWeek={activeWeek} type={props.type ? props.type : null}/>
        ))
        month = humanMonth(month, 'long')
        return {renderWeek, month}
    }

    const handleWeekClick = (nweek) => {
        setActiveWeek(nweek)
    }

    const handleClick = (newtime) => {
        setTimesstamp(newtime)

        if (props.onChange) {
            props.onChange(newtime)
            setOpen(false)
        }
    }

    const handleClose = (e) => {
        if (nodeRef.current.contains(e.target)) return
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true)
    }
    
    

    const handleControl = (event) => {
        const operator = event.target.name

        let month, year, day, day_week
        const getDateData = (stampToProcess) => {
            day_week = stampToProcess.getDay()
            month = stampToProcess.getMonth()
            year = stampToProcess.getFullYear()
            day = stampToProcess.getDate()
            return {day_week, month, year, day}
        }

        getDateData(new Date(timestamp))

        let data
        const format = (x) => {
            data = (x < 10) ? `0${x}` : x
            return data
        }

        const number = `${operator}1`
        let _number
        if (typeof month == 'string') {
            _number = parseInt(month)
        } else _number = month

        month = (_number + 1) + parseInt(number)

        if (month == 13 || month == 0) {
            if (month == 13) {
                month = 1
                year = year + 1
            } else {
                month = 12
                year = year - 1
                if (year < 1970) {
                    year = 1970
                }
            }
        } else month = month

        if (day == 31 || day == 30 || day == 29 || day == 28) {
            const lastDayMethod = new Date(year, month, 0)
            day = parseInt(lastDayMethod.toString().split(' ')[2])
        }

        const d = new Date(`${year}-${month}-${day}`.replace(/-/g, '/')).getTime()

        setTimesstamp(d)

    }

    

    let month, year, day, date
    const getDateData = (stampToProcess) => {
        month = stampToProcess.getMonth()
        year = stampToProcess.getFullYear()
        day = stampToProcess.getDate()
        date = `${day} ${humanMonth(month)} ${year}`
        return date
    }

    return (

        <div className={`gc-calendar-input ${props.disabled == true ? 'disabled' : ''}`} ref={nodeRef}>
            <input onClick={handleOpen} disabled={props.disabled != undefined ? props.disabled : false} readOnly type="text"
                   placeholder="1 de Mayo" value={getDateData(new Date(timestamp))
            }/>
            {
                open ?
                    <div
                        className={`gc-calendar flex col end ${props.direction ? props.direction : 'down'} ${open ? '' : 'hidden'}`}>
                        {/* MONTH NAME*/}
                        <span className="gc-month-name">
                    {renderCalendar().month}

                            {/* PREV BUTTON */}
                            <button onClick={handleControl}
                                    name="-" type="button" className="gc-calendar-control prev">
                        <i className="gc-font caret"></i>
                    </button>
                            {/* NEXT BUTTON */}
                            <button onClick={handleControl} name="+" type="button" className="gc-calendar-control next">
                        <i className="gc-font caret"></i>
                    </button>

                </span>

                        {/* WEEK TITLES */}
                        <ul className="gc-days-name">
                            <li>l</li>
                            <li>m</li>
                            <li>m</li>
                            <li>j</li>
                            <li>v</li>
                            <li>s</li>
                            <li>d</li>
                        </ul>
                        {/* RENDERED WEEKS AND DAYS*/}
                        {renderCalendar().renderWeek}
                    </div>
                    : null
            }
        </div>
    )
}

export default Calendar
