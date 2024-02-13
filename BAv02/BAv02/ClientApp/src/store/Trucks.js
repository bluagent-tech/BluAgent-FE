import TrucksConst from "./../constants/TrucksConst";
const initialState = {
  doc: [],
  docs: [],
  error: "",
  isLoading: false,
  message: "",
  truck: {},
  states: [],
  page: 0,
  count: 0,
  inspections: [],
  pageI: 0,
  countI: 0,
  violations: [],
  pageV: 0,
  countV: 0,
  fTr: "",
  tTr: "",
  modal1: false,
  idDelete: 0,
  modalD: false,
  alertsCount: 0,
  modalA: false,
  alerts: [],
  toastAlertState: false,
  pageD: 0,
  countD: 0,
  idDownload: 0,
  fileNameToDelete: "",
  docTypeToDelete: "",
  maintenanceInspections: [],
  modalDeleteInspection: false,
  idInspection: 0,
  idInspectionToggle: 0,
  vehiclePhotos: [],
};
const FileDownload = require("js-file-download");
export const actionCreators = {
  toggleToastAlert: (status) => {
    return (dispatch, getState) => {
      const toastAlert = status;
      dispatch(OpenClose(toastAlert));
    };
    function OpenClose(toastAlert) {
      return { type: TrucksConst.TOGGLE_TOAST_ALERT, toastAlert };
    }
  },
  resetMessage: () => {
    return (dispatch, getState) => {
      dispatch(ResetMessage());
    };
    function ResetMessage() {
      return { type: TrucksConst.RESET_MESSAGE };
    }
  },
  getTruck: (id, idu) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trucks/getTruck?id=" + id + "&idu=" + idu, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const truck = r.truck;
            dispatch(success(truck));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.GET_TRUCK_REQUEST };
    }
    function success(truck) {
      return { type: TrucksConst.GET_TRUCK_SUCCESS, truck };
    }
    function failure(error) {
      return { type: TrucksConst.GET_TRUCK_FAILURE, error };
    }
  },
  getVehiclePhotos: (id, docType) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trucks/getVehiclePhotos?id=" + id + "&docType=" + docType, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const vehiclePhotos = r.vehiclePhotos;
            dispatch(success(vehiclePhotos));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(error));
        });
    };

    function request() {
      return { type: TrucksConst.GET_TRUCK_PHOTOS_REQUEST };
    }
    function success(vehiclePhotos) {
      return { type: TrucksConst.GET_TRUCK_PHOTOS_SUCCESS, vehiclePhotos };
    }
    function failure(error) {
      return { type: TrucksConst.GET_TRUCK_PHOTOS_FAILURE, error };
    }
  },
  getTruckInspections: (id, page, size, f, t) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Trucks/getTruckInspection?id=" +
          id +
          "&page=" +
          page +
          "&size=" +
          size +
          "&F=" +
          f +
          "&T=" +
          t,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const inspections = r.inspections;
            dispatch(success(inspections));
          } else {
            const inspections = r.inspections;
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.GET_TRUCK_INSPECTIONS_REQUEST };
    }
    function success(inspections) {
      return { type: TrucksConst.GET_TRUCK_INSPECTIONS_SUCCESS, inspections };
    }
    function failure(error) {
      return { type: TrucksConst.GET_TRUCK_INSPECTIONS_FAILURE, error };
    }
  },
  getTruckViolations: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Maintenance/getViolations?id=" +
          id +
          "&page=" +
          page +
          "&size=" +
          size,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const violations = r.violations;
            dispatch(success(violations));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.GET_TRUCK_VIOLATIONS_REQUEST };
    }
    function success(violations) {
      return { type: TrucksConst.GET_TRUCK_VIOLATIONS_SUCCESS, violations };
    }
    function failure(error) {
      return { type: TrucksConst.GET_TRUCK_VIOLATIONS_FAILURE, error };
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
      return { type: TrucksConst.GET_STATES_REQUEST };
    }
    function success(states) {
      return { type: TrucksConst.GET_STATES_SUCCESS, states };
    }
    function failure(error) {
      return { type: TrucksConst.GET_STATES_FAILURE, error };
    }
  },
  saveDataTruck: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trucks/saveDataTruck", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const truck = r.truck;
            const alertsCount = r.alertsCount;
            const alerts = r.alerts;
            dispatch(success(truck, alertsCount, alerts));
            setTimeout(() => {
              dispatch({ type: TrucksConst.CLEAN_MESSAGE_T });
            }, 3000);
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.POST_SAVE_DATA_TRUCK_REQUEST };
    }
    function success(truck, alertsCount, alerts) {
      return {
        type: TrucksConst.POST_SAVE_DATA_TRUCK_SUCCESS,
        truck,
        alertsCount,
        alerts,
      };
    }
    function failure(error) {
      return { type: TrucksConst.POST_SAVE_DATA_TRUCK_FAILURE, error };
    }
  },
  saveDataInsurance: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trucks/saveDataInsurance", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const truck = r.truck;
            const alertsCount = r.alertsCount;
            const alerts = r.alerts;
            dispatch(success(truck, alertsCount, alerts));
            setTimeout(() => {
              dispatch({ type: TrucksConst.CLEAN_MESSAGE_T });
            }, 3000);
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.POST_SAVE_DATA_TRUCK_INSURANCE_REQUEST };
    }
    function success(truck, alertsCount, alerts) {
      return {
        type: TrucksConst.POST_SAVE_DATA_TRUCK_INSURANCE_SUCCESS,
        truck,
        alertsCount,
        alerts,
      };
    }
    function failure(error) {
      return {
        type: TrucksConst.POST_SAVE_DATA_TRUCK_INSURANCE_FAILURE,
        error,
      };
    }
  },
  saveDataNotifications: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trucks/saveDataNotifications", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const truck = r.truck;
            dispatch(success(truck));
            setTimeout(() => {
              dispatch({ type: TrucksConst.CLEAN_MESSAGE_T });
            }, 3000);
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.POST_SAVE_DATA_NOTIFICATIONS_REQUEST };
    }
    function success(truck) {
      return { type: TrucksConst.POST_SAVE_DATA_NOTIFICATIONS_SUCCESS, truck };
    }
    function failure(error) {
      return { type: TrucksConst.POST_SAVE_DATA_NOTIFICATIONS_FAILURE, error };
    }
  },

  toggle: () => {
    return (dispatch, getState) => {
      const modal1 = !getState().trucks.modal1;
      dispatch(OpenClose(modal1));
    };
    function OpenClose(modal1) {
      return { type: TrucksConst.NEW_DOCUMENT_TOGGLE, modal1 };
    }
  },
  toggleD: (id, docType, descriptionDoc) => {
    return (dispatch, getState) => {
      var modalD = !getState().trucks.modalD;
      var idD = 0;
      var fileName = "";
      var docTypeToDelete = "";
      if (modalD) {
        idD = id;
        fileName = descriptionDoc;
        docTypeToDelete = docType;
      }
      dispatch(OpenClose(modalD, idD, docTypeToDelete, fileName));
    };
    function OpenClose(modalD, idD, docTypeToDelete, fileName) {
      return {
        type: TrucksConst.DELETE_TRUCK_DOCUMENT_TOGGLE,
        modalD,
        idD,
        docTypeToDelete,
        fileName,
      };
    }
  },
  saveDoc: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trailers/saveDoc", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docs = r.docs;
            dispatch(success(docs));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.POST_SAVE_TRUCK_DOCUMENT_REQUEST };
    }
    function success(docs) {
      return { type: TrucksConst.POST_SAVE_TRUCK_DOCUMENT_SUCCESS, docs };
    }
    function failure(error) {
      return { type: TrucksConst.POST_SAVE_TRUCK_DOCUMENT_FAILURE, error };
    }
  },
  getAllDocuments: (id, type, page, size, unique_id) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Trucks/getAllDocuments?id=" +
          id +
          "&type=" +
          type +
          "&page=" +
          page +
          "&size=" +
          size,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docs = r.docs;
            dispatch(success(docs));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.GET_ALL_TRUCK_DOCUMENTS_REQUEST };
    }
    function success(docs) {
      return { type: TrucksConst.GET_ALL_TRUCK_DOCUMENTS_SUCCESS, docs };
    }
    function failure(error) {
      return { type: TrucksConst.GET_ALL_TRUCK_DOCUMENTS_FAILURE, error };
    }
  },
  deleteDoc: (id, userId, docType, fileName, idTruck) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Trucks/deleteDoc?id=" +
          id +
          "&userId=" +
          userId +
          "&docType=" +
          docType +
          "&fileName=" +
          fileName +
          "&idTruck=" +
          idTruck,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docs = r.docs;
            dispatch(success(docs));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.DELETE_TRUCK_DOCUMENT_REQUEST };
    }
    function success(docs) {
      return { type: TrucksConst.DELETE_TRUCK_DOCUMENT_SUCCESS, docs };
    }
    function failure(error) {
      return { type: TrucksConst.DELETE_TRUCK_DOCUMENT_FAILURE, error };
    }
  },

  toggleA: () => {
    return (dispatch, getState) => {
      const modalA = !getState().trailers.modalA;
      dispatch(OpenClose(modalA));
    };
    function OpenClose(modalA) {
      return { type: TrucksConst.OPEN_ALERTS_TOGGLE, modalA };
    }
  },
  getAlerts: (id, idUser, type) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Trailers/getAlerts?id=" +
          id +
          "&idUser=" +
          idUser +
          "&type=" +
          "VEHICLE",
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const alertsCount = r.alertsCount;
            const alerts = r.alerts;
            dispatch(success(alertsCount, alerts));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.GET_TRUCK_ALERTS_REQUEST };
    }
    function success(alertsCount, alerts) {
      return {
        type: TrucksConst.GET_TRUCK_ALERTS_SUCCESS,
        alertsCount,
        alerts,
      };
    }
    function failure(error) {
      return { type: TrucksConst.GET_TRUCK_ALERTS_FAILURE, error };
    }
  },

  clean: () => ({ type: TrucksConst.CLEAN }),
  setFilter: (f, t, id, page, size) => {
    return (dispatch) => {
      fetch(
        "api/Trucks/getTruckInspection?id=" +
          id +
          "&page=" +
          page +
          "&size=" +
          size +
          "&F=" +
          f +
          "&T=" +
          t,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const inspections = r.inspections;
            dispatch(
              success(
                f,
                t,
                inspections.Items,
                inspections.CurrentPage,
                inspections.NumberP
              )
            );
          } else {
            dispatch(success(f, t, [], 0, 0));
          }
        })
        .catch((error) => {
          dispatch(success(f, t, [], 0, 0));
        });
    };
    function success(f, t, items, page, count) {
      return { type: TrucksConst.SET_FILTER, f, t, items, page, count };
    }
  },
  cleanFilter: (id) => {
    return (dispatch) => {
      fetch(
        "api/Trucks/getTruckInspection?id=" + id + "&page=" + 1 + "&size=" + 10,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const inspections = r.inspections;
            dispatch(
              success(
                inspections.Items,
                inspections.CurrentPage,
                inspections.NumberP
              )
            );
          } else {
            dispatch(success([], 0, 0));
          }
        })
        .catch((error) => {
          dispatch(success([], 0, 0));
        });
    };
    function success(items, page, count) {
      return { type: TrucksConst.CLEAN_FILTER, items, page, count };
    }
  },
  getDocuments: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trucks/getDocuments?id=" + id, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const doc = r.doc;
            dispatch(success(doc));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };
    function request() {
      return { type: TrucksConst.GET_DOCUMENTS_REQUEST };
    }
    function success(doc) {
      return { type: TrucksConst.GET_DOCUMENTS_SUCCESS, doc };
    }
    function failure(error) {
      return { type: TrucksConst.GET_DOCUMENTS_FAILURE, error };
    }
  },

  // TODO check this repeated method

  // getAllDocuments: (id, page, size) => {
  //   return (dispatch) => {
  //     dispatch(request());
  //     fetch(
  //       "api/Trucks/getAllDocuments?id=" +
  //         id +
  //         "&page=" +
  //         page +
  //         "&size=" +
  //         size,
  //       { method: "GET" }
  //     )
  //       .then((res) => res.json())
  //       .then((response) => {
  //         const r = JSON.parse(response);
  //         if (r.status === 0) {
  //           const docs = r.docs;
  //           dispatch(success(docs));
  //         } else {
  //           dispatch(failure(r.error));
  //         }
  //       })
  //       .catch((error) => {
  //         dispatch(failure("Error in the Server"));
  //       });
  //   };

  //   function request() {
  //     return { type: TrucksConst.GET_ALL_DOCUMENTS_REQUEST };
  //   }
  //   function success(docs) {
  //     return { type: TrucksConst.GET_ALL_DOCUMENTS_SUCCESS, docs };
  //   }
  //   function failure(error) {
  //     return { type: TrucksConst.GET_ALL_DOCUMENTS_FAILURE, error };
  //   }
  // },
  downloadDoc: (idTruck, id, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Trucks/downloadDocument?idTruck=" +
          idTruck +
          "&id=" +
          id +
          "&docType=" +
          docType +
          "&fileName=" +
          fileName,
        { method: "GET" }
      )
        .then((response) => {
          response.blob().then((myblob) => {
            if (myblob !== null) {
              FileDownload(myblob, fileName);
              dispatch(success());
            } else {
              dispatch(failure("error"));
            }
          });
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.DOWNLOAD_DOCUMENT_REQUEST };
    }
    function success() {
      return { type: TrucksConst.DOWNLOAD_DOCUMENT_SUCCESS };
    }
    function failure(error) {
      return { type: TrucksConst.DOWNLOAD_DOCUMENT_FAILURE, error };
    }
  },
  uploadFile: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trucks/UploadDocs", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docs = r.docs;
            dispatch(success(docs));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.UPLOAD_FILE_REQUEST };
    }
    function success(docs) {
      return { type: TrucksConst.UPLOAD_FILE_SUCCESS, docs };
    }
    function failure(error) {
      return { type: TrucksConst.UPLOAD_FILE_FAILURE, error };
    }
  },
  getInspectionsByTruck: (id, type) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Maintenance/getInspectionsByVehicle?idvehicle=" +
          id +
          "&vehicleType=" +
          type,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const maintenanceInspections = r.maintenanceInspections;
            dispatch(success(maintenanceInspections));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.GET_MAINTENANCE_INSPECTIONS_TRUCK_REQUEST };
    }
    function success(maintenanceInspections) {
      return {
        type: TrucksConst.GET_MAINTENANCE_INSPECTIONS_TRUCK_SUCCESS,
        maintenanceInspections,
      };
    }
    function failure(error) {
      return {
        type: TrucksConst.GET_MAINTENANCE_INSPECTIONS_TRUCK_FAILURE,
        error,
      };
    }
  },
  toggleDeleteInspection: (id) => {
    return (dispatch, getState) => {
      var modal = !getState().trucks.modalDeleteInspection;
      var idD = 0;
      if (modal) {
        idD = id;
      }

      dispatch(OpenClose(modal, idD, id));
    };
    function OpenClose(modal, idD) {
      return { type: TrucksConst.DELETE_INSPECTION_TOGGLE, modal, idD, id };
    }
  },
  deleteInspection: (id, idU) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Maintenance/deleteInspectionByTruck?id=" +
          id +
          "&idVehicle=" +
          118,
        +"&typeVehicle=" + "VEHICLE",
        {
          method: "DELETE",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const maintenanceInspections = r.maintenanceInspections;
            dispatch(success(maintenanceInspections));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: TrucksConst.DELETE_INSPECTION_REQUEST };
    }
    function success(maintenanceInspections) {
      return {
        type: TrucksConst.DELETE_INSPECTION_SUCCESS,
        maintenanceInspections,
      };
    }
    function failure(error) {
      return { type: TrucksConst.DELETE_INSPECTION_FAILURE, error };
    }
  },

  saveTruckLogo: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trucks/saveTruckLogo", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            dispatch(success());
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: TrucksConst.POST_SAVE_TRUCK_LOGO_REQUEST };
    }
    function success() {
      return {
        type: TrucksConst.POST_SAVE_TRUCK_LOGO_SUCCESS,
      };
    }
    function failure(error) {
      return { type: TrucksConst.POST_SAVE_TRUCK_LOGO_FAILURE, error };
    }
  },
};

