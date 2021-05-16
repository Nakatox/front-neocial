import React from 'react'
import {NavLink} from "react-router-dom"

import { MapContainer, TileLayer, Popup, Rectangle, FeatureGroup,SVGOverlay } from 'react-leaflet'


function TheMap() {

    //Appeller l'API et recup des coordonneés : (ici elles sont fictives)
    //changer le 4e chiffre apres la virgule de -1 pour avoir une salle 
    // ex :[48.866309165063306, 2.373643364075097],[48.866208165063306, 2.373543364075097],
    const buildingLocation = [48.866309165063306, 9.673643364075097]
    const roomLayer = [
        [
            //bas
            [
                [46.64, 10.398],
                [47.42, 11.91]
            ],
            "yellow",
            "Mr.Machin",
            "104"
        ],
        [
            [
                [46.64, 8.85],
                [47.42, 10.37]
            ],
            "red",
            "Mr.Machin",
            "103"
        ],
        [
            [
                [46.64, 7.34],
                [47.42, 8.85]
            ],
            "blue",
            "Mr.Trucvvv",
            "102"
        ],
        [
            [
                [46.64, 5.8],
                [47.42, 7.34]
            ],
            "green",
            "Mr.Trucvvv",
            "101"
        ],
        [
            //haut
            [
                [51.32, 10.398],
                [50.61, 11.91]
            ],
            "yellow",
            "Mr.Machin",
            "110"
        ],
        [
            [
                [51.32, 8.85],
                [50.61, 10.37]
            ],
            "red",
            "Mr.Machin",
            "111"
        ],
        [
            [
                [51.32, 7.34],
                [50.61, 8.85]
            ],
            "blue",
            "Mr.Trucvvv",
            "112"
        ],
        [
            [
                [51.32, 5.8],
                [50.61, 7.34]
            ],
            "green",
            "Mr.Trucvvv",
            "113"
        ],

        //droite
        [
            [
                [51.33, 14.02],
                [50.4198, 15.16]
            ],
            "green",
            "Mr.Trucvvv",
            "109"
        ],
        [
            [
                [50.4198, 14.02],
                [49.495, 15.16]
            ],
            "blue",
            "Mr.Trucvvv",
            "108"
        ],
        [
            [
                [49.495, 14.02],
                [48.55, 15.16]
            ],
            "red",
            "Mr.Trucvvv",
            "107"
        ],
        [
            [
                [48.55, 14.02],
                [47.6, 15.16]
            ],
            "orange",
            "Mr.Trucvvv",
            "106"
        ],
        [
            [
                [47.6, 14.02],
                [46.61, 15.16]
            ],
            "yellow",
            "Mr.Trucvvv",
            "105"
        ],
        //gauche
        [
            [
                [47.675, 3.88],
                [46.65, 5.01]
            ],
            "yellow",
            "Mr.Trucvvv",
            "117"
        ],
        [
            [
                [48.7, 3.88],
                [47.675, 5.01]
            ],
            "red",
            "Mr.Trucvvv",
            "116"
        ],
        [
            [
                [50.34, 3.88],
                [49.37, 5.01]
            ],
            "blue",
            "Mr.Trucvvv",
            "115"
        ],
        [
            [
                [51.33, 3.88],
                [50.34, 5.01]
            ],
            "green",
            "Mr.Trucvvv",
            "114"
        ],

    ]

    return (
        <div className="map-container">
            <MapContainer center={buildingLocation} zoom={20} maxZoom={7} minZoom={7}  dragging={false} >
                <TileLayer
                    // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    // url="https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=ac3f80368ca34c009896d794cddb15e3"
                    url="./img/map/test.png"
                    tileSize={1500}
                    zoomControl= {false}
                    scrollWheelZoom= {false}
                    dragging={false}
                    attributionControl={false}
                    // noWrap={true}
                    // reuseTiles={false}
                />
                {roomLayer.map((e)=>{
                    return(
                        <FeatureGroup pathOptions={{ color: e[1] }}>
                            <Popup> <NavLink exact to="https://www.npmjs.com/package/react-esri-leaflet" className="nomSalle">{e[2]}</NavLink></Popup>
                            <Rectangle bounds={e[0]} fillOpacity='-0.5'></Rectangle>
                            <SVGOverlay attributes={{ stroke: e[1] }} bounds={e[0]} opacity="0.7">
                                <rect x="0" y="0" width="100%" height="100%" fill={e[1]} opacity="0.2"/>
                                <text x="10%" y="50px" stroke="black" color="white" fontSize="35px" fontFamily="sans-serif">{e[3]}</text>
                            </SVGOverlay>
                        </FeatureGroup>
                    )
                })}
            </MapContainer>
        </div>
    )
}


export default TheMap
