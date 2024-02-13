import TrailersConst from './../constants/TrailersConts';
const initialState = {
    trailer: {}, isLoading: false, states: [], message: '', error: '', page: 0, count: 0, inspections: [], pageI: 0, countI: 0, 
    violations: [], pageV: 0, countV: 0, fTr: '', tTr: '',
    doc: [], docs: [], modal1: false, idDelte: 0, modalD: false,
    alertsCount: 0, modalA: false, alerts: [],toastAlertState: false,idDownload:0,idDelete:0,fileNameToDelete:"",docTypeToDelete:"", trailerPhotos: [],
};
const FileDownload = require('js-file-download');

export const actionCreators = {
  toggleToastAlert: (status) => {
    return (dispatch, getState) => {
      const toastAlert = status;
      dispatch(OpenClose(toastAlert));
    };
    function OpenClose(toastAlert) {
      return {type: TrailersConst.TOGGLE_TOAST_ALERT, toastAlert};
    }
  },

  resetMessage: () => {
    return (dispatch, getState) => {
      dispatch(ResetMessage());
    };
    function ResetMessage() {
      return {type: TrailersConst.RESET_MESSAGE};
    }
  },

  getStates: () => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/getStates", {method: "GET"})
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status !== 2) {
            const states = r.states;
            dispatch(success(states));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {type: TrailersConst.GET_STATES_REQUEST};
    }
    function success(states) {
      return {type: TrailersConst.GET_STATES_SUCCESS, states};
    }
    function failure(error) {
      return {type: TrailersConst.GET_STATES_FAILURE, error};
    }
  },
  getTrailer: (id, idu) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trailers/getTrailer?id=" + id + "&idu=" + idu, {method: "GET"})
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const trailer = r.trailer;
            dispatch(success(trailer));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return {type: TrailersConst.GET_TRAILER_REQUEST};
    }
    function success(trailer) {
      return {type: TrailersConst.GET_TRAILER_SUCCESS, trailer};
    }
    function failure(error) {
      return {type: TrailersConst.GET_TRAILER_FAILURE, error};
    }
  },
  saveTrailer: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trailers/saveTrailer", {method: "POST", body: form})
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const trailer = r.trailer;
            const alertsCount = r.alertsCount;
            const alerts = r.alerts;
            dispatch(success(trailer, alertsCount, alerts));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return {type: TrailersConst.POST_SAVE_TRAILER_REQUEST};
    }
    function success(trailer, alertsCount, alerts) {
      return {
        type: TrailersConst.POST_SAVE_TRAILER_SUCCESS,
        trailer,
        alertsCount,
        alerts,
      };
    }
    function failure(error) {
      return {type: TrailersConst.POST_SAVE_TRAILER__FAILURE, error};
    }
  },

  saveInsurance: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trailers/saveInsurance", {method: "POST", body: form})
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const trailer = r.trailer;
            const alertsCount = r.alertsCount;
            const alerts = r.alerts;
            dispatch(success(trailer, alertsCount, alerts));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {type: TrailersConst.POST_SAVE_DATA_TRAILER_INSURANCE_REQUEST};
    }
    function success(trailer, alertsCount, alerts) {
      return {
        type: TrailersConst.POST_SAVE_DATA_TRAILER_INSURANCE_SUCCESS,
        trailer,
        alertsCount,
        alerts,
      };
    }
    function failure(error) {
      return {
        type: TrailersConst.POST_SAVE_DATA_TRAILER_INSURANCE_FAILURE,
        error,
      };
    }
  },

  toggle: () => {
    return (dispatch, getState) => {
      const modal1 = !getState().trailers.modal1;
      dispatch(OpenClose(modal1));
    };
    function OpenClose(modal1) {
      return {type: TrailersConst.NEW_DOCUMENT_TOGGLE, modal1};
    }
  },
  toggleD: (id, docType, descriptionDoc) => {
    return (dispatch, getState) => {
      var modalD = !getState().trucks.modalD;
      var idD = 0;
      var fileName = "";
      var docTypeToDelete = "";
      if (modalD) {
        idD = id;
        fileName = descriptionDoc;
        docTypeToDelete = docType;
      }
      dispatch(OpenClose(modalD, idD, docTypeToDelete, fileName));
    };
    function OpenClose(modalD, idD, docTypeToDelete, fileName) {
      return {
        type: TrailersConst.DELETE_TRAILER_DOCUMENT_TOGGLE,
        modalD,
        idD,
        docTypeToDelete,
        fileName,
      };
    }
  },
  saveDoc: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trailers/saveDoc", {method: "POST", body: form})
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const doc = r.doc;
            const docs = r.docs;
            dispatch(success(docs, doc));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {type: TrailersConst.POST_SAVE_TRAILER_DOCUMENT_REQUEST};
    }
    function success(docs, doc) {
      return {
        type: TrailersConst.POST_SAVE_TRAILER_DOCUMENT_SUCCESS,
        docs,
        doc,
      };
    }
    function failure(error) {
      return {type: TrailersConst.POST_SAVE_TRAILER_DOCUMENT_FAILURE, error};
    }
  },
  getAllDocuments: (id, type, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Trailers/getAllDocuments?id=" +
          id +
          "&type=" +
          type +
          "&page=" +
          page +
          "&size=" +
          size,
        {method: "GET"}
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const doc = r.doc;
            const docs = r.docs;
            dispatch(success(docs, doc));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {type: TrailersConst.GET_ALL_TRAILER_DOCUMENTS_REQUEST};
    }
    function success(docs, doc) {
      return {type: TrailersConst.GET_ALL_TRAILER_DOCUMENTS_SUCCESS, docs, doc};
    }
    function failure(error) {
      return {type: TrailersConst.GET_ALL_TRAILER_DOCUMENTS_FAILURE, error};
    }
  },
  deleteDoc: (id, userId, docType, fileName, idTrailer) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Trailers/deleteDoc?id=" +
          id +
          "&userId=" +
          userId +
          "&docType=" +
          docType +
          "&fileName=" +
          fileName +
          "&idTrailer=" +
          idTrailer,
        {method: "DELETE"}
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docs = r.docs;
            dispatch(success(docs));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {type: TrailersConst.DELETE_TRAILER_DOCUMENT_REQUEST};
    }
    function success(docs) {
      return {type: TrailersConst.DELETE_TRAILER_DOCUMENT_SUCCESS, docs};
    }
    function failure(error) {
      return {type: TrailersConst.DELETE_TRAILER_DOCUMENT_FAILURE, error};
    }
  },

  toggleA: () => {
    return (dispatch, getState) => {
      const modalA = !getState().trailers.modalA;
      dispatch(OpenClose(modalA));
    };
    function OpenClose(modalA) {
      return {type: TrailersConst.OPEN_ALERTS_TOGGLE, modalA};
    }
  },
  getAlerts: (id, idUser, type) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        `api/Trailers/getAlerts?id=${id}&idUser=${idUser}&type=${"TRAILER"}`,
        {method: "GET"}
      )
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const alertsCount = r.alertsCount;
            const alerts = r.alerts;
            dispatch(success(alertsCount, alerts));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {type: TrailersConst.GET_TRAILER_ALERTS_REQUEST};
    }
    function success(alertsCount, alerts) {
      return {
        type: TrailersConst.GET_TRAILER_ALERTS_SUCCESS,
        alertsCount,
        alerts,
      };
    }
    function failure(error) {
      return {type: TrailersConst.GET_TRAILER_ALERTS_FAILURE, error};
    }
  },

  clean: () => ({type: TrailersConst.CLEAN_TRAILER}),
  getTrailerInspections: (id, page, size, f, t) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Trailers/getTrailerInspection?id=" +
          id +
          "&page=" +
          page +
          "&size=" +
          size +
          "&F=" +
          f +
          "&T=" +
          t,
        {method: "GET"}
      )
        .then((res) => res.json())
        .then((response) => {
         
          const r = JSON.parse(response);
          if (r.status === 0) {
            const inspections = r.inspections;
            dispatch(success(inspections));
          } else {
          
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {type: TrailersConst.GET_TRAILER_INSPECTIONS_REQUEST};
    }
    function success(inspections) {
      return {type: TrailersConst.GET_TRAILER_INSPECTIONS_SUCCESS, inspections};
    }
    function failure(error) {
      return {type: TrailersConst.GET_TRAILER_INSPECTIONS_FAILURE, error};
    }
  },
  getTrailerViolations: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Maintenance/getViolations?id=" +
          id +
          "&page=" +
          page +
          "&size=" +
          size,
        {method: "GET"}
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const violations = r.violations;
            dispatch(success(violations));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {type: TrailersConst.GET_TRAILER_VIOLATIONS_REQUEST};
    }
    function success(violations) {
      return {type: TrailersConst.GET_TRAILER_VIOLATIONS_SUCCESS, violations};
    }
    function failure(error) {
      return {type: TrailersConst.GET_TRAILER_VIOLATIONS_FAILURE, error};
    }
    function close() {
      return {type: TrailersConst.GET_TRAILER_VIOLATIONS_CLOSE};
    }
  },
  setFilter: (f, t, id, page, size) => {
    return (dispatch) => {
      fetch(
        "api/Trailers/getTrailerInspection?id=" +
          id +
          "&page=" +
          page +
          "&size=" +
          size +
          "&F=" +
          f +
          "&T=" +
          t,
        {method: "GET"}
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const inspections = r.inspections;
            dispatch(
              success(
                f,
                t,
                inspections.Items,
                inspections.CurrentPage,
                inspections.NumberP
              )
            );
          } else {
            dispatch(success(f, t, [], 0, 0));
          }
        })
        .catch((error) => {
          dispatch(success(f, t, [], 0, 0));
        });
    };
    function success(f, t, items, page, count) {
      return {type: TrailersConst.SET_TRAILER_FILTER, f, t, items, page, count};
    }
  },
  cleanFilter: (id) => {
    return (dispatch) => {
      fetch(
        "api/Trailers/getTrailerInspection?id=" +
          id +
          "&page=" +
          1 +
          "&size=" +
          10,
        {method: "GET"}
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const inspections = r.inspections;
            dispatch(
              success(
                inspections.Items,
                inspections.CurrentPage,
                inspections.NumberP
              )
            );
          } else {
            dispatch(success([], 0, 0));
          }
        })
        .catch((error) => {
          dispatch(success([], 0, 0));
        });
    };
    function success(items, page, count) {
      return {type: TrailersConst.CLEAN_TRAILER_FILTER, items, page, count};
    }
  },
  getTrailerPhotos: (id, docType) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trailers/getTrailerPhotos?id=" + id + "&docType=" + docType, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const trailerPhotos = r.trailerPhotos;
            dispatch(success(trailerPhotos));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(error));
        });
    };

    function request() {
      return { type: TrailersConst.GET_TRAILER_PHOTOS_REQUEST };
    }
    function success(trailerPhotos) {
      return { type: TrailersConst.GET_TRAILER_PHOTOS_SUCCESS, trailerPhotos };
    }
    function failure(error) {
      return { type: TrailersConst.GET_TRAILER_PHOTOS_FAILURE, error };
    }
  },
  getDocuments: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trailers/getDocuments?id=" + id, {method: "GET"})
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const doc = r.doc;
            dispatch(success(doc));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };
    function request() {
      return {type: TrailersConst.GET_DOCUMENTS_REQUEST};
    }
    function success(doc) {
      return {type: TrailersConst.GET_DOCUMENTS_SUCCESS, doc};
    }
    function failure(error) {
      return {type: TrailersConst.GET_DOCUMENTS_FAILURE, error};
    }
  },
  // TODO refactorizar con diferentes nombres
  //    getAllDocuments: (id, page, size) => {
  //        return dispatch => {
  //            dispatch(request());
  //            fetch('api/Trailers/getAllDocuments?id=' + id + '&page=' + page + '&size=' + size, { method: 'GET' })
  //                .then(res => res.json())
  //                .then(response => {
  //                    const r = JSON.parse(response);
  //                    if (r.status === 0) {
  //                       const docs = r.docs;
  //                        dispatch(success(docs));
  //                    } else { dispatch(failure(r.error)); }
  //
  //                }).catch(error => { dispatch(failure("Error in the Server")); });
  //        };
  //
  //        function request() { return { type: TrailersConst.GET_ALL_DOCUMENTS_REQUEST }; }
  //        function success(docs) { return { type: TrailersConst.GET_ALL_DOCUMENTS_SUCCESS, docs }; }
  //        function failure(error) { return { type: TrailersConst.GET_ALL_DOCUMENTS_FAILURE, error }; }
  //    },
  downloadDoc: (idTrailer, id, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Trailers/downloadDocument?idTrailer=" +
          idTrailer +
          "&id=" +
          id +
          "&docType=" +
          docType +
          "&fileName=" +
          fileName,
        {method: "GET"}
      )
        .then((response) => {
          response.blob().then((myblob) => {
            if (myblob !== null) {
              FileDownload(myblob, fileName);
              dispatch(success());
            } else {
              dispatch(failure("error"));
            }
          });
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {type: TrailersConst.DOWNLOAD_DOCUMENT_REQUEST};
    }
    function success() {
      return {type: TrailersConst.DOWNLOAD_DOCUMENT_SUCCESS};
    }
    function failure(error) {
      return {type: TrailersConst.DOWNLOAD_DOCUMENT_FAILURE, error};
    }
  },

  uploadFile: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trailers/UploadDocs", {method: "POST", body: form})
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docs = r.docs;
            dispatch(success(docs));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {type: TrailersConst.UPLOAD_FILE_REQUEST};
    }
    function success(docs) {
      return {type: TrailersConst.UPLOAD_FILE_SUCCESS, docs};
    }
    function failure(error) {
      return {type: TrailersConst.UPLOAD_FILE_FAILURE, error};
    }
  },

  saveTrailerLogo: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Trailers/saveTrailerLogo", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            dispatch(success());
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: TrailersConst.POST_SAVE_TRAILER_LOGO_REQUEST };
    }
    function success() {
      return {
        type: TrailersConst.POST_SAVE_TRAILER_LOGO_SUCCESS,
      };
    }
    function failure(error) {
      return { type: TrailersConst.POST_SAVE_TRAILER_LOGO_FAILURE, error };
    }
  },
};

