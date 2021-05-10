import React from 'react'
import Calendar from '../components/Calendar'
import Menu from '../components/Menu'
import TheMap from '../components/TheMap'


function Maps() {
    return (
        <div className="content-container">
            <Menu></Menu>
            <div>
                <Calendar></Calendar>
                <TheMap></TheMap>
            </div>
        </div>
    )
}

export default Maps
