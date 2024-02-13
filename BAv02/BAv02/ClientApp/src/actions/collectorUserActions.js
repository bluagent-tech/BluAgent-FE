import {
  ADD_COLLECTOR_DRIVER,
  ADD_COLLECTOR_DRIVER_SUCCESS,
  ADD_COLLECTOR_DRIVER_FAIL,
} from './../types/drivers';

import clientAxios from './../config/axios';

export function createNewDriver(driver) {
  return async (dispatch) => {
    dispatch(addCollectorDriver());
    try {
      await clientAxios.post('', driver);
      dispatch(addCollectorDriver());
    } catch (error) {
      error;
    }
  };
}

const addCollectorDriver = () => ({
  type: ADD_COLLECTOR_DRIVER,
  payload: true,
});

const addCollectorDriveSuccess = (driver) => ({
  type: ADD_COLLECTOR_DRIVER_SUCCESS,
  payload: driver,
});

const addCollectorDriverFailure = (status) => ({
  type: ADD_COLLECTOR_DRIVER_FAIL,
  payload: status,
});
