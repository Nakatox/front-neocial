import React from "react";
import { v1 as uuid } from "uuid";
import { sendRoomUrl } from '../Webservices'

const CreateRoom = (props) => {
    function create() {
        const id = uuid();
        sendRoomUrl(id)
        props.history.push(`/room/${id}`);
    }
 
    return (
        <button onClick={create}>Create room</button>
    );
};

export default CreateRoom;
