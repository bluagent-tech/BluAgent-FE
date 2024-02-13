import CompaniesConst from "./../constants/CompaniesConst";

const initialState = {
  companies: [],
  idCompany:'',
  idDriver:'',
  //error: "",
  isLoading: false,
  //message: "Success onboarding was created",
  toastAlertState: false,
  message:''
};

// REDUCERS
export const reducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case CompaniesConst.TOGGLE_TOAST_ALERT:
      return { ...state, 
        toastAlertState: action.toastAlert,
        message:action.alert };
    case CompaniesConst.GET_DATA_COMPANIES_REQUEST:
      return {
        ...state,
        isLoading: action.payload,
      };
    case CompaniesConst.GET_DATA_COMPANIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companies: action.companies,
      };
    case CompaniesConst.GET_DATA_COMPANIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      case CompaniesConst.SET_COMPANY_ID_REQUEST:
      return{
        ...state,
        idCompany: action.idCompany,
      };
    case CompaniesConst.SET_COMPANY_ID_SUCCESS:
      return{
        ...state,
        idCompany: action.idCompany,
      };
    case CompaniesConst.SET_DRIVER_ID:
        return{
          ...state,
          idDriver: action.idDriver,
      };
    default:
      return {
        ...state,
      };
  }
};

// ACTIONS

export const companiesActions = {
  toggleToastAlert: (status,message) => {
    return (dispatch, getState) => {
      const toastAlert = status;
      const alert=message;
      dispatch(OpenClose(toastAlert,alert));
    };
    function OpenClose(toastAlert,alert) {
      return { type: CompaniesConst.TOGGLE_TOAST_ALERT, toastAlert, alert };
    }
  },
  setIDDriver: (IdUser) => {
    return (dispatch, getState) => {
      const idDriver = IdUser;
      dispatch(setDriverID(idDriver));
    };
    function setDriverID(idDriver) {
      return { type: CompaniesConst.SET_DRIVER_ID, idDriver };
    }
  },
  setIDCompany: (id) => {
    return (dispatch) => {
      const idCompany = id;
      dispatch(setCompanyID(idCompany));
    };
    function request() {
      return { type: CompaniesConst.SET_COMPANY_ID_REQUEST };
    }
    function setCompanyID(idCompany) {
      return { type: CompaniesConst.SET_COMPANY_ID_SUCCESS, idCompany };
    }
    function failure() {
      
    }
  },
  getCompanies: () => {
    return (dispatch) => {
      dispatch(getCompaniesResponse());
      fetch("/api/CompanySuperAdmin/GetAllCompaniesJson", { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          dispatch(getCompaniesSuccess(r.companies));
        })
        .catch((error) => {
          dispatch(getCompaniesFail(true));
        });
    };
  },
};

function getCompaniesResponse() {
  return { type: CompaniesConst.GET_DATA_COMPANIES_REQUEST };
}

function getCompaniesSuccess(companies) {
  return { type: CompaniesConst.GET_DATA_COMPANIES_SUCCESS, companies };
}

function getCompaniesFail(status) {
  return { type: CompaniesConst.GET_DATA_COMPANIES_FAILURE, status };
}


