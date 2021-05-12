import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import { printCourse } from '../Webservices'


function Calendar() {
    const [check, setCheck] = useState(true)
    const [check2, setCheck2] = useState(true)
    const [courses, setCourses] = useState([])

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

    useEffect(() => {

        if(check2 === true){
            printCourse(parseInt(sessionStorage['id'])).then((data)=>{
                setCourses(data.data.course);
                console.log(data.data.course);
            })
            setCheck2(false)
        }
        
    }, [courses,check2])
    
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
                        locale= 'fr'
                        themeSystem="standard"
                        weekends={false}
                        titleFormat={[
                            {
                                hour12 : false
                            }
                        ]
                        }
                        events={courses}
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
