import {
  ADD_COLLECTOR_DRIVER,
  ADD_COLLECTOR_DRIVER_SUCCESS,
  ADD_COLLECTOR_DRIVER_FAIL,
} from "./../types/drivers";

const initialState = {
  drivers: [],
  countries: [],
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_COLLECTOR_DRIVER:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_COLLECTOR_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        drivers: [...state.drivers, action.payload],
      };
    case ADD_COLLECTOR_DRIVER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
