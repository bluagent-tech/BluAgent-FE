import StatsConst from "./../constants/Widget06";
const initialState = {
  error: "",
  isLoading: false,
  message: "",
  toastAlertState: false,

  isNewCompany: "",

  Q1remainingDrivers: 0,
  Q1PercentageOfDrugtestDrivers: 0,
  Q1CompletedDrivers: 0,

  Q2remainingDrivers: 0,
  Q2CompletedDrivers: 0,
  Q2PercentageOfDrugtestDrivers: 0,

  Q3remainingDrivers: 0,
  Q3PercentageOfDrugtestDrivers: 0,
  Q3CompletedDrivers: 0,

  Q4remainingDrivers: 0,
  Q4PercentageOfDrugtestDrivers: 0,
  Q4CompletedDrivers: 0,

  countListDriverCompany: 0,

  Q1remainingDriversAlcohol: 0,
  Q1PercentageOfAlcoholtestDrivers: 0,
  Q1CompletedDriversAlcohol: 0,

  Q2remainingDriversAlcohol: 0,
  Q2PercentageOfAlcoholtestDrivers: 0,
  Q2CompletedDriversAlcohol: 0,

  Q3remainingDriversAlcohol: 0,
  Q3PercentageOfAlcoholtestDrivers: 0,
  Q3CompletedDriversAlcohol: 0,

  Q4remainingDriversAlcohol: 0,
  Q4PercentageOfAlcoholtestDrivers: 0,
  Q4CompletedDriversAlcohol: 0,

  driversRandomList: [],
};
export const actionCreators = {
  getRandomStats: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/DrugAndAlcoholTesting/RandomStats", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const Q1remainingDrivers = r.Q1remainingDrivers;
            const Q1PercentageOfDrugtestDrivers =
              r.Q1PercentageOfDrugtestDrivers;
            const Q2remainingDrivers = r.Q2remainingDrivers;
            const Q2PercentageOfDrugtestDrivers =
              r.Q2PercentageOfDrugtestDrivers;
            const Q3remainingDrivers = r.Q3remainingDrivers;
            const Q3PercentageOfDrugtestDrivers =
              r.Q3PercentageOfDrugtestDrivers;
            const Q4remainingDrivers = r.Q4remainingDrivers;
            const Q4PercentageOfDrugtestDrivers =
              r.Q4PercentageOfDrugtestDrivers;
            const countListDriverCompany = r.countListDriverCompany;
            dispatch(
              success(
                Q1remainingDrivers,
                Q1PercentageOfDrugtestDrivers,
                Q2remainingDrivers,
                Q2PercentageOfDrugtestDrivers,
                Q3remainingDrivers,
                Q3PercentageOfDrugtestDrivers,
                Q4remainingDrivers,
                Q4PercentageOfDrugtestDrivers,
                countListDriverCompany
              )
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error Sorting New Random Tests: ${error}`));
        });
    };
    function request() {
      return { type: StatsConst.RANDOM_STATS_REQUEST };
    }
    function success(
      Q1remainingDrivers,
      Q1PercentageOfDrugtestDrivers,
      Q2remainingDrivers,
      Q2PercentageOfDrugtestDrivers,
      Q3remainingDrivers,
      Q3PercentageOfDrugtestDrivers,
      Q4remainingDrivers,
      Q4PercentageOfDrugtestDrivers,
      countListDriverCompany
    ) {
      return {
        type: StatsConst.RANDOM_STATS_SUCCESS,
        Q1remainingDrivers,
        Q1PercentageOfDrugtestDrivers,
        Q2remainingDrivers,
        Q2PercentageOfDrugtestDrivers,
        Q3remainingDrivers,
        Q3PercentageOfDrugtestDrivers,
        Q4remainingDrivers,
        Q4PercentageOfDrugtestDrivers,
        countListDriverCompany,
      };
    }
    function failure(error) {
      return { type: StatsConst.RANDOM_STATS_FAILURE, error };
    }
  },
  getAlcoholRandomStats: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/DrugAndAlcoholTesting/RandomStatsAlcohol", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const Q1remainingDriversAlcohol = r.Q1remainingDrivers;
            const Q1PercentageOfDrugtestDriversAlcohol =
              r.Q1PercentageOfDrugtestDrivers;
            const Q2remainingDriversAlcohol = r.Q2remainingDrivers;
            const Q2PercentageOfDrugtestDriversAlcohol =
              r.Q2PercentageOfDrugtestDrivers;
            const Q3remainingDriversAlcohol = r.Q3remainingDrivers;
            const Q3PercentageOfDrugtestDriversAlcohol =
              r.Q3PercentageOfDrugtestDrivers;
            const Q4remainingDriversAlcohol = r.Q4remainingDrivers;
            const Q4PercentageOfDrugtestDriversAlcohol =
              r.Q4PercentageOfDrugtestDrivers;
            dispatch(
              success(
                Q1remainingDriversAlcohol,
                Q1PercentageOfDrugtestDriversAlcohol,
                Q2remainingDriversAlcohol,
                Q2PercentageOfDrugtestDriversAlcohol,
                Q3remainingDriversAlcohol,
                Q3PercentageOfDrugtestDriversAlcohol,
                Q4remainingDriversAlcohol,
                Q4PercentageOfDrugtestDriversAlcohol
              )
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error Sorting New Random Tests: ${error}`));
        });
    };
    function request() {
      return { type: StatsConst.RANDOM_ALCOHOL_STATS_REQUEST };
    }
    function success(
      Q1remainingDriversAlcohol,
      Q1PercentageOfDrugtestDriversAlcohol,
      Q2remainingDriversAlcohol,
      Q2PercentageOfDrugtestDriversAlcohol,
      Q3remainingDriversAlcohol,
      Q3PercentageOfDrugtestDriversAlcohol,
      Q4remainingDriversAlcohol,
      Q4PercentageOfDrugtestDriversAlcohol
    ) {
      return {
        type: StatsConst.RANDOM_ALCOHOL_STATS_SUCCESS,
        Q1remainingDriversAlcohol,
        Q1PercentageOfDrugtestDriversAlcohol,
        Q2remainingDriversAlcohol,
        Q2PercentageOfDrugtestDriversAlcohol,
        Q3remainingDriversAlcohol,
        Q3PercentageOfDrugtestDriversAlcohol,
        Q4remainingDriversAlcohol,
        Q4PercentageOfDrugtestDriversAlcohol,
      };
    }
    function failure(error) {
      return { type: StatsConst.RANDOM_ALCOHOL_STATS_FAILURE, error };
    }
  },
  getRandomStatsByYears: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/DrugAndAlcoholTesting/RandomStatsByYear", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const Q1remainingDrivers = r.Q1remainingDrivers;
            const Q1PercentageOfDrugtestDrivers =
              r.Q1PercentageOfDrugtestDrivers;
            const Q1CompletedDrivers = r.drugCompleted[0];

            const Q2remainingDrivers = r.Q2remainingDrivers;
            const Q2PercentageOfDrugtestDrivers =
              r.Q2PercentageOfDrugtestDrivers;
            const Q2CompletedDrivers = r.drugCompleted[1];

            const Q3remainingDrivers = r.Q3remainingDrivers;
            const Q3PercentageOfDrugtestDrivers =
              r.Q3PercentageOfDrugtestDrivers;
            const Q3CompletedDrivers = r.drugCompleted[2];

            const Q4remainingDrivers = r.Q4remainingDrivers;
            const Q4PercentageOfDrugtestDrivers =
              r.Q4PercentageOfDrugtestDrivers;
            const Q4CompletedDrivers = r.drugCompleted[3];

            const countListDriverCompany = r.countListDriverCompany;
            dispatch(
              success(
                Q1remainingDrivers,
                Q1PercentageOfDrugtestDrivers,
                Q1CompletedDrivers,
                Q2remainingDrivers,
                Q2PercentageOfDrugtestDrivers,
                Q2CompletedDrivers,
                Q3remainingDrivers,
                Q3PercentageOfDrugtestDrivers,
                Q3CompletedDrivers,
                Q4remainingDrivers,
                Q4PercentageOfDrugtestDrivers,
                Q4CompletedDrivers,
                countListDriverCompany
              )
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error Sorting New Random Tests: ${error}`));
        });
    };
    function request() {
      return { type: StatsConst.RANDOM_STATS_BY_YEAR_REQUEST };
    }
    function success(
      Q1remainingDrivers,
      Q1PercentageOfDrugtestDrivers,
      Q1CompletedDrivers,
      Q2remainingDrivers,
      Q2PercentageOfDrugtestDrivers,
      Q2CompletedDrivers,
      Q3remainingDrivers,
      Q3PercentageOfDrugtestDrivers,
      Q3CompletedDrivers,
      Q4remainingDrivers,
      Q4PercentageOfDrugtestDrivers,
      Q4CompletedDrivers,
      countListDriverCompany
    ) {
      return {
        type: StatsConst.RANDOM_STATS_BY_YEAR_SUCCESS,
        Q1remainingDrivers,
        Q1PercentageOfDrugtestDrivers,
        Q1CompletedDrivers,
        Q2remainingDrivers,
        Q2PercentageOfDrugtestDrivers,
        Q2CompletedDrivers,
        Q3remainingDrivers,
        Q3PercentageOfDrugtestDrivers,
        Q3CompletedDrivers,
        Q4remainingDrivers,
        Q4PercentageOfDrugtestDrivers,
        Q4CompletedDrivers,
        countListDriverCompany,
      };
    }
    function failure(error) {
      return { type: StatsConst.RANDOM_STATS_BY_YEAR_FAILURE, error };
    }
  },
  getAlcoholRandomStatsByYears: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/DrugAndAlcoholTesting/RandomStatsAlcoholByYear", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const Q1remainingDriversAlcohol = r.Q1remainingDrivers;
            const Q1PercentageOfDrugtestDriversAlcohol =
              r.Q1PercentageOfDrugtestDrivers;
            const Q1CompletedDriversAlcohol = r.alcoholCompleted[0];

            const Q2remainingDriversAlcohol = r.Q2remainingDrivers;
            const Q2PercentageOfDrugtestDriversAlcohol =
              r.Q2PercentageOfDrugtestDrivers;
            const Q2CompletedDriversAlcohol = r.alcoholCompleted[1];

            const Q3remainingDriversAlcohol = r.Q3remainingDrivers;
            const Q3PercentageOfDrugtestDriversAlcohol =
              r.Q3PercentageOfDrugtestDrivers;
            const Q3CompletedDriversAlcohol = r.alcoholCompleted[2];

            const Q4remainingDriversAlcohol = r.Q4remainingDrivers;
            const Q4PercentageOfDrugtestDriversAlcohol =
              r.Q4PercentageOfDrugtestDrivers;
            const Q4CompletedDriversAlcohol = r.alcoholCompleted[3];

            dispatch(
              success(
                Q1remainingDriversAlcohol,
                Q1PercentageOfDrugtestDriversAlcohol,
                Q1CompletedDriversAlcohol,
                Q2remainingDriversAlcohol,
                Q2PercentageOfDrugtestDriversAlcohol,
                Q2CompletedDriversAlcohol,
                Q3remainingDriversAlcohol,
                Q3PercentageOfDrugtestDriversAlcohol,
                Q3CompletedDriversAlcohol,
                Q4remainingDriversAlcohol,
                Q4PercentageOfDrugtestDriversAlcohol,
                Q4CompletedDriversAlcohol
              )
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error Sorting New Random Tests: ${error}`));
        });
    };
    function request() {
      return { type: StatsConst.RANDOM_ALCOHOL_STATS_BY_YEAR_REQUEST };
    }
    function success(
      Q1remainingDriversAlcohol,
      Q1PercentageOfDrugtestDriversAlcohol,
      Q1CompletedDriversAlcohol,
      Q2remainingDriversAlcohol,
      Q2PercentageOfDrugtestDriversAlcohol,
      Q2CompletedDriversAlcohol,
      Q3remainingDriversAlcohol,
      Q3PercentageOfDrugtestDriversAlcohol,
      Q3CompletedDriversAlcohol,
      Q4remainingDriversAlcohol,
      Q4PercentageOfDrugtestDriversAlcohol,
      Q4CompletedDriversAlcohol
    ) {
      return {
        type: StatsConst.RANDOM_ALCOHOL_STATS_SUCCESS,
        Q1remainingDriversAlcohol,
        Q1PercentageOfDrugtestDriversAlcohol,
        Q1CompletedDriversAlcohol,
        Q2remainingDriversAlcohol,
        Q2PercentageOfDrugtestDriversAlcohol,
        Q2CompletedDriversAlcohol,
        Q3remainingDriversAlcohol,
        Q3PercentageOfDrugtestDriversAlcohol,
        Q3CompletedDriversAlcohol,
        Q4remainingDriversAlcohol,
        Q4PercentageOfDrugtestDriversAlcohol,
        Q4CompletedDriversAlcohol,
      };
    }
    function failure(error) {
      return { type: StatsConst.RANDOM_ALCOHOL_STATS_BY_YEAR_FAILURE, error };
    }
  },
  getRandomList: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/DrugAndAlcoholTesting/RandomQuarterDriverList", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const driversRandomList = r.driversRandomList;
            dispatch(success(driversRandomList));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error Sorting New Random Tests: ${error}`));
        });
    };
    function request() {
      return { type: StatsConst.RANDOM_LIST_PDF_REQUEST };
    }
    function success(driversRandomList) {
      return { type: StatsConst.RANDOM_LIST_PDF_SUCCESS, driversRandomList };
    }
    function failure(error) {
      return { type: StatsConst.RANDOM_LIST_PDF_FAILURE, error };
    }
  },
  newCompany: (idCompany) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/GetCompanyDerName?companyId=" + idCompany,
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const isNewCompany = r.newCompany;
            dispatch(success(isNewCompany));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error New Company: ${error}`));
        });
    };
    function request() {
      return { type: StatsConst.NEW_COMPANY_REQUEST };
    }
    function success(isNewCompany) {
      return { type: StatsConst.NEW_COMPANY_SUCCESS, isNewCompany };
    }
    function failure(error) {
      return { type: StatsConst.NEW_COMPANY_FAILURE, error };
    }
  },
  SetPreviousRandoms: (form, callback) => {
    return (dispatch) => {
      callback();
      dispatch(request());
      fetch("api/DrugAndAlcoholTesting/SetPreviousRandoms", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            callback();
            const response = r;
            dispatch(success(response));
          } else {
            callback();
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error New Company: ${error}`));
        });
    };
    function request() {
      return { type: StatsConst.SET_PREVIOUS_RANDOMS_REQUEST };
    }
    function success(response) {
      return { type: StatsConst.SET_PREVIOUS_RANDOMS_SUCCESS, response };
    }
    function failure(error) {
      return { type: StatsConst.SET_PREVIOUS_RANDOMS_FAILURE, error };
    }
  },
  toggleToastAlert: (status) => {
    return (dispatch, getState) => {
      const toastAlert = status;
      dispatch(OpenClose(toastAlert));
    };
    function OpenClose(toastAlert) {
      return { type: StatsConst.TOGGLE_TOAST_ALERT, toastAlert };
    }
  },
};

export const reducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case StatsConst.TOGGLE_TOAST_ALERT:
      return { ...state, toastAlertState: action.toastAlert };

    case StatsConst.RANDOM_STATS_REQUEST:
      return { ...state, isLoading: true };

    case StatsConst.RANDOM_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: true,
        message: "Random was created!",
        Q1remainingDrivers: action.Q1remainingDrivers,
        Q1PercentageOfDrugtestDrivers: action.Q1PercentageOfDrugtestDrivers,
        Q2remainingDrivers: action.Q2remainingDrivers,
        Q2PercentageOfDrugtestDrivers: action.Q2PercentageOfDrugtestDrivers,
        Q3remainingDrivers: action.Q3remainingDrivers,
        Q3PercentageOfDrugtestDrivers: action.Q3PercentageOfDrugtestDrivers,
        Q4remainingDrivers: action.Q4remainingDrivers,
        Q4PercentageOfDrugtestDrivers: action.Q4PercentageOfDrugtestDrivers,
        countListDriverCompany: action.countListDriverCompany,
      };

    case StatsConst.RANDOM_STATS_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "Error Creating Random Tests Try Again!",
      };

    case StatsConst.RANDOM_STATS_BY_YEAR_REQUEST:
      return { ...state, isLoading: true };

    case StatsConst.RANDOM_STATS_BY_YEAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        Q1remainingDrivers: action.Q1remainingDrivers,
        Q1PercentageOfDrugtestDrivers: action.Q1PercentageOfDrugtestDrivers,
        Q1CompletedDrivers: action.Q1CompletedDrivers,
        Q2remainingDrivers: action.Q2remainingDrivers,
        Q2PercentageOfDrugtestDrivers: action.Q2PercentageOfDrugtestDrivers,
        Q2CompletedDrivers: action.Q2CompletedDrivers,
        Q3remainingDrivers: action.Q3remainingDrivers,
        Q3PercentageOfDrugtestDrivers: action.Q3PercentageOfDrugtestDrivers,
        Q3CompletedDrivers: action.Q3CompletedDrivers,
        Q4remainingDrivers: action.Q4remainingDrivers,
        Q4PercentageOfDrugtestDrivers: action.Q4PercentageOfDrugtestDrivers,
        Q4CompletedDrivers: action.Q4CompletedDrivers,
        countListDriverCompany: action.countListDriverCompany,
      };

    case StatsConst.RANDOM_STATS_BY_YEAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "Error Creating Random Tests Try Again!",
      };

    case StatsConst.RANDOM_ALCOHOL_STATS_REQUEST:
      return { ...state, isLoading: true };

    case StatsConst.RANDOM_ALCOHOL_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        Q1remainingDriversAlcohol: action.Q1remainingDriversAlcohol,
        Q1PercentageOfAlcoholtestDrivers:
          action.Q1PercentageOfDrugtestDriversAlcohol,
        Q1CompletedDriversAlcohol: action.Q1CompletedDriversAlcohol,
        Q2remainingDriversAlcohol: action.Q2remainingDriversAlcohol,
        Q2PercentageOfAlcoholtestDrivers:
          action.Q2PercentageOfDrugtestDriversAlcohol,
          Q2CompletedDriversAlcohol: action.Q2CompletedDriversAlcohol,
        Q3remainingDriversAlcohol: action.Q3remainingDriversAlcohol,
        Q3PercentageOfAlcoholtestDrivers:
          action.Q3PercentageOfDrugtestDriversAlcohol,
          Q3CompletedDriversAlcohol: action.Q3CompletedDriversAlcohol,
        Q4remainingDriversAlcohol: action.Q4remainingDriversAlcohol,
        Q4PercentageOfAlcoholtestDrivers:
          action.Q4PercentageOfDrugtestDriversAlcohol,
          Q4CompletedDriversAlcohol: action.Q4CompletedDriversAlcohol,
      };

    case StatsConst.RANDOM_ALCOHOL_STATS_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "Error Creating Random Tests Try Again!",
      };

    case StatsConst.RANDOM_ALCOHOL_STATS_BY_YEAR_REQUEST:
      return { ...state, isLoading: true };

    case StatsConst.RANDOM_ALCOHOL_STATS_BY_YEAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        Q1remainingDriversAlcohol: action.Q1remainingDriversAlcohol,
        Q1PercentageOfAlcoholtestDrivers: action.Q1PercentageOfDrugtestDriversAlcohol,
        Q1CompletedDriversAlcohol: action.Q1CompletedDriversAlcohol,
        
        Q2remainingDriversAlcohol: action.Q2remainingDriversAlcohol,
        Q2PercentageOfAlcoholtestDrivers: action.Q2PercentageOfDrugtestDriversAlcohol,
        Q2CompletedDriversAlcohol: action.Q2CompletedDriversAlcohol,

        Q3remainingDriversAlcohol: action.Q3remainingDriversAlcohol,
        Q3PercentageOfAlcoholtestDrivers: action.Q3PercentageOfDrugtestDriversAlcohol,
        Q3CompletedDriversAlcohol: action.Q3CompletedDriversAlcohol,

        Q4remainingDriversAlcohol: action.Q4remainingDriversAlcohol,
        Q4PercentageOfAlcoholtestDrivers: action.Q4PercentageOfDrugtestDriversAlcohol,
        Q4CompletedDriversAlcohol: action.Q4CompletedDriversAlcohol,
      };

    case StatsConst.RANDOM_ALCOHOL_STATS_BY_YEAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "Error Creating Random Tests Try Again!",
      };

    case StatsConst.RANDOM_LIST_PDF_REQUEST:
      return { ...state, isLoading: true };

    case StatsConst.RANDOM_LIST_PDF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        driversRandomList: action.driversRandomList,
      };

    case StatsConst.RANDOM_LIST_PDF_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "Error Creating Random Tests Try Again!",
      };

    case StatsConst.NEW_COMPANY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case StatsConst.NEW_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isNewCompany: action.isNewCompany,
      };
    case StatsConst.NEW_COMPANY_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case StatsConst.SET_PREVIOUS_RANDOMS_REQUEST:
      return { ...state, isLoading: true };

    case StatsConst.SET_PREVIOUS_RANDOMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        isNewCompany: true,
        toastAlertState: true,
        message: "Set Randoms Completed"
      };

    case StatsConst.SET_PREVIOUS_RANDOMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        isNewCompany: null,
        error: "Error Set Previous Random Tests Try Again!",
        message: "",
      };

    default:
      return state;
  }
};