export const reducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case TrucksConst.TOGGLE_TOAST_ALERT:
      return { ...state, toastAlertState: action.toastAlert };

    case TrucksConst.RESET_MESSAGE:
      return { ...state, message: "" };

    case TrucksConst.CLEAN_MESSAGE_T:
      return { ...state, message: "" };

    case TrucksConst.GET_TRUCK_REQUEST:
      return { ...state, isLoading: true };

    case TrucksConst.GET_TRUCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        truck: action.truck,
        error: "",
        message: "",
      };

    case TrucksConst.GET_TRUCK_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case TrucksConst.GET_STATES_REQUEST:
      return { ...state, isLoading: true };

    case TrucksConst.GET_STATES_SUCCESS:
      return { ...state, isLoading: false, states: action.states };

    case TrucksConst.GET_TRUCK_PHOTOS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case TrucksConst.GET_TRUCK_PHOTOS_REQUEST:
      return { ...state, isLoading: true, vehiclePhotos: [] };

    case TrucksConst.GET_TRUCK_PHOTOS_SUCCESS:
      return { ...state, isLoading: false, vehiclePhotos: action.vehiclePhotos };

    case TrucksConst.GET_STATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        states: action.states,
        error: action.error,
        message: "",
      };

    case TrucksConst.POST_SAVE_DATA_TRUCK_REQUEST:
      return { ...state, isLoading: true };

    case TrucksConst.POST_SAVE_DATA_TRUCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        truck: action.truck,
        alertsCount: action.alertsCount,
        alerts: action.alerts,
        error: "",
        message: "Saved Correctly",
        toastAlertState: true,
      };

    case TrucksConst.POST_SAVE_DATA_TRUCK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case TrucksConst.POST_SAVE_DATA_TRUCK_INSURANCE_REQUEST:
      return { ...state, isLoading: true };

    case TrucksConst.POST_SAVE_DATA_TRUCK_INSURANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        truck: action.truck,
        alertsCount: action.alertsCount,
        alerts: action.alerts,
        error: "",
        message: "Saved Correctly",
        toastAlertState: true,
      };

    case TrucksConst.POST_SAVE_DATA_TRUCK_INSURANCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case TrucksConst.POST_SAVE_DATA_NOTIFICATIONS_REQUEST:
      return { ...state, isLoading: true };

    case TrucksConst.POST_SAVE_DATA_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        truck: action.truck,
        error: "",
        message: "Saved Correctly",
        toastAlertState: true,
      };

    case TrucksConst.POST_SAVE_DATA_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case TrucksConst.NEW_DOCUMENT_TOGGLE:
      return { ...state, modal1: action.modal1, error: "" };

    case TrucksConst.DELETE_TRUCK_DOCUMENT_TOGGLE:
      return {
        ...state,
        modalD: action.modalD,
        idDelete: action.idD,
        fileNameToDelete: action.fileName,
        docTypeToDelete: action.docTypeToDelete,
      };

    case TrucksConst.POST_SAVE_TRUCK_DOCUMENT_REQUEST:
      return { ...state, isLoading: true };

    case TrucksConst.POST_SAVE_TRUCK_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docs: action.docs.Items,
        page: action.docs.CurrentPage,
        count: action.docs.NumberP,
        error: "",
        message: "File successfully uploade",
        modal1: true,
        toastAlertState: true,
      };

    case TrucksConst.POST_SAVE_TRUCK_DOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case TrucksConst.GET_ALL_TRUCK_DOCUMENTS_REQUEST:
      return { ...state, isLoading: true, docs: [], doc: [] };

    case TrucksConst.GET_ALL_TRUCK_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docs: action.docs.Items,
        page: action.docs.CurrentPage,
        count: action.docs.NumberP,
        error: "",
        message: "",
      };

    case TrucksConst.GET_ALL_TRUCK_DOCUMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case TrucksConst.DELETE_TRUCK_DOCUMENT_REQUEST:
      return { ...state, isLoading: true };

    case TrucksConst.DELETE_TRUCK_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docs: action.docs.Items,
        error: "",
        message: "File deleted successfully",
        toastAlertState: true,
        idDelete: 0,
        modalD: false,
      };

    case TrucksConst.DELETE_TRUCK_DOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: true,
        message: "",
        idDelete: 0,
      };

    case TrucksConst.OPEN_ALERTS_TOGGLE:
      return { ...state, modalA: action.modalA, error: "" };

    case TrucksConst.GET_TRUCK_ALERTS_REQUEST:
      return { ...state, isLoading: true, alerts: [], alertsCount: 0 };

    case TrucksConst.GET_TRUCK_ALERTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertsCount: action.alertsCount,
        alerts: action.alerts,
        message: "",
      };

    case TrucksConst.GET_TRUCK_ALERTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        alerts: [],
        alertsCount: 0,
        error: action.error,
        message: "",
      };

    case TrucksConst.CLEAN:
      return {
        ...state,
        truck: {},
        inspections: [],
        pageI: 0,
        countI: 0,
        violations: [],
        pageV: 0,
        countV: 0,
        fTr: "",
        tTr: "",
      };
    case TrucksConst.GET_TRUCK_INSPECTIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case TrucksConst.GET_TRUCK_INSPECTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        inspections: action.inspections.Items,
        pageI: action.inspections.CurrentPage,
        countI: action.inspections.NumberP,
      };
    case TrucksConst.GET_TRUCK_INSPECTIONS_FAILURE:
      return {
        ...state,
        inspections: [{ mensaje: "vacio" }],
      };

    case TrucksConst.GET_TRUCK_VIOLATIONS_SUCCESS:
      return {
        ...state,
        violations: action.violations.Items,
        pageV: action.violations.CurrentPage,
        countV: action.violations.NumberP,
      };

    case TrucksConst.GET_TRUCK_VIOLATIONS_CLOSE:
      return { ...state, violations: [], pageV: 0, countV: 0 };

    case TrucksConst.SET_FILTER:
      return {
        ...state,
        fTr: action.f,
        tTr: action.t,
        inspections: action.items,
        pageI: action.page,
        countI: action.count,
      };

    case TrucksConst.CLEAN_FILTER:
      return {
        ...state,
        fTr: "",
        tTr: "",
        inspections: action.items,
        pageI: action.page,
        countI: action.count,
      };

    case TrucksConst.GET_DOCUMENTS_REQUEST:
      return { ...state, isLoading: true, doc: [] };

    case TrucksConst.GET_DOCUMENTS_SUCCESS:
      return { ...state, isLoading: false, doc: action.doc, message: "" };

    case TrucksConst.GET_DOCUMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case TrucksConst.GET_ALL_DOCUMENTS_REQUEST:
      return { ...state, isLoading: true, docs: [] };

    case TrucksConst.GET_ALL_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docs: action.docs.Items,
        pageD: action.docs.CurrentPage,
        countD: action.docs.NumberP,
        error: "",
        message: "",
      };

    case TrucksConst.GET_ALL_DOCUMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case TrucksConst.DOWNLOAD_DOCUMENT_REQUEST:
      return { ...state, isLoading: true };

    case TrucksConst.DOWNLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.message,
        error: "",
        idDownload: 0,
      };

    case TrucksConst.DOWNLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
        idDownload: 0,
      };

    case TrucksConst.UPLOAD_FILE_REQUEST:
      return { ...state, isLoading: true, docs: [] };

    case TrucksConst.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docs: action.docs.Items,
        error: "",
        toastAlertState: true,
        message: "File success uploaded",
      };

    case TrucksConst.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case TrucksConst.GET_MAINTENANCE_INSPECTIONS_TRUCK_REQUEST:
      return { ...state, isLoading: true };

    case TrucksConst.GET_MAINTENANCE_INSPECTIONS_TRUCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        maintenanceInspections: action.maintenanceInspections,
        error: "",
        message: "",
      };

    case TrucksConst.GET_MAINTENANCE_INSPECTIONS_TRUCK_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case TrucksConst.DELETE_INSPECTION_TOGGLE:
      return {
        ...state,
        modalDeleteInspection: action.modal,
        idInspection: action.idD,
        idInspectionToggle: action.id,
      };

    case TrucksConst.DELETE_INSPECTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case TrucksConst.DELETE_INSPECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        maintenanceInspections: action.maintenanceInspections,
        modalDeleteInspection: false,
        toastAlertState: true,
        idInspection: 0,
        message: "The Inspection has been deleted",
      };
    case TrucksConst.DELETE_INSPECTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idInspection: 0,
        message: "Error in server, try again",
        toastAlertState: true,
      };

      case TrucksConst.POST_SAVE_TRUCK_LOGO_REQUEST:
        return { ...state, isLoading: true };
  
      case TrucksConst.POST_SAVE_TRUCK_LOGO_SUCCESS:
        return {
          ...state,
          isLoading: false,
          toastAlertState: true,
          error: "",
          message: "Truck information successfully saved",
        };
  
      case TrucksConst.POST_SAVE_TRUCK_LOGO_FAILURE:
        return {
          ...state,
          isLoading: false,
          toastAlertState: true,
          error: action.error,
          message: "",
        };
    default:
      return state;
  }
};
