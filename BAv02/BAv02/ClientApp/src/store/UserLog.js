import userConst from "./../constants/UserLogConst";

//import {SecureLS} from "secure-ls"
const initialState = {
  user: [],
  error: "",
  errorS: "",
  messageS: "",
  message: "",
  isLoading: false,
  isLoadingS: false,
  company: {},
  dot: "",
  modalCP: false,
  onboardUser: null,
  toastAlertState: false,
  permits: [],
};

export const actionCreators = {
  toggleToastAlert: (status) => {
    return (dispatch, getState) => {
      const toastAlert = status;
      dispatch(OpenClose(toastAlert));
    };
    function OpenClose(toastAlert) {
      return { type: userConst.TOGGLE_TOAST_ALERT, toastAlert };
    }
  },
  getOnBoard: (idCompany) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Userlog/GetOnBoard?idCompany=" + idCompany, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status == 0) {
            dispatch(success(r.onBoard));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {
        type: userConst.GET_ONBOARD_REQUEST,
      };
    }

    function success(onBoard) {
      return {
        type: userConst.GET_ONBOARD_SUCCESS,
        onBoard,
      };
    }

    function failure(error) {
      return { type: userConst.GET_ONBOARD_FAILURE, error };
    }
  },
  OnboardCompleted: (idCompany) => {
    return (dispatch) => {
      dispatch(request());

      fetch("api/Userlog/OnBoardCompleted?idCompany=" + idCompany, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
          if (r.status == 0) {
            dispatch(success(r.onBoard));
          }
        })
        .catch((error) => {
          dispatch(failure(error));
        });
      function request() {
        return { type: userConst.ONBOARD_COMPLETED_REQUEST };
      }
      function success(onBoard) {
        return { type: userConst.ONBOARD_COMPLETED_SUCCESS, onBoard };
      }
      function failure() {
        return { type: userConst.ONBOARD_COMPLETED_FAILURE };
      }
    };
  },
  clean: () => ({ type: userConst.CLEAN }),

  login: (email, password, tokenCode) => {
    return (dispatch) => {
      dispatch(request({ email }));
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);
      data.append("tokenCode", tokenCode);
      fetch("api/Userlog/login", { method: "POST", body: data })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            //console.log("Datos del storage: ", r);
            const status = r.status;
            if (status === 'INACTIVE') {
              dispatch(failure('User has been deactivated.'));
            }
            
            const user = r.user;
            const permits = r.permits;
            const idCompany = r.idCompany;
            const stateNum = r.stateNumber;
            const cameraService = r.cameraService;
            /* const realCompanyId = r.realCompanyId;
            const realUserId = r.realUserId;
            localStorage.setItem("realCompanyId", JSON.stringify(realCompanyId));
            localStorage.setItem("realUserId", JSON.stringify(realUserId));*/

            localStorage.setItem("cameraService", JSON.stringify(cameraService))
            localStorage.setItem("idCompany", JSON.stringify(idCompany));
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("permits", JSON.stringify(permits));
            localStorage.setItem("StateCompanyN", JSON.stringify(stateNum));

            let needsUnboard = false;
            if (tokenCode !== undefined) {
              needsUnboard = true;
            }
            dispatch(success(user, needsUnboard));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(error));
        });
    };

    function request(user) {
      return { type: userConst.LOGIN_REQUEST, user };
    }
    function success(user, needsUnboard) {
      return { type: userConst.LOGIN_SUCCESS, user, needsUnboard };
    }
    function failure(error) {
      return { type: userConst.LOGIN_FAILURE, error };
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    return { type: userConst.LOGOUT };
  },
  register: (user) => {
    return (dispatch) => {
      dispatch(request({ user }));
      fetch("api/Userlog/saveNewUser", { method: "POST", body: user })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const user = r.user;
            dispatch(success(user));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error in the Server${error}`));
        });
    };

    function request(user) {
      return { type: userConst.REGISTER_REQUEST, user };
    }
    function success(user) {
      return { type: userConst.REGISTER_SUCCESS, user };
    }
    function failure(error) {
      return { type: userConst.REGISTER_FAILURE, error };
    }
  },
  getDateCompany: (dot) => {
    // fetch("api/userlog/getDataCompanyByUsDot?dot=" + dot, { method: "GET" })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     const r = JSON.parse(response);
    //     console.log("response del get data>", r);
    //   });///////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    return (dispatch) => {
      dispatch(request({ dot }));
      //console.log("dioti ", JSON.stringify({ dotNumber: parseInt(dot) }));
      fetch(
        "https://b9oct2ga0b.execute-api.us-east-1.amazonaws.com/default/getDataCompanyByUsDot",
        { method: "POST", body: JSON.stringify({ dotNumber: parseInt(dot) }) }
      )
        .then((res) => res.json())
        .then((response) => {
          if (response !== null) {
            dispatch(success(response));
          } else {
            dispatch(success({}));
          }
        })
        .catch((error) => {
          console.log("GetDataCompany: ", error);
          dispatch(failure("Error in the Server: getDateCompany"));
        });
    };

    function request(dot) {
      return { type: userConst.GET_DATA_COMPANY_BYDOT_REQUEST, dot };
    }
    function success(company) {
      return { type: userConst.GET_DATA_COMPANY_BYDOT_SUCCESS, company };
    }
    function failure(error) {
      return { type: userConst.GET_DATA_COMPANY_BYDOT_FAILURE, error };
    }
  },
  getRoleData: (id, idu) => {
    return (dispatch) => {
      dispatch(request({}));
      fetch("api/Userlog/getRoleData?id=" + id + "&idu=" + idu, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const u = r.user;
            dispatch(success(u));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server: getRoleData"));
        });
    };

    function request() {
      return { type: userConst.GET_USER_DATA_REQUEST };
    }
    function success(user) {
      return { type: userConst.GET_USER_DATA_SUCCESS, user };
    }
    function failure(error) {
      return { type: userConst.GET_USER_DATA_FAILURE, error };
    }
  },
  saveSignatureFile: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/UserLog/saveSignatureFile", { method: "POST", body: form })
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
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: userConst.POST_SIGNATURE_REQUEST };
    }
    function success() {
      return { type: userConst.POST_SIGNATURE_SUCCESS };
    }
    function failure(error) {
      return { type: userConst.POST_SIGNATURE_FAILURE, error };
    }
  },
  updateUser: (user) => {
    return (dispatch) => {
      dispatch(request({}));
      fetch("api/Userlog/UpdateUser", { method: "POST", body: user })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const u = r.user;

            var localUser = JSON.parse(localStorage.user);
            if (u.Id === JSON.parse(localStorage.getItem("user")).Id) {
              localUser.FileImage = u.FileImage;
              localStorage.setItem("user", JSON.stringify(localUser));
            }

            dispatch(success(u));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: userConst.POST_UPDATE_USER_REQUEST };
    }
    function success(user) {
      return { type: userConst.POST_UPDATE_USER_SUCCESS, user };
    }
    function failure(error) {
      return { type: userConst.POST_UPDATE_USER_FAILURE, error };
    }
  },
  changePassword: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/UserLog/changePassword", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            dispatch(success());
            document.forms["formCP"].reset();
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: userConst.POST_CHANGE_PASSWORD_REQUEST };
    }
    function success() {
      return { type: userConst.POST_CHANGE_PASSWORD_SUCCESS };
    }
    function failure(error) {
      return { type: userConst.POST_CHANGE_PASSWORD_FAILURE, error };
    }
  },
  ForgotPassword: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Authorization/forgot-password", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(form),
      })
        .then((response) => {
          if (response.ok) {
            dispatch(success());
          } else {
            dispatch(failure(response));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: userConst.POST_FORGOT_PASSWORD_REQUEST };
    }
    function success() {
      return { type: userConst.POST_FORGOT_PASSWORD_SUCCESS };
    }
    function failure(error) {
      return { type: userConst.POST_FORGOT_PASSWORD_FAILURE, error };
    }
  },
  ResetPassword: (form, token) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Authorization/reset-password/" + token, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(form),
      })
        .then((response) => {
          if (response.ok) {
            dispatch(success());
          } else {
            dispatch(failure(response));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: userConst.POST_RESET_PASSWORD_REQUEST };
    }
    function success() {
      return { type: userConst.POST_RESET_PASSWORD_SUCCESS };
    }
    function failure(error) {
      return { type: userConst.POST_RESET_PASSWORD_FAILURE, error };
    }
  },
  toggleCP: () => {
    return (dispatch, getState) => {
      const modal = !getState().userLog.modalCP;
      dispatch(OpenClose(modal));
    };
    function OpenClose(modal) {
      return { type: userConst.CHANGE_PASSWORD_TOGGLE, modal };
    }
  },
  sendConfirmationEmail: (email, name) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/UserLog/sendConfirmationEmail?userEmail=" +
        email +
        "&userName=" +
        name,
        { method: "GET" }
      )
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
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: userConst.SEND_CONFIRMATION_EMAIL_REQUEST };
    }
    function success() {
      return { type: userConst.SEND_CONFIRMATION_EMAIL_SUCCESS };
    }
    function failure(error) {
      return { type: userConst.SEND_CONFIRMATION_EMAIL_FAILURE, error };
    }
  },
};

export const reducer = (state = initialState, action) => {
  // state = state || initialState;

  switch (action.type) {
    case userConst.CLEAN:
      return {
        ...state,
        user: [],
        error: "",
        errorS: "",
        message: "",
        messageS: "",
      };

    case userConst.DISABLE_ONBOARD_USER:
      return { ...state, onboardUser: false };

    case userConst.LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case userConst.LOGIN_SUCCESS:
      return {
        ...state,
        error: "",
        isLoading: false,
        onboardUser: action.needsUnboard,
      };
    case userConst.TOGGLE_TOAST_ALERT:
      return { ...state, toastAlertState: action.toastAlert };
    case userConst.LOGIN_FAILURE:
      return { ...state, error: action.error, isLoading: false };

    case userConst.LOGOUT:
      return { ...state, user: [], error: "", isLoading: false };

    case userConst.REGISTER_REQUEST:
      return { ...state, isLoading: true };

    case userConst.REGISTER_SUCCESS:
      return { ...state, user: action.user, error: "", isLoading: false };

    case userConst.REGISTER_FAILURE:
      return { ...state, error: action.error, isLoading: false };

    case userConst.POST_UPDATE_USER_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case userConst.POST_UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoading: false,
        toastAlertState: true,
        error: "",
        message: "Saved Correctly",
      };

    case userConst.POST_UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        toastAlertState: true,
        message: "",
      };

    case userConst.GET_DATA_COMPANY_BYDOT_REQUEST:
      return { ...state, dot: action.dot };

    case userConst.GET_DATA_COMPANY_BYDOT_SUCCESS:
      return { ...state, company: action.company, error: "" };

    case userConst.GET_DATA_COMPANY_BYDOT_FAILURE:
      return { ...state, error: action.error, company: {}, dot: "" };

    case userConst.GET_USER_DATA_REQUEST:
      return { ...state, error: "" };

    case userConst.GET_USER_DATA_SUCCESS:
      return { ...state, user: action.user };

    case userConst.GET_USER_DATA_FAILURE:
      return { ...state, error: action.error, user: {} };

    case userConst.POST_SIGNATURE_REQUEST:
      return { ...state, error: "", isLoadingS: true };

    case userConst.POST_SIGNATURE_SUCCESS:
      return {
        ...state,
        isLoadingS: false,
        error: "",
        toastAlertState: true,
        message: "Signature successfully saved",
      };

    case userConst.POST_SIGNATURE_FAILURE:
      return {
        ...state,
        isLoadingS: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case userConst.CHANGE_PASSWORD_TOGGLE:
      return { ...state, modalCP: action.modal, error: "", message: "" };

    case userConst.POST_CHANGE_PASSWORD_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case userConst.POST_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        modalCP: false,
        error: "",
        toastAlertState: true,
        message: "Password Changed Correctly",
      };

    case userConst.POST_CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case userConst.POST_FORGOT_PASSWORD_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case userConst.POST_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "Email Sended",
      };

    case userConst.POST_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
      };

    case userConst.POST_RESET_PASSWORD_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case userConst.POST_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "Password Changed Correctly",
      };

    case userConst.POST_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
      };

    case userConst.SEND_CONFIRMATION_EMAIL_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case userConst.SEND_CONFIRMATION_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "",
        message: "Email Verification Sent",
      };

    case userConst.SEND_CONFIRMATION_EMAIL_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        toastAlertState: true,
        message: "",
      };
    case userConst.GET_ONBOARD_REQUEST:
      return {
        ...state,
      };
    case userConst.GET_ONBOARD_SUCCESS:
      return {
        ...state,
        onboardUser: action.onBoard,
      };
    case userConst.GET_ONBOARD_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case userConst.ONBOARD_COMPLETED_REQUEST:
      return {
        ...state,
      };
    case userConst.ONBOARD_COMPLETED_SUCCESS:
      return {
        ...state,
        onboardUser: action.onBoard,
      };
    case userConst.ONBOARD_COMPLETED_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
