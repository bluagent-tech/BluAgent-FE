import React from "react";
import "../../src/assets/css/SafetyComplianceReport.css";

const HeaderCards = (props) => {
  return (
    <div className="col-12 col-sm-6 col-lg-6">
      <div className="card card-height">
        <div className="card-body">
            <div className="col">
                <div className="justify-content-end d-flex">
                    <img src={props.image} className="icon-card-size"/>
                </div>
                <div className="justify-content-center d-flex">
                    {props.name ===  "notification" ? 
                    (<div className="h3">{props.data}</div>) : (<div className="h3">{props.data}%</div>)}
                </div>
                <div className="justify-content-between d-flex flex-wrap">
                    <div className="text-muted font-weight-bold text-uppercase">{props.name}</div>
                    <div><button className="btn btn-danger">View Details</button></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCards;
