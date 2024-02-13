import CompanyProviderConst from "../constants/CompanyProviderConst";

// Components
const intialState = {
  _provider: {},
  isLoading: false,
  providers: [],
  message: "",
  error: "",
  page: 0,
  count: 0,
  toastAlert: false,
  modalA: false,
  alerts: [],
};

export const actionCreators = {

  getCompanyProviders: () => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/Provider/GetAllProviders", { method: "GET" })
        .then(response => response.json())
        .then(response => {
          const result = JSON.parse(response)
          (result === 0) ? dispatch(success(result)) : dispatch(failure(result.error));
        })
        .catch((error) => {
          dispatch(failure("Error in the Server: can't get Providers Try Again."))
        });
    };

    function request() {
      return {type: CompanyProviderConst.GET_DATA_PROVIDER_REQUEST }
    }
    function success(providers) {
      return {type: CompanyProviderConst.GET_DATA_PROVIDER_SUCCESS, providers }
    }
    function failure(error) {
      return { type: CompanyProviderConst.GET_DATA_PROVIDER_FAILURE, error }
    }
  },

  saveProvider: (form) => {
    return dispatch => {
      dispatch(request());
      fetch('', {method: 'POST', body: form })
      .then(response = response.json())
      .then(response => {
        let res = JSON.parse(response);
        if(res.status === 0) {
          const proveedor = res.proveedor;
          const alertCount = res.alertCount;
          const alerts = res.alerts;
          dispatch(success(truck, alertCount, alerts));
          setTimeout(()=> {dispatch({type: CompanyProviderConst.CLEAN})})
        }
      }).catch(error => { distpatch(failure("Error in the Server: saveProvider")); });
    }

    function request() {
      return {type: CompanyProviderConst.POST_DATA_PROVIDER_REQUEST }
    }

    function success(proveedor, alertCount, alerts) {
      return {
        type: CompanyProviderConst.POST_DATA_PROVIDER_SUCCESS,
        proveedor,
        alertCount,
        alerts
      }
    }

    function failure(error) {
      return {
        type: CompanyProviderConst.POST_DATA_PROVIDER_FAILURE,
        error,
      }
    }
  },
  
  toggle: () => {
    return (dispatch, getState) => {
      const modal1 = !getState().proveedor.modal1
    }
  }
};



export const reducer = (state, action) => {
  state = state || intialState;

  switch(action.type) {
    case CompanyProviderConst.GET_DATA_PROVIDER_FAILURE:
      return { 
        ...state,
        isLoading: true,
        message: ""
      };
     default:
       return state;  
  }
}


