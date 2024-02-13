import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../store/DrugAndAlcoholTesting";
import DropdownMenu from "./../../../components/DropdownMenu";
import DataTable from "react-data-table-component";
import { FormGroup, Button } from "reactstrap";
import Stepper from "react-stepper-horizontal";
import Schedule from "./Schedule";
import SelectLab from "./SelectLab";

export default function ScheduleTestData() {
  let userCompany = JSON.parse(localStorage.getItem("user"));
  let idUSer = userCompany.Id;

  const columns = [
    { name: "SPECIMEN NUMBER", selector: "SpecimenNumber", sortable: true },
    { name: "DONOR", selector: "DonorName", sortable: true },
    { name: "STATUS", selector: "Status", sortable: true },
    { name: "REASON", selector: "Reason", sortable: true },
    { name: "TEST TYPE", selector: "TypeTest", sortable: true },
    { name: "RESULT", selector: "Result", sortable: true },
    { name: "TYPE TEST", selector: "TypeTest", sortable: true },
    { name: "DATE", selector: "DateTimeTest", sortable: true },
    {
      name: "ACTIONS",
      cell: (row, Id) => (
        <div>
          <DropdownMenu
            direction="right"
            toggleWorkOrderModal={() => {}}
            menuOptions={[
              ["Add Alcohol Test", () => {}],
              ["Remove", () => {}],
            ]}
          ></DropdownMenu>
        </div>
      ),
    },
  ];

  const initialState = {
    page: 1,
    steps: [
      { title: "Schedule a Test" },
      { title: "Select a Date and Lab" },
      { title: "Review Donor Information" },
    ],
    currentStep: 1,
  };

  const [nextPage, setNextPage] = useState(initialState);

  const [previousPage, setPreviousPage] = useState({
    page: initialState.page - 1,
  });
  const [showSchedule, setShowSchedule] = useState(false);

  const dispatch = useDispatch();
  const drivers = useSelector(
    (state) => state.drugAndAlcoholTesting.scheduledAlcoholTests
  );

  const onClickNext = () => {
    const { steps, currentStep } = initialState;
    setNextPage(currentStep + 1);
    alert("ok");
  };

  useEffect(() => {
    dispatch(actionCreators.getScheduledTestsAlcohol(idUSer));
    return () => {
      dispatch(actionCreators.getScheduledTestsAlcohol(idUSer));
    };
  }, [dispatch]);
  const listDrivers = drivers.map((item) => item);

  return (
    <>
      <FormGroup>
        {showSchedule ? (
          <Button
            className="float-right mr-5"
            style={{
              backgroundColor: "#3b86ff",
              color: "#ffffff",
              borderRadius: "100px",
              width: 40,
              height: 40,
              border: "1px solid #3b86ff",
            }}
            onClick={() => setShowSchedule(!showSchedule)}
          >
            X
          </Button>
        ) : (
          <Button
            className="float-right mr-5"
            style={{
              backgroundColor: "#3b86ff",
              color: "#ffffff",
              borderRadius: "100px",
              width: 40,
              height: 40,
              border: "1px solid #3b86ff",
            }}
            onClick={() => setShowSchedule(!showSchedule)}
          >
            +
          </Button>
        )}
      </FormGroup>
      {showSchedule ? (
        <>
          <Stepper
            steps={initialState.steps}
            activeStep={initialState.currentStep}
          />
          {initialState.page === 0 && <Schedule />}
          {/* <Button
            className='buttons-royal text-white px-5 '
            onClick={onClickNext}
          >
            Next
          </Button> */}
          {initialState.page === 1 && <SelectLab />}
        </>
      ) : (
        <DataTable
          sortable
          data={listDrivers}
          columns={columns}
          highlightOnHover
          noDataComponent={`Loading Tests Information...`}
          responsive
          defaultSortAsc
          pagination
        />
      )}
    </>
  );
}
