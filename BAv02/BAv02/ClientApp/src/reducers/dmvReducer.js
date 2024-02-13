import {
    GET_DATA_DRIVER2_REQUEST,
    GET_DATA_DRIVER2_SUCCESS,
    GET_DATA_DRIVER2_FAILURE
} from "../types/dmv";

const initialState = {
    driver: any
}

export default function (state = initialState, action) {
    switch (action.type) {
      case GET_DATA_DRIVER2_REQUEST:
        return {
          ...state,
          loading: action.payload,
        };
      case GET_DATA_DRIVER2_SUCCESS:
        return {
          ...state,
          loading: false,
          driver: [...state.driver, action.payload],
        };
      case GET_DATA_DRIVER2_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }