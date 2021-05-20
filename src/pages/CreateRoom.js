import React from "react";
import { v1 as uuid } from "uuid";
import { updateUrlRoom } from '../Webservices'
import Calendar from '../components/Calendar'
import Menu from '../components/Menu'

const CreateRoom = (props) => {
    
    function create() {
        const id = uuid();
        updateUrlRoom(`/room/${id}`,117)
        props.history.push(`/room/${id}`);
    }
 
    return (
        <div className="content-container">
            <Menu></Menu>
            <div>
                <Calendar></Calendar>
                <button onClick={create}>Create room</button>
            </div>
        </div>
    );
};

export default CreateRoom;
