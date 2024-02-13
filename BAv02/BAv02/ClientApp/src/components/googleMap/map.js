//? Fuentes: https://medium.com/scalereal/integration-of-google-maps-with-react-part-1-86c075ab452a
//? Fuentes2: https://medium.com/scalereal/integration-of-google-maps-with-react-part-2-947f04945910

import {
    GoogleMap,
    InfoWindow,
    Marker,
    MarkerClusterer,
    useLoadScript,
} from "@react-google-maps/api";
import { useState, useMemo } from "react";
import "./map.css";
import React from "react";

const GoogleMaps = (markers) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    });

    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();

    const markerFromAssets = {
        //path: google.maps.SymbolPath.CIRCLE,
        url: require('../../assets/icons/icons8-truck.svg'),
        anchor: new google.maps.Point(25, 50),
        //fillColor: '#EB00FF',
        fillColor: "blue",
        fillOpacity: 2,
        strokeWeight: 1,
        rotation: 0,
        scale: 1,
    }
    const newIcon = {
        icon: new google.maps.MarkerImage('../../assets/icons/icons8-truck.svg',
            null, null, null, new google.maps.Size(200, 200)),
    }

    // const onLoad = (map) => {
    //     const bounds = new google.maps.LatLngBounds();
    //     markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    //     map.fitBounds(bounds);
    // };

    const onMapLoad = (map) => {
        setMapRef(map);
        const bounds = new google.maps.LatLngBounds();
        markers.truckData?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
    };

    const handleMarkerClick = (id, lat, lng, eventName, date) => {
        mapRef?.panTo({ lat, lng });
        mapRef?.setZoom(15); //? para manejar el zoom
        setInfoWindowData({ id, eventName, date });
        setIsOpen(true);
    };

    return (
        <div className="App">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    onLoad={onMapLoad}
                    onClick={() => setIsOpen(false)}
                    // *Si no ponemos options sera el estilo default 
                    options={{ mapId: '94a076589b200607' }} // estilo logistico, sin detalles
                //options={{ mapId: 'a4e243e1d606392d' }} // estilo negro
                // options={{ mapId: '38a8a5314961ee85' }}  // estilo en gris

                >
                    {markers.truckData.map(({ eventName, lat, lng, date }, ind) => (
                        <Marker

                            icon={new google.maps.MarkerImage('../../assets/icons/icons8-truck.svg',
                                null, null, null, new google.maps.Size(35, 35))}
                            title="Click to see the event name"
                            //label={"label"}

                            key={ind}
                            position={{ lat, lng }}
                            onClick={() => {
                                handleMarkerClick(ind, lat, lng, eventName, date);
                            }}
                        >
                            {isOpen && infoWindowData?.id === ind && (
                                <InfoWindow
                                    onCloseClick={() => {
                                        setIsOpen(false);
                                    }}
                                >
                                    <>
                                        <h2>Information</h2>
                                        <h6><strong>Type: </strong> {infoWindowData.eventName}</h6>
                                        <h6><strong>Date: </strong> {infoWindowData.date}</h6></>
                                </InfoWindow>
                            )}
                        </Marker>
                    ))}
                </GoogleMap>
            )}
        </div>
    );
};

export default GoogleMaps;