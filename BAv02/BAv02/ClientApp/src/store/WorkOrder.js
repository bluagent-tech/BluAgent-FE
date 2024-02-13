import WOConst from "./../constants/WorkOrderConst";
const FileDownload = require("js-file-download");
const initialState = {
  workOrder: {},
  unity: {},
  service: [],
  material: [],
  isLoading: false,
  message: "",
  error: "",
  pageS: 0,
  countS: 0,
  pageM: 0,
  countM: 0,
  modalDS: false,
  idDeleteS: 0,
  modalDM: false,
  idDeleteM: 0,
  toastAlertState: false,
  fileToDelete: "",
  reportedBy: "",
  workOrderImages: {},
};

export const actionCreators = {
  toggleToastAlert: status => {
    return (dispatch, getState) => {
      const toastAlert = status;
      dispatch(OpenClose(toastAlert));
    };
    function OpenClose(toastAlert) {
      return { type: WOConst.TOGGLE_TOAST_ALERT, toastAlert };
    }
  },
  clean: () => ({ type: WOConst.CLEAN }),

  toggleDS: (id) => {
    return (dispatch, getState) => {
      var modalDS = !getState().workOrders.modalDS;
      var idD = 0;
      if (modalDS) {
        idD = id;
      }
      dispatch(OpenClose(modalDS, idD));
    };
    function OpenClose(modalDS, idD) {
      return { type: WOConst.DELETE_SERVICE_TOGGLE, modalDS, idD };
    }
  },
  toggleDM: (id, fileToDelete) => {
    return (dispatch, getState) => {
      let modalDM = !getState().workOrders.modalDM;
      let idD = 0;
      let fileName = "";
      if (modalDM) {
        idD = id;
        fileName = fileToDelete;
      }
      dispatch(OpenClose(modalDM, idD, fileName));
    };
    function OpenClose(modalDM, idD, fileName) {
      return { type: WOConst.DELETE_MATERIAL_TOGGLE, modalDM, idD, fileName };
    }
  },
  getWorkOrder: (id, idu) => {
    return dispatch => {
      dispatch(request());
      fetch("api/WorkOrder/getWorkOrder?id=" + id + "&idu=" + idu, {
        method: "GET"
      })
        .then(res => res.json())
        .then(response => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const workOrder = r.workOrder;
            const unity = r.unity;
            const reportedBy = r.ReportedBy;
            const workOrderImages = r.workOrderImages;
            dispatch(success(workOrder, unity, reportedBy, workOrderImages));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch(error => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: WOConst.GET_WORKORDER_REQUEST };
    }
    function success(workOrder, unity, reportedBy, workOrderImages) {
      return { type: WOConst.GET_WORKORDER_SUCCESS, workOrder, unity, reportedBy, workOrderImages };
    }
    function failure(error) {
      return { type: WOConst.GET_WORKORDER_FAILURE, error };
    }
  },
  saveWorkOrder: form => {
    return dispatch => {
      dispatch(request());
      fetch("api/WorkOrder/saveWorkOrder", { method: "POST", body: form })
        .then(res => res.json())
        .then(response => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const workOrder = r.workOrder;
            dispatch(success(workOrder));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch(error => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: WOConst.POST_SAVE_DATA_WORKORDER_REQUEST };
    }
    function success(workOrder) {
      return { type: WOConst.POST_SAVE_DATA_WORKORDER_SUCCESS, workOrder };
    }
    function failure(error) {
      return { type: WOConst.POST_SAVE_DATA_WORKORDER_FAILURE, error };
    }
  },
  addService: form => {
    return dispatch => {
      dispatch(request());
      fetch("api/WorkOrder/addService", { method: "POST", body: form })
        .then(res => res.json())
        .then(response => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const service = r.service;
            dispatch(success(service));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch(error => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: WOConst.POST_ADD_SERVICE_REQUEST };
    }
    function success(service) {
      return { type: WOConst.POST_ADD_SERVICE_SUCCESS, service };
    }
    function failure(error) {
      return { type: WOConst.POST_ADD_SERVICE_FAILURE, error };
    }
  },
  getServices: (id, page, size) => {
    return dispatch => {
      dispatch(request());
      fetch(
        "api/WorkOrder/getServices?id=" +
          id +
          "&page=" +
          page +
          "&size=" +
          size,
        { method: "GET" }
      )
        .then(res => res.json())
        .then(response => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const service = r.service;
            dispatch(success(service));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch(error => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: WOConst.GET_SERVICES_REQUEST };
    }
    function success(service) {
      return { type: WOConst.GET_SERVICES_SUCCESS, service };
    }
    function failure(error) {
      return { type: WOConst.GET_SERVICES_FAILURE, error };
    }
  },
  deleteService: (id, idwo) => {
    return dispatch => {
      dispatch(request());
      fetch("api/WorkOrder/deleteService?id=" + id + "&idwo=" + idwo, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(response => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const service = r.service;
            dispatch(success(service));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch(error => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: WOConst.DELETE_SERVICE_REQUEST };
    }
    function success(service) {
      return { type: WOConst.DELETE_SERVICE_SUCCESS, service };
    }
    function failure(error) {
      return { type: WOConst.DELETE_SERVICE_FAILURE, error };
    }
  },
  addMaterial: form => {
    return dispatch => {
      dispatch(request());
      fetch("api/WorkOrder/addMaterial", { method: "POST", body: form })
        .then(res => res.json())
        .then(response => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const material = r.material;
            dispatch(success(material));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch(error => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: WOConst.POST_ADD_MATERIAL_REQUEST };
    }
    function success(material) {
      return { type: WOConst.POST_ADD_MATERIAL_SUCCESS, material };
    }
    function failure(error) {
      return { type: WOConst.POST_ADD_MATERIAL_FAILURE, error };
    }
  },
  getMateriales: (id, page, size) => {
    return dispatch => {
      dispatch(request());
      fetch(
        "api/WorkOrder/getMateriales?id=" +
          id +
          "&page=" +
          page +
          "&size=" +
          size,
        { method: "GET" }
      )
        .then(res => res.json())
        .then(response => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const material = r.material;
            dispatch(success(material));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch(error => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: WOConst.GET_MATERIALES_REQUEST };
    }
    function success(material) {
      return { type: WOConst.GET_MATERIALES_SUCCESS, material };
    }
    function failure(error) {
      return { type: WOConst.GET_MATERIALES_FAILURE, error };
    }
  },
  deleteMaterial: (id, idWorkOrder, idCompany, fileName) => {
    return dispatch => {
      dispatch(request());
      fetch(
        "api/WorkOrder/deleteMaterial?id=" +
          id +
          "&idWorkOrder=" +
          idWorkOrder +
          "&idCompany=" +
          idCompany +
          "&fileName=" +
          fileName,
        {
          method: "DELETE"
        }
      )
        .then(res => res.json())
        .then(response => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const material = r.material;
            dispatch(success(material));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch(error => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: WOConst.DELETE_MATERIAL_REQUEST };
    }
    function success(material) {
      return { type: WOConst.DELETE_MATERIAL_SUCCESS, material };
    }
    function failure(error) {
      return { type: WOConst.DELETE_MATERIAL_FAILURE, error };
    }
  },

  downloadWorkOrderFile: (idCompany, idWorkOrder, fileName) => {
    return dispatch => {
      dispatch(request());
      fetch(
        "api/WorkOrder/downloadDocument?idCompany=" +
          idCompany +
          "&idWorkOrder=" +
          idWorkOrder +
          "&fileName=" +
          fileName,
        { method: "GET" }
      )
        .then(response => {
          response.blob().then(myblob => {
            if (myblob !== null) {
              FileDownload(myblob, "filex.pdf");
              dispatch(success());
            } else {
              dispatch(failure("error"));
            }
          });
        })
        .catch(error => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: WOConst.DOWNLOAD_DOCUMENT_REQUEST };
    }
    function success() {
      return { type: WOConst.DOWNLOAD_DOCUMENT_SUCCESS };
    }
    function failure(error) {
      return { type: WOConst.DOWNLOAD_DOCUMENT_FAILURE, error };
    }
  },

  getWorkOrderImages: (idWorkOrder) => {
    return dispatch => {
      dispatch(request());
      fetch("api/WorkOrder/getWorkOrderImages?idWorkOrder=" + idWorkOrder, {
        method: "GET"
      })
        .then(res => res.json())
        .then(response => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const workOrderImages = r.workOrderImages;
            dispatch(success(workOrderImages));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch(error => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: WOConst.GET_WORKORDER_IMAGES_REQUEST };
    }
    function success(workOrderImages) {
      return { type: WOConst.GET_WORKORDER_IMAGES_SUCCESS, workOrderImages};
    }
    function failure(error) {
      return { type: WOConst.GET_WORKORDER_IMAGES_FAILURE, error };
    }
  },
  saveWorkOrderNextInspection: form => {
    return dispatch => {
      dispatch(request());
      fetch("api/WorkOrder/saveWorkOrderNextInspection", { method: "POST", body: form })
        .then(res => res.json())
        .then(response => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const workOrder = r.workOrder;
            dispatch(success(workOrder));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch(error => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: WOConst.POST_SAVE_DATA_WORKORDER_NEXT_INSPECTION_REQUEST };
    }
    function success(workOrder) {
      return { type: WOConst.POST_SAVE_DATA_WORKORDER_NEXT_INSPECTION_SUCCESS, workOrder };
    }
    function failure(error) {
      return { type: WOConst.POST_SAVE_DATA_WORKORDER_NEXT_INSPECTION_FAILURE, error };
    }
  },
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case WOConst.TOGGLE_TOAST_ALERT:
      return { ...state, toastAlertState: action.toastAlert };

      case WOConst.CLEAN:
      return {
        ...state,
        error: "",
        message: "",
        isLoading: true,
        workOrder: [],
        unity: [],
      };

    case WOConst.GET_WORKORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        workOrder: [],
        workOrderImages: [],
        unity: [],
        message: "",
        reportedBy: "",
        service: [],
        material: [],
        pageS: 0,
        countS: 0,
        pageM: 0,
        countM: 0
      };

    case WOConst.GET_WORKORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        workOrder: action.workOrder,
        unity: action.unity,
        reportedBy: action.reportedBy,
        workOrderImages: action.workOrderImages,
        error: "",
        message: ""
      };

    case WOConst.GET_WORKORDER_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case WOConst.POST_SAVE_DATA_WORKORDER_REQUEST:
      return { ...state, isLoading: true };

    case WOConst.POST_SAVE_DATA_WORKORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        workOrder: action.workOrder,
        error: "",
        message: "Saved Correctly",
        toastAlertState: true
      };

    case WOConst.POST_SAVE_DATA_WORKORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true
      };

    case WOConst.POST_ADD_SERVICE_REQUEST:
      return { ...state, isLoading: true };

    case WOConst.POST_ADD_SERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        service: action.service.Items,
        pageS: action.service.CurrentPage,
        countS: action.service.NumberP,
        error: "",
        message: "Service has been added succesfully",
        toastAlertState: true
      };

    case WOConst.POST_ADD_SERVICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true
      };

    case WOConst.GET_SERVICES_REQUEST:
      return { ...state, isLoading: true };

    case WOConst.GET_SERVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        service: action.service.Items,
        pageS: action.service.CurrentPage,
        countS: action.service.NumberP,
        error: "",
        message: ""
      };

    case WOConst.GET_SERVICES_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case WOConst.DELETE_SERVICE_TOGGLE:
      return { ...state, modalDS: action.modalDS, idDeleteS: action.idD };

    case WOConst.DELETE_SERVICE_REQUEST:
      return { ...state, isLoading: true };

    case WOConst.DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Service has been deleted successfully",
        error: "",
        idDeleteS: 0,
        modalDS: false,
        service: action.service.Items,
        pageS: action.service.CurrentPage,
        countS: action.service.NumberP,
        toastAlertState: true,
      };

    case WOConst.DELETE_SERVICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDeleteS: 0,
        message: "",
        toastAlertState: true
      };

    case WOConst.POST_ADD_MATERIAL_REQUEST:
      return { ...state, isLoading: true };

    case WOConst.POST_ADD_MATERIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        material: action.material.Items,
        pageM: action.material.CurrentPage,
        countM: action.material.NumberP,
        error: "",
        message: "Material has been added succesfully",
        toastAlertState: true,
      };
          
    case WOConst.POST_ADD_MATERIAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true
      };

    case WOConst.GET_MATERIALES_REQUEST:
      return { ...state, isLoading: true };

    case WOConst.GET_MATERIALES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        material: action.material.Items,
        pageM: action.material.CurrentPage,
        countM: action.material.NumberP,
        error: "",
        message: ""
      };

    case WOConst.GET_MATERIALES_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case WOConst.DELETE_MATERIAL_TOGGLE:
      return {
        ...state,
        modalDM: action.modalDM,
        idDeleteM: action.idD,
        fileToDelete: action.fileName
      };

    case WOConst.DELETE_MATERIAL_REQUEST:
      return { ...state, isLoading: true };

    case WOConst.DELETE_MATERIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Material has been deleted succesfully",
        toastAlertState: true,
        error: "",
        idDeleteM: 0,
        modalDM: false,
        material: action.material.Items,
        pageM: action.material.CurrentPage,
        countM: action.material.NumberP
      };

    case WOConst.DELETE_MATERIAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDeleteM: 0,
        message: ""
      };

    case WOConst.DOWNLOAD_DOCUMENT_REQUEST:
      return { ...state, isLoading: true };

    case WOConst.DOWNLOAD_DOCUMENT_SUCCESS:
      return { ...state, isLoading: false, error: "" };

    case WOConst.DOWNLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error
      };

      case WOConst.GET_WORKORDER_IMAGES_REQUEST:
      return {
        ...state,
        isLoading: true,
        workOrderImages: {},
        message: "",
      };

    case WOConst.GET_WORKORDER_IMAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        workOrderImages: action.workOrderImages,
        error: "",
        message: ""
      };

    case WOConst.GET_WORKORDER_IMAGES_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

      case WOConst.POST_SAVE_DATA_WORKORDER_NEXT_INSPECTION_REQUEST:
        return { ...state, isLoading: true };
  
      case WOConst.POST_SAVE_DATA_WORKORDER_NEXT_INSPECTION_SUCCESS:
        return {
          ...state,
          isLoading: false,
          workOrder: action.workOrder,
          error: "",
          message: "Saved Correctly",
          toastAlertState: true
        };
  
      case WOConst.POST_SAVE_DATA_WORKORDER_NEXT_INSPECTION_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          message: "",
          toastAlertState: true
        };

    default:
      return state;
  }
};
