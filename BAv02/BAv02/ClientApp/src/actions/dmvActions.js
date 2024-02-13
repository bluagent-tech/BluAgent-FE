export const GET_DATA_DRIVER2_REQUEST = 'GET_DATA_DRIVER2_REQUEST';
export const GET_DATA_DRIVER2_SUCCESS = 'GET_DATA_DRIVER2_SUCCESS';
export const GET_DATA_DRIVER2_FAILURE = 'GET_DATA_DRIVER2_FAILURE';

export const GetDriver2 = (idu = (dispatch) => {
  dispatch({ type: GET_DATA_DRIVER2_REQUEST });

  fetch('api/Drivers/getDriverData2?id=' + id)
    .then((response) => response.json())
    .then((driver) => {
      dispatch({
        type: GET_DATA_DRIVER2_SUCCESS,
        payload: {
          driver,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_DATA_DRIVER2_FAILURE,
        error: error.toString(),
      });
    });
});
