import React, { useState } from "react";
import { Jumbotron, Button } from "reactstrap";
import Switch from "react-switch";
import TemperatureSection from "../TemperatureSection";

const DERConfirmation = ({ Display, isAnswered, specimenNumber }) => {
  const [isConfirm, setIsConfirm] = useState(false);
  if (Display) {
    return (
      <React.Fragment>
        <Jumbotron
          style={{
            color: "#fff",
            backgroundColor: "#212121",
          }}
        >
          <h2>Was the DER able to confirm the Donor's identity?</h2>
          <Switch
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 12,
                  color: "#FFF",
                  paddingRight: 10,
                }}
              >
                No
              </div>
            }
            checkedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 12,
                  color: "#FFF",
                  paddingLeft: 10,
                }}
              >
                Yes
              </div>
            }
            onChange={(e) => {
              setIsConfirm(e);
            }}
            checked={isConfirm}
            onColor="#5dca3a"
            offColor="#ff5200"
            onHandleColor="#000"
            offHandleColor="#000"
            handleDiameter={20}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
            height={30}
            width={60}
            className="react-switch"
          />
        </Jumbotron>
        {!isConfirm ? (
          <Button type="submit" id='options' name="btnCancelByID" color="danger">
            Cancel Test
          </Button>
        ) : (
          ""
        )}
        {isConfirm ? (
          <TemperatureSection
            specimenNumber={this.props.specimenNumber}
            isAnswered={isAnswered}
            Display={Display}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  } else {
    return (
      <TemperatureSection
        specimenNumber={specimenNumber}
        isAnswered={isAnswered}
        Display={true}
      />
    );
  }
};

export default DERConfirmation;
