import React from "react";

const FirstStep = () => {
  return (
    <div className="row setup-content" id="step-1">
      <div className="headerContainer" style={{ marginLeft: "15px" }}>
        <h2>Welcome!</h2>
        <h4>Do you have a Drug testing program?</h4>
      </div>
      <div className="bodyContainer">
        <center style={{ width: "100%", height: "150px" }}>
          <div
            style={{
              height: "100%",
              background:
                "url(/assets/img/dashboard/front/home/drugtestf.png) center no-repeat"
            }}
          />
        </center>
        <center
          style={{ background: "#F9F9F9", width: "100%", height: "150px" }}
        >
          <p style={{ color: "#000" }}>Drug Testing</p>
          <p>If you want, you can enroll with bluAgent, click Enroll </p>
        </center>
      </div>
      <div
        className="footerContainer"
        style={{
          background: "#F6F6F6",
          width: "100%",
          height: "80px",
          display: "flex"
        }}
      >
        <div
          className="nextBtn pull-right"
          style={{
            height: "100%",
            width: "35%",
            padding: "30px",
            color: "#000",
            fontSize: "13pt"
          }}
        >
          I Have
        </div>
        <div style={{ height: "100%", width: "30%", display: "flex" }}>
          <div
            style={{
              height: "100%",
              width: "30%",
              padding: "0px",
              color: "rgb(0, 0, 0)",
              fontSize: "32pt",
              marginLeft: "25px"
            }}
          >
            .
          </div>
          <div
            style={{
              height: "100%",
              width: "30%",
              padding: "0px",
              color: "rgb(0, 0, 0)",
              fontSize: "32pt"
            }}
          >
            .
          </div>
          <div
            style={{
              height: "100%",
              width: "30%",
              padding: "0px",
              color: "rgb(0, 124, 255)",
              fontSize: "32pt"
            }}
          >
            .
          </div>
        </div>
        <div
          style={{
            height: "100%",
            width: "35%",
            textAlign: "center",
            padding: "30px",
            color: "red",
            fontSize: "16pt"
          }}
        >
          Enroll
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
