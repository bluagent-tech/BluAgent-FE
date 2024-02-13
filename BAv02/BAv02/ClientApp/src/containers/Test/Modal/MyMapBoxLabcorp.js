import React, { useState, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  Marker,
  GeolocateControl,
  NavigationControl,
  Popup
} from "react-map-gl";
import { Card, CardBody, CardHeader, Form, Row, Col, Button, Input } from "reactstrap";
import Select from "../../../components/Select";
import X2JS from "x2js";
import Laboratories from "./Laboratories";
import mapboxgl from "mapbox-gl";


const MyMapBox = (props) => {
  let styleMap = {
    width: "auto",
    height: "500px",
    borderRadius: "15px"
  };

  let myToken = "pk.eyJ1IjoiaXNyYWVscGFleiIsImEiOiJjbGNwNGlhd2wxOWp2M3VvYWFjcndwdDR5In0.WZssdS1qfbHL53xboXzsrg";

  const [userLocation, setUserLocation] = useState({});
  const [suggestion, setSuggestion] = useState({});
  const [miles, setMiles] = useState("");
  const [search, setSearch] = useState({ locationName: "", CP: "" });
  const [labs, setLabs] = useState({ data: "", locationOnMap: "" })
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [inputsEnabled, setInputsEnabled] = useState(true);

  const handleInputChange = (index) => {
    setInputsEnabled(!inputsEnabled);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => console.error(error)
    );
  }, []);

  const milesHandler = (e) => {
    setMiles(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  let bounds = new mapboxgl.LngLatBounds();

  const handleMarkerlocation = (center, label) => {
    const mapLabCorps = mapRef.current.getMap();
    const img = document.createElement('img');
    img.src = 'https://companieslogo.com/img/orig/LH-8eb9cabe.png?t=1648666607';
    img.width = 40;
    img.height = 40;
    const marker = new mapboxgl.Marker(img);
    marker.setLngLat([center[0], center[1]]);
    marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(label + 1));
    marker.id = `marker-${center[0]}-${center[1]}`;
    marker.addTo(mapLabCorps);
    markersRef.current.push(marker); // Agregar a la referencia markersRef
    bounds.extend(marker.getLngLat());
    mapLabCorps.fitBounds(bounds, {
      maxZoom: 14,
      padding: { top: 50, bottom: 50, left: 50, right: 50 }
    });
  };


  const handleSearch = async (e) => {
    setSearch({ locationName: e.target.value });
    try {
      // locations without POSTCODE includes in response
      // const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${myToken}&autocomplete=true`;
      // locations with POSTCODE only
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${myToken}&autocomplete=true&types=postcode`;
      const response = await fetch(endpoint);
      const results = await response.json();
      setSuggestion(results.features);
    } catch (error) {
      console.log(error);
    }
  };

  const labcorpsHandler = async () => {
    // console.log(miles, search);
    try {
      const endpoint =
        "https://b9oct2ga0b.execute-api.us-east-1.amazonaws.com/default/labCorpOts";
      const response = await fetch(endpoint, {
        method: "POST", body: JSON.stringify({
          zip: search.CP,
          distance: miles
        })
      })
      const data = await response.text();
      const x2js = new X2JS();
      const dataclean = x2js.xml2js(data)
      const labsLABCORP = dataclean.Envelope.Body.locateCollectionSitesResponse.locateCollectionSitesReturn;
      setLabs({ data: labsLABCORP });
    } catch (error) {
      console.log(error);
    }
    setSearch({ CP: search.CP });
  }

  const removeAllMarkers = () => {
    const mapLabCorps = mapRef.current.getMap();
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    setLabs([]);
    mapRef.current.getMap().flyTo({
      center: [userLocation.lng, userLocation.lat],
      zoom: 13,
    });
    setSearch({ locationName: "" });
  };

  const handlegetLocationdata = (site) => {
    props.collectionsite(site);
  }

  return (
    <div>
      <Card>
        <CardHeader className='text-white' style={{ backgroundColor: '#5593d7' }}>FIND A LAB</CardHeader>
        <CardBody>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col lg="5" md="6" sm="12">
                <Input
                  style={{ width: "100%" }}
                  value={search.locationName}
                  onChange={handleSearch}
                  placeholder="search by zipcode"
                ></Input>
              </Col>
              <ul style={{
                width: "45%",
                top: 105,
                left: 10,
                position: "absolute",
                zIndex: 1,
                backgroundColor: "white",
                listStyleType: "none",
                paddingLeft: 14,
                cursor: "pointer"
              }}>
                {suggestion.length > 0 &&
                  suggestion.map((i) => {
                    return (
                      <li
                        onClick={() => {
                          setUserLocation({
                            // ...location,
                            lng: i.center[0],
                            lat: i.center[1],
                          });

                          setSearch({ locationName: i.place_name, CP: i.context[1]?.id.startsWith('postcode') ? i.context[1].text : i.text });
                          setSuggestion("");
                          mapRef.current.getMap().flyTo({
                            center: [i.center[0], i.center[1]],
                            zoom: 13,
                          });
                        }}
                      >
                        {i.place_name}
                      </li>
                    );
                  })}
              </ul>
              <Col lg="1" md="2" sm="12" style={{ textAlign: "center" }}>
                <label style={{ border: "auto", width: "100%", fontSize: "14px" }}>WITHIN:</label>
              </Col>
              <Col lg="3" md="4" sm="12">
                <Input type="select" value={miles} onChange={milesHandler} style={{ width: "100%" }}>
                  <option value="0">select</option>
                  <option value="10">10 miles</option>
                  <option value="25">25 miles</option>
                  <option value="50">50 miles</option>
                </Input>
              </Col>
              <Col lg="1" md="2" sm="12" style={{ textAlign: "center" }}>
                <Button type="button" color="success" onClick={labcorpsHandler}>Search</Button>
              </Col>
              <Col lg="1" md="2" sm="12" style={{ textAlign: "center" }}>
                <Button type="button" onClick={removeAllMarkers}>Remove Markers</Button>
              </Col>
            </Row>
          </Form>

          {userLocation.lat && (
            <div>
              <br></br>
              <ReactMapGL
                ref={mapRef}
                mapboxAccessToken={myToken}
                initialViewState={{
                  longitude: parseFloat(userLocation.lng),
                  latitude: parseFloat(userLocation.lat),
                  zoom: 16
                }}
                style={styleMap}
                mapStyle="mapbox://styles/mapbox/streets-v12"
              >
                {/* {markers?.map(marker => marker.remove())} */}

                <Marker
                  longitude={parseFloat(userLocation.lng)}
                  latitude={parseFloat(userLocation.lat)}
                  color={"red"}
                >

                </Marker>
                <GeolocateControl
                  positionOptions={{ enableHighAccuracy: true, timeout: 10000, maxZoom: 9 }}
                  trackUserLocation={true}
                  showAccuracyCircle={false}
                  enableHighAccuracy={true}
                />
                <NavigationControl />
              </ReactMapGL>
            </div>

          )}
        </CardBody>
      </Card>
      {labs?.data?.length > 0 ?
        <Card>
          <CardHeader className='text-white' style={{ backgroundColor: '#5593d7' }}>LABCORP'S LOCATIONS</CardHeader>
          <CardBody>
            {labs.data.map((i, index) => {
              return (
                <Laboratories
                  key={i.id}
                  markers={handleMarkerlocation}
                  data={i}
                  index={index}
                  inputsEnabled={handleInputChange}
                  getdLocationdata={handlegetLocationdata} />)
            })
            }
          </CardBody>
        </Card> : null}
    </div>
  );
};
export default MyMapBox;
