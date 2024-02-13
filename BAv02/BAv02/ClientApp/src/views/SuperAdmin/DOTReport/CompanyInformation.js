import React from "react";

const CompanyInformation = (props) => {

  const CarrierOperation = (option) => {

    if(option === "A"){
        return "Interstate"
    }
    if(option === "B"){
        return "Intrastate Hazmat"
    }
    if(option === "C"){
        return "Intrastate Non-Hazmat"
    }
  }

  return (
    props.data !== undefined ?     <div>
    <div className="row">
      <div className="col pl-0">
        <h4 className="text-muted">Company Information</h4>
        <hr></hr>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Legal Company Name: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.LEGAL_NAME} </p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>DBA Name: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.DBA_NAME !== "" ? props.data.DBA_NAME : "N/A" }</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>US DOT: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.DOT_NUMBER}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-4">
      <div className="col pl-0">
        <h4 className="text-muted">Operathing Authority</h4>
        <hr></hr>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Company Operations: </p>
          </div>
          <div className="col pl-0">
            <p>{CarrierOperation(props.data.CARRIER_OPERATION)}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-4">
      <div className="col pl-0">
        <h4 className="text-muted">Contact Information</h4>
        <hr></hr>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Adress: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.PHY_STREET}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Mailing Adress: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.MAILING_STREET}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Business Phone Number: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.TELEPHONE}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Email: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.EMAIL_ADDRESS}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-4">
      <div className="col pl-0">
        <h4 className="text-muted">Cargo</h4>
        <hr></hr>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Hazmat: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.HM_FLAG === 'N' ? 'NO' : 'YES'}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Passengercarrier: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.PC_FLAG === 'N' ? 'NO' : 'YES'}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Propery: </p>
          </div>
          <div className="col pl-0">
            <p>{(props.data.HM_FLAG === 'N' && props.data.PC_FLAG === 'N') || (props.data.HM_FLAG === 'Y' && props.data.PC_FLAG === 'N') ? 'YES' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-4">
      <div className="col pl-0">
        <h4 className="text-muted">MCS-150/B</h4>
        <hr></hr>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Last Filing Date: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.MCS150_DATE.slice(0,10)}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Vehicle Mileage Traveled: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.MCS150_MILEAGE !== '' ? props.data.MCS150_MILEAGE : 'N/A'}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>VMT Update Date: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.MCS150_MILEAGE_YEAR !== '' ? props.data.MCS150_MILEAGE_YEAR : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-4">
      <div className="col pl-0">
        <h4 className="text-muted">Carrier History</h4>
        <hr></hr>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Power Units: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.NBR_POWER_UNIT}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col pl-0">
            <p>Drivers: </p>
          </div>
          <div className="col pl-0">
            <p>{props.data.DRIVER_TOTAL}</p>
          </div>
        </div>
      </div>
    </div>
  </div> : <div className="text-center">There is no information about this company</div>
  );
};

export default CompanyInformation;
