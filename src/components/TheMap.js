import React from 'react'
import {NavLink} from "react-router-dom"

import { MapContainer, TileLayer, Marker, Popup, Rectangle, FeatureGroup,SVGOverlay } from 'react-leaflet'


function TheMap() {

    //Appeller l'API et recup des coordonneés : (ici elles sont fictives)
    //changer le 4e chiffre apres la virgule de -1 pour avoir une salle 
    // ex :[48.866309165063306, 2.373643364075097],[48.866208165063306, 2.373543364075097],

    const buildingLocation = [48.866309165063306, 2.373643364075097]
    const roomLayer = [
        [
            [
                [48.866309165063306, 2.373643364075097],
                [48.866208165063306, 2.373543364075097]
            ],
            "red",
            "Mr.Machin",
            "204"
        ],
        [
            [
                [48.866209165063306, 2.373543364075097],
                [48.866108165063306, 2.373443364075097]
            ],
            "blue",
            "Mr.Trucvvv",
            "402"
        ]
    ]

    return (
        <div className="map-container">
            <MapContainer center={buildingLocation} zoom={21} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=ac3f80368ca34c009896d794cddb15e3"
                    maxZoom={22}
                />
                {roomLayer.map((e)=>{
                    return(
                        <FeatureGroup pathOptions={{ color: e[1] }}>
                            <Popup> <NavLink exact to="https://www.npmjs.com/package/react-esri-leaflet" className="nomSalle">{e[2]}</NavLink></Popup>
                            <Rectangle bounds={e[0]}></Rectangle>
                            <SVGOverlay attributes={{ stroke: e[1] }} bounds={e[0]} opacity="0.7">
                                <rect x="0" y="0" width="100%" height="100%" fill={e[1]} opacity="0.4"/>
                                <text x="10%" y="50px" stroke="black" color="white" font fontSize="35px" fontFamily="sans-serif">{e[3]}</text>
                            </SVGOverlay>
                        </FeatureGroup>
                    )
                })}
            </MapContainer>
        </div>
    )
}


export default TheMap
