import DQFConst from "./../constants/DQFConst";
const initialState = {
  countries: [],
  drivers: [],
  hazmanDrivers: [],
  alertsDriver: [],
  page: 1,
  count: 1,
  driversInactive: [],
  DSM: 0,
  pageI: 1,
  countI: 1,
  error: "",
  isLoading: false,
  modal: false,
  inviteDriverModal: false,
  modalD1: false,
  modalSI: false,
  modalRDR: false,
  modalRe1: false,
  modalRDMV: false,
  idSI: false,
  idRDR: false,
  idDelete1: 0,
  idRemove1: 0,
  idRDMV: 0,
  message: "",
  dataExportActive: [],
  dataExportInactive: [],
  toastAlertState: false,
  epnL: [],
  isLoadingPN: true,
  isLoadingSendIns: false,
  isLoadingRequestDrivinR: false,
  isLoadingEnrollToDMV: false,
};

export const actionCreators = {
  getNotificationsDriversDQF: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/getNotifications?id=" + id, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const alertsDriver = r.alerts;
            dispatch(success(alertsDriver));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DQFConst.GET_NOTIFICATIONSDRIVER_REQUEST };
    }
    function success(alertsDriver) {
      return { type: DQFConst.GET_NOTIFICATIONSDRIVER_SUCCESS, alertsDriver };
    }
    function failure(error) {
      return { type: DQFConst.GET_NOTIFICATIONSDRIVER_FAILURE, error };
    }
  },

  toggleToastAlert: (status) => {
    return (dispatch) => {
      const toastAlert = status;
      dispatch(OpenClose(toastAlert));
    };
    function OpenClose(toastAlert) {
      return { type: DQFConst.TOGGLE_TOAST_ALERT, toastAlert };
    }
  },
  resetMessage: () => {
    return (dispatch) => {
      dispatch(resetM());
    };
    function resetM() {
      return { type: DQFConst.RESET_MESSAGE };
    }
  },

  toggle: (modalDriver) => {
    return (dispatch) => {
      const modal = !modalDriver;
      dispatch(OpenClose(modal));
    };
    function OpenClose(modal) {
      return { type: DQFConst.NEW_DRIVER_TOGGLE, modal };
    }
  },
  handleInviteDriverModalToggle: () => {
    return (dispatch, getState) => {
      const inviteDriverModal = !getState().dqf.inviteDriverModal;
      dispatch(OpenClose(inviteDriverModal));
    };
    function OpenClose(inviteDriverModal) {
      return { type: DQFConst.INVITE_DRIVER_TOGGLE, inviteDriverModal };
    }
  },
  toggleD1: (id) => {
    return (dispatch, getState) => {
      var modalD1 = !getState().dqf.modalD1;
      var idD = 0;
      if (modalD1) {
        idD = id;
      }
      dispatch(OpenClose(modalD1, idD));
    };
    function OpenClose(modalD1, idD) {
      return { type: DQFConst.DELETE_DRIVER_TOGGLE, modalD1, idD };
    }
  },

  toggleSendInstr: (id) => {
    return (dispatch, getState) => {
      var modalSI = !getState().dqf.modalSI;
      var idSI = 0;
      if (modalSI) {
        idSI = id;
      }
      dispatch(OpenClose(modalSI, idSI));
    };
    function OpenClose(modalSI, idSI) {
      return { type: DQFConst.SEND_INSTRUCTION, modalSI, idSI };
    }
  },

  toggleRequestDrivingRecord: (id) => {
    return (dispatch, getState) => {
      var modalRDR = !getState().dqf.modalRDR;
      var idRDR = 0;
      if (modalRDR) {
        idRDR = id;
      }
      dispatch(OpenClose(modalRDR, idRDR));
    };
    function OpenClose(modalRDR, idRDR) {
      return { type: DQFConst.REQUEST_DRIVING_RECORD, modalRDR, idRDR };
    }
  },
  ///////////////////////////////////////////////////////////////
  toggleEnrollDMV: (id) => {
    return (dispatch, getState) => {
      var modalRDMV = !getState().dqf.modalRDMV,
        modalRDMV;
      var idRDMV = 0;
      if (modalRDMV) {
        idRDMV = id;
      }
      dispatch(OpenClose(modalRDMV, idRDMV));
    };
    function OpenClose(modalRDMV, idRDMV) {
      return { type: DQFConst.ENROLL_TO_DMV, modalRDMV, idRDMV };
    }
  },
  ///////////////////////////////////////////////////////////////

  addNewDriver: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DQF/addNewDriver", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drivers = r.drivers;
            dispatch(success(drivers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error can't add new Driver: ${error}`));
        });
    };

    function request() {
      return { type: DQFConst.POST_NEW_DRIVER_REQUEST };
    }
    function success(drivers) {
      return { type: DQFConst.POST_NEW_DRIVER_SUCCESS, drivers };
    }
    function failure(error) {
      return { type: DQFConst.POST_NEW_DRIVER_FAILURE, error };
    }
  },

  addNewDriverFile: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DQF/addNewDriverFile", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drivers = r.drivers;
            const driversInactive = r.driversInactive;
            dispatch(success(drivers, driversInactive));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error can't add new Driver: ${error}`));
        });
    };

    function request() {
      return { type: DQFConst.POST_NEW_DRIVER_REQUEST };
    }
    function success(drivers) {
      return { type: DQFConst.POST_NEW_DRIVER_SUCCESS, drivers };
    }
    function failure(error) {
      return { type: DQFConst.POST_NEW_DRIVER_FAILURE, error };
    }
  },

  getEPNList: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DQF/getEPNList?id=" + id, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const epnL = r;
            // console.log("store: ", epnL);
            dispatch(success(epnL));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };
    function request() {
      return { type: DQFConst.GET_EMPLOYER_PULL_NOTICE_REQUEST };
    }
    function success(epnL) {
      return {
        type: DQFConst.GET_EMPLOYER_PULL_NOTICE_SUCCESS,
        epnL,
      };
    }
    function failure(error) {
      return {
        type: DQFConst.GET_EMPLOYER_PULL_NOTICE_FAILURE,
        error,
      };
    }
  },

  driverInvitationSMS: (phoneNumber) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DQF/sendSMS", { method: "POST", body: phoneNumber })
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
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DQFConst.POST_SMS_DRIVER_INVITATION_REQUEST };
    }
    function success() {
      return { type: DQFConst.POST_SMS_DRIVER_INVITATION_SUCCESS };
    }
    function failure(error) {
      return { type: DQFConst.POST_SMS_DRIVER_INVITATION_FAILURE, error };
    }
  },

  driverInvitationEmail: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DQF/sendEmail", { method: "POST", body: form })
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
          dispatch(failure(`Error in the Server sending Email ${error}`));
        });
    };
    function request() {
      return { type: DQFConst.POST_EMAIL_DRIVER_INVITATION_REQUEST };
    }
    function success() {
      return { type: DQFConst.POST_EMAIL_DRIVER_INVITATION_SUCCESS };
    }
    function failure(error) {
      return { type: DQFConst.POST_EMAIL_DRIVER_INVITATION_FAILURE, error };
    }
  },
  getDrivers: (idu, page, page2, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DQF/getDrivers?idu=" +
        idu +
        "&page=" +
        page +
        "&page2=" +
        page2 +
        "&size=" +
        size,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drivers = r.drivers;
            const driversInactive = r.driversInactive;
            const DSM = r.DSM;
            dispatch(success(drivers, driversInactive, DSM));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DQFConst.GET_DRIVERS_REQUEST };
    }
    function success(drivers, driversInactive, DSM) {
      return {
        type: DQFConst.GET_DRIVERS_SUCCESS,
        drivers,
        driversInactive,
        DSM,
      };
    }
    function failure(error) {
      return { type: DQFConst.GET_DRIVERS_FAILURE, error };
    }
  },
  getHazmatDrivers: (idu, page, page2, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DQF/getHazmatDrivers?idu=" +
        idu +
        "&page=" +
        page +
        "&page2=" +
        page2 +
        "&size=" +
        size,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drivers = r.drivers;
            const driversInactive = r.driversInactive;
            dispatch(success(drivers, driversInactive));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DQFConst.GET_DRIVERS_REQUEST };
    }
    function success(drivers, driversInactive) {
      return { type: DQFConst.GET_DRIVERS_SUCCESS, drivers, driversInactive };
    }
    function failure(error) {
      return { type: DQFConst.GET_DRIVERS_FAILURE, error };
    }
  },
  getCountries: () => {
    return (dispatch) => {
      dispatch(request());

      fetch("api/DQF/getCountries", { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const countries = r.countries;
            dispatch(success(countries));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DQFConst.GET_CONTRIES_REQUEST };
    }
    function success(countries) {
      return { type: DQFConst.GET_CONTRIES_SUCCESS, countries };
    }
    function failure(error) {
      return { type: DQFConst.GET_CONTRIES_FAILURE, error };
    }
  },
  updateDriverStatus: (id, status) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DQF/updateDriverStatus?id=" + id + "&status=" + status, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drivers = r.drivers;
            const driversInactive = r.driversInactive;
            var message;
            if (status === "INACTIVE") {
              message = "Driver has been deleted";
            } else {
              message = "Driver has been reactivated";
            }
            dispatch(success(drivers, driversInactive, message));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DQFConst.DELETE_DRIVER_REQUEST };
    }
    function success(drivers, driversInactive, message) {
      return {
        type: DQFConst.DELETE_DRIVER_SUCCESS,
        drivers,
        driversInactive,
        message,
      };
    }
    function failure(error) {
      return { type: DQFConst.DELETE_DRIVER_FAILURE, error };
    }
  },

  deactivateDriver: (id, status, state) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DQF/deactivateDriver?id=" +
        id +
        "&status=" +
        status +
        "&deactivationReason=" +
        state.value +
        "&date=" +
        state.date,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drivers = r.drivers;
            const driversInactive = r.driversInactive;
            var message;
            if (status === "INACTIVE") {
              message = "Driver has been deleted";
            } else {
              message = "Driver has been reactivated";
            }
            dispatch(success(drivers, driversInactive, message));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DQFConst.DELETE_DRIVER_REQUEST };
    }
    function success(drivers, driversInactive, message) {
      return {
        type: DQFConst.DELETE_DRIVER_SUCCESS,
        drivers,
        driversInactive,
        message,
      };
    }
    function failure(error) {
      return { type: DQFConst.DELETE_DRIVER_FAILURE, error };
    }
  },

  exportDrivers: (idu) => {
    return (dispatch) => {
      dispatch(request());

      fetch("api/DQF/ExportDrivers?idu=" + idu, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const dataExportActive = r.dataExportActive;
            const dataExportInactive = r.dataExportInactive;
            dispatch(success(dataExportActive, dataExportInactive));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DQFConst.EXPORT_DRIVERS_REQUEST };
    }
    function success(dataExportActive, dataExportInactive) {
      return {
        type: DQFConst.EXPORT_DRIVERS_SUCCESS,
        dataExportActive,
        dataExportInactive,
      };
    }
    function failure(error) {
      return { type: DQFConst.EXPORT_DRIVERS_FAILURE, error };
    }
  },

  enrollDriver: (id, idu, enroll) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/enrollDriver?id=" +
        id +
        "&idu=" +
        idu +
        "&enroll=" +
        enroll,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drivers = r.drivers;
            dispatch(success(drivers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DQFConst.ENROLL_DRUGS_TEST_REQUEST };
    }
    function success(drivers) {
      return { type: DQFConst.ENROLL_DRUGS_TEST_SUCCESS, drivers };
    }
    function failure(error) {
      return { type: DQFConst.ENROLL_DRUGS_TEST_FAILURE, error };
    }
  },

  emailSendInstructions: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DQF/EmailSendInstruction", {
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

    function request() {
      return { type: DQFConst.EMAIL_SEND_INSTRUCTION_REQUEST };
    }
    function success() {
      return {
        type: DQFConst.EMAIL_SEND_INSTRUCTION_SUCCESS,
      };
    }
    function failure(error) {
      return {
        type: DQFConst.EMAIL_SEND_INSTRUCTION_FAILURE,
        error,
      };
    }
  },

  emailEmailResquestDriverRecord: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DQF/EmailResquestDriverRecord", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            // console.log("funciono", r);
            dispatch(success());
          } else {
            dispatch(failure());
          }
          callback();
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };
    function request() {
      return { type: DQFConst.EMAIL_REQUEST_DRIVING_RECORD_REQUEST };
    }
    function success() {
      return {
        type: DQFConst.EMAIL_REQUEST_DRIVING_RECORD_SUCCESS,
      };
    }
    function failure(error) {
      return {
        type: DQFConst.EMAIL_REQUEST_DRIVING_RECORD_FAILURE,
        error,
      };
    }
  },
  /////////////////////////////////////////////////////////////////////
  emailEnrollToDMV: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DQF/EmailEnrollToDMV", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            // console.log("funciono", r);
            dispatch(success());
          } else {
            dispatch(failure());
          }
          callback();
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };
    function request() {
      return { type: DQFConst.EMAIL_ENROLL_TO_DMV_REQUEST };
    }
    function success() {
      return {
        type: DQFConst.EMAIL_ENROLL_TO_DMV_SUCCESS,
      };
    }
    function failure(error) {
      return {
        type: DQFConst.EMAIL_ENROLL_TO_DMV_FAILURE,
        error,
      };
    }
  },
  /////////////////////////////////////////////////////////////////////
};

