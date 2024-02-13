import MaintConst from "./../constants/MaintenanceConst";
const initialState = {
  OperationC: {},
  cargoC: {},
  modalTypeTrailer: undefined,
  modalType: undefined,
  modalD1: false,
  inspectionModal: false,
  modalD2: false,
  modal2: false,
  modal1: false,
  isLoading: false,
  message: "",
  error: "",
  states: [],
  trucks: [],
  inactiveTrucks: [],
  trailers: [],
  inactiveTrailers: [],
  page: 1,
  count: 1,
  inactivePage: 1,
  inactiveCount: 1,
  pageT: 1,
  countT: 1,
  inactivePageT: 1,
  inactiveCountT: 1,
  idDelete1: 0,
  idDelete2: 0,
  modalWO: false,
  workOrder: [],
  idVehicle: 0,
  existVin: "",
  workOrderWithVehicles: false,
  modalET: false,
  modalET2: false,
  dataExportTrucks: [],
  dataExportTrucksWithInspections: [],
  dataExportTrailers: [],
  dataExportTrailersWithInspections: [],
  dataExportVehicleInspections: [],
  dataExportWorkOrders: [],
  toastAlertState: false,
  dataTrailerByVin: {},
  dataTruckByVin: {},
  modalDeleteWorkOrder: false,
  modalDeleteInspection: false,
  modalDeleteBIC: false,
  idDeleteWO: 0,
  idInspection: 0,
  inspections: [],
  idDeleteBIC: 0,
  idInspectionToggle: 0,
  vehicleInspectionModal: false,
  vehicleType: "",
  isLoadingStates: false,
  isLoadingTrailers: false,
  isLoadingExTrailers: false,
  isLoadingExTraIns: false,
  isLoadingTrucks: true,
  isLoadingActiveTrailers: true,
  isLoadingMTC: true,
  isLoadingArchivedTruck: false,
  docsBIC: [],
  camera: [],
};
const FileDownload = require("js-file-download");

