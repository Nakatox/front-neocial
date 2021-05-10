import React from 'react'
import Menu from '../components/Menu'
import Calendar from '../components/Calendar'


function Call() {
    return (
        <div className="content-container">
            <Menu></Menu>
            <div>
                <Calendar></Calendar>
            </div>
        </div>
    )
}

export default Call
