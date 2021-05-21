import React, {useEffect,useState} from 'react'
import Calendar from '../components/Calendar'
import Menu from '../components/Menu'
import Popup2 from '../components/Popup2'
import {getAllRessources} from '../Webservices'


function ShareFiles() {
    const [data, setdata] = useState([])
    const [check, setCheck] = useState(true)
    const [dataForPopup, setdataForPopup] = useState("")
    const [buttonPopup, setbuttonPopup] = useState(false)

    useEffect(() => {
        if(check===true){
            getAllRessources().then((data)=>{
                setdata(data.data)
            })
            setCheck(false)
        }
    }, [data,check])

    const setPopup = (e) => {
        setdataForPopup(e)
    }
    return (
        <div className="content-container">
            <Menu></Menu>
            <div>
                <Calendar></Calendar>
                <div className="share-container">
                    <p className="title">Mes fichiers</p>
                    <div className="content">
                        <div>
                            <p>Nom du fichier</p>
                            <p>Matière</p>
                            <p>Professeur</p>
                        </div>
                        <Popup2 trigger={buttonPopup} data={dataForPopup} setTrigger={setbuttonPopup}></Popup2>
                        {data.map((e, i)=>{
                            return(
                                <div key={i} className={i % 2 ? "data-white":"data-blue"} onClick={()=>{setPopup(e.json); setbuttonPopup(true)}}>
                                    <p>{e.json.substr(0,10)}</p>
                                    <p>{e.title}</p>
                                    <p>{e.last_name}</p>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareFiles
