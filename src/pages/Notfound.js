import React from 'react'
import { NavLink } from 'react-router-dom'

function Notfound() {
    return (
        <div className="notFound-container">
            <p>Il n'y a rien ici.</p>
            <NavLink exact to = "/">Retour</NavLink>
        </div>
    )
}

export default Notfound
