export const FETCH_ACCIDENTS_REQUEST = 'FETCH_ACCIDENTS_REQUEST';
export const FETCH_ACCIDENTS_SUCCESS = 'FETCH_ACCIDENTS_SUCCESS';
export const FETCH_ACCIDENTS_FAILURE = 'FETCH_ACCIDENTS_FAILURE';

export const fetchAccidents = (idu) => (dispatch) => {
  dispatch({ type: FETCH_ACCIDENTS_REQUEST });
  fetch('api/AccountSet/getAddAccidentsBD?idu=' + idu)
    .then((response) => response.json())
    .then((accidents) => {
      dispatch({
        type: FETCH_ACCIDENTS_SUCCESS,
        payload: {
          accidents,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ACCIDENTS_FAILURE,
        error: error.toString(),
      });
    });
};
