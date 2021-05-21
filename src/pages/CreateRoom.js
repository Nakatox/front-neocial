import React from "react";
import { v1 as uuid } from "uuid";
import {  updateUrlRoom } from '../Webservices'
import Calendar from '../components/Calendar'
import Menu from '../components/Menu'

const CreateRoom = (props) => {
    
    function create() {
        const id = uuid();
        updateUrlRoom(`/room/${id}`,document.querySelector('.drop').value)
        props.history.push(`/room/${id}`);
    }

    const items = []

    for (let i = 101; i <= 117; i++) {
      items.push(i)
    }
    return (
        <div className="content-container">
            <Menu></Menu>
            <div>
                <Calendar></Calendar>
                <div className="createroom-container">
                    <p>Choisissez votre sale de cours :</p>
                    <select className="drop">
                        {items.map((data)=>{
                            return <option  value={data} key={data}>{data}</option>
                        })}
                    </select>
                    <button className="" onClick={create}>Créer l'appel dans cette salle</button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoom;
