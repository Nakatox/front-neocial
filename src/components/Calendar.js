import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import { printCourse } from '../Webservices'


function Calendar() {
    const [check, setCheck] = useState(true)
    const [check2, setCheck2] = useState(true)
    const [courses, setCourses] = useState([])
    const [title] = useState()

    setTimeout(() => {
        document.querySelector('.fc-today-button').innerHTML = "Aujourd'hui"

    }, 500);
   
    function mooveCalendar(){
        if(!check){
            document.querySelector('.calendar-container').style.display = "none"
            setCheck(true)
        }else{
            document.querySelector('.calendar-container').style.display = "flex"
            setCheck(false)
        }
    }

    useEffect(() => {

        if(check2 === true){
            printCourse(parseInt(sessionStorage['id'])).then((data)=>{
                setCourses(data.data.course);
            })
            setCheck2(false)
            // setTitle(document.querySelector('.fc-toolbar-title').textContent)
            // document.querySelector('.fc-toolbar-title').innerHTML = `Semaine du ${title.substr(0,2)} ${months[parseInt(title.substr(3,2))]} au ${title.substr(13,2)} ${months[parseInt(title.substr(3,2))]} ${title.substr(19,4)}`
        }
        
    }, [courses,check2, title])
    
    return (
        <div>
            <div className="calendar-container">
                <div className="calendar">
                    <FullCalendar
                        plugins={[ dayGridPlugin,timeGridPlugin ]}
                        initialView="timeGridWeek"
                        // contentHeight="400px"
                        height= "auto"
                        slotMinTime = '08:00'
                        slotMaxTime = '18:00'
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
                <div className="work-day-container">
                        <div className="title">
                            <p>Devoirs du jour</p>
                            <p>Toutes</p>
                        </div>
                        <ul className="list">
                            <li>
                                <div>
                                    <input type="checkbox" />
                                    <p><span>Francais</span> - Pour le 10 Mai</p>
                                </div>
                                <p className="to-do">Rédaction La Princesse de Clèves</p>
                            </li>
                            <li>
                                <div>
                                    <input type="checkbox" />
                                    <p><span>Mathématique</span> - Pour le 10 Mai</p>
                                </div>
                                <p className="to-do">Evaluation</p>
                            </li>
                            <li>
                                <div>
                                    <input type="checkbox" />
                                    <p><span>SVT</span> - Pour le 10 Mai</p>
                                </div>
                                <p className="to-do">Evaluation</p>
                            </li>
                            <li>
                                <div>
                                    <input type="checkbox" />
                                    <p><span>Musique</span> - Pour le 10 Mai</p>
                                </div>
                                <p className="to-do">Evaluation</p>
                            </li>
                            <li>
                                <div>
                                    <input type="checkbox" />
                                    <p><span>Physique Cimie</span> - Pour le 10 Mai</p>
                                </div>
                                <p className="to-do">Evaluation</p>
                            </li>
                            <li>
                                <div>
                                    <input type="checkbox" />
                                    <p><span>Physique Cimie</span> - Pour le 10 Mai</p>
                                </div>
                                <p className="to-do">Réviser Chapitre 6 + Exo 9 p.77</p>
                            </li>
                        </ul>
                        <div className="search">
                          <input type="text" placeholder="Ajouter une nouvelle tâche" />

                        </div>
                </div>
                {/* <div className="button-drop" onClick={mooveCalendar}>
                    <img src="./img/login/arrow-down.png" alt="" className="image" />
                </div> */}
            </div>
            <div className="button-drop button-drop2" onClick={mooveCalendar}>
                <img src="./img/login/icon-calendar.png" alt="" className="image" />
            </div>
        </div>
    )
}

export default Calendar
