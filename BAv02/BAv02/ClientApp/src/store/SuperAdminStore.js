import CompaniesConst from "./../constants/CompaniesConst";

const initialState = {
    companies: [],
    error: false,
    isLoading: false,
    message: "",
    toastAlertState: false,
};

// REDUCERS
export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
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
        default:
            return {
                ...state,
            };
    }
};

// ACTIONS

export const companiesActions = {
    getAllCompanies: () => {
        return (dispatch) => {
            let url = "/api/CompanySuperAdmin/GetAllCompanies"
            axios.get(url)
                .then((response) => response.data)
                .then((response) => {

                    this.setState({
                        companies: response.length,
                    });
                })
                .catch((error) => console.log(error));
        };
    },
};