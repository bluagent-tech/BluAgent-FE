import DevicesConst from "./../constants/DevicesConst";

const initialState = {
  isLoadingCard: false,
  isLoadingMTC: true,
  isLoading: false,
  isLoadingMediaData: true,
  toastAlertState: false,
  message: "",
  error: "",
  modalDS: false,
  companies: [],
  camera: [],
  alerts: [],
  trucks: [],
  mediaList: [],
  mediaData: [],
  cameraStatus: "",
  serialNumber: "",
  apiKey: "",
  listenAiMedia: false,
  mediaListForCard: [],
  company: "",
  companyValidation: "",
  isCompanyLoading: false,
};

export const actionCreators = {
  toggleToastAlert: (status, message) => {
    return (dispatch, getState) => {
      const toastAlert = status;
      const alert = message;
      dispatch(OpenClose(toastAlert, alert));
    };
    function OpenClose(toastAlert, alert) {
      return { type: DevicesConst.TOGGLE_TOAST_ALERT, toastAlert, alert };
    }
  },

  toggleErrorToastAlert: (status, message) => {
    return (dispatch, getState) => {
      const toastAlert = status;
      const alert = message;
      dispatch(OpenClose(toastAlert, alert));
    };
    function OpenClose(toastAlert, alert) {
      return { type: DevicesConst.TOGGLE_ERROR_TOAST_ALERT, toastAlert, alert };
    }
  },

  cleanToastAlert: () => {
    return (dispatch) => {
      dispatch(OpenClose());
    };
    function OpenClose() {
      return { type: DevicesConst.CLEAN_TOAST_REQUEST };
    }
  },

  /**
   * Funcion para resetear el valor del campo mediaListForCard
   * @param {bool} clean  - si es verdadero la variable va a cambiar a []
   * @returns
   */
  cleanMediaListForCard: (clean) => {
    return (dispatch, getState) => {
      if (clean) {
        // console.log('Cleaning media list for card...');
        dispatch(clean());
      }
      //getState().devices.mediaListForCard;
    };
    function clean() {
      return { type: DevicesConst.CLEAN_MEDIA_LIST_CARD };
    }
  },

  assignData: (serialNumber, cameraStatus) => {
    return (dispatch) => {
      dispatch(setData(serialNumber, cameraStatus));
    };
    function setData(serialNumber, cameraStatus) {
      return {
        type: DevicesConst.SET_CAMERA_DATA_REQUEST,
        serialNumber,
        cameraStatus,
      };
    }
  },
  /**
   * Obtiene todos los vehiculos de la cuenta
   */
  GetAllVehicles: () => {
    return (dispatch, getState) => {
      dispatch(request());
      fetch(
        "https://oe739qesd2.execute-api.us-east-1.amazonaws.com/default/TestAICamera",
        {
          method: "POST",
          body: JSON.stringify({
            apiKey: getState().devices.apiKey,
          }),
        }
      )
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 200) {
            const trucks = response.data;
            dispatch(success(trucks));
          } else {
            dispatch(failure(response.error));
          }
        })
        .catch((error) => {
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: DevicesConst.GET_DATA_VEHICLES_REQUEST };
    }

    function success(trucks) {
      return { type: DevicesConst.GET_DATA_VEHICLES_SUCCESS, trucks };
    }

    function failure(status) {
      return { type: DevicesConst.GET_DATA_VEHICLES_FAILURE, status };
    }
  },
  /**
   * Obtiene las alertas para un truck en especifo en una fecha en especifico.
   * Las fechas de inicio y fin no tienen que superar a la semana.
   * @param {String} serial Es el numero de serie del truck
   * @param {EpochTimeStamp} start Es la fecha inicial que debera ser enviada en formato UTC en segundos
   * @param {EpochTimeStamp} end Es la fecha final que debera de ser enviada en formato UTC en segundos
   */
  GetAlerts: (serial, start, end, idCompany) => {
    return (dispatch, getState) => {
      dispatch(request());
      fetch(
        "https://oe739qesd2.execute-api.us-east-1.amazonaws.com/default/GetAlertsCamera",
        {
          method: "POST",
          body: JSON.stringify({
            serial: serial,
            start: start,
            end: end,
            apiKey: getState().devices.apiKey,
          }),
        }
      )
        .then((res) => res.json()) // Obtener los datos JSON de la respuesta
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            const alerts = response.data;
            dispatch(success(alerts));
          } else {
            dispatch(failure(response.error));
          }
        })
        //dispatch(success(response.companies));
        .catch((error) => {
          console.log(error);
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: DevicesConst.GET_DATA_ALERTS_REQUEST };
    }

    function success(alerts) {
      return { type: DevicesConst.GET_DATA_ALERTS_SUCCESS, alerts };
    }

    function failure(status) {
      return { type: DevicesConst.GET_DATA_ALERTS_FAILURE, status };
    }
  },

  /**
   * Obtiene los links del o los videos de la plataforma de fleet en funcion del EventId que le enviemos
   * @param {int} eventId Es Id del evento del cual queremos los videos
   */
  GetMediaData: (eventId) => {
    return (dispatch, getState) => {
      dispatch(request());
      fetch(
        "https://oe739qesd2.execute-api.us-east-1.amazonaws.com/default/GetMediaDataCamera",
        {
          method: "POST",
          body: JSON.stringify({
            eventId: eventId,
            apiKey: getState().devices.apiKey,
          }),
        }
      )
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 200) {
            // console.log("Hice la peticion");
            var mediaData;
            const rawText = response.data.toString();
            const regex = /https:\/\/.*?\.mp4/g;
            if (rawText.match(regex) != null) {
              mediaData = rawText.match(regex);
            } else {
              mediaData = [];
            }
            dispatch(success(mediaData));
          } else {
            dispatch(failure(response.error));
          }
        })
        .catch((error) => {
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: DevicesConst.GET_DATA_MEDIA_DATA_REQUEST };
    }

    function success(mediaData) {
      return { type: DevicesConst.GET_DATA_MEDIA_DATA_SUCCESS, mediaData };
    }

    function failure(status) {
      return { type: DevicesConst.GET_DATA_MEDIA_DATA_FAILURE, status };
    }
  },

  /**
   * Obtiene todos los eventos para una camara en especifico
   * @param {String} cameraSerial Es el numero de seria de la camara de la que queremos traer informacion.
   * @param {EpochTimeStamp} start Es la fecha inicial que debera ser enviada en formato UTC en segundos
   * @param {EpochTimeStamp} end Es la fecha final que debera de ser enviada en formato UTC en segundos
   */
  GetMediaList: (cameraSerial, start, end) => {
    return (dispatch, getState) => {
      dispatch(request());
      fetch(
        "https://oe739qesd2.execute-api.us-east-1.amazonaws.com/default/GetMediaListCamera",
        {
          method: "POST",
          body: JSON.stringify({
            cameraSerial: cameraSerial,
            start: start,
            end: end,
            apiKey: getState().devices.apiKey,
          }),
        }
      )
        .then((res) => res.json()) // Obtener los datos JSON de la respuesta
        .then((response) => {
          if (response.status === 200) {
            const mediaList = JSON.parse(response.data);
            dispatch(success(mediaList));
          } else {
            dispatch(failure(response.error));
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: DevicesConst.GET_DATA_MEDIA_LIST_REQUEST };
    }

    function success(mediaList) {
      return { type: DevicesConst.GET_DATA_MEDIA_LIST_SUCCESS, mediaList };
    }

    function failure(status) {
      return { type: DevicesConst.GET_DATA_MEDIA_LIST_FAILURE, status };
    }
  },

  /**
   * Obtiene todos los eventos para una camara en especifico para la card de Common alerts per week
   * @param {String} cameraSerial Es el numero de seria de la camara de la que queremos traer informacion.
   * @param {EpochTimeStamp} start Es la fecha inicial que debera ser enviada en formato UTC en segundos
   * @param {EpochTimeStamp} end Es la fecha final que debera de ser enviada en formato UTC en segundos
   */
  GetMediaListForCard: (serialNumber, start, end) => {
    return (dispatch, getState) => {
      //console.log('Datos de entrada a la funcion: ', serialNumber, start, end);

      dispatch(request());
      fetch(
        "https://oe739qesd2.execute-api.us-east-1.amazonaws.com/default/GetMediaListCamera",
        {
          method: "POST",
          body: JSON.stringify({
            cameraSerial: serialNumber,
            start: start,
            end: end,
          }),
        }
      )
        .then((res) => res.json()) // Obtener los datos JSON de la respuesta
        .then((response) => {
          if (response.status === 200) {
            const data = JSON.parse(response.data);
            //console.log('data: ', data);
            var mediaPack = getState().devices.mediaListForCard;
            data.map((mapData) => {
              // console.log(mapData.eventId);
              mediaPack.push(mapData.eventType);
            });
            //console.log('Media pack', { mediaPack });
            dispatch(success(mediaPack));
          } else if (response.status === 447) {
            var mediaPack = getState().devices.mediaListForCard;
            dispatch(success(mediaPack));
          } else {
            dispatch(failure(response.error));
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: DevicesConst.GET_DATA_MEDIA_LIST_CARD_REQUEST };
    }

    function success(mediaPack) {
      return { type: DevicesConst.GET_DATA_MEDIA_LIST_CARD_SUCCESS, mediaPack };
    }

    function failure(status) {
      return { type: DevicesConst.GET_DATA_MEDIA_LIST_CARD_FAILURE, status };
    }
  },

  GetAllCompany: () => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/CompanySuperAdmin/GetAllCompanies", { method: "GET" })
        .then((res) => res.json()) // Obtener los datos JSON de la respuesta
        .then((response) => {
          dispatch(success(response));
        })
        .catch((error) => {
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: DevicesConst.GET_DATA_COMPANIES_REQUEST };
    }

    function success(companies) {
      return { type: DevicesConst.GET_DATA_COMPANIES_SUCCESS, companies };
    }

    function failure(status) {
      return { type: DevicesConst.GET_DATA_COMPANIES_FAILURE, status };
    }
  },
  GetCompanyById: (idCompany) => {
    console.log('idCompany from company id:: ', idCompany);
    return (dispatch) => {
      dispatch(request(idCompany));
      fetch(`/api/SuperAdmin/GetCompanyById?idCompany=${idCompany}`, {
        method: "GET",
      })
        .then((res) => res.json()) // Obtener los datos JSON de la respuesta
        .then((response) => {
          console.log("Company: ", response);
          dispatch(success(response.data));
        })
        .catch((error) => {
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: DevicesConst.GET_COMPANY_BY_ID_REQUEST, idCompany };
    }

    function success(companies) {
      return { type: DevicesConst.GET_COMPANY_BY_ID_SUCCESS, company };
    }

    function failure(status) {
      return { type: DevicesConst.GET_COMPANY_BY_ID_FAILURE, status };
    }
  },

  AddCamera: (camera) => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/Camera/AddCamera", {
        method: "POST",
        body: camera,
      })
        .then((res) => res.json()) // Obtener los datos JSON de la respuesta
        .then((response) => {
          dispatch(actionCreators.toggleToastAlert(true, response.message));
          dispatch(success(response));
        })
        .catch((error) => {
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: DevicesConst.POST_DATA_DEVICE_REQUEST };
    }

    function success(camera) {
      return { type: DevicesConst.POST_DATA_DEVICE_SUCCESS, camera };
    }

    function failure(status) {
      return { type: DevicesConst.POST_DATA_DEVICE_FAILURE, status };
    }
  },

  GetCameraByIdCompanyAndType: (idCompany, type) => {
    // console.log('Datos: ', idCompany, type);
    return (dispatch, getState) => {
      dispatch(request());
      fetch(
        `/api/Camera/GetCameraByIdCompanyAndType?IdCompany=${idCompany}&Type=${type}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json()) // Obtener los datos JSON de la respuesta
        .then((response) => {
          if (idCompany !== getState().devices.companyValidation) {
            console.log('Entra al if>>>');
            dispatch(actionCreators.GetCompanyById(idCompany));
          }
          dispatch(success(response.data));
        })
        .catch((error) => {
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: DevicesConst.GET_DATA_DEVICES_REQUEST };
    }

    function success(camera) {
      return { type: DevicesConst.GET_DATA_DEVICES_SUCCESS, camera };
    }

    function failure(status) {
      return { type: DevicesConst.GET_DATA_DEVICES_FAILURE, status };
    }
  },

  UpdateCameraStatus: (idVehicle, serialNumber, status, type, idCompany) => {
    const formData = new FormData();
    formData.append("idVehicle", idVehicle);
    formData.append("serialNumber", serialNumber);
    formData.append("status", status);

    return (dispatch) => {
      dispatch(actionCreators.cleanToastAlert());
      dispatch(request());
      fetch(`/api/Camera/UpdateCameraStatus`, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          dispatch(actionCreators.GetCameraByIdCompanyAndType(idCompany, type));
          return res.json();
        }) // Obtener los datos JSON de la respuesta
        .then((response) => {
          dispatch(actionCreators.toggleToastAlert(true, response.message));
          dispatch(success(response.data));
        })
        .catch((error) => {
          dispatch(actionCreators.toggleErrorToastAlert(true, error.message));
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: DevicesConst.POST_UPDATE_CAMERA_REQUEST };
    }

    function success(camera) {
      return { type: DevicesConst.POST_UPDATE_CAMERA_SUCCESS, camera };
    }

    function failure(status) {
      return { type: DevicesConst.POST_UPDATE_CAMERA_FAILURE, status };
    }
  },

  UnassignCameraStatus: (serialNumber, status, callback) => {
    const formData = new FormData();
    formData.append("serialNumber", serialNumber);
    formData.append("status", status);

    return (dispatch) => {
      dispatch(request());
      fetch(`/api/Camera/UpdateCameraStatus`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json()) // Obtener los datos JSON de la respuesta
        .then((response) => {
          callback();
          dispatch(success(response.data));
        })
        .catch((error) => {
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: DevicesConst.POST_UPDATE_CAMERA_REQUEST };
    }

    function success(camera) {
      return { type: DevicesConst.POST_UPDATE_CAMERA_SUCCESS, camera };
    }

    function failure(status) {
      return { type: DevicesConst.POST_UPDATE_CAMERA_FAILURE, status };
    }
  },

  GetCameraKey: (idCompany) => {
    return (dispatch) => {
      dispatch(request());
      fetch(`/api/UserLog/GetCompanyKey?IdCompany=${idCompany}`, {
        method: "GET",
      })
        .then((res) => res.json()) // Obtener los datos JSON de la respuesta
        .then((response) => {
          var promise = JSON.parse(response);
          dispatch(success(promise.data));
        })
        .catch((error) => {
          console.log("error: ", error);
          dispatch(failure(true));
        });
    };

    function request() {
      return { type: DevicesConst.GET_DATA_KEY_REQUEST };
    }

    function success(key) {
      return { type: DevicesConst.GET_DATA_KEY_SUCCESS, key };
    }

    function failure(status) {
      return { type: DevicesConst.GET_DATA_KEY_FAILURE, status };
    }
  },
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case DevicesConst.TOGGLE_TOAST_ALERT:
      return {
        ...state,
        toastAlertState: action.toastAlert,
        message: action.alert,
      };

    case DevicesConst.TOGGLE_ERROR_TOAST_ALERT:
      return {
        ...state,
        toastAlertState: action.toastAlert,
        error: action.alert,
      };

    case DevicesConst.CLEAN:
      return {
        ...state,
        error: "",
        message: "",
        isLoading: true,
        workOrder: [],
        unity: [],
        companies: [],
      };

    case DevicesConst.CLEAN_TOAST_REQUEST:
      return {
        ...state,
        error: "",
        message: "",
        toastAlertState: false,
      };

    case DevicesConst.DELETE_SERVICE_TOGGLE:
      return { ...state, modalDS: action.modalDS, idDeleteS: action.idD };

    case DevicesConst.CLEAN_MEDIA_LIST_CARD:
      return { ...state, mediaListForCard: [] };

    case DevicesConst.SET_CAMERA_DATA_REQUEST:
      return {
        ...state,
        serialNumber: action.serialNumber,
        cameraStatus: action.cameraStatus,
      };

    case DevicesConst.GET_COMPANY_BY_ID_REQUEST:
      return {
        ...state,
        isCompanyLoading: false,
        companyValidation: action.idcompany,
      };

    case DevicesConst.GET_COMPANY_BY_ID_SUCCESS:
      return {
        ...state,
        isCompanyLoading: true,
        company: action.company,
      };

    case DevicesConst.GET_COMPANY_BY_ID_FAILURE:
      return {
        ...state,
        isCompanyLoading: false,
      };

    case DevicesConst.GET_DATA_COMPANIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DevicesConst.GET_DATA_COMPANIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companies: action.companies,
      };

    case DevicesConst.GET_DATA_COMPANIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.status,
      };

    case DevicesConst.GET_DATA_DEVICES_REQUEST:
      return {
        ...state,
        isLoading: false,
        isLoadingMTC: true,
      };

    case DevicesConst.GET_DATA_DEVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        camera: action.camera,
        isLoadingMTC: false,
      };

    case DevicesConst.GET_DATA_DEVICES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.status,
        isLoadingMTC: false,
      };

    case DevicesConst.GET_DATA_VEHICLES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DevicesConst.GET_DATA_VEHICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trucks: action.trucks,
      };

    case DevicesConst.GET_DATA_VEHICLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.status,
      };

    //? Get alerts for a specific truck
    case DevicesConst.GET_DATA_ALERTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DevicesConst.GET_DATA_ALERTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alerts: action.alerts,
      };

    case DevicesConst.GET_DATA_ALERTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.status,
      };

    //? Get Media list for a specific camera
    case DevicesConst.GET_DATA_MEDIA_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DevicesConst.GET_DATA_MEDIA_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mediaList: action.mediaList,
      };

    case DevicesConst.GET_DATA_MEDIA_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.status,
        mediaList: [],
      };

    //? Get Media list for a specific camera (CARD)
    case DevicesConst.GET_DATA_MEDIA_LIST_CARD_REQUEST:
      return {
        ...state,
        isLoadingCard: true,
      };

    case DevicesConst.GET_DATA_MEDIA_LIST_CARD_SUCCESS:
      return {
        ...state,
        isLoadingCard: false,
        mediaListForCard: action.mediaPack,
      };

    case DevicesConst.GET_DATA_MEDIA_LIST_CARD_FAILURE:
      return {
        ...state,
        isLoadingCard: false,
        error: action.status,
        mediaListForCard: [],
      };

    //? Get Media data for a specific event
    case DevicesConst.GET_DATA_MEDIA_DATA_REQUEST:
      return {
        ...state,
        isLoadingMediaData: true,
      };

    case DevicesConst.GET_DATA_MEDIA_DATA_SUCCESS:
      return {
        ...state,
        isLoadingMediaData: false,
        mediaData: action.mediaData,
      };

    case DevicesConst.GET_DATA_MEDIA_DATA_FAILURE:
      return {
        ...state,
        isLoadingMediaData: false,
        error: action.status,
        mediaData: [],
      };

    //? Change Camera Status
    case DevicesConst.POST_UPDATE_CAMERA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DevicesConst.POST_UPDATE_CAMERA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mediaList: action.camera,
        listenAiMedia: true,
      };

    case DevicesConst.POST_UPDATE_CAMERA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.status,
      };
    //? Change Camera Status
    case DevicesConst.GET_DATA_KEY_REQUEST:
      return {
        ...state,
      };

    case DevicesConst.GET_DATA_KEY_SUCCESS:
      return {
        ...state,
        apiKey: action.key,
      };

    case DevicesConst.GET_DATA_KEY_FAILURE:
      return {
        ...state,
        error: action.status,
      };
    default:
      return state;
  }
};
