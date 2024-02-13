import React, { useState } from "react";
import { Button, Row, Col } from "reactstrap";

const Laboratories = (props) => {
  let myToken = "pk.eyJ1IjoiaXNyYWVscGFleiIsImEiOiJjbGNwNGlhd2wxOWp2M3VvYWFjcndwdDR5In0.WZssdS1qfbHL53xboXzsrg";
  let street = props.data.address1.__text + " " + props.data.address2.__text + ". " + props.data.city.__text + '.';
  let phone = "(" + props.data.phoneNumber.areaCode.__text + ") " + props.data.phoneNumber.exchange.__text + "-" + props.data.phoneNumber.station.__text;
  let collectionSiteName = props.data.collectionSiteName.__text;
  let direction = street + " " + props.data.zip?.__text;
  let distance = props.data.distance.__text;

  const handleChange = () => {
    props.inputsEnabled(props.key);
  };

  const sendLocationdata=()=>{
    let fulldir=collectionSiteName + " " +direction;
    props.getdLocationdata(fulldir);
  }

  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${direction}.json?limit=1&types=place%2Cpostcode%2Caddress&access_token=${myToken}&autocomplete=true`;
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      props.markers(data.features[0].center, props.index);
    })

  const navHandler = (e) => {
    e.preventDefault()
    const mode = 'driving';
    //url para direccion completa en modo driving desde location
    // const url = `https://www.google.com/maps/dir/?api=1&destination=${direction}&travelmode=${mode}`;
    //url para mostrar la direccion como marcador y compartir 
    const url = `https://www.google.com/maps/place/${direction}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div style={{ position: 'relative', border: 'none', padding: "10px" }} >
      <Row>
        <Col lg="1">
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <img
              style={{ margin: 'auto', width: '40px', height: '40px' }}
              id="ImagenLabCorp"
              alt="labcorp"
              src="https://companieslogo.com/img/orig/LH-8eb9cabe.png?t=1648666607"
            />
            <h1 style={{
              color: 'whitesmoke',
              position: "absolute",
              top: "0px",
              left: "50%",
              transform: "translateX(-50%)"
            }}>{props.index + 1}</h1>
          </div>
        </Col>
        <Col lg="4">
          {street}<br />
          {"Collection Site Name: " + collectionSiteName}<br />
        </Col>
        <Col lg="3">
          {"Phone: " + phone}<br />
        </Col>
        <Col lg="2">
          {"Approx. distance: " + Number(distance).toFixed(2) + " miles"}
        </Col>
        <Col lg="1">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Button style={{ margin: "auto 0px" }} color="primary" type='button' onClick={navHandler}>Navigate</Button>
          </div>
        </Col>
        <Col lg="1">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {/* <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input> */}
            {/* <input className="form-check-input"
        type="checkbox"
        id={`inlineCheckbox${props.index}`}
        value={props.data.id}
        checked={isChecked}
        onChange={handleCheckboxChange}></input> */}
            <input
              className="form-check-input"
              type="checkbox"
              id={`inlineCheckbox${props.index}`}
              value={props.data.id}
              disabled={!props.inputsEnabled}
              onChange={handleChange}
              onClick={sendLocationdata}
            />
            {/* <label className="form-check-label" htmlFor={`inlineCheckbox${props.index}`}>
              {props.data.name}
            </label> */}
            {/* <button className="btn btn-primary" onClick={handleButtonClick}>
              Select
            </button> */}
          </div>

        </Col>
      </Row>
    </div>
  )
}

export default Laboratories;