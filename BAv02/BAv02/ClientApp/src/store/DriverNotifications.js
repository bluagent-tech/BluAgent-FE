import NotificationsConst from "./../constants/NotificationsConst";
const initialState = {
  isLoadingN: false,
  isLoadingM: false,
  isLoadingC: false,
  isLoadingDrivers: false,
  isLoadingMaintenance: false,
  isLoadingAlertsReal: true,
  isLoadingLogs: false,
  isLoadingCompany: false,
  notifications: [],
  notificationsM: [],
  notificationsC: [],
  message: "",
  error: "",
  messageS: "",
  errorS: "",
  errorM: "",
  alerts: [],
  maintenance: [],
  company: [],
  logs: [],
  driverId: 0,
  alertsVehicles: [],
  alertsTrailers: [],
};

export const actionCreators = {
  getNotificationsDrivers: (id, callback) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/getNotifications?id=" + id, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const alerts = r.alerts;
            dispatch(success(alerts));
          } else {
            dispatch(failure(r.error));
          }
          callback();
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: NotificationsConst.GET_NOTIFICATIONS_REQUEST };
    }
    function success(alerts) {
      return { type: NotificationsConst.GET_NOTIFICATIONS_SUCCESS, alerts };
    }
    function failure(error) {
      return { type: NotificationsConst.GET_NOTIFICATIONS_FAILURE, error };
    }
  },
  getNotificationsMaintenance: (id, callback) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Maintenance/getNotificationsMaintenance?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            var alertsVehicles = r.alertsVehicles;
            var alertsTrailers = r.alertsTrailers;
            var alertsMaintenance = r.alertsMaintenance;
            dispatch(success(alertsVehicles, alertsTrailers, alertsMaintenance));
          } else {
            dispatch(failure(r.error));
          }
          callback();
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: NotificationsConst.GET_NOTIFICATIONS_MAINTENANCE_REQUEST };
    }
    function success(alertsVehicles, alertsTrailers, alertsMaintenance) {
      return {
        type: NotificationsConst.GET_NOTIFICATIONS_MAINTENANCE_SUCCESS,
        alertsVehicles,
        alertsTrailers,
        alertsMaintenance,
      };
    }
    function failure(error) {
      return {
        type: NotificationsConst.GET_NOTIFICATIONS_MAINTENANCE_FAILURE,
        error,
      };
    }
  },
  getNotificationsLogs: (id, callback) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/logsRandomNotifications?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const logs = r.notificationsLR;
            // console.log("Store: ", logs);
            dispatch(success(logs));
          } else {
            dispatch(failure(r.error));
          }
          callback();
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: NotificationsConst.GET_NOTIFICATIONS_LOGS_REQUEST };
    }
    function success(logs) {
      return {
        type: NotificationsConst.GET_NOTIFICATIONS_LOGS_SUCCESS,
        logs,
      };
    }
    function failure(error) {
      return {
        type: NotificationsConst.GET_NOTIFICATIONS_LOGS_FAILURE,
        error,
      };
    }
  },
  getNotificationsCompany: (id, callback) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/getNotificationsCompany?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const company = r.alertsCompany;
            dispatch(success(company));
          } else {
            dispatch(failure(r.error));
          }
          callback();
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: NotificationsConst.GET_NOTIFICATIONS_COMPANY_REQUEST };
    }
    function success(company) {
      return {
        type: NotificationsConst.GET_NOTIFICATIONS_COMPANY_SUCCESS,
        company,
      };
    }
    function failure(error) {
      return {
        type: NotificationsConst.GET_NOTIFICATIONS_COMPANY_FAILURE,
        error,
      };
    }
  },
  getSaveNot: (id, callback) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/generateDriverNotifications?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            var notifications = r.notifications;
            dispatch(success(notifications));
          } else {
            dispatch(failure(r.error));
          }
          callback();
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: NotificationsConst.GET_SAVE_NOTIFICATIONS_REQUEST };
    }
    function success(notifications) {
      return {
        type: NotificationsConst.GET_SAVE_NOTIFICATIONS_SUCCESS,
        notifications,
      };
    }
    function failure(error) {
      return { type: NotificationsConst.GET_SAVE_NOTIFICATIONS_FAILURE, error };
    }
  },
  getSaveNotM: (id, callback) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/generateMaintenanceNotifications?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const notifications = r.notificationsM;
            dispatch(success(notifications));
          } else {
            dispatch(failure(r.error));
          }
          callback();
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: NotificationsConst.GET_SAVE_NOTIFICATIONSM_REQUEST };
    }
    function success(notificationsM) {
      return {
        type: NotificationsConst.GET_SAVE_NOTIFICATIONSM_SUCCESS,
        notificationsM,
      };
    }
    function failure(error) {
      return {
        type: NotificationsConst.GET_SAVE_NOTIFICATIONSM_FAILURE,
        error,
      };
    }
  },
  getSaveNotC: (id, callback) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/generateCompanyNotifications?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status === 0) {
            const notifications = r.notificationsC;
            dispatch(success(notifications));
          } else {
            dispatch(failure(r.error));
          }
          callback();
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: NotificationsConst.GET_SAVE_NOTIFICATIONSC_REQUEST };
    }
    function success(notificationsC) {
      return {
        type: NotificationsConst.GET_SAVE_NOTIFICATIONSC_SUCCESS,
        notificationsC,
      };
    }
    function failure(error) {
      return {
        type: NotificationsConst.GET_SAVE_NOTIFICATIONSC_FAILURE,
        error,
      };
    }
  },
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case NotificationsConst.GET_NOTIFICATIONS_REQUEST:
      return { ...state, isLoadingDrivers: false, alerts: [] };

    case NotificationsConst.GET_NOTIFICATIONS_SUCCESS:
      return { ...state, isLoadingDrivers: true, alerts: action.alerts };

    case NotificationsConst.GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        isLoadingDrivers: true,
        alerts: [],
        error: action.error,
        message: "",
      };

    case NotificationsConst.GET_NOTIFICATIONS_MAINTENANCE_REQUEST:
      return { ...state, isLoadingAlertsReal: true, isLoadingMaintenance: false, alertsVehicles: [], alertsTrailers: [], alertsMaintenance: [] };

    case NotificationsConst.GET_NOTIFICATIONS_MAINTENANCE_SUCCESS:
      return {
        ...state,
        isLoadingAlertsReal: false,
        isLoadingMaintenance: true,
        alertsVehicles: action.alertsVehicles,
        alertsTrailers: action.alertsTrailers,
        alertsMaintenance: action.alertsMaintenance,
      };

    case NotificationsConst.GET_NOTIFICATIONS_MAINTENANCE_FAILURE:
      return {
        ...state,
        isLoadingAlertsReal: false,
        isLoadingMaintenance: true,
        alertsVehicles: [],
        alertsTrailers: [],
        alertsMaintenance: [],
        error: action.error,
        message: "",
      };

    case NotificationsConst.GET_NOTIFICATIONS_LOGS_REQUEST:
      return { ...state, isLoadingLogs: false, logs: [] };

    case NotificationsConst.GET_NOTIFICATIONS_LOGS_SUCCESS:
      return { ...state, isLoadingLogs: true, logs: action.logs };

    case NotificationsConst.GET_NOTIFICATIONS_LOGS_FAILURE:
      return {
        ...state,
        isLoadingLogs: true,
        logs: [],
        error: action.error,
        message: "",
      };

    case NotificationsConst.GET_NOTIFICATIONS_COMPANY_REQUEST:
      return { ...state, isLoadingCompany: false, company: [] };

    case NotificationsConst.GET_NOTIFICATIONS_COMPANY_SUCCESS:
      return { ...state, isLoadingCompany: true, company: action.company };

    case NotificationsConst.GET_NOTIFICATIONS_COMPANY_FAILURE:
      return {
        ...state,
        isLoadingCompany: true,
        company: [],
        error: action.error,
        message: "",
      };

    case NotificationsConst.GET_SAVE_NOTIFICATIONS_REQUEST:
      return { ...state, isLoadingN: false, notifications: [] };

    case NotificationsConst.GET_SAVE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoadingN: true,
        notifications: action.notifications,
      };

    case NotificationsConst.GET_SAVE_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        isLoadingN: true,
        notifications: [],
        error: action.error,
        message: "",
      };

    case NotificationsConst.GET_SAVE_NOTIFICATIONSM_REQUEST:
      return { ...state, isLoadingM: false, notificationsM: [] };

    case NotificationsConst.GET_SAVE_NOTIFICATIONSM_SUCCESS:
      return {
        ...state,
        isLoadingM: true,
        notificationsM: action.notificationsM,
      };

    case NotificationsConst.GET_SAVE_NOTIFICATIONSM_FAILURE:
      return {
        ...state,
        isLoadingM: true,
        notificationsM: [],
        error: action.error,
        message: "",
      };

    case NotificationsConst.GET_SAVE_NOTIFICATIONSC_REQUEST:
      return { ...state, isLoadingC: false, notificationsC: [] };

    case NotificationsConst.GET_SAVE_NOTIFICATIONSC_SUCCESS:
      return {
        ...state,
        isLoadingC: true,
        notificationsC: action.notificationsM,
      };

    case NotificationsConst.GET_SAVE_NOTIFICATIONSC_FAILURE:
      return {
        ...state,
        isLoadingC: true,
        notificationsC: [],
        error: action.error,
        message: "",
      };

    default:
      return state;
  }
};
