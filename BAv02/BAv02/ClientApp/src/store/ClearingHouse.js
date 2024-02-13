import ClearingHouseConst from "./../constants/ClearingHouseConst";

const initialState = {
  isLoading: false,
  CHFiles: [],
  DCFiles: [],
  AIFiles: [],
  DriverCredentials: [],
  message: "",
  toastAlertState: false,
  error: "",
};

export const actionCreators = {
  saveClearingCredentials: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/SaveClearingCredentials", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const d = JSON.parse(response);
          if (d.status === 0) {
            var driverData = d.DriverData;
            dispatch(success(driverData));
          } else {
            dispatch(failure(d.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: ClearingHouseConst.SAVE_CREDENTIALSCH_REQUEST };
    }
    function success(DriverCredentials) {
      return {
        type: ClearingHouseConst.SAVE_CREDENTIALSCH_SUCCESS,
        DriverCredentials,
      };
    }
    function failure(error) {
      return { type: ClearingHouseConst.SAVE_CREDENTIALSCH_FAILURE, error };
    }
  },
  GetClearingCredentials: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/GetClearingCredentials", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const d = JSON.parse(response);
          if (d.status === 0) {
            var driverData = d.DriverData;
            dispatch(success(driverData));
          } else {
            dispatch(failure(d.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: ClearingHouseConst.GET_CREDENTIALSCH_REQUEST };
    }
    function success(DriverCredentials) {
      return {
        type: ClearingHouseConst.GET_CREDENTIALSCH_SUCCESS,
        DriverCredentials,
      };
    }
    function failure(error) {
      return { type: ClearingHouseConst.GET_CREDENTIALSCH_FAILURE, error };
    }
  },
  saveClearingHouse: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/SaveClearingHouse", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var ch = r.CHList;
            dispatch(success(ch));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: ClearingHouseConst.SAVE_CLEARINGHOUSE_REQUEST };
    }
    function success(CHFiles) {
      return {
        type: ClearingHouseConst.SAVE_CLEARINGHOUSE_SUCCESS,
        CHFiles,
      };
    }
    function failure(error) {
      return { type: ClearingHouseConst.SAVE_CLEARINGHOUSE_FAILURE, error };
    }
  },
  GetClearingHouse: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/GetClearingHouse", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var ch = r.CHList;
            dispatch(success(ch));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: ClearingHouseConst.GET_CLEARINGHOUSE_REQUEST };
    }
    function success(CHFiles) {
      return {
        type: ClearingHouseConst.GET_CLEARINGHOUSE_SUCCESS,
        CHFiles,
      };
    }
    function failure(error) {
      return { type: ClearingHouseConst.GET_CLEARINGHOUSE_FAILURE, error };
    }
  },
  deleteCH: (idUser, idCH, idCompany, fileName) => {
    return (dispatch) => {
      var form = new FormData();
      form.append("idUser", idUser);
      form.append("IdCH", idCH);
      form.append("idCompany", idCompany);
      form.append("fileName", fileName);

      dispatch(request());
      fetch("api/Drivers/DeleteClearingHouse", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var ch = r.CHList;
            dispatch(success(ch));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: ClearingHouseConst.DELETE_CLEARINGHOUSE_REQUEST };
    }
    function success(CHFiles) {
      return {
        type: ClearingHouseConst.DELETE_CLEARINGHOUSE_SUCCESS,
        CHFiles,
      };
    }
    function failure(error) {
      return { type: ClearingHouseConst.DELETE_CLEARINGHOUSE_FAILURE, error };
    }
  },
  saveDriverConsent: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/SaveDriverConsent", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var dc = r.DCList;
            dispatch(success(dc));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: ClearingHouseConst.SAVE_DRIVERCONSENT_REQUEST };
    }
    function success(DCFiles) {
      return {
        type: ClearingHouseConst.SAVE_DRIVERCONSENT_SUCCESS,
        DCFiles,
      };
    }
    function failure(error) {
      return { type: ClearingHouseConst.SAVE_DRIVERCONSENT_FAILURE, error };
    }
  },
  GetDriverConsent: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/GetDriverConsent", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var dc = r.DCList;
            dispatch(success(dc));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: ClearingHouseConst.GET_DRIVERCONSENT_REQUEST };
    }
    function success(DCFiles) {
      return {
        type: ClearingHouseConst.GET_DRIVERCONSENT_SUCCESS,
        DCFiles,
      };
    }
    function failure(error) {
      return { type: ClearingHouseConst.GET_DRIVERCONSENT_FAILURE, error };
    }
  },
  deleteDC: (idUser, idDC, idCompany, fileName) => {
    return (dispatch) => {
      var form = new FormData();
      form.append("idUser", idUser);
      form.append("IdDC", idDC);
      form.append("idCompany", idCompany);
      form.append("fileName", fileName);

      dispatch(request());
      fetch("api/Drivers/DeleteDriverConsent", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var dc = r.DCList;
            dispatch(success(dc));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: ClearingHouseConst.DELETE_DRIVERCONSENT_REQUEST };
    }
    function success(DCFiles) {
      return {
        type: ClearingHouseConst.DELETE_DRIVERCONSENT_SUCCESS,
        DCFiles,
      };
    }
    function failure(error) {
      return { type: ClearingHouseConst.DELETE_DRIVERCONSENT_FAILURE, error };
    }
  },
  saveAnnualInquiry: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/SaveAnnualInquiry", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var ai = r.AIList;
            dispatch(success(ai));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: ClearingHouseConst.SAVE_ANNUALINQUIRY_REQUEST };
    }
    function success(AIFiles) {
      return {
        type: ClearingHouseConst.SAVE_ANNUALINQUIRY_SUCCESS,
        AIFiles,
      };
    }
    function failure(error) {
      return { type: ClearingHouseConst.SAVE_ANNUALINQUIRY_FAILURE, error };
    }
  },
  GetAnnualInquiry: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/GetAnnualInquiry", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var ai = r.AIList;
            dispatch(success(ai));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: ClearingHouseConst.GET_ANNUALINQUIRY_REQUEST };
    }
    function success(AIFiles) {
      return {
        type: ClearingHouseConst.GET_ANNUALINQUIRY_SUCCESS,
        AIFiles,
      };
    }
    function failure(error) {
      return { type: ClearingHouseConst.GET_ANNUALINQUIRY_FAILURE, error };
    }
  },
  deleteAI: (idUser, idAI, idCompany, fileName) => {
    return (dispatch) => {
      var form = new FormData();
      form.append("idUser", idUser);
      form.append("IdAI", idAI);
      form.append("idCompany", idCompany);
      form.append("fileName", fileName);

      dispatch(request());
      fetch("api/Drivers/DeleteAnnualInquiry", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var ai = r.AIList;
            dispatch(success(ai));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: ClearingHouseConst.DELETE_ANNUALINQUIRY_REQUEST };
    }
    function success(AIFiles) {
      return {
        type: ClearingHouseConst.DELETE_ANNUALINQUIRY_SUCCESS,
        AIFiles,
      };
    }
    function failure(error) {
      return { type: ClearingHouseConst.DELETE_ANNUALINQUIRY_FAILURE, error };
    }
  },
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case ClearingHouseConst.SAVE_CLEARINGHOUSE_REQUEST:
      return { ...state, isLoading: true, CHFiles: [] };

    case ClearingHouseConst.SAVE_CLEARINGHOUSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        CHFiles: action.CHFiles,
        message: "Successfully saved.",
      };

    case ClearingHouseConst.SAVE_CLEARINGHOUSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        CHFiles: [],
        error: action.error,
        message: "",
      };

    case ClearingHouseConst.SAVE_CREDENTIALSCH_REQUEST:
      return { ...state, isLoading: true, DriverCredentials: [] };

    case ClearingHouseConst.SAVE_CREDENTIALSCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        DriverCredentials: action.DriverCredentials,
        message: "Successfully saved.",
      };

    case ClearingHouseConst.SAVE_CREDENTIALSCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        DriverCredentials: [],
        error: action.error,
        message: "",
      };

    case ClearingHouseConst.GET_CREDENTIALSCH_REQUEST:
      return { ...state, isLoading: true, DriverCredentials: [] };

    case ClearingHouseConst.GET_CREDENTIALSCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        DriverCredentials: action.DriverCredentials,
      };

    case ClearingHouseConst.GET_CREDENTIALSCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        DriverCredentials: [],
        error: action.error,
        message: "",
      };

    case ClearingHouseConst.GET_CLEARINGHOUSE_REQUEST:
      return { ...state, isLoading: true, CHFiles: [] };

    case ClearingHouseConst.GET_CLEARINGHOUSE_SUCCESS:
      return { ...state, isLoading: false, CHFiles: action.CHFiles };

    case ClearingHouseConst.GET_CLEARINGHOUSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        CHFiles: [],
        error: action.error,
        message: "",
      };

    case ClearingHouseConst.DELETE_CLEARINGHOUSE_REQUEST:
      return { ...state, isLoading: true, CHFiles: [] };

    case ClearingHouseConst.DELETE_CLEARINGHOUSE_SUCCESS:
      return { ...state, isLoading: false, CHFiles: action.CHFiles };

    case ClearingHouseConst.DELETE_CLEARINGHOUSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        CHFiles: [],
        error: action.error,
        message: "",
      };

    case ClearingHouseConst.SAVE_DRIVERCONSENT_REQUEST:
      return { ...state, isLoading: true, DCFiles: [] };

    case ClearingHouseConst.SAVE_DRIVERCONSENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        DCFiles: action.DCFiles,
        message: "Successfully saved.",
      };

    case ClearingHouseConst.SAVE_DRIVERCONSENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        DCFiles: [],
        error: action.error,
        message: "",
      };

    case ClearingHouseConst.GET_DRIVERCONSENT_REQUEST:
      return { ...state, isLoading: true, DCFiles: [] };

    case ClearingHouseConst.GET_DRIVERCONSENT_SUCCESS:
      return { ...state, isLoading: false, DCFiles: action.DCFiles };

    case ClearingHouseConst.GET_DRIVERCONSENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        DCFiles: [],
        error: action.error,
        message: "",
      };

    case ClearingHouseConst.DELETE_DRIVERCONSENT_REQUEST:
      return { ...state, isLoading: true, DCFiles: [] };

    case ClearingHouseConst.DELETE_DRIVERCONSENT_SUCCESS:
      return { ...state, isLoading: false, DCFiles: action.DCFiles };

    case ClearingHouseConst.DELETE_DRIVERCONSENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        DCFiles: [],
        error: action.error,
        message: "",
      };

    case ClearingHouseConst.SAVE_ANNUALINQUIRY_REQUEST:
      return { ...state, isLoading: true, AIFiles: [] };

    case ClearingHouseConst.SAVE_ANNUALINQUIRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        AIFiles: action.AIFiles,
        message: "Successfully saved.",
      };

    case ClearingHouseConst.SAVE_ANNUALINQUIRY_FAILURE:
      return {
        ...state,
        isLoading: false,
        AIFiles: [],
        error: action.error,
        message: "",
      };

    case ClearingHouseConst.GET_ANNUALINQUIRY_REQUEST:
      return { ...state, isLoading: true, AIFiles: [] };

    case ClearingHouseConst.GET_ANNUALINQUIRY_SUCCESS:
      return { ...state, isLoading: false, AIFiles: action.AIFiles };

    case ClearingHouseConst.GET_ANNUALINQUIRY_FAILURE:
      return {
        ...state,
        isLoading: false,
        AIFiles: [],
        error: action.error,
        message: "",
      };

    case ClearingHouseConst.DELETE_ANNUALINQUIRY_REQUEST:
      return { ...state, isLoading: true, AIFiles: [] };

    case ClearingHouseConst.DELETE_ANNUALINQUIRY_SUCCESS:
      return { ...state, isLoading: false, AIFiles: action.AIFiles };

    case ClearingHouseConst.DELETE_ANNUALINQUIRY_FAILURE:
      return {
        ...state,
        isLoading: false,
        AIFiles: [],
        error: action.error,
        message: "",
      };

    default:
      return state;
  }
};