export const actionCreators = {
  toggleToastAlert: (status) => {
    return (dispatch, getState) => {
      const toastAlert = status;
      dispatch(OpenClose(toastAlert));
    };
    function OpenClose(toastAlert) {
      return { type: MaintConst.TOGGLE_TOAST_ALERT, toastAlert };
    }
  },
  toggle1: () => {
    return (dispatch, getState) => {
      const modal1 = !getState().maintenance.modal1;
      dispatch(OpenClose(modal1));
    };
    function OpenClose(modal1) {
      return { type: MaintConst.NEW_TRUCK_TOGGLE, modal1 };
    }
  },
  toggle2: () => {
    return (dispatch, getState) => {
      var modal2 = !getState().maintenance.modal2;
      dispatch(OpenClose(modal2));
    };
    function OpenClose(modal2) {
      return { type: MaintConst.NEW_TRAILER_TOGGLE, modal2 };
    }
  },
  toggleD1: (id, modaltype) => {
    return (dispatch, getState) => {
      var modalD1 = !getState().maintenance.modalD1;
      var idD = 0;
      if (modalD1) {
        idD = id;
      }
      dispatch(OpenClose(modalD1, idD, modaltype));
    };
    function OpenClose(modalD1, idD, modalType) {
      return {
        type: MaintConst.DELETE_TRUCK_TOGGLE,
        modalD1,
        idD,
        modalType,
      };
    }
  },
  toggleD2: (id, modalType) => {
    return (dispatch, getState) => {
      var modalD2 = !getState().maintenance.modalD2;
      var idD = 0;
      if (modalD2) {
        idD = id;
      }
      dispatch(OpenClose(modalD2, idD, modalType));
    };
    function OpenClose(modalD2, idD, modalType) {
      return {
        type: MaintConst.DELETE_TRAILER_TOGGLE,
        modalD2,
        idD,
        modalType,
      };
    }
  },
  toggleInspectionModal: (id) => {
    return (dispatch, getState) => {
      var inspectionModal = !getState().maintenance.inspectionModal;
      var idTruck = 0;
      if (inspectionModal) {
        idTruck = id;
      }
      dispatch(OpenClose(inspectionModal, idTruck));
    };
    function OpenClose(inspectionModal, idTruck) {
      return {
        type: MaintConst.NEW_INSPECTION_TOGGLE,
        inspectionModal,
        idTruck,
      };
    }
  },
  toggleWO: (id) => {
    return (dispatch, getState) => {
      const modalWO = !getState().maintenance.modalWO;
      var idVehicle = 0;
      if (modalWO) {
        idVehicle = id;
      }
      dispatch(OpenClose(modalWO, idVehicle));
    };
    function OpenClose(modalWO, idVehicle) {
      return {
        type: MaintConst.NEW_WORKORDER_TOGGLE,
        modalWO,
        idVehicle,
      };
    }
  },
  toggleVehicleInspectionModal: (vt, idV) => {
    return (dispatch, getState) => {
      const modalStatus = !getState().maintenance.vehicleInspectionModal;

      let vehicleType;
      let idVehicle;

      if (vt) {
        vehicleType = vt;
      }

      idVehicle = idV ? idV : 0;

      dispatch(OpenClose(modalStatus, vehicleType, idVehicle));
    };
    function OpenClose(modalStatus, vehicleType, idVehicle) {
      return {
        type: MaintConst.NEW_VEHICLE_INSPECTION,
        modalStatus,
        vehicleType,
        idVehicle,
      };
    }
  },
  toggleWorkOrderWithVehicles: () => {
    return (dispatch, getState) => {
      const modalStatus = !getState().maintenance.workOrderWithVehicles;
      dispatch(OpenClose(modalStatus));
    };
    function OpenClose(modalStatus) {
      return {
        type: MaintConst.NEW_WORKORDER_WITH_VEHICLES,
        modalStatus,
      };
    }
  },
  getStates: () => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/getStates", { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status !== 2) {
            const states = r.states;
            dispatch(success(states));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.GET_STATES_REQUEST };
    }
    function success(states) {
      return { type: MaintConst.GET_STATES_SUCCESS, states };
    }
    function failure(error) {
      return { type: MaintConst.GET_STATES_FAILURE, error };
    }
  },
  addTruck: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/addTruck", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const trucks = r.trucks;
            dispatch(success(trucks.Items, trucks.CurrentPage, trucks.NumberP));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.POST_ADD_TRUCK_REQUEST };
    }
    function success(items, page, count) {
      return {
        type: MaintConst.POST_ADD_TRUCK_SUCCESS,
        items,
        page,
        count,
      };
    }
    function failure(error) {
      return { type: MaintConst.POST_ADD_TRUCK_FAILURE, error };
    }
  },
  addTrailer: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/addTrailer", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const trailers = r.trailers;
            dispatch(success(trailers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.POST_ADD_TRAILER_REQUEST };
    }
    function success(trailers) {
      return { type: MaintConst.POST_ADD_TRAILER_SUCCESS, trailers };
    }
    function failure(error) {
      return { type: MaintConst.POST_ADD_TRAILER_FAILURE, error };
    }
  },

  //#region getTrucks
  /**
   * Gets the active vehicles of the company
   * @param {int} id - It is the id of the admin user
   * @param {int} page - It is the number where the pagination begins. (default is always 1)
   * @param {int} size - It is the size of the list that will fetch (Default is 1000)
   * @param {bool} inactiveMode - Indicates what type of vehicles will be brought (true for active, False for inactive)
   * @example
   *
   * getTrucks(idUser, 1, 1000, true)
   */
  getTrucks: (id, page, size, inactiveMode) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Maintenance/getTrucks?id=" +
        id +
        "&page=" +
        page +
        "&size=" +
        size +
        "&inactiveMode=" +
        inactiveMode,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status !== 2) {
            const trucks = r.trucks;
            dispatch(success(trucks, inactiveMode));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.GET_TRUCKS_REQUEST };
    }
    function success(trucks, inactiveMode) {
      return {
        type: MaintConst.GET_TRUCKS_SUCCESS,
        trucks,
        inactiveMode,
      };
    }
    function failure(error) {
      return { type: MaintConst.GET_TRUCKS_FAILURE, error };
    }
  },

  //#endregion

  getTrailers: (id, page, size, inactiveMode) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Maintenance/getTrailers?id=" +
        id +
        "&page=" +
        page +
        "&size=" +
        size +
        "&inactiveMode=" +
        inactiveMode,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const trailers = r.trailers;
            dispatch(success(trailers, inactiveMode));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.GET_TRAILERS_REQUEST };
    }
    function success(trailers, inactiveMode) {
      return {
        type: MaintConst.GET_TRAILERS_SUCCESS,
        trailers,
        inactiveMode,
      };
    }
    function failure(error) {
      return { type: MaintConst.GET_TRAILERS_FAILURE, error };
    }
  },
  inactivateTruck: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/inactivateTruck", {
        body: form,
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const trucks = r.trucks;
            const inactiveTrucks = r.inactiveTrucks;
            dispatch(
              success(
                trucks.Items,
                trucks.CurrentPage,
                trucks.NumberP,
                inactiveTrucks.Items
              )
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.DELETE_TRUCK_REQUEST };
    }
    function success(items, page, count, inactiveTrucks) {
      return {
        type: MaintConst.DELETE_TRUCK_SUCCESS,
        items,
        page,
        count,
        inactiveTrucks,
      };
    }
    function failure(error) {
      return { type: MaintConst.DELETE_TRUCK_FAILURE, error };
    }
  },
  inactivateTrailer: (id, idU) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/inactivateTrailer?id=" + id + "&idU=" + idU, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const trailers = r.trailers;
            const inactiveTrailers = r.inactiveTrailers;
            dispatch(success(trailers, inactiveTrailers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.DELETE_TRAILER_REQUEST };
    }
    function success(trailers, inactiveTrailers) {
      return {
        type: MaintConst.DELETE_TRAILER_SUCCESS,
        trailers,
        inactiveTrailers,
      };
    }
    function failure(error) {
      return { type: MaintConst.DELETE_TRAILER_FAILURE, error };
    }
  },
  getDataTrailerByVin: (vin) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended/" +
        vin +
        "?format=json",
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          if (
            response.Message.substring(0, 29) ===
            "Results returned successfully"
          ) {
            var dataByVin = {
              Make: "",
              Model: "",
              Year: "",
              VehicleType: "",
              TrailerType: "",
              FuelType: "",
              TrailerLength: "",
              Axles: "",
              TrailerBodyType: "",
              OtherTrailerInfo: "",
            };

            // BUG return value on this map arrow function
            response.Results.map((row) => {
              let message = "No results to show";
              if (row.Variable === "Make") {
                return (dataByVin.Make = row.Value);
              }
              if (row.Variable === "Model") {
                return (dataByVin.Model = row.Value);
              }
              if (row.Variable === "Model Year") {
                return (dataByVin.Year = row.Value);
              }
              if (row.Variable === "Vehicle Type") {
                return (dataByVin.VehicleType = row.Value);
              }
              if (row.Variable === "Trailer Type Connection") {
                return (dataByVin.TrailerType = row.Value);
              }
              if (row.Variable === "Fuel Type - Primary") {
                return (dataByVin.FuelType = row.Value);
              }
              if (row.Variable === "Trailer Length (feet)") {
                dataByVin.TrailerLength = row.Value;
              }
              if (row.Variable === "Axles") {
                return (dataByVin.Axles = row.Value);
              }
              if (row.Variable === "Trailer Body Type") {
                return (dataByVin.TrailerBodyType = row.Value);
              }
              if (row.Variable === "Other Trailer Info") {
                return (dataByVin.OtherTrailerInfo = row.Value);
              }

              if (!row) {
                return message;
              }
              return row;
            });

            dispatch(success(dataByVin));
          } else {
            dispatch(failure("Error in the server"));
          }
        })
        .catch((error) => {
          dispatch(failure(error));
        });
    };

    function request() {
      return { type: MaintConst.GET_DATA_TRAILER_BY_VIN_REQUEST };
    }
    function success(dataByVin) {
      return {
        type: MaintConst.GET_DATA_TRAILER_BY_VIN_SUCCESS,
        dataByVin,
      };
    }
    function failure(error) {
      return { type: MaintConst.GET_DATA_TRAILER_BY_VIN_FAILURE, error };
    }
  },
  getDataTruckByVin: (Vin) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended/" +
        Vin +
        "?format=json",
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          if (
            response.Message.substring(0, 29) ===
            "Results returned successfully"
          ) {
            var dataByVin = {
              Make: "",
              Model: "",
              Year: "",
              VehicleType: "",
              FuelType: "",
              EngineManufacturer: "",
              EngineModel: "",
              Gross: "",
              Displacement: "",
            };

            //BUG fix this arrow function return response
            response.Results.map((row) => {
              let message = "empty result nothing to show";
              if (row.Variable === "Make") {
                dataByVin.Make = row.Value;
              }
              if (row.Variable === "Model") {
                dataByVin.Model = row.Value;
              }
              if (row.Variable === "Model Year") {
                dataByVin.Year = row.Value;
              }
              if (row.Variable === "Vehicle Type") {
                dataByVin.VehicleType = row.Value;
              }
              if (row.Variable === "Fuel Type - Primary") {
                dataByVin.FuelType = row.Value;
              }
              if (row.Variable === "Engine Manufacturer") {
                dataByVin.EngineManufacturer = row.Value;
              }
              if (row.Variable === "Engine Model") {
                dataByVin.EngineModel = row.Value;
              }
              if (row.Variable === "Gross Vehicle Weight Rating") {
                dataByVin.Gross = row.Value;
              }
              if (row.Variable === "Displacement (CC)") {
                dataByVin.Displacement = row.Value;
              }

              if (!row) {
                return message;
              }
              return row;
            });
            dispatch(success(dataByVin));
          } else {
            dispatch(failure("Error in the server"));
          }
        })
        .catch((error) => {
          dispatch(failure(error));
        });
    };

    function request() {
      return { type: MaintConst.GET_DATA_TRUCK_BY_VIN_REQUEST };
    }
    function success(dataByVin) {
      return {
        type: MaintConst.GET_DATA_TRUCK_BY_VIN_SUCCESS,
        dataByVin,
      };
    }
    function failure(error) {
      return { type: MaintConst.GET_DATA_TRUCK_BY_VIN_FAILURE, error };
    }
  },
  validateVinExistence: (vin, type, id) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Maintenance/validationVin?vin=" +
        vin +
        "&type=" +
        type +
        "&id=" +
        id,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const existVin = r.existVin;
            dispatch(success(existVin));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.VALIDATION_VIN_EXISTENCE_REQUEST };
    }
    function success(existVin) {
      return {
        type: MaintConst.VALIDATION_VIN_EXISTENCE_SUCCESS,
        existVin,
      };
    }
    function failure(error) {
      return {
        type: MaintConst.VALIDATION_VIN_EXISTENCE_FAILURE,
        error,
      };
    }
  },

  addWorkOrder: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/addWorkOrderAsync", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const workOrder = r.workOrder;
            dispatch(success(workOrder));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.POST_ADD_WORKORDER_REQUEST };
    }
    function success(workOrder) {
      return { type: MaintConst.POST_ADD_WORKORDER_SUCCESS, workOrder };
    }
    function failure(error) {
      return { type: MaintConst.POST_ADD_WORKORDER_FAILURE, error };
    }
  },
  getWorkOrders: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/getWorkOrders?id=" + id, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const workOrder = r.workOrder;
            dispatch(success(workOrder));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.GET_WORKORDERS_REQUEST };
    }
    function success(workOrder) {
      return { type: MaintConst.GET_WORKORDERS_SUCCESS, workOrder };
    }
    function failure(error) {
      return { type: MaintConst.GET_WORKORDERS_FAILURE, error };
    }
  },
  toggleDeleteInspection: (id) => {
    return (dispatch, getState) => {
      var modal = !getState().maintenance.modalDeleteInspection;
      var idD = 0;
      if (modal) {
        idD = id;
      }
      dispatch(OpenClose(modal, idD, id));
    };
    function OpenClose(modal, idD) {
      return { type: MaintConst.DELETE_INSPECTION_TOGGLE, modal, idD, id };
    }
  },
  deleteInspection: (id, idU) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/deleteInspection?id=" + id + "&idcompany=" + idU, {
        method: "DELETE",
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const inspections = r.inspections;
            dispatch(success(inspections));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.DELETE_INSPECTION_REQUEST };
    }
    function success(inspections) {
      return { type: MaintConst.DELETE_INSPECTION_SUCCESS, inspections };
    }
    function failure(error) {
      return { type: MaintConst.DELETE_INSPECTION_FAILURE, error };
    }
  },
  toggleDeleteWorkOrder: (id) => {
    return (dispatch, getState) => {
      var modal = !getState().maintenance.modalDeleteWorkOrder;
      var idD = 0;
      if (modal) {
        idD = id;
      }
      dispatch(OpenClose(modal, idD));
    };
    function OpenClose(modal, idD) {
      return { type: MaintConst.DELETE_WORK_ORDER_TOGGLE, modal, idD };
    }
  },
  deleteWorkOrder: (id, idU) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/deleteWorkOrder?id=" + id + "&iduser=" + idU, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const workOrder = r.workOrder;
            dispatch(success(workOrder));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.DELETE_WORK_ORDER_REQUEST };
    }
    function success(workOrder) {
      return { type: MaintConst.DELETE_WORK_ORDER_SUCCESS, workOrder };
    }
    function failure(error) {
      return { type: MaintConst.DELETE_WORK_ORDER_FAILURE, error };
    }
  },

  toggleET: () => {
    return (dispatch, getState) => {
      const modalET = !getState().maintenance.modalET;
      dispatch(OpenClose(modalET));
    };
    function OpenClose(modalET) {
      return { type: MaintConst.NEW_EXPORT_TRUCKS_TOGGLE, modalET };
    }
  },
  toggleET2: () => {
    return (dispatch, getState) => {
      const modalET2 = !getState().maintenance.modalET2;
      dispatch(OpenClose(modalET2));
    };
    function OpenClose(modalET2) {
      return { type: MaintConst.NEW_EXPORT_TRAILERS_TOGGLE, modalET2 };
    }
  },
  exportTrucks: (idu, status) => {
    return (dispatch) => {
      dispatch(request());

      fetch("api/Maintenance/ExportTrucks?idu=" + idu + "&status=" + status, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const dataExportTrucks = r.dataExportTrucks;
            dispatch(success(dataExportTrucks));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.EXPORT_TRUCKS_REQUEST };
    }
    function success(dataExportTrucks) {
      return {
        type: MaintConst.EXPORT_TRUCKS_SUCCESS,
        dataExportTrucks,
      };
    }
    function failure(error) {
      return { type: MaintConst.EXPORT_TRUCKS_FAILURE, error };
    }
  },
  exportTrucksInspections: (idu, status) => {
    return (dispatch) => {
      dispatch(request());

      fetch(
        "api/Maintenance/ExportTrucksWithInspections?idu=" +
        idu +
        "&status=" +
        status,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const dataExportTrucksWithInspections =
              r.dataExportTrucksWithInspections;
            dispatch(success(dataExportTrucksWithInspections));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.EXPORT_TRUCKS_INSPECTIONS_REQUEST };
    }
    function success(dataExportTrucksWithInspections) {
      return {
        type: MaintConst.EXPORT_TRUCKS_INSPECTIONS_SUCCESS,
        dataExportTrucksWithInspections,
      };
    }
    function failure(error) {
      return {
        type: MaintConst.EXPORT_TRUCKS_INSPECTIONS_FAILURE,
        error,
      };
    }
  },
  exportTrailers: (idu, status) => {
    return (dispatch) => {
      dispatch(request());

      fetch("api/Maintenance/ExportTrailers?idu=" + idu + "&status=" + status, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const dataExportTrailers = r.dataExportTrailers;
            dispatch(success(dataExportTrailers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.EXPORT_TRAILERS_REQUEST };
    }
    function success(dataExportTrailers) {
      return {
        type: MaintConst.EXPORT_TRAILERS_SUCCESS,
        dataExportTrailers,
      };
    }
    function failure(error) {
      return { type: MaintConst.EXPORT_TRAILERS_FAILURE, error };
    }
  },
  exportTrailersInspections: (idu, status) => {
    return (dispatch) => {
      dispatch(request());

      fetch(
        "api/Maintenance/ExportTrailersWithInspections?idu=" +
        idu +
        "&status=" +
        status,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const dataExportTrailersWithInspections =
              r.dataExportTrailersWithInspections;
            dispatch(success(dataExportTrailersWithInspections));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.EXPORT_TRAILERS_INSPECTIONS_REQUEST };
    }
    function success(dataExportTrailersWithInspections) {
      return {
        type: MaintConst.EXPORT_TRAILERS_INSPECTIONS_SUCCESS,
        dataExportTrailersWithInspections,
      };
    }
    function failure(error) {
      return {
        type: MaintConst.EXPORT_TRAILERS_INSPECTIONS_FAILURE,

        error,
      };
    }
  },

  exportVehicleInspections: (idCompany) => {
    return (dispatch) => {
      dispatch(request());

      fetch("api/Maintenance/ExportVehicleInspection?idCompany=" + idCompany, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const dataExportVehicleInspections = r.dataExportVehicleInspections;
            dispatch(success(dataExportVehicleInspections));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.EXPORT_VEHICLE_INSPECTION_REQUEST };
    }
    function success(dataExportVehicleInspections) {
      return {
        type: MaintConst.EXPORT_VEHICLE_INSPECTION_SUCCESS,
        dataExportVehicleInspections,
      };
    }
    function failure(error) {
      return {
        type: MaintConst.EXPORT_VEHICLE_INSPECTION_FAILURE,
        error,
      };
    }
  },
  exportWorkOrders: (idCompany) => {
    return (dispatch) => {
      dispatch(request());

      fetch("api/Maintenance/ExportWorkOrder?idCompany=" + idCompany, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const dataExportWorkOrders = r.dataExportWorkOrders;
            dispatch(success(dataExportWorkOrders));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.EXPORT_WORK_ORDER_REQUEST };
    }
    function success(dataExportWorkOrders) {
      return {
        type: MaintConst.EXPORT_WORK_ORDER_SUCCESS,
        dataExportWorkOrders,
      };
    }
    function failure(error) {
      return {
        type: MaintConst.EXPORT_WORK_ORDER_FAILURE,
        error,
      };
    }
  },
  getInspections: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/getInspections?idCompany=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const inspections = r.inspections;
            dispatch(success(inspections));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(
            failure("Can't get inspection or Inspection ID doesn't exists")
          );
        });
    };

    function request() {
      return { type: MaintConst.GET_INSPECTIONS_REQUEST };
    }
    function success(inspections) {
      return { type: MaintConst.GET_INSPECTIONS_SUCCESS, inspections };
    }
    function failure(error) {
      return { type: MaintConst.GET_INSPECTIONS_FAILURE, error };
    }
  },

  createInspection: (form) => {
    return (dispatch) => {
      dispatch(request());
      const url = "api/Maintenance/CreateVehicleInspection";
      fetch(url, { body: form, method: "POST" })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const inspections = r.inspections;
            dispatch(success(inspections));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Can't create Inspection " + error));
        });
    };

    function request() {
      return { type: MaintConst.CREATE_INSPECTION_REQUEST };
    }

    function success(inspections) {
      return { type: MaintConst.CREATE_INSPECTION_SUCCESS, inspections };
    }

    function failure(error) {
      return { type: MaintConst.CREATE_INSPECTION_FAILURE, error };
    }
  },
  downloadVehicleInspectionFile: (idVehicleInspection) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Maintenance/DownloadVehicleInspectionFile?idVehicleInspection=" +
        idVehicleInspection,
        { method: "GET" }
      ).then((response) => {
        response.blob().then((myblob) => {
          if (myblob !== null) {
            FileDownload(myblob + ".pdf");
            dispatch(success());
          } else {
            dispatch(failure("error"));
          }
        });
      });
    };

    function request() {
      return { type: MaintConst.DOWNLOAD_VEHICLE_INSPECTION_REQUEST };
    }
    function success() {
      return { type: MaintConst.DOWNLOAD_VEHICLE_INSPECTION_SUCCESS };
    }
    function failure(error) {
      return {
        type: MaintConst.DOWNLOAD_VEHICLE_INSPECTION_FAILURE,
        error,
      };
    }
  },

  uploadBrakeInspectorCertificate: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/UploadBrakeInspectorCertificate", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docsBIC = r.docsBIC;
            dispatch(success(docsBIC));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: MaintConst.UPLOAD_BIC_FILE_REQUEST };
    }
    function success(docsBIC) {
      return { type: MaintConst.UPLOAD_BIC_FILE_SUCCESS, docsBIC };
    }
    function failure(error) {
      return { type: MaintConst.UPLOAD_BIC_FILE_FAILURE, error };
    }
  },

  getDocsBic: (idCompany) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/getDocsBic?idCompany=" + idCompany, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status !== 2) {
            const docsBIC = r.docsBIC;
            dispatch(success(docsBIC));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: MaintConst.GET_DOCSBIC_REQUEST };
    }
    function success(docsBIC) {
      return { type: MaintConst.GET_DOCSBIC_SUCCESS, docsBIC };
    }
    function failure(error) {
      return { type: MaintConst.GET_DOCSBIC_FAILURE, error };
    }
  },

  toggleDeleteBIC: (id) => {
    return (dispatch, getState) => {
      var modal = !getState().maintenance.modalDeleteBIC;
      var idD = 0;
      if (modal) {
        idD = id;
      }
      dispatch(OpenClose(modal, idD));
    };
    function OpenClose(modal, idD) {
      return { type: MaintConst.DELETE_DOCSBIC_TOGGLE, modal, idD };
    }
  },

  deleteBIC: (id, idCompany) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/deleteBIC?id=" + id + "&idCompany=" + idCompany, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docsBIC = r.docsBIC;
            dispatch(success(docsBIC));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.DELETE_BIC_FILE_REQUEST };
    }
    function success(docsBIC) {
      return { type: MaintConst.DELETE_BIC_FILE_SUCCESS, docsBIC };
    }
    function failure(error) {
      return { type: MaintConst.DELETE_BIC_FILE_FAILURE, error };
    }
  },

  ///////////////////////////////////////////////////////////////////////////////////
  getOperationClassification: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getOperationClassification?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const OperationC = r.OperationC;
            dispatch(success(OperationC));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.GET_OPERATION_CLASSIFICATIONS_REQUEST };
    }
    function success(OperationC) {
      return {
        type: MaintConst.GET_OPERATION_CLASSIFICATIONS_SUCCESS,
        OperationC,
      };
    }
    function failure(error) {
      return {
        type: MaintConst.GET_OPERATION_CLASSIFICATIONS_FAILURE,
        error,
      };
    }
  },

  getCargoClassification: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getCargoClassification?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const cargoC = r.cargoC;
            dispatch(success(cargoC));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.GET_CARGO_CLASSIFICATIONS_REQUEST };
    }
    function success(cargoC) {
      return {
        type: MaintConst.GET_CARGO_CLASSIFICATIONS_SUCCESS,
        cargoC,
      };
    }
    function failure(error) {
      return {
        type: MaintConst.GET_CARGO_CLASSIFICATIONS_FAILURE,
        error,
      };
    }
  },
  activateTruck: (id, idU) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/activateTruck?id=" + id + "&idU=" + idU, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const trucks = r.trucks;
            const inactiveTrucks = r.inactiveTrucks;
            dispatch(
              success(
                trucks.Items,
                trucks.CurrentPage,
                trucks.NumberP,
                inactiveTrucks.Items
              )
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.RESTORE_TRUCK_REQUEST };
    }
    function success(items, page, count, inactiveTrucks) {
      return {
        type: MaintConst.RESTORE_TRUCK_SUCCESS,
        items,
        page,
        count,
        inactiveTrucks,
      };
    }
    function failure(error) {
      return { type: MaintConst.RESTORE_TRUCK_FAILURE, error };
    }
  },
  activateTrailer: (id, idU) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/activateTrailer?id=" + id + "&idU=" + idU, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const trailers = r.trailers;
            const inactiveTrailers = r.inactiveTrailers;
            dispatch(success(trailers, inactiveTrailers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: MaintConst.RESTORE_TRAILER_REQUEST };
    }
    function success(trailers, inactiveTrailers) {
      return {
        type: MaintConst.RESTORE_TRAILER_SUCCESS,
        trailers,
        inactiveTrailers,
      };
    }
    function failure(error) {
      return { type: MaintConst.RESTORE_TRAILER_FAILURE, error };
    }
  },

  GetCameraByIdCompanyAndType: (idCompany, type) => {
    // console.log('Datos: ', idCompany, type);
    return (dispatch) => {
      dispatch(request());
      fetch(
        `/api/Camera/GetCameraByIdCompanyAndType?IdCompany=${idCompany}&Type=${type}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json()) // Obtener los datos JSON de la respuesta
        .then((response) => {
          dispatch(success(response.data));
        })
        .catch((error) => {
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: MaintConst.GET_DATA_DEVICES_REQUEST };
    }

    function success(camera) {
      return { type: MaintConst.GET_DATA_DEVICES_SUCCESS, camera };
    }

    function failure(status) {
      return { type: MaintConst.GET_DATA_DEVICES_FAILURE, status };
    }
  },

  emailArchivedTruck: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/emailArchivedTruck", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            dispatch(success());
          } else {
            dispatch(failure());
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };
    function success() {
      return {
        type: MaintConst.EMAIL_ARCHIVED_TRUCK_SUCCESS,
      };
    }
    function failure(error) {
      return {
        type: MaintConst.EMAIL_ARCHIVED_TRUCK_FAILURE,
        error,
      };
    }
  },
};
///////////////////////////////////////////////////////////////////////////////////
export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case MaintConst.TOGGLE_TOAST_ALERT:
      return { ...state, toastAlertState: action.toastAlert };

    case MaintConst.GET_CARGO_CLASSIFICATIONS_REQUEST:
      return { ...state, isLoading: true };

    case MaintConst.GET_CARGO_CLASSIFICATIONS_SUCCESS:
      return { ...state, isLoading: false, cargoC: action.cargoC, error: "" };

    case MaintConst.GET_CARGO_CLASSIFICATIONS_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case MaintConst.GET_OPERATION_CLASSIFICATIONS_REQUEST:
      return { ...state, isLoading: true, isLoadingOC: true };

    case MaintConst.GET_OPERATION_CLASSIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingOC: false,
        OperationC: action.OperationC,
        error: "",
      };

    case MaintConst.GET_OPERATION_CLASSIFICATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingOC: false,
        error: action.error,
      };

    case MaintConst.NEW_TRUCK_TOGGLE:
      return {
        ...state,
        modal1: action.modal1,
        error: "",
        model: "",
        modelY: "",
        make: "",
        vType: "",
        fuelType: "",
        existVin: "",
      };

    case MaintConst.NEW_TRAILER_TOGGLE:
      return {
        ...state,
        modal2: action.modal2,
        error: "",
        model: "",
        modelY: "",
        make: "",
        vType: "",
        fuelType: "",
        existVin: "",
      };

    case MaintConst.DELETE_TRUCK_TOGGLE:
      return {
        ...state,
        modalD1: action.modalD1,
        idDelete1: action.idD,
        modalType: action.modalType,
      };

    case MaintConst.DELETE_TRAILER_TOGGLE:
      return {
        ...state,
        modalD2: action.modalD2,
        idDelete2: action.idD,
        modalTypeTrailer: action.modalType,
      };

    case MaintConst.GET_STATES_REQUEST:
      return { ...state, isLoading: true, isLoadingStates: true };

    case MaintConst.GET_STATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingStates: false,
        states: action.states,
      };

    case MaintConst.GET_STATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingStates: false,
        error: action.error,
        message: "",
      };

    case MaintConst.POST_ADD_TRUCK_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
        existVin: "",
        modal1: false,
      };

    case MaintConst.POST_ADD_TRUCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        modal1: false,
        model: "",
        modelY: "",
        make: "",
        vType: "",
        fuelType: "",
        trucks: action.items,
        page: action.page,
        count: action.count,
        toastAlertState: true,
        message: "New Truck has been added",
      };

    case MaintConst.POST_ADD_TRUCK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case MaintConst.POST_ADD_TRAILER_REQUEST:
      return { ...state, isLoading: true, existVin: "" };

    case MaintConst.POST_ADD_TRAILER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trailers: action.trailers.Items,
        page: action.trailers.CurrentPage,
        count: action.trailers.NumberP,
        error: "",
        modal2: false,
        toastAlertState: true,
        message: "New Trailer has been added",
      };

    case MaintConst.POST_ADD_TRAILER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case MaintConst.GET_TRUCKS_REQUEST:
      return { ...state, isLoading: true, isLoadingTrucks: true };

    case MaintConst.GET_TRUCKS_SUCCESS:
      if (action.inactiveMode) {
        return {
          ...state,
          isLoading: false,
          isLoadingTrucks: false,
          inactiveTrucks: action.trucks.Items,
          inactivePageT: action.trucks.CurrentPage,
          inactiveCountT: action.trucks.NumberP,
          error: "",
          message: "",
        };
      } else {
        return {
          ...state,
          isLoading: false,
          isLoadingTrucks: false,
          trucks: action.trucks.Items,
          pageT: action.trucks.CurrentPage,
          countT: action.trucks.NumberP,
          error: "",
          message: "",
        };
      }

    case MaintConst.GET_TRUCKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingTrucks: false,
        error: action.error,
        message: "",
      };

    case MaintConst.GET_TRAILERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoadingTrailers: true,
        isLoadingActiveTrailers: true,
      };

    case MaintConst.GET_TRAILERS_SUCCESS:
      if (action.inactiveMode) {
        return {
          ...state,
          isLoading: false,
          isLoadingTrailers: false,
          isLoadingActiveTrailers: false,
          inactiveTrailers: action.trailers.Items,
          inactivePage: action.trailers.CurrentPage,
          inactiveCount: action.trailers.NumberP,
          error: "",
          message: "",
        };
      } else {
        return {
          ...state,
          isLoading: false,
          isLoadingActiveTrailers: false,
          trailers: action.trailers.Items,
          page: action.trailers.CurrentPage,
          count: action.trailers.NumberP,
          error: "",
          message: "",
        };
      }

    case MaintConst.GET_TRAILERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingTrailers: false,
        isLoadingActiveTrailers: false,
        error: action.error,
        message: "",
      };

    case MaintConst.DELETE_TRUCK_REQUEST:
      return { ...state, isLoading: true };

    case MaintConst.DELETE_TRUCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        idDelete1: 0,
        modalD1: false,
        trucks: action.items,
        page: action.page,
        count: action.count,
        inactiveTrucks: action.inactiveTrucks,
        toastAlertState: true,
        message: "Truck has been inactivated",
      };

    case MaintConst.DELETE_TRUCK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDelete1: 0,
        message: "",
        toastAlertState: true,
      };
    case MaintConst.RESTORE_TRUCK_REQUEST:
      return { ...state, isLoading: true };

    case MaintConst.RESTORE_TRUCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        idDelete1: 0,
        modalD1: false,
        trucks: action.items,
        page: action.page,
        count: action.count,
        inactiveTrucks: action.inactiveTrucks,
        toastAlertState: true,
        message: "Truck has been reactivated",
      };

    case MaintConst.RESTORE_TRUCK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDelete1: 0,
        message: "",
        toastAlertState: true,
      };

    case MaintConst.DELETE_TRAILER_REQUEST:
      return { ...state, isLoading: true };

    case MaintConst.DELETE_TRAILER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trailers: action.trailers.Items,
        page: action.trailers.CurrentPage,
        count: action.trailers.NumberP,
        error: "",
        idDelete2: 0,
        modalD2: false,
        inactiveTrailers: action.inactiveTrailers.Items,
        inactivePage: action.inactiveTrailers.CurrentPage,
        inactiveCount: action.inactiveTrailers.NumberP,
        toastAlertState: true,
        message: "Trailer has been inactivated",
      };

    case MaintConst.DELETE_TRAILER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDelete2: 0,
        toastAlertState: true,
        message: "",
      };
    case MaintConst.RESTORE_TRAILER_REQUEST:
      return { ...state, isLoading: true };

    case MaintConst.RESTORE_TRAILER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trailers: action.trailers.Items,
        page: action.trailers.CurrentPage,
        count: action.trailers.NumberP,
        error: "",
        idDelete2: 0,
        modalD2: false,
        inactiveTrailers: action.inactiveTrailers.Items,
        inactivePage: action.inactiveTrailers.CurrentPage,
        inactiveCount: action.inactiveTrailers.NumberP,
        toastAlertState: true,
        message: "Trailer has been restored",
      };

    case MaintConst.RESTORE_TRAILER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDelete2: 0,
        toastAlertState: true,
        message: "",
      };

    case MaintConst.GET_DATA_TRUCK_BY_VIN_REQUEST:
      return { ...state, isLoading: true };

    case MaintConst.GET_DATA_TRUCK_BY_VIN_SUCCESS:
      return { ...state, isLoading: false, dataTruckByVin: action.dataByVin };

    case MaintConst.GET_DATA_TRUCK_BY_VIN_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case MaintConst.GET_DATA_TRAILER_BY_VIN_REQUEST:
      return { ...state, isLoading: true };

    case MaintConst.GET_DATA_TRAILER_BY_VIN_SUCCESS:
      return { ...state, isLoading: false, dataTrailerByVin: action.dataByVin };

    case MaintConst.GET_DATA_TRAILER_BY_VIN_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case MaintConst.VALIDATION_VIN_EXISTENCE_REQUEST:
      return { ...state, isLoading: true, existVin: "" };

    case MaintConst.VALIDATION_VIN_EXISTENCE_SUCCESS:
      return { ...state, isLoading: false, existVin: action.existVin };

    case MaintConst.VALIDATION_VIN_EXISTENCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        existVin: "",
        error: action.error,
        message: "",
      };

    case MaintConst.NEW_INSPECTION_TOGGLE:
      return {
        ...state,
        inspectionModal: action.inspectionModal,
        idTruck: action.idTruck,
      };

    case MaintConst.NEW_WORKORDER_TOGGLE:
      return {
        ...state,
        modalWO: action.modalWO,
        idVehicle: action.idVehicle,
        error: "",
      };
    case MaintConst.NEW_VEHICLE_INSPECTION:
      return {
        ...state,
        vehicleInspectionModal: action.modalStatus,
        vehicleType: action.vehicleType,
        idVehicle: action.idVehicle,
      };
    case MaintConst.NEW_WORKORDER_WITH_VEHICLES:
      return { ...state, workOrderWithVehicles: action.modalStatus };

    case MaintConst.POST_ADD_WORKORDER_REQUEST:
      return { ...state, isLoading: true };

    case MaintConst.POST_ADD_WORKORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        workOrder: action.workOrder,
        error: "",
        modalWO: false,
        workOrderWithVehicles: false,
        toastAlertState: true,
        message: "New WorkOrder has been created",
      };

    case MaintConst.POST_ADD_WORKORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case MaintConst.GET_WORKORDERS_REQUEST:
      return { ...state, isLoading: true, workOrder: [] };

    case MaintConst.GET_WORKORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        workOrder: action.workOrder,
        error: "",
        message: "",
      };

    case MaintConst.GET_WORKORDERS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case MaintConst.DELETE_WORK_ORDER_TOGGLE:
      return {
        ...state,
        modalDeleteWorkOrder: action.modal,
        idDeleteWO: action.idD,
      };

    case MaintConst.DELETE_INSPECTION_TOGGLE:
      return {
        ...state,
        modalDeleteInspection: action.modal,
        idInspection: action.idD,
        idInspectionToggle: action.id,
      };

    case MaintConst.DELETE_INSPECTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case MaintConst.DELETE_INSPECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        inspections: action.inspections,
        modalDeleteInspection: false,
        toastAlertState: true,
        idInspection: 0,
        message: "The Inspection has been deleted",
      };
    case MaintConst.DELETE_INSPECTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idInspection: 0,
        message: "Error in server, try again",
        toastAlertState: true,
      };

    case MaintConst.DELETE_WORK_ORDER_REQUEST:
      return { ...state, isLoading: true };

    case MaintConst.DELETE_WORK_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        workOrder: action.workOrder,
        modalDeleteWorkOrder: false,
        toastAlertState: true,
        idDeleteWO: 0,
        message: "The Work Order has been deleted",
      };

    case MaintConst.DELETE_WORK_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDeleteWO: 0,
        message: "",
        toastAlertState: true,
      };

    case MaintConst.NEW_EXPORT_TRUCKS_TOGGLE:
      return { ...state, modalET: action.modalET };

    case MaintConst.EXPORT_TRUCKS_REQUEST:
      return { ...state, isLoading: true };

    case MaintConst.EXPORT_TRUCKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataExportTrucks: action.dataExportTrucks,
        error: "",
        modalET: false,
      };

    case MaintConst.EXPORT_TRUCKS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case MaintConst.EXPORT_TRUCKS_INSPECTIONS_REQUEST:
      return { ...state, isLoading: true };

    case MaintConst.EXPORT_TRUCKS_INSPECTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataExportTrucksWithInspections: action.dataExportTrucksWithInspections,
        error: "",
        modalET: false,
      };

    case MaintConst.EXPORT_TRUCKS_INSPECTIONS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case MaintConst.NEW_EXPORT_TRAILERS_TOGGLE:
      return { ...state, modalET2: action.modalET2 };

    case MaintConst.EXPORT_TRAILERS_REQUEST:
      return { ...state, isLoading: true, isLoadingExTrailers: true };

    case MaintConst.EXPORT_TRAILERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingExTrailers: false,
        dataExportTrailers: action.dataExportTrailers,
        error: "",
        modalET2: false,
      };

    case MaintConst.EXPORT_TRAILERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingExTrailers: false,
        error: action.error,
        message: "",
      };

    case MaintConst.EXPORT_TRAILERS_INSPECTIONS_REQUEST:
      return { ...state, isLoading: true, isLoadingExTraIns: true };

    case MaintConst.EXPORT_TRAILERS_INSPECTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingExTraIns: false,
        dataExportTrailersWithInspections:
          action.dataExportTrailersWithInspections,
        error: "",
        modalET2: false,
      };
    case MaintConst.EXPORT_VEHICLE_INSPECTION_REQUEST:
      return { ...state, isLoading: true };
    case MaintConst.EXPORT_VEHICLE_INSPECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataExportVehicleInspections: action.dataExportVehicleInspections,
        error: "",
      };
    case MaintConst.EXPORT_VEHICLE_INSPECTION_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };
    case MaintConst.EXPORT_WORK_ORDER_REQUEST:
      return { ...state, isLoading: true };
    case MaintConst.EXPORT_WORK_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataExportWorkOrders: action.dataExportWorkOrders,
        error: "",
      };
    case MaintConst.EXPORT_WORK_ORDER_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };
    case MaintConst.EXPORT_TRAILERS_INSPECTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingExTraIns: false,
        error: action.error,
        message: "",
      };

    case MaintConst.GET_INSPECTIONS_REQUEST:
      return { ...state, isLoading: true, inspections: [] };

    case MaintConst.GET_INSPECTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        inspections: action.inspections,
        error: "",
        message: "",
      };

    case MaintConst.GET_INSPECTIONS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case MaintConst.CREATE_INSPECTION_REQUEST:
      return { ...state, isLoading: true, message: "", error: "" };

    case MaintConst.CREATE_INSPECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Inspection Created",
        inspections: action.inspections,
        error: "",
        toastAlertState: true,
      };

    case MaintConst.CREATE_INSPECTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: "",
        error: "Inspection can't be created try again",
        toastAlertState: true,
      };
    //#region GetCameraByIdCompanyAndType
    // ? Cases para la funcion de GetCameraByIdCompanyAndType
    case MaintConst.GET_DATA_DEVICES_REQUEST:
      return {
        ...state,
        //isLoading: false,
        isLoadingMTC: true,
      };

    case MaintConst.GET_DATA_DEVICES_SUCCESS:
      return {
        ...state,
        //isLoading: false,
        camera: action.camera,
        isLoadingMTC: false,
      };

    case MaintConst.GET_DATA_DEVICES_FAILURE:
      return {
        ...state,
        //isLoading: false,
        error: action.status,
        isLoadingMTC: false,
      };
    //#endregion

    case MaintConst.DOWNLOAD_VEHICLE_INSPECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.message,
        error: "",
      };
    case MaintConst.DOWNLOAD_VEHICLE_INSPECTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case MaintConst.CONFIRM_INSPECTOR_SIGNATURE_SUCCESS:
      return {
        ...state,
      };

    case MaintConst.UPLOAD_BIC_FILE_REQUEST:
      return { ...state, isLoading: true, docsBIC: [] };

    case MaintConst.UPLOAD_BIC_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docsBIC: action.docsBIC,
        error: "",
        toastAlertState: true,
        message: "File success uploaded",
      };

    case MaintConst.UPLOAD_BIC_FILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case MaintConst.GET_DOCSBIC_REQUEST:
      return { ...state, isLoading: true, isLoadingStates: true };

    case MaintConst.GET_DOCSBIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingStates: false,
        docsBIC: action.docsBIC,
      };

    case MaintConst.GET_DOCSBIC_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingStates: false,
        error: action.error,
        message: "",
        docsBIC: action.docsBIC,
      };

    case MaintConst.DELETE_DOCSBIC_TOGGLE:
      return {
        ...state,
        modalDeleteBIC: action.modal,
        idDeleteBIC: action.idD,
      };

    case MaintConst.DELETE_BIC_FILE_REQUEST:
      return { ...state, isLoading: true };

    case MaintConst.DELETE_BIC_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        docsBIC: action.docsBIC,
        modalDeleteBIC: false,
        toastAlertState: true,
        idDeleteBIC: 0,
        message: "The Brake Inspection Certificate has been deleted",
      };

    case MaintConst.DELETE_BIC_FILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDeleteBIC: 0,
        message: "",
        toastAlertState: true,
      };

    case MaintConst.EMAIL_ARCHIVED_TRUCK_REQUEST:
      return { ...state, isLoadingArchivedTruck: true };

    case MaintConst.EMAIL_ARCHIVED_TRUCK_SUCCESS:
      return {
        ...state,
        isLoadingArchivedTruck: false,
        toastAlertState: true,
        message: "Email sent",
        modalD1: false,
      };

    case MaintConst.EMAIL_ARCHIVED_TRUCK_FAILURE:
      return {
        ...state,
        isLoadingArchivedTruck: true,
        error: action.error,
        message: "Error send Instructions",
        modalD1: false,
      };

    default:
      return state;
  }
};