export const reducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
      case TrailersConst.TOGGLE_TOAST_ALERT:
        return {...state, toastAlertState: action.toastAlert};

      case TrailersConst.RESET_MESSAGE:
        return {...state, message: ""};

      case TrailersConst.GET_STATES_REQUEST:
        return {...state, isLoading: true};

      case TrailersConst.GET_STATES_SUCCESS:
        return {...state, isLoading: false, states: action.states};

      case TrailersConst.GET_STATES_FAILURE:
        return {
          ...state,
          isLoading: false,
          states: action.states,
          error: action.error,
          message: "",
        };

      case TrailersConst.GET_TRAILER_REQUEST:
        return {...state, isLoading: true};

      case TrailersConst.GET_TRAILER_SUCCESS:
        return {...state, isLoading: false, trailer: action.trailer, error: ""};

      case TrailersConst.GET_TRAILER_FAILURE:
        return {...state, isLoading: false, error: action.error, message: ""};

      case TrailersConst.POST_SAVE_TRAILER_REQUEST:
        return {...state, isLoading: true};

      case TrailersConst.POST_SAVE_TRAILER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          trailer: action.trailer,
          alertsCount: action.alertsCount,
          alerts: action.alerts,
          toastAlertState: true,
          error: "",
          message: "Information Successfully Saved",
        };

      case TrailersConst.POST_SAVE_TRAILER_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          message: "",
          toastAlertState: true,
        };

      case TrailersConst.POST_SAVE_DATA_TRAILER_INSURANCE_REQUEST:
        return {...state, isLoading: true};

      case TrailersConst.POST_SAVE_DATA_TRAILER_INSURANCE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          trailer: action.trailer,
          alertsCount: action.alertsCount,
          alerts: action.alerts,
          error: "",
          message: "Saved Correctly",
          toastAlertState: true,
        };

      case TrailersConst.POST_SAVE_DATA_TRAILER_INSURANCE_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          message: "",
          toastAlertState: true,
        };

      case TrailersConst.NEW_DOCUMENT_TOGGLE:
        return {...state, modal1: action.modal1, error: ""};

      case TrailersConst.DELETE_TRAILER_DOCUMENT_TOGGLE:
        return {
          ...state,
          modalD: action.modalD,
          idDelete: action.idD,
          fileNameToDelete: action.fileName,
          docTypeToDelete: action.docTypeToDelete,
        };

      case TrailersConst.POST_SAVE_TRAILER_DOCUMENT_REQUEST:
        return {...state, isLoading: true};

      case TrailersConst.POST_SAVE_TRAILER_DOCUMENT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          docs: action.docs.Items,
          page: action.docs.CurrentPage,
          count: action.docs.NumberP,
          doc: action.doc,
          error: "",
          toastAlertState: true,
          message: "File succesfully uploaded",
          modal1: true,
        };

      case TrailersConst.POST_SAVE_TRAILER_DOCUMENT_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          message: "",
          toastAlertState: true,
        };

      case TrailersConst.GET_ALL_TRAILER_DOCUMENTS_REQUEST:
        return {...state, isLoading: true, docs: [], doc: []};

      case TrailersConst.GET_ALL_TRAILER_DOCUMENTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          doc: action.doc,
          docs: action.docs.Items,
          page: action.docs.CurrentPage,
          count: action.docs.NumberP,
          error: "",
          message: "",
        };

      case TrailersConst.GET_ALL_TRAILER_DOCUMENTS_FAILURE:
        return {...state, isLoading: false, error: action.error, message: ""};

      case TrailersConst.DELETE_TRAILER_DOCUMENT_REQUEST:
        return {...state, isLoading: true};

      case TrailersConst.DELETE_TRAILER_DOCUMENT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          docs: action.docs.Items,
          error: "",
          message: "File deleted successfully",
          toastAlertState: true,
          idDelete: 0,
          modalD: false,
        };

      case TrailersConst.DELETE_TRAILER_DOCUMENT_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          idDelete: 0,
          message: "",
          toastAlertState: true,
        };

      case TrailersConst.OPEN_ALERTS_TOGGLE:
        return {...state, modalA: action.modalA, error: ""};

      case TrailersConst.GET_TRAILER_ALERTS_REQUEST:
        return {...state, isLoading: true, alerts: [], alertsCount: 0};

      case TrailersConst.GET_TRAILER_ALERTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          alertsCount: action.alertsCount,
          alerts: action.alerts,
          message: "",
        };

      case TrailersConst.GET_TRAILER_ALERTS_FAILURE:
        return {
          ...state,
          isLoading: false,
          alerts: [],
          alertsCount: 0,
          error: action.error,
          message: "",
        };

      case TrailersConst.CLEAN_TRAILER:
        return {
          ...state,
          trailer: {},
          inspections: [],
          pageI: 0,
          countI: 0,
          violations: [],
          pageV: 0,
          countV: 0,
          fTr: "",
          tTr: "",
        };
      case TrailersConst.GET_TRAILER_INSPECTIONS_REQUEST:
        return {
          ...state,
          isLoading: true,
        };

      case TrailersConst.GET_TRAILER_INSPECTIONS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          inspections: action.inspections.Items,
          pageI: action.inspections.CurrentPage,
          countI: action.inspections.NumberP,
        };

      case TrailersConst.GET_TRAILER_INSPECTIONS_REQUEST:
        return {
          ...state,
          isLoading: false,
        };

      case TrailersConst.GET_TRAILER_VIOLATIONS_SUCCESS:
        return {
          ...state,
          violations: action.violations.Items,
          pageV: action.violations.CurrentPage,
          countV: action.violations.NumberP,
        };

      case TrailersConst.GET_TRAILER_VIOLATIONS_CLOSE:
        return {...state, violations: [], pageV: 0, countV: 0};

      case TrailersConst.SET_TRAILER_FILTER:
        return {
          ...state,
          fTr: action.f,
          tTr: action.t,
          inspections: action.items,
          pageI: action.page,
          countI: action.count,
        };

      case TrailersConst.CLEAN_TRAILER_FILTER:
        return {
          ...state,
          fTr: "",
          tTr: "",
          inspections: action.items,
          pageI: action.page,
          countI: action.count,
        };

      case TrailersConst.GET_DOCUMENTS_REQUEST:
        return {...state, isLoading: true, doc: []};

      case TrailersConst.GET_DOCUMENTS_SUCCESS:
        return {...state, isLoading: false, doc: action.doc, message: ""};

      case TrailersConst.GET_DOCUMENTS_FAILURE:
        return {
          ...state,
          isLoading: false,
          doc: action.doc,
          error: action.error,
          message: "",
        };

      case TrailersConst.GET_ALL_DOCUMENTS_REQUEST:
        return {...state, isLoading: true, docs: []};

      case TrailersConst.GET_ALL_DOCUMENTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          docs: action.docs.Items,
          pageD: action.docs.CurrentPage,
          countD: action.docs.NumberP,
          error: "",
          message: "",
        };

      case TrailersConst.GET_ALL_DOCUMENTS_FAILURE:
        return {...state, isLoading: false, error: action.error, message: ""};

      case TrailersConst.GET_TRAILER_PHOTOS_FAILURE:
        return { ...state, isLoading: false, error: action.error, message: "" };

      case TrailersConst.GET_TRAILER_PHOTOS_REQUEST:
        return { ...state, isLoading: true, trailerPhotos: [] };

      case TrailersConst.GET_TRAILER_PHOTOS_SUCCESS:
        return { ...state, isLoading: false, trailerPhotos: action.trailerPhotos };

      case TrailersConst.DOWNLOAD_DOCUMENT_REQUEST:
        return {...state, isLoading: true};

      case TrailersConst.DOWNLOAD_DOCUMENT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          message: action.message,
          error: "",
          idDownload: 0,
        };

      case TrailersConst.DOWNLOAD_DOCUMENT_FAILURE:
        return {
          ...state,
          isLoading: false,
          toastAlertState: true,
          error: action.error,
          message: "",
          idDownload: 0,
        };

      case TrailersConst.UPLOAD_FILE_REQUEST:
        return {...state, isLoading: true, docs: []};

      case TrailersConst.UPLOAD_FILE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          docs: action.docs.Items,
          error: "",
          toastAlertState: true,
          message: "File succesfully uploaded",
        };

      case TrailersConst.UPLOAD_FILE_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          message: "",
          toastAlertState: true,
        };

      case TrailersConst.POST_SAVE_TRAILER_LOGO_REQUEST:
        return { ...state, isLoading: true };

      case TrailersConst.POST_SAVE_TRAILER_LOGO_SUCCESS:
        return {
          ...state,
          isLoading: false,
          toastAlertState: true,
          error: "",
          message: "Trailer information successfully saved",
        };

      case TrailersConst.POST_SAVE_TRAILER_LOGO_FAILURE:
        return {
          ...state,
          isLoading: false,
          toastAlertState: true,
          error: action.error,
          message: "",
        };

      default:
        return state;
    }
}
