import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardBody, CardHeader, Form, Row, Col, Button, Input } from "reactstrap";
import ReactMapGL, { Marker, GeolocateControl, NavigationControl } from "react-map-gl";


const MyMapBox = () => {

  let styleMap = {
    width: "auto",
    height: "500px",
    borderRadius: "15px",
  };

  let bluagent={
    lat:32.553970,
    lng:-116.935410
  }

  let myToken =
    "pk.eyJ1IjoiaXNyYWVscGFleiIsImEiOiJjbGNwNGlhd2wxOWp2M3VvYWFjcndwdDR5In0.WZssdS1qfbHL53xboXzsrg";

  const [location, setLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => console.error(error)
    );
  }, []);

// Colores bluagent #00519d para fuerte y #5593d7
  return (
    <div>
      <Card>
        <CardHeader className='text-white' style={{backgroundColor:'#5593d7'}}>OUR COLLECTION SITE</CardHeader>
        <CardBody>
        {location.lat && (
          <div>
            <ReactMapGL
              mapboxAccessToken={myToken}
              initialViewState={{
                longitude: parseFloat(bluagent.lng),
                latitude: parseFloat(bluagent.lat),
                zoom: 16
              }}
              style={styleMap}
              mapStyle="mapbox://styles/mapbox/streets-v11"
            >
              <Marker
                longitude={parseFloat(bluagent.lng)}
                latitude={parseFloat(bluagent.lat)}
                color={"red"}
              />
              <GeolocateControl
                positionOptions={{ maxZoom: 9 }}
                trackUserLocation={true}
                showAccuracyCircle={false}
              />
              <NavigationControl />
            </ReactMapGL>
          </div>
        )}
        </CardBody>
      </Card>
    </div>
  );
};
export default MyMapBox;