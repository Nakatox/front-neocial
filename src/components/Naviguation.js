import React from 'react'
import {NavLink} from "react-router-dom"

const Naviguation = () => {
    return (
        <div className="naviguation">
            <NavLink exact to="/" activeClassName="nav-active">
                
            </NavLink>
        </div>
    )
}

export default Naviguation
