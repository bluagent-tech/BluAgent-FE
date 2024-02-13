import React, { useState, useEffect } from "react";
import Chart from "../../../components/LineChart";
import axios from "axios";
import Loading from "../../../components/Loading";
import ToastAlert from "../../../components/ToastAlert";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../store/UserLog';

const Reports = (props) => {
  const [option, setOption] = useState(true);
  const [initDate, setInitDate] = useState();
  const [endDate, setEndDate] = useState();
  const [trucks, setTrucks] = useState();
  const [Endingtrucks, setEndingTrucks] = useState();
  const [newTrucks, setNewTrucks] = useState();
  const [churned, setChurned] = useState();
  const [labelTrucks, setLabelTrucks] = useState();
  const [labelChurned, setLabelChurned] = useState();

  const GetCharBetween = (initDate, endDate) => {

    axios
      .post("/api/ChartReport/GetDateBeetwen", {
        initDate,
        endDate,
      })
      .then((response) => {
        setTrucks(BeginningTrucks(response.data));
        setChurned(ChurnedTrucks(response.data));
        setEndDate(" - " + endDate);
      })
      .catch((err) => {
        console.log("Error to request: ", err);
      });
  };

  const BeginningTrucks = (data) => {
    let labelBeginning = [];

    let beginning = {
      label: "",
      data: [],
      fill: false,
      backgroundColor: "#3b86ff",
      borderColor: "rgba(71, 136, 199, 0.2)",
    };

    let newTrucks = {
      label: "",
      data: [],
      fill: false,
      backgroundColor: "#3b86ff",
      borderColor: "rgba(71, 136, 199, 0.2)",
    };
    

    data.map((list) => {
      beginning.data.push(list.trucks);
      newTrucks.data.push(list.trucks);
      labelBeginning.push(list.create_date.slice(0,10))
    });

    let size = newTrucks.data.length;
    newTrucks.label = newTrucks.data[size - 1 ] - newTrucks.data[0];

    size = beginning.data.length;
    beginning.label = beginning.data[size - 1 ]
    setLabelTrucks(labelBeginning);
    setNewTrucks(newTrucks);
    return beginning;
  };

  const ChurnedTrucks = (data) => {
    let labelChurnedTrucks = [];

    let churned = {
      label: "",
      data: [],
      fill: false,
      backgroundColor: "#3b86ff",
      borderColor: "rgba(71, 136, 199, 0.2)",
    };

    let endingTrucks = {
      label: "",
      data: [],
      fill: false,
      backgroundColor: "#3b86ff",
      borderColor: "rgba(71, 136, 199, 0.2)",
    };

    data.map((list) => {
      churned.data.push(list.churned);
      endingTrucks.data.push(list.churned);
      labelChurnedTrucks.push(list.create_date.slice(0,10));
    });


    let size = endingTrucks.data.length;
    endingTrucks.label = endingTrucks.data[(size -1)] - endingTrucks.data[0];

    size = churned.data.length;
    churned.label = churned.data[size - 1];
    setLabelChurned(labelChurnedTrucks);
    setEndingTrucks(endingTrucks);

    return churned;
  };

  const GetChartWeek = () => {
    axios
      .get("/api/ChartReport/GetListOfWeek")
      .then((response) => {
        setTrucks(BeginningTrucks(response.data));
        setChurned(ChurnedTrucks(response.data));
        setInitDate("Report of the week");
        setEndDate("");
      })
      .catch((err) => console.log(err));
  };

  const GetchartMonthly = () => {
    axios
      .get("/api/ChartReport/GetListOfMonth")
      .then((response) => {
        setTrucks(BeginningTrucks(response.data));
        setChurned(ChurnedTrucks(response.data));
        setInitDate("Report of the month");
        setEndDate("");
      })
      .catch((err) => console.log(err));
  };

  const SendReport = (data) => {
    axios.post("/api/Vehicle/SendEmailReport", data)
    .then(response => {

    }). catch(err => {
      console.log("Error del envio de report: ", err);
    })
  }
  useEffect(() => {
    GetChartWeek();
  }, []);

  return (
    <div>
      <div className="row p-4">
        <div className="d-flex" style={{flex:1}}>
          <div className="d-flex flex-wrap" >
            <div className="form-group">
              <input
                className="form-control"
                id="date"
                name="date"
                placeholder="DD/MM/YYY"
                type="date"
                onChange={(event) => {
                  setInitDate(event.target.value);
                }}
              />
            </div>
            <div className="form-group d-flex justify-content-center align-items-center mr-2 ml-2">
              To
            </div>
            <div className="form-group">
              <input
                className="form-control"
                id="date"
                name="date"
                placeholder="DD/MM/YYY"
                type="date"
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary ml-2"
                onClick={() => GetCharBetween(initDate, endDate)}
              >
                Generate
              </button>
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary ml-2"
                onClick={() => SendReport({
                  initDate: initDate, 
                  endDate: endDate, 
                  trucks: trucks.label, 
                  churned: churned.label, 
                  endingTrucks: Endingtrucks.label, 
                  newTrucks: newTrucks.label
                })}
              >
                Send report
              </button>
            </div>
          </div>
         </div>

        <div className="">
          <button
            className="btn-primary btn"
            style={
              option === true
                ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
                : {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: "white",
                    color: "#20a8d8",
                  }
            }
            onClick={() => {
              setOption(true);
              GetChartWeek();
            }}
          >
            Weekly
          </button>
          <button
            className="btn-primary btn"
            style={
              option === false
                ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                : {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    backgroundColor: "white",
                    color: "#20a8d8",
                  }
            }
            onClick={() => {
              setOption(false);
              GetchartMonthly();
            }}
          >
            Monthly
          </button>
        </div>
      </div>

      {trucks !== undefined && churned !== undefined ? (
        <div className="d-flex flex-wrap">
          <div
            className="card p-4 mr-4"
            style={{
              width: 350,
            }}
          >
            <Chart title="Beginning Truck" data={trucks} label={labelTrucks}/>
          </div>
          <div
          className="card p-4 mr-4"
          style={{
            width: 350,
          }}
        >
          <Chart title="New Trucks" data={newTrucks} label={labelTrucks}/>
        </div>
        <div
          className="card p-4 mr-4"
          style={{
            width: 350,
          }}
        >
        <Chart title="Ending Trucks" data={Endingtrucks} label={labelChurned}/>
        </div>
          <div
            className="card p-4 mr-4"
            style={{
              width: 350,
            }}
          >
            <Chart title="Churned Trucks" data={churned} label={labelChurned}/>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <ToastAlert
      toggleToast={props.toggleToastAlert}
      isOpen={props.toastAlertState}
      message={props.message}
      error={props.error}/>
    </div>
  );
};

export default connect(
  (state) => state.userLog,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Reports);
