import StatsAlcoholConst from './../constants/WidgetAlcohol';
const initialState = {
  error: '',
  isLoading: false,
  message: '',
  toastAlert: false,
  QA1remainingDrivers:0,
  QA1PercentageOfDrugtestDrivers:0,
  QA2remainingDrivers:0,
  QA2PercentageOfDrugtestDrivers:0,
  QA3remainingDrivers:0,
  QA3PercentageOfDrugtestDrivers:0,
  QA4remainingDrivers:0,
  QA4PercentageOfDrugtestDrivers:0,
  countListDriverCompanyA:0,
  driversRandomListA:[],
};
export const actionCreators = {
  getRandomStatsAlcohol: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch('/api/DrugAndAlcoholTesting/RandomStatsAlcohol', { method: 'POST', body: form })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const QA1remainingDrivers = r.Q1remainingDrivers;
            const QA1PercentageOfDrugtestDrivers = r.Q1PercentageOfDrugtestDrivers;
            const QA2remainingDrivers = r.Q2remainingDrivers;
            const QA2PercentageOfDrugtestDrivers = r.Q2PercentageOfDrugtestDrivers;
            const QA3remainingDrivers = r.Q3remainingDrivers;
            const QA3PercentageOfDrugtestDrivers = r.Q3PercentageOfDrugtestDrivers;
            const QA4remainingDrivers = r.Q4remainingDrivers;
            const QA4PercentageOfDrugtestDrivers = r.Q4PercentageOfDrugtestDrivers;
            const countListDriverCompanyA = r.countListDriverCompany;
            dispatch(success(QA1remainingDrivers,QA1PercentageOfDrugtestDrivers, QA2remainingDrivers,QA2PercentageOfDrugtestDrivers, QA3remainingDrivers,QA3PercentageOfDrugtestDrivers, QA4remainingDrivers,QA4PercentageOfDrugtestDrivers,countListDriverCompanyA));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error Sorting New Random Tests: ${error}`));
        });
    };
    function request() {
      return { type: StatsAlcoholConst.RANDOM_STATS_ALCOHOL_REQUEST };
    }
    function success(QA1remainingDrivers,QA1PercentageOfDrugtestDrivers, QA2remainingDrivers,QA2PercentageOfDrugtestDrivers, QA3remainingDrivers,QA3PercentageOfDrugtestDrivers, QA4remainingDrivers,QA4PercentageOfDrugtestDrivers,countListDriverCompanyA) {
      return { type: StatsAlcoholConst.RANDOM_STATS_ALCOHOL_SUCCESS, QA1remainingDrivers,QA1PercentageOfDrugtestDrivers, QA2remainingDrivers,QA2PercentageOfDrugtestDrivers, QA3remainingDrivers,QA3PercentageOfDrugtestDrivers, QA4remainingDrivers,QA4PercentageOfDrugtestDrivers,countListDriverCompanyA };
    }
    function failure(error) {
      return { type: StatsAlcoholConst.RANDOM_STATS_ALCOHOL_FAILURE, error };
    }
  },getRandomList: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch('/api/DrugAndAlcoholTesting/RandomQuarterDriverList', { method: 'POST', body: form })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const driversRandomListA = r.driversRandomList;
            dispatch(success(driversRandomListA));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error Sorting New Random Tests: ${error}`));
        });
    };
    function request() {
      return { type: StatsAlcoholConst.RANDOM_LIST_PDF_ALCOHOL_REQUEST };
    }
    function success(driversRandomListA) {
      return { type: StatsAlcoholConst.RANDOM_LIST_PDF_ALCOHOL_SUCCESS, driversRandomListA };
    }
    function failure(error) {
      return { type: StatsAlcoholConst.RANDOM_LIST_PDF_ALCOHOL_FAILURE, error };
    }
  },
};

export const reducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case StatsAlcoholConst.TOGGLE_TOAST_ALERT:
      return { ...state, toastAlertState: action.toastAlert };

      case StatsAlcoholConst.RANDOM_STATS_ALCOHOL_REQUEST:
        return { ...state, isLoading: true };
  
      case StatsAlcoholConst.RANDOM_STATS_ALCOHOL_SUCCESS:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          QA1remainingDrivers:action.QA1remainingDrivers,
          QA1PercentageOfDrugtestDrivers:action.QA1PercentageOfDrugtestDrivers,
          QA2remainingDrivers:action.QA2remainingDrivers,
          QA2PercentageOfDrugtestDrivers:action.QA2PercentageOfDrugtestDrivers,
          QA3remainingDrivers:action.QA3remainingDrivers,
          QA3PercentageOfDrugtestDrivers:action.QA3PercentageOfDrugtestDrivers,
          QA4remainingDrivers:action.QA4remainingDrivers,
          QA4PercentageOfDrugtestDrivers:action.QA4PercentageOfDrugtestDrivers,
          countListDriverCompanyA:action.countListDriverCompanyA,
        };
  
      case StatsAlcoholConst.RANDOM_STATS_ALCOHOL_FAILURE:
        return {
          ...state,
          isLoading: false,
          toastAlertState: true,
          error: action.error,
          message: 'Error Creating Random Tests Try Again!',
        };

        case StatsAlcoholConst.RANDOM_LIST_PDF_ALCOHOL_REQUEST:
        return { ...state, isLoading: true };
  
      case StatsAlcoholConst.RANDOM_LIST_PDF_ALCOHOL_SUCCESS:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          driversRandomListA:action.driversRandomListA,
        };
  
      case StatsAlcoholConst.RANDOM_LIST_PDF_ALCOHOL_FAILURE:
        return {
          ...state,
          isLoading: false,
          toastAlertState: true,
          error: action.error,
          message: 'Error Creating Random Tests Try Again!',
        };

    default:
      return state;
  }
};
