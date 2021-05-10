import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';


function Calendar() {
    const [check, setCheck] = useState(true)

    setTimeout(() => {
        document.querySelector('.fc-today-button').innerHTML = "Aujourd'hui"
        document.querySelector('.fc-today-button').style.backgroundColor = "#A8BDFF"
        document.querySelector('.fc-next-button').style.backgroundColor = "#819eff"
        document.querySelector('.fc-prev-button').style.backgroundColor = "#819eff"
    }, 5);
   
    function mooveCalendar(){
        if(!check){
            document.querySelector('.calendar-container').style.display = "none"
            document.querySelector('.image').style.transform = "rotate(180deg)"
            document.querySelector('.button-drop2').style.display = "flex"

            setCheck(true)
        }else{
            document.querySelector('.image').style.transform = "rotate(180deg)"
            document.querySelector('.calendar-container').style.display = "block"
            document.querySelector('.button-drop2').style.display = "none"
            setCheck(false)
        }
    }

    return (
        <div>
            <div className="calendar-container">
                <div className="calendar">
                    <FullCalendar
                        plugins={[ dayGridPlugin,timeGridPlugin ]}
                        initialView="timeGridWeek"
                        // contentHeight="400px"
                        height= "auto"
                        slotMinTime = '07:00'
                        slotMaxTime = '19:00'
                        dayHeaders= "false"
                        timeZone= 'local'
                        themeSystem="standard"
                        weekends={false}
                        titleFormat={[
                            {
                                hour12 : false
                            }
                        ]
                        }
                        events={[
                            {
                                title:' Cours Math srekjfr ebrerbngk r rhgirnreerbghb',
                                // daysOfWeek: [ '2' ],
                                start:'2021-04-29',
                                startTime: '10:45:00',
                                endTime: '11:45:00'
                            },
                            {
                                title:' Cours Francais',
                                daysOfWeek: [ '2' ],
                                startTime: '11:45:00',
                                endTime: '12:45:00'
                            }
                        ]}
                    />
                </div>
                <div className="button-drop" onClick={mooveCalendar}>
                    <img src="./img/login/arrow-down.png" alt="" className="image" />
                </div>
            </div>
            <div className="button-drop button-drop2" onClick={mooveCalendar}>
                <img src="./img/login/arrow-down.png" alt="" className="image" />
            </div>
        </div>
    )
}

export default Calendar
