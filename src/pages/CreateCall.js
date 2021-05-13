import React from "react";
import { v1 as uuid } from "uuid";

const CreateCall = (props) => {
    function create() {
        const id = uuid();
        props.history.push(`/call/${id}`);
    }
 
    return (
        <button onClick={create}>Create room</button>
    );
};

export default CreateCall;