export const reducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case DQFConst.GET_EMPLOYER_PULL_NOTICE_REQUEST:
      return { ...state, isLoadingPN: true, errorM: "" };

    case DQFConst.EMAIL_ENROLL_TO_DMV_REQUEST:
      return { ...state, isLoadingEnrollToDMV: true };

    case DQFConst.EMAIL_ENROLL_TO_DMV_SUCCESS:
      return {
        ...state,
        isLoadingEnrollToDMV: false,
        toastAlertState: false,
        message: "Email sent",
      };

    case DQFConst.EMAIL_ENROLL_TO_DMV_FAILURE:
      return {
        ...state,
        isLoadingEnrollToDMV: false,
        error: action.error,
        message: "ErrorErollDMV",
      };

    case DQFConst.EMAIL_REQUEST_DRIVING_RECORD_REQUEST:
      return { ...state, isLoadingRequestDrivinR: true };

    case DQFConst.EMAIL_REQUEST_DRIVING_RECORD_SUCCESS:
      return {
        ...state,
        isLoadingRequestDrivinR: false,
        toastAlertState: false,
        message: "Email sent",
      };

    case DQFConst.EMAIL_REQUEST_DRIVING_RECORD_FAILURE:
      return {
        ...state,
        isLoadingRequestDrivinR: false,
        error: action.error,
        message: "ErrorRDR",
      };

    case DQFConst.EMAIL_SEND_INSTRUCTION_REQUEST:
      return { ...state, isLoadingSendIns: true };

    case DQFConst.EMAIL_SEND_INSTRUCTION_SUCCESS:
      return {
        ...state,
        isLoadingSendIns: false,
        toastAlertState: false,
        message: "Email sent",
      };

    case DQFConst.EMAIL_SEND_INSTRUCTION_FAILURE:
      return {
        ...state,
        isLoadingSendIns: false,
        error: action.error,
        message: "Error send Instructions",
      };

    case DQFConst.GET_EMPLOYER_PULL_NOTICE_SUCCESS:
      return {
        ...state,
        isLoadingPN: false,
        error: "",
        epnL: action.epnL,
        // employerPullNotice: action.epnL.Items,
        // pagePullNotice: action.epnL.CurrentPage,
        // countPullNotice: action.epnL.NumberP,
      };

    case DQFConst.GET_EMPLOYER_PULL_NOTICE_FAILURE:
      return { ...state, isLoadingPN: false, error: action.error, message: "" };

    case DQFConst.NEW_DRIVER_TOGGLE:
      return {
        ...state,
        modal: action.modal,
        error: "",
      };

    case DQFConst.TOGGLE_TOAST_ALERT:
      return { ...state, toastAlertState: action.toastAlert };

    case DQFConst.RESET_MESSAGE:
      return { ...state, message: "" };

    case DQFConst.INVITE_DRIVER_TOGGLE:
      return {
        ...state,
        inviteDriverModal: action.inviteDriverModal,
        error: "",
      };

    case DQFConst.GET_NOTIFICATIONSDRIVER_REQUEST:
      return { ...state, isLoading: true, alertsDriver: [] };

    case DQFConst.GET_NOTIFICATIONSDRIVER_SUCCESS:
      return { ...state, isLoading: false, alertsDriver: action.alertsDriver };

    case DQFConst.GET_NOTIFICATIONSDRIVER_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertsDriver: [],
        error: action.error,
        message: "",
      };

    case DQFConst.POST_NEW_DRIVER_REQUEST:
      return { ...state, isLoading: true };

    case DQFConst.POST_NEW_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        drivers: action.drivers.Items,
        page: action.drivers.CurrentPage,
        count: action.drivers.NumberP,
        error: "",
        message: "New Driver has been added",
        modal: false,
        toastAlertState: true,
      };

    case DQFConst.POST_NEW_DRIVER_FAILURE:
      return {
        ...state,
        isLoading: false,
        modal: true,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case DQFConst.POST_SMS_DRIVER_INVITATION_REQUEST:
      return { ...state, isLoading: true };

    case DQFConst.POST_SMS_DRIVER_INVITATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "New driver has been invited",
        inviteDriverModal: false,
        toastAlertState: true,
      };

    case DQFConst.POST_SMS_DRIVER_INVITATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case DQFConst.POST_EMAIL_DRIVER_INVITATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case DQFConst.POST_EMAIL_DRIVER_INVITATION_REQUEST:
      return { ...state, isLoading: true };

    case DQFConst.POST_EMAIL_DRIVER_INVITATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "New driver has been invited",
        inviteDriverModal: false,
        toastAlertState: true,
      };

    case DQFConst.GET_DRIVERS_REQUEST:
      return { ...state, isLoading: true };

    case DQFConst.GET_DRIVERS_SUCCESS:
      return {
        ...state,
        DSM: action.DSM,
        isLoading: false,
        drivers: action.drivers.Items,
        page: action.drivers.CurrentPage,
        count: action.drivers.NumberP,
        driversInactive: action.driversInactive.Items,
        pageI: action.driversInactive.CurrentPage,
        countI: action.driversInactive.NumberP,
        error: "",
        message: "",
      };

    case DQFConst.GET_DRIVERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
      };

    case DQFConst.GET_CONTRIES_REQUEST:
      return { ...state, isLoading: true };

    case DQFConst.GET_CONTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countries: action.countries,
        error: "",
      };

    case DQFConst.GET_CONTRIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
      };

    case DQFConst.DELETE_DRIVER_TOGGLE:
      return { ...state, modalD1: action.modalD1, idDelete1: action.idD };

    case DQFConst.SEND_INSTRUCTION:
      return { ...state, modalSI: action.modalSI, idSI: action.idSI };

    case DQFConst.REQUEST_DRIVING_RECORD:
      return { ...state, modalRDR: action.modalRDR, idRDR: action.idRDR };
    ///////////////////////////////////////////////////////////////
    case DQFConst.ENROLL_TO_DMV:
      return { ...state, modalRDMV: action.modalRDMV, idRDR: action.idRDMV };
    ///////////////////////////////////////////////////////////////

    case DQFConst.DELETE__REQUEST:
      return { ...state, isLoading: true };

    case DQFConst.DELETE_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        drivers: action.drivers.Items,
        page: action.drivers.CurrentPage,
        count: action.drivers.NumberP,
        driversInactive: action.driversInactive.Items,
        pageI: action.driversInactive.CurrentPage,
        countI: action.driversInactive.NumberP,
        error: "",
        message: action.message,
        idDelete1: 0,
        modalD1: false,
        toastAlertState: true,
      };

    case DQFConst.DELETE_DRIVER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDelete1: 0,
        message: "",
        toastAlertState: true,
      };

    case DQFConst.EXPORT_DRIVERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        dataExportActive: [],
        dataExportInactive: [],
      };

    case DQFConst.EXPORT_DRIVERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataExportActive: action.dataExportActive,
        dataExportInactive: action.dataExportInactive,
        error: "",
      };

    case DQFConst.EXPORT_DRIVERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
      };

    case DQFConst.ENROLL_DRUGS_TEST_REQUEST:
      return { ...state, isLoading: true };

    case DQFConst.ENROLL_DRUGS_TEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        drivers: action.drivers.Items,
        page: action.drivers.CurrentPage,
        count: action.drivers.NumberP,
        message: "Driver has been enrolled",
        error: "",
        toastAlertState: true,
      };

    case DQFConst.ENROLL_DRUGS_TEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: "",
        error: action.error,
        toastAlertState: true,
      };

    default:
      return state;
  }
};
