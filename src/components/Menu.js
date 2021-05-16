import React from 'react'
import {NavLink, Redirect} from "react-router-dom"

function Menu() {
    let nameUser

    if(sessionStorage.getItem('profile') !== ""){
        nameUser = sessionStorage.getItem('profile')
    }else{
        <Redirect to="/"></Redirect>
    }

    function disconnectUser(){
        sessionStorage.removeItem('profile')
        sessionStorage.removeItem('id')
    }
    return (
        <div className="menu-container">
            <div className="profile">
                <img src="" alt=""/>
                <p>{nameUser}</p>
            </div>
            <div className="links">
                <ul>
                   <NavLink exact to ="/maps" activeClassName="activeNavlinkMenu"><li>Carte de l'établissement</li></NavLink>
                   <NavLink exact to ="/room" activeClassName="activeNavlinkMenu"><li>Call</li></NavLink>
                   <NavLink exact to ="/autre" activeClassName="activeNavlinkMenu"><li>Carte de l'établissement</li></NavLink>
                   <NavLink exact to ="/autre" activeClassName="activeNavlinkMenu"><li>Carte de l'établissement</li></NavLink>
                   <NavLink exact to ="/" onClick={disconnectUser} className="btn"><li>Déconnexion</li></NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Menu
