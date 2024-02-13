import React, { useState } from 'react'
import "../../../assets/css/SafetyComplianceReport.css";
import Gauge from "../../../components/GaugeChart";
import ReChart from "../../../components/ReChart";
import ComplianceAlert from "../../../components/ComplianceAlert";
import ComplianceTrailersAlert from "../../../components/ComplianceTrailersAlert";
import CompliancePerformedAlert from "../../../components/CompliancePerformedAlert";


const ComplianceTrailer = () => {

  const objectTransform = (quearters) => {
    var quearter = [];
    var performedTotal = 0;
    var performedTotalPast = 0;

    for (let index = 0; index <= 3; index++) {
      quearter.push({
        DatePresent: quearters[3 + index + 1].Date,
        Severy: quearters[3 + index + 1].severy,
        DatePast: quearters[index].Date,
        TrucksCountPast: quearters[index].TrucksCount,
        TrucksCountPresent: quearters[3 + index + 1].TrucksCount
      });


      performedTotal = performedTotal + quearters[3 + index + 1].TrucksCount;
      performedTotalPast = performedTotalPast + quearters[index].TrucksCount;
    }

    return { quearter, performedTotal, performedTotalPast };
  }


  const [truck] = useState(JSON.parse(localStorage.getItem("trailerReport")));

  const [dayInspections] = useState(objectTransform(truck.TrucksByQuarters));

  const rows1 = truck.TruckReport[0].vehicles.map((item, index) => ({
    VechileN: item.VehicleNumber,
    Vin: item.Vin,
    TrailerType: item.VehicleType

  }))
  const rows2 = truck.TruckReport[1].vehicles.map((item, index) => ({
    VechileN: item.VehicleNumber,
    Vin: item.Vin,
    TrailerType: item.VehicleType

  }))
  // console.log("map", rows);
  const columnsTrailers = [
    {
      name: "Vehicle Number",
      selector: (row) => row.VechileN,
      center: false,
      compact: true,
      sortable: true
    },
    {
      name: "VIN",
      selector: (row) => row.Vin,
      center: false,
      compact: true,
      sortable: true
    },
    {
      name: "Trailer Type",
      selector: (row) => row.TrailerType,
      center: false,
      compact: true,
      sortable: true
    },
  ];

  return (
    <div className="card">
      <div className="">
        <div className="col-sm-12">
          <h4 className="text-muted mt-4">Trailers Fitness</h4>
          <div className="flex-charts">
            <div className="margin-chart width-template-gauge">
              <Gauge data={truck.CompliancePercentage} />
            </div>
            <div className="margin-chart width-template-chart">
              <ReChart data={truck.TrucksByQuarters} type="truck" />
            </div>
          </div>
          <div className="col mt-4">
            <div className="col-sm-12">
              <p className="text-muted">
                <strong>{truck.ActiveTrucks} Active Trailers</strong>
              </p>
            </div>
            <div className="col-sm-11 d-flex">
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <strong className="text-muted d-none-auto">Ok</strong>
              </div>
              <div className="col-sm-4">
                <strong className="text-muted d-none-auto">Due</strong>
              </div>
            </div>
            <ComplianceAlert
              rows={rows2}
              columns={columnsTrailers}
              tag={truck.TruckReport[1].alertTag}
              driverCount={truck.TruckReport[1].truckCount}
              driverOutCount={truck.ActiveTrucks}
              porcent={truck.TruckReport[1].percentage}
              alertType={truck.TruckReport[1].severy}
              id={2}
              type="trailer"
            />
            <ComplianceAlert
              rows={rows1}
              columns={columnsTrailers}
              tag={truck.TruckReport[0].alertTag}
              driverCount={truck.TruckReport[0].truckCount}
              driverOutCount={truck.ActiveTrucks}
              porcent={truck.TruckReport[0].percentage}
              alertType={truck.TruckReport[0].severy}
              id={1}
              type="trailer"
            />
          </div>
          {truck.HasStateNumberOrCA ? <div>
            <div className="col d-flex justify-content-around justify-content-start flex-wrap">
              <div className="col-sm-6">
                <strong className="text-muted">90 dayinspections</strong>
              </div>
              <div className="col-sm-6">
                <strong className="text-muted">{dayInspections.performedTotal} Out of {4 * truck.ActiveTrucks}</strong>
              </div>
            </div>
            <div className="col">
              <hr></hr>
            </div>
            <div className="col">
              <ComplianceTrailersAlert type="Performed" data={truck.TrucksByQuarters} quarter={dayInspections.quearter} actives={truck.ActiveTrucks} />
            </div>
            <div className="col">
              <ComplianceTrailersAlert type="Missing" data={truck.TrucksByQuarters} quarter={dayInspections.quearter} actives={truck.ActiveTrucks} />
            </div>
          </div> : null}
          <div>
            <div className="col d-flex justify-content-around justify-content-start flex-wrap mt-4">
              <div className="col-sm-6">
                <strong className="text-muted">Annual Inspection</strong>
              </div>
              <div className="col-sm-6">
                <strong className="text-muted">{truck.TrucksByAnnual[1].TrucksCount} Out of {truck.ActiveTrucks}</strong>
              </div>
            </div>
            <div className="col">
              <hr></hr>
              <div className="col-sm-11 d-flex">
                <div className="col-sm-4">
                  <strong className="text-muted"></strong>
                </div>
                <div className="col-sm-4">
                  <strong className="text-muted d-none-auto">{dayInspections.quearter[0].DatePast.slice(0, 4)}</strong>
                </div>
                <div className="col-sm-4">
                  <strong className="text-muted d-none-auto">{dayInspections.quearter[0].DatePresent.slice(0, 4)}</strong>
                </div>
              </div>
              <CompliancePerformedAlert type="Performed" annual={truck.TrucksByAnnual} actives={truck.ActiveTrucks} />
              <CompliancePerformedAlert type="Missing" annual={truck.TrucksByAnnual} actives={truck.ActiveTrucks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComplianceTrailer
