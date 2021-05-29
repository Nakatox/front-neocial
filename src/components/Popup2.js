import React from 'react'

function Popup2(props) {
    return (props.trigger) ?(
        <div className="popup2">
            <div className="popup-inner2">
                <button className="close-btn2" onClick={()=>{props.setTrigger(false)}}>close</button>
                <div className="popup-content2">
                    <p className="TEXTE">{props.data}</p> 
                </div>
                {props.children}
            </div>
        </div>
    ):""
}

export default Popup2
