import AccountSConst from "./../constants/AccountSConst";
import FileUploadCompnanyManual from "../containers/Company/CompanyModal/FileUploadCompnanyManual";
import axios from "axios";

const initialState = {
  existVin: "",
  trailers: [],
  countries: [],
  states: [],
  cities: [],
  mailingStates: [],
  mailingCities: [],
  signatureDate: '',
  error: "",
  idDelete: 0,
  isLoading: false,
  company: {},
  message: "",
  users: [],
  inactiveUsers: [],
  page: 1,
  count: 1,
  pageD: 1,
  countD: 1,
  modalNU: false,
  modalDocsUpload: false,
  doc: [],
  docs: [],
  docsUCR: [],
  docsDrivers: [],
  docsTraining: [],
  trainingDocs: [],
  hazmatSecurityPlanDocs: [],
  hazmatCommunicationPlanDocs: [],
  docsHazmat: [],
  modalD: false,
  modalDU: false,
  modalA: false,
  modalAU: false,
  idDeleteU: 0,
  idReactivateU: 0,
  signature: "",
  modalOperation: false,
  modalClasifications: false,
  modalHazardous: false,
  OperationC: {},
  cargoC: {},
  hazardMaterial: [],
  HmStates: {},
  HmCompany: [],
  HmOptions: {},
  formData: {},
  alertsCount: 0,
  alerts: [],
  complet: [],
  companyRating: 0,
  usDotAddDocumentsModal: false,
  idDownload: 0,
  drugTestingModal: false,
  messageAR: "",
  accidentRegister: [],
  accidentData: {},
  pageAR: 0,
  countAR: 0,
  driverList: [],
  fmcsaInfo: [],
  registryPDF: [],
  toastAlertState: false,
  toastAlertStatehazmat: false,
  toastAlertStatehazmats: false,
  toastAlertState2: false,
  modalDeleteFilesCompany: false,
  fileUploadCompany: false,
  addCardModal: false,
  paymentMethods: [],
  defaultPaymentMethod: "",
  fileNameToDelete: "",
  docTypeToDelete: "",
  FileUploadCompnanyManual: false,
  accidentDocs: [],
  insuranceInfo: {},
  CompanyCredentials: [],
  resize: false,
  isCompany: false,
  isLoadingMCS: false,
  isVehiclesLoading: false,
  isLoadingDriver: false,
  isLoadingHm: false,
  isLoadingOC: false,
  isLoadingUsDot: true,
  isLoadingCredentialsch: false,
  isloadingDeleteManual: false,
  isLoadingUploadManual: false,
  isLoadingAllGAlerts: true,
};
const FileDownload = require("js-file-download");

export const actionCreators = {
  toggleToastAlert: (status) => {
    return (dispatch, getState) => {
      const toastAlert = status;
      dispatch(OpenClose(toastAlert));
    };
    function OpenClose(toastAlert) {
      return { type: AccountSConst.TOGGLE_TOAST_ALERT, toastAlert };
    }
    function OpenClose(toastAlert) {
      return { type: AccountSConst.TOGGLE_TOAST_ALERT_HAZMAT, toastAlert };
    }
    function OpenClose(toastAlert) {
      return { type: AccountSConst.TOGGLE_TOAST_ALERT_HAZMATS, toastAlert };
    }
  },
  resizeSignature: (flag) => {
    return (dispatch, getState) => {
      var resize = flag;

      dispatch(success(resize));
    };

    function success(resize) {
      return { type: AccountSConst.POST_RESIZE_SIGNATURE, resize };
    }
  },
  saveCompanyClearingCredentials: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/SaveCompanyClearingCredentials", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const d = JSON.parse(response);
          if (d.status === 0) {
            var CompanyCredentials = d.CompanyData;
            dispatch(success(CompanyCredentials));
          } else {
            dispatch(failure(d.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: AccountSConst.SAVE_CREDENTIALSCH_REQUEST };
    }
    function success(CompanyCredentials) {
      return {
        type: AccountSConst.SAVE_CREDENTIALSCH_SUCCESS,
        CompanyCredentials,
      };
    }
    function failure(error) {
      return { type: AccountSConst.SAVE_CREDENTIALSCH_FAILURE, error };
    }
  },
  GetCompanyClearingCredentials: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/GetCompanyClearingCredentials", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const d = JSON.parse(response);
          if (d.status === 0) {
            var CompanyCredentials = d.CompanyData;
            dispatch(success(CompanyCredentials));
          } else {
            dispatch(failure(d.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: AccountSConst.GET_CREDENTIALSCH_REQUEST };
    }
    function success(CompanyCredentials) {
      return {
        type: AccountSConst.GET_CREDENTIALSCH_SUCCESS,
        CompanyCredentials,
      };
    }
    function failure(error) {
      return { type: AccountSConst.GET_CREDENTIALSCH_FAILURE, error };
    }
  },
  resetMessage: () => {
    return (dispatch, getState) => {
      dispatch(ResetMessage());
    };
    function ResetMessage() {
      return { type: AccountSConst.RESET_MESSAGE };
    }
  },
  ////////////////////////////////////////////////
  UpdateFMCSAUser: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/UpdateFMCSAuser", {
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

          dispatch(failure("Can't get Driver List"));
        });
    };

    function request() {
      return { type: AccountSConst.POST_FMCSA_DATA_REQUEST };
    }
    function success() {
      return { type: AccountSConst.POST_FMCSA_DATA_SUCCESS };
    }
    function failure(error) {
      return { type: AccountSConst.POST_FMCSA_DATA_FAILURE, error };
    }
  },
  ///////////////////////////////////////////////

  getFMCSA: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getFMCSA?id=" + id, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const fmcsaInfo = r.fmcsaInfo;
            dispatch(success(fmcsaInfo));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Can't get FMCSA info"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_FMCSA_DATA_REQUEST };
    }
    function success(fmcsaInfo) {
      return { type: AccountSConst.GET_FMCSA_DATA_SUCCESS, fmcsaInfo };
    }
    function failure(error) {
      return { type: AccountSConst.GET_FMCSA_DATA_FAILURE, error };
    }
  },

  getDriverList: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getDrivers?id=" + id, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const driverList = r.driverList;
            dispatch(success(driverList));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Can't get Driver List"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_DRIVER_LIST_REQUEST };
    }
    function success(driverList) {
      return { type: AccountSConst.GET_DRIVER_LIST_SUCCESS, driverList };
    }
    function failure(error) {
      return { type: AccountSConst.GET_DRIVER_LIST_FAILURE, error };
    }
  },
  getStates: (Country) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getStates?idc=" + Country, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const states = r.states;
            dispatch(success(states));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Can't get Country States ..."));
        });
    };

    function request() {
      return { type: AccountSConst.GET_STATES_REQUEST };
    }
    function success(states) {
      return { type: AccountSConst.GET_STATES_SUCCESS, states };
    }
    function failure(error) {
      return { type: AccountSConst.GET_STATES_FAILURE, error };
    }
  },
  getCities: (State) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getCities?idstate=" + State, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const cities = r.cities;
            dispatch(success(cities));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Can't get Country Cities ..."));
        });
    };

    function request() {
      return { type: AccountSConst.GET_CITIES_REQUEST };
    }
    function success(cities) {
      return { type: AccountSConst.GET_CITIES_SUCCESS, cities };
    }
    function failure(error) {
      return { type: AccountSConst.GET_CITIES_FAILURE, error };
    }
  },
  getMailingStates: (Country) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getStates?idc=" + Country, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
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
      return { type: AccountSConst.GET_MAILING_STATES_REQUEST };
    }
    function success(states) {
      return { type: AccountSConst.GET_MAILING_STATES_SUCCESS, states };
    }
    function failure(error) {
      return { type: AccountSConst.GET_MAILING_STATES_FAILURE, error };
    }
  },
  getMailingCities: (State) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getCities?idstate=" + State, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const cities = r.cities;
            dispatch(success(cities));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_MAILING_CITIES_REQUEST };
    }
    function success(cities) {
      return { type: AccountSConst.GET_MAILING_CITIES_SUCCESS, cities };
    }
    function failure(error) {
      return { type: AccountSConst.GET_MAILING_CITIES_FAILURE, error };
    }
  },

  toggleDocs: () => {
    return (dispatch, getState) => {
      const modalDocsUpload = !getState().accountSettings.modalDocsUpload;
      dispatch(OpenClose(modalDocsUpload));
    };
    function OpenClose(modalDocsUpload) {
      return { type: AccountSConst.UPLOAD_DOCS_TOGGLE, modalDocsUpload };
    }
  }, getLabCorps: () => {
    return (dispatch) => {
      //console.log("fetching labcorp OTS")
      fetch("https://services-cert.labcorpsolutions.com/webservice/services/LabcorpOTS",
        {
          method: "POST",
          mode: "no-cors",
          body: "<s11:Envelope xmlns:s11='http://schemas.xmlsoap.org/soap/envelope/'>" +
            "<s11:Body>" +
            "<impl:locateCollectionSites xmlns:impl='http://ws.ots.labcorp.com'>" +
            "<impl:userId>BLUAGENT</impl:userId>" +
            "<impl:password>Dav!d@Blu4gent</impl:password>" +
            "<impl:zip>92037</impl:zip>" +
            "<impl:distance>20</impl:distance>" +
            "</impl:locateCollectionSites>" +
            "</Body>" +
            "</Envelope>"
        })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          //console.log(r)
        })
        .catch((error) => {
        });
    };
  },

  getDataCompany: (idU, alert) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getDataCompany?idU=" + idU + "&alert=" + alert, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {

            const {
              Company,
              Cities,
              States,
              MailingStates,
              MailingCities,
              Countries,
              Signature,
            } = r.company;
            const alerts = r.alerts;
            const alertsCount = r.alertsCount;
            const complet = r.complet;
            const signatureDate = r.signatureDate;
            const cR = r.companyRating;
            const docs = r.CompanyDocs;
            dispatch(
              success(
                Company,
                States,
                Cities,
                MailingStates,
                MailingCities,
                Countries,
                Signature,
                alertsCount,
                alerts,
                complet,
                cR,
                docs, signatureDate,
              )
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_DATA_COMPANY_REQUEST };
    }
    function success(
      company,
      states,
      cities,
      mailingStates,
      mailingCities,
      countries,
      signature,
      alertsCount,
      alerts,
      complet,
      cR,
      docs, signatureDate
    ) {
      return {
        type: AccountSConst.GET_DATA_COMPANY_SUCCESS,
        company,
        states,
        cities,
        mailingStates,
        mailingCities,
        countries,
        signature,
        alertsCount,
        alerts,
        complet,
        cR,
        docs,
        signatureDate
      };
    }
    function failure(error) {
      return { type: AccountSConst.GET_DATA_COMPANY_FAILURE, error };
    }
  },
  getVehiclesActive: (idCompany) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getVehiclesActive?idCompany=" + idCompany, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const Vehicles = r.VehicleList;
            dispatch(success(Vehicles));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_ACTIVEVEHICLES_REQUEST };
    }
    function success(Vehicles) {
      return { type: AccountSConst.GET_ACTIVEVEHICLES_SUCCESS, Vehicles };
    }
    function failure(error) {
      return { type: AccountSConst.GET_ACCIDENT_DATA_FAILURE, error };
    }
  },
  saveDataCompany: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/saveDataCompany", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const company = r.company;
            // console.log("store: ", r);
            var user = JSON.parse(localStorage.user);
            user.Hazmat = company.Hazmat;
            localStorage.setItem("user", JSON.stringify(user));
            const alerts = r.alerts;
            const alertsCount = r.alertsCount;
            const complet = r.complet;
            localStorage.removeItem("StateCompanyN");
            localStorage.setItem(
              "StateCompanyN",
              JSON.stringify(r.stateNumber)
            );
            dispatch(success(company, alertsCount, alerts, complet));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.POST_DATA_COMPANY_REQUEST };
    }
    function success(company, alertsCount, alerts, complet) {
      return {
        type: AccountSConst.POST_DATA_COMPANY_SUCCESS,
        company,
        alertsCount,
        alerts,
        complet,
      };
    }
    function failure(error) {
      return { type: AccountSConst.POST_DATA_COMPANY_FAILURE, error };
    }
  },
  saveCompanyLogo: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/saveCompanyLogo", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const company = r.company;
            const complet = r.complet;
            const alerts = r.alerts;
            const alertsCount = r.alertsCount;
            dispatch(success(company, complet, alerts, alertsCount));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: AccountSConst.POST_DATA_COMPANY_REQUEST };
    }
    function success(company, complet, alerts, alertsCount) {
      return {
        type: AccountSConst.POST_DATA_COMPANY_SUCCESS,
        company,
        complet,
        alerts,
        alertsCount,
      };
    }
    function failure(error) {
      return { type: AccountSConst.POST_DATA_COMPANY_FAILURE, error };
    }
  },
  saveSignatureFile: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/saveSignatureFile", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var sig = r.signature;
            dispatch(success(sig));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Wooops! Signature can't be saved ..."));
        });
    };

    function request() {
      return { type: AccountSConst.POST_COMPANY_SIGNATURE_REQUEST };
    }
    function success(signature) {
      return {
        type: AccountSConst.POST_COMPANY_SIGNATURE_SUCCESS,
        signature,
      };
    }
    function failure(error) {
      return { type: AccountSConst.POST_COMPANY_SIGNATURE_FAILURE, error };
    }
  },
  addNewUser: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/addUser", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const users = r.users;
            dispatch(success(users.Items, users.CurrentPage, users.NumberP));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: AccountSConst.POST_COMPANY_USER_REQUEST };
    }
    function success(items, page, count) {
      return {
        type: AccountSConst.POST_COMPANY_USER_SUCCESS,
        items,
        page,
        count,
      };
    }
    function failure(error) {
      return { type: AccountSConst.POST_COMPANY_USER_FAILURE, error };
    }
  },

  attachPaymentMethod: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Stripe/AttachPayment", { method: "POST", body: form })
        .then((body) => body.json())
        .then((result) => {
          if (result.statusCode === 200) {
            dispatch(success(result.value.data));
          } else {
            dispatch(failure("Error in the Server"));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.ATTACH_PAYMENT_METHOD_REQUEST };
    }
    function success(items) {
      return { type: AccountSConst.ATTACH_PAYMENT_METHOD_SUCCESS, items };
    }
    function failure(error) {
      return { type: AccountSConst.ATTACH_PAYMENT_METHOD_FAILURE, error };
    }
  },

  getPaymentsMethods: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Stripe/GetPaymentMethods?id=" + id, { method: "GET" })
        .then((body) => body.json())
        .then((result) => {
          dispatch(success(result.data));
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_PAYMENT_METHOD_REQUEST };
    }
    function success(items) {
      return { type: AccountSConst.GET_PAYMENT_METHOD_SUCCESS, items };
    }
    function failure(error) {
      return { type: AccountSConst.GET_PAYMENT_METHOD_FAILURE, error };
    }
  },

  getDefaultPayment: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Stripe/GetDefaultPayment?id=" + id, { method: "GET" })
        .then((body) => body.json())
        .then((result) => {
          dispatch(success(result.value));
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_DEFAULT_PAYMENT_REQUEST };
    }
    function success(items) {
      return { type: AccountSConst.GET_DEFAULT_PAYMENT_SUCCESS, items };
    }
    function failure(error) {
      return { type: AccountSConst.GET_DEFAULT_PAYMENT_FAILURE, error };
    }
  },

  setDefaultPayment: (id, idPayment) => {
    let form = new FormData();
    form.append("userId", id);
    form.append("paymentMethodId", idPayment);

    return (dispatch) => {
      dispatch(request());
      fetch("api/Stripe/setDefaultPayment", { method: "POST", body: form })
        .then((body) => body.json())
        .then((result) => {
          dispatch(success(result));
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.SET_DEFAULT_PAYMENT_REQUEST };
    }
    function success(items) {
      return { type: AccountSConst.SET_DEFAULT_PAYMENT_SUCCESS, items };
    }
    function failure(error) {
      return { type: AccountSConst.SET_DEFAULT_PAYMENT_FAILURE, error };
    }
  },

  detachPaymentMethod: (idPayment, id) => {
    let form = new FormData();
    form.append("idPayment", idPayment);
    form.append("idUser", id);
    return (dispatch) => {
      dispatch(request());
      fetch("api/Stripe/DetachPayment", { method: "POST", body: form })
        .then((body) => body.json())
        .then((result) => {
          if (result.statusCode === 200) {
            dispatch(success(result.value.data));
          } else {
            dispatch(failure("Error in the Server"));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.DETACH_PAYMENT_METHOD_REQUEST };
    }
    function success(items) {
      return { type: AccountSConst.DETACH_PAYMENT_METHOD_SUCCESS, items };
    }
    function failure(error) {
      return { type: AccountSConst.DETACH_PAYMENT_METHOD_FAILURE, error };
    }
  },

  getRoles: (idu, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/getRoles?idu=" +
        idu +
        "&page=" +
        page +
        "&size=" +
        size,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const users = r.users;
            const inactiveUsers = r.inactiveUsers;
            dispatch(success(users, inactiveUsers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_USERS_REQUEST };
    }
    function success(users, inactiveUsers) {
      return { type: AccountSConst.GET_USERS_SUCCESS, users, inactiveUsers };
    }
    function failure(error) {
      return { type: AccountSConst.GET_USERS_FAILURE, error };
    }
  },
  toggleNU: () => {
    return (dispatch, getState) => {
      const modal = !getState().accountSettings.modalNU;
      dispatch(OpenClose(modal));
    };
    function OpenClose(modal) {
      return { type: AccountSConst.NEW_USER_TOGGLE, modal };
    }
  },
  toggleAddCardModal: () => {
    return (dispatch, getState) => {
      const modal = !getState().accountSettings.addCardModal;
      dispatch(OpenClose(modal));
    };
    function OpenClose(modal) {
      return { type: AccountSConst.ADD_CARD_MODAL_TOGGLE, modal };
    }
  },
  saveDoc: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/saveDoc", { method: "POST", body: form })
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
      return { type: AccountSConst.POST_SAVE_DOCUMENT_REQUEST };
    }
    function success(docs) {
      return { type: AccountSConst.POST_SAVE_DOCUMENT_SUCCESS, docs };
    }
    function failure(error) {
      return { type: AccountSConst.POST_SAVE_DOCUMENT_FAILURE, error };
    }
  },

  getDocuments: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getDocuments?id=" + id, { method: "GET" })
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
      return { type: AccountSConst.GET_DOCUMENTS_REQUEST };
    }
    function success(doc) {
      return { type: AccountSConst.GET_DOCUMENTS_SUCCESS, doc };
    }
    function failure(error) {
      return { type: AccountSConst.GET_DOCUMENTS_FAILURE, error };
    }
  },
  getAllDocuments: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/getAllDocuments?id=" +
        id +
        "&page=" +
        page +
        "&size=" +
        size,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            // console.log("data stores: ", r.docs);
            const docs = r.docs;
            // localStorage.removeItem("CompanySignature");
            // localStorage.setItem(
            //   "CompanySignature",
            //   JSON.stringify(r.signature)
            // );
            dispatch(success(docs));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error in the Servers ${error.message}`));
        });
    };

    function request() {
      return { type: AccountSConst.GET_ALL_DOCUMENTS_REQUEST };
    }
    function success(docs) {
      return { type: AccountSConst.GET_ALL_DOCUMENTS_SUCCESS, docs };
    }
    function failure(error) {
      return { type: AccountSConst.GET_ALL_DOCUMENTS_FAILURE, error };
    }
  },

  getAllDocumentsDrivers: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/getAllDocumentsDriver?id=" +
        id +
        "&page=" +
        page +
        "&size=" +
        size,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docsDrivers = r.docsDrivers;
            dispatch(success(docsDrivers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error in the Servers ${error.message}`));
        });
    };

    function request() {
      return { type: AccountSConst.GET_ALL_DOCUMENTS_REQUEST_DRIVERS };
    }
    function success(docsDrivers) {
      return {
        type: AccountSConst.GET_ALL_DOCUMENTS_SUCCESS_DRIVERS,
        docsDrivers,
      };
    }
    function failure(error) {
      return { type: AccountSConst.GET_ALL_DOCUMENTS_FAILURE_DRIVERS, error };
    }
  },
  getAccidentRegisterDocs: (id, idAccidentRegister) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/getAccidentRegisterDocuments?id=" +
        id +
        "&idAccidentRegister=" +
        idAccidentRegister,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const accidentDocs = r.accidentDocs;
            dispatch(success(accidentDocs));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {
        type: AccountSConst.GET_ACCIDENT_REGISTER_DOCUMENTS_REQUEST,
      };
    }
    function success(accidentDocs) {
      return {
        type: AccountSConst.GET_ACCIDENT_REGISTER_DOCUMENTS_SUCCESS,
        accidentDocs,
      };
    }
    function failure(error) {
      return {
        type: AccountSConst.GET_ACCIDENT_REGISTER_DOCUMENTS_FAILURE,
        error,
      };
    }
  },
  toggleD: (id) => {
    return (dispatch, getState) => {
      var modalD = !getState().accountSettings.modalD;
      var idD = 0;
      if (modalD) {
        idD = id;
      }
      dispatch(OpenClose(modalD, idD));
    };
    function OpenClose(modalD, idD) {
      return { type: AccountSConst.DELETE_DOCUMENT_TOGGLE_C, modalD, idD };
    }
  },

  toggleDeleteFilesCompanyModal: (id, docType, descriptionDoc) => {
    return (dispatch, getState) => {
      var modalDeleteFilesCompany = !getState().accountSettings
        .modalDeleteFilesCompany;
      var idD = 0;
      var fileName = "";
      var docTypeToDelete = "";
      if (modalDeleteFilesCompany) {
        idD = id;
        fileName = descriptionDoc;
        docTypeToDelete = docType;
      }
      dispatch(
        OpenClose(modalDeleteFilesCompany, idD, docTypeToDelete, fileName)
      );
    };
    function OpenClose(
      modalDeleteFilesCompany,
      idD,
      docTypeToDelete,
      fileName
    ) {
      return {
        type: AccountSConst.DELETE_DOCUMENT_TOGGLE_FILESCOMPANY,
        modalDeleteFilesCompany,
        idD,
        docTypeToDelete,
        fileName,
      };
    }
  },

  toggleUsDotAddDocument: () => {
    return (dispatch, getState) => {
      var usDotAddDocumentsModal = !getState().accountSettings
        .usDotAddDocumentsModal;
      dispatch(OpenClose(usDotAddDocumentsModal));
    };
    function OpenClose(usDotAddDocumentsModal) {
      return {
        type: AccountSConst.TOGGLE_USDOT_DOCUMENTS_MODAL,
        usDotAddDocumentsModal,
      };
    }
  },

  toggleDrugTestingAddDocument: () => {
    return (dispatch, getState) => {
      var drugTestingModal = !getState().accountSettings.drugTestingModal;
      dispatch(OpenClose(drugTestingModal));
    };
    function OpenClose(drugTestingModal) {
      return {
        type: AccountSConst.TOGGLE_DRUG_TESTING_DOCUMENTS_MODAL,
        drugTestingModal,
      };
    }
  },

  deleteDocDrivers: (id, userId, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/deleteDocDrivers?id=" +
        id +
        "&userId=" +
        userId +
        "&docType=" +
        docType +
        "&fileName=" +
        fileName,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docsDrivers = r.docs;

            dispatch(success(docsDrivers));
          } else {
            dispatch(failure("error"));
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.DELETE_DRIVERS_DOCS_REQUEST };
    }
    function success(docsDrivers) {
      return { type: AccountSConst.DELETE_DRIVERS_DOCS_SUCCESS, docsDrivers };
    }
    function failure(error) {
      return { type: AccountSConst.DELETE_DRIVERS_DOCS_FAILURE, error };
    }
  },

  ///////////////////////////////////////////////////////////////////////////////
  deleteDocDriversHazmat: (id, userId, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/deleteDocDrivers?id=" +
        id +
        "&userId=" +
        userId +
        "&docType=" +
        docType +
        "&fileName=" +
        fileName,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docsDrivers = r.docs;

            dispatch(success(docsDrivers));
          } else {
            dispatch(failure("error"));
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          dispatch(failure("Error in the Server"));
        });
    };
    function request() {
      return { type: AccountSConst.DELETE_DRIVERS_DOCS_HAZMAT_REQUEST };
    }
    function success(docsDrivers) {
      return {
        type: AccountSConst.DELETE_DRIVERS_DOCS_HAZMAT_SUCCESS,
        docsDrivers,
      };
    }
    function failure(error) {
      return {
        type: AccountSConst.DELETE_DRIVERS_DOCS_HAZMAT_FAILURE,
        error,
      };
    }
  },
  ///////////////////////////////////////////////////////////////////////////////
  deleteDocDriversHazmats: (id, userId, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/deleteDocDrivers?id=" +
        id +
        "&userId=" +
        userId +
        "&docType=" +
        docType +
        "&fileName=" +
        fileName,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docsDrivers = r.docs;

            dispatch(success(docsDrivers));
          } else {
            dispatch(failure("error"));
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          dispatch(failure("Error in the Server"));
        });
    };
    function request() {
      return { type: AccountSConst.DELETE_DRIVERS_DOCS_HAZMATS_REQUEST };
    }
    function success(docsDrivers) {
      return {
        type: AccountSConst.DELETE_DRIVERS_DOCS_HAZMATS_SUCCESS,
        docsDrivers,
      };
    }
    function failure(error) {
      return {
        type: AccountSConst.DELETE_DRIVERS_DOCS_HAZMATS_FAILURE,
        error,
      };
    }
  },
  ///////////////////////////////////////////////////////////////////////////////

  deleteDoc: (id, userId, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/deleteDoc?id=" +
        id +
        "&userId=" +
        userId +
        "&docType=" +
        docType +
        "&fileName=" +
        fileName,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docs = r.docs;
            dispatch(success(docs));
          } else {
            dispatch(failure("error"));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.DELETE_DOCUMENT_REQUEST_C };
    }
    function success(docs) {
      return { type: AccountSConst.DELETE_DOCUMENT_SUCCESS_C, docs };
    }
    function failure(error) {
      return { type: AccountSConst.DELETE_DOCUMENT_FAILURE_C, error };
    }
  },

  downloadDoc: (id, docType, fileName, descriptionDoc) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/downloadDocument?id=" +
        id +
        "&docType=" +
        docType +
        "&fileName=" +
        fileName,
        { method: "GET" }
      )
        .then((response) => {
          response.blob().then((myblob) => {
            if (myblob !== null) {
              FileDownload(myblob, descriptionDoc); //"filex.pdf"
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
      return { type: AccountSConst.DOWNLOAD_DOCUMENT_REQUEST };
    }
    function success() {
      return { type: AccountSConst.DOWNLOAD_DOCUMENT_SUCCESS };
    }
    function failure(error) {
      return { type: AccountSConst.DOWNLOAD_DOCUMENT_FAILURE, error };
    }
  },

  deleteDocHazmat: (id, userId, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/deleteDoc?id=" +
        id +
        "&userId=" +
        userId +
        "&docType=" +
        docType +
        "&fileName=" +
        fileName,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docs = r.docs;
            dispatch(success(docs));
          } else {
            dispatch(failure("error"));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.DELETE_DOCUMENT_REQUEST_H };
    }
    function success(docs) {
      return { type: AccountSConst.DELETE_DOCUMENT_SUCCESS_H, docs };
    }
    function failure(error) {
      return { type: AccountSConst.DELETE_DOCUMENT_FAILURE_H, error };
    }
  },

  toggleDU: (id) => {
    return (dispatch, getState) => {
      var modalD = !getState().accountSettings.modalDU;
      var idD = 0;
      if (modalD) {
        idD = id;
      }
      dispatch(OpenClose(modalD, idD));
    };
    function OpenClose(modalD, idD) {
      return { type: AccountSConst.DELETE_USER_TOGGLE, modalD, idD };
    }
  },
  toggleAU: (id) => {
    return (dispatch, getState) => {
      var modalA = !getState().accountSettings.modalAU;
      var idD = 0;
      if (modalA) {
        idD = id;
      }
      dispatch(OpenClose(modalA, idD));
    };
    function OpenClose(modalA, idD) {
      return { type: AccountSConst.REACTIVATE_USER_TOGGLE, modalA, idD };
    }
  },
  inactiveUser: (id, idU) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/inactiveUser?id=" + id + "&idU=" + idU, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const users = r.users;
            const inactiveUsers = r.inactiveUsers;
            dispatch(success(users, inactiveUsers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.DELETE_USERS_REQUEST };
    }
    function success(users, inactiveUsers) {
      return {
        type: AccountSConst.DELETE_USERS_SUCCESS, users, inactiveUsers
      };
    }
    function failure(error) {
      return { type: AccountSConst.DELETE_USERS_FAILURE, error };
    }
  },
  activeUser: (id, idU) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/activeUser?id=" + id + "&idU=" + idU, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const users = r.users;
            const inactiveUsers = r.inactiveUsers;
            dispatch(success(users, inactiveUsers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.REACTIVATE_USERS_REQUEST };
    }
    function success(users, inactiveUsers) {
      return {
        type: AccountSConst.REACTIVATE_USERS_SUCCESS, users, inactiveUsers
      };
    }
    function failure(error) {
      return { type: AccountSConst.REACTIVATE_USERS_FAILURE, error };
    }
  },

  toggleOperationClassification: (modalO) => {
    return (dispatch) => {
      const modal = !modalO;
      dispatch(OpenClose(modal));
    };
    function OpenClose(modal) {
      return {
        type: AccountSConst.OPEN_OPERATION_CLASSIFICATIONS_TOGGLE,
        modal,
      };
    }
  },
  toggleClassification: (modalC) => {
    return (dispatch) => {
      const modal = !modalC;
      dispatch(OpenClose(modal));
    };
    function OpenClose(modal) {
      return { type: AccountSConst.OPEN_CLASSIFICATIONS_TOGGLE, modal };
    }
  },
  toggleHazardousMaterials: (modalH) => {
    return (dispatch) => {
      const modal = !modalH;
      dispatch(OpenClose(modal));
    };
    function OpenClose(modal) {
      return {
        type: AccountSConst.OPEN_HAZARDOUS_MATERIALS_TOGGLE,
        modal,
      };
    }
  },
  saveOperationClassification: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/saveOperationClassification", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const OperationC = r.OperationC;
            dispatch(success(OperationC));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {
        type: AccountSConst.POST_OPERATION_CLASSIFICATIONS_REQUEST,
      };
    }
    function success(OperationC) {
      return {
        type: AccountSConst.POST_OPERATION_CLASSIFICATIONS_SUCCESS,
        OperationC,
      };
    }
    function failure(error) {
      return {
        type: AccountSConst.POST_OPERATION_CLASSIFICATIONS_FAILURE,
        error,
      };
    }
  },
  getOperationClassification: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getOperationClassification?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const OperationC = r.OperationC;
            dispatch(success(OperationC));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_OPERATION_CLASSIFICATIONS_REQUEST };
    }
    function success(OperationC) {
      return {
        type: AccountSConst.GET_OPERATION_CLASSIFICATIONS_SUCCESS,
        OperationC,
      };
    }
    function failure(error) {
      return {
        type: AccountSConst.GET_OPERATION_CLASSIFICATIONS_FAILURE,
        error,
      };
    }
  },
  saveCargoClassification: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/saveCargoClassification", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const cargoC = r.cargoC;
            dispatch(success(cargoC));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.POST_CARGO_CLASSIFICATIONS_REQUEST };
    }
    function success(cargoC) {
      return {
        type: AccountSConst.POST_CARGO_CLASSIFICATIONS_SUCCESS,
        cargoC,
      };
    }
    function failure(error) {
      return {
        type: AccountSConst.POST_CARGO_CLASSIFICATIONS_FAILURE,
        error,
      };
    }
  },
  getCargoClassification: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getCargoClassification?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const cargoC = r.cargoC;
            dispatch(success(cargoC));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_CARGO_CLASSIFICATIONS_REQUEST };
    }
    function success(cargoC) {
      return {
        type: AccountSConst.GET_CARGO_CLASSIFICATIONS_SUCCESS,
        cargoC,
      };
    }
    function failure(error) {
      return {
        type: AccountSConst.GET_CARGO_CLASSIFICATIONS_FAILURE,
        error,
      };
    }
  },
  saveHazardMaterials: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/SaveHazardMaterials", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const {
              HazardMaterials,
              HazardMaterialStates,
              HazardMaterialCompanies,
              HazardMaterialOptions,
            } = r.hazardMaterial;
            dispatch(
              success(
                HazardMaterials,
                HazardMaterialStates,
                HazardMaterialCompanies,
                HazardMaterialOptions
              )
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.SAVE_HAZARD_MATERIAL_REQUEST };
    }
    function success(hazardMaterial, states, company, options) {
      return {
        type: AccountSConst.SAVE_HAZARD_MATERIAL_SUCCESS,
        hazardMaterial,
        states,
        company,
        options,
      };
    }
    function failure(error) {
      return { type: AccountSConst.SAVE_HAZARD_MATERIAL_FAILURE, error };
    }
  },
  getHazardMaterials: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/GetHazardMaterials?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const {
              HazardMaterials,
              HazardMaterialStates,
              HazardMaterialCompanies,
              HazardMaterialOptions,
            } = r.hazardMaterial;
            dispatch(
              success(
                HazardMaterials,
                HazardMaterialStates,
                HazardMaterialCompanies,
                HazardMaterialOptions
              )
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_HAZARD_MATERIAL_REQUEST };
    }
    function success(hazardMaterial, states, company, options) {
      return {
        type: AccountSConst.GET_HAZARD_MATERIAL_SUCCESS,
        hazardMaterial,
        states,
        company,
        options,
      };
    }
    function failure(error) {
      return { type: AccountSConst.GET_HAZARD_MATERIAL_FAILURE, error };
    }
  },

  getMCS150FormData: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getMCS150FormData?id=" + id, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const CompanyData = r.formData;
            // console.log("dentro del store: ", CompanyData.StateNumber);
            dispatch(success(CompanyData));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_FORM_DATA_REQUEST };
    }
    function success(company) {
      return { type: AccountSConst.GET_FORM_DATA_SUCCESS, company };
    }
    function failure(error) {
      return { type: AccountSConst.GET_FORM_DATA_FAILURE, error };
    }
  },
  addAccident: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/AddAccident", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const aR = r.accidentRegister;
            dispatch(success(aR));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error in the Server ${error}`));
        });
    };

    function request() {
      return { type: AccountSConst.GET_ACCIDENT_REGISTRY_REQUEST };
    }
    function success(aR) {
      return { type: AccountSConst.GET_ACCIDENT_REGISTRY_SUCCESS, aR };
    }
    function failure(error) {
      return { type: AccountSConst.GET_ACCIDENT_REGISTRY_FAILURE, error };
    }
  },
  getAccidentRegistry: (idu, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/getAccidentRegistry?idu=" +
        idu +
        "&page=" +
        page +
        "&size=" +
        size,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const accidentRegister = r.accidentRegister;
            dispatch(success(accidentRegister));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Can't get Accidents Data ${error}`));
        });
    };

    function request() {
      return { type: AccountSConst.GET_ACCIDENT_REGISTRY_REQUEST };
    }
    function success(aR) {
      return { type: AccountSConst.GET_ACCIDENT_REGISTRY_SUCCESS, aR };
    }
    function failure(error) {
      return { type: AccountSConst.GET_ACCIDENT_REGISTRY_FAILURE, error };
    }
  },
  getAccidentData: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getAccidentData?id=" + id, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const accidentData = r.accidentData;
            dispatch(success(accidentData));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_ACCIDENT_DATA_REQUEST };
    }
    function success(accidentData) {
      return {
        type: AccountSConst.GET_ACCIDENT_DATA_SUCCESS,
        accidentData,
      };
    }
    function failure(error) {
      return { type: AccountSConst.GET_ACCIDENT_DATA_FAILURE, error };
    }
  },
  accidentReportZip: (id, iduser) => {
    return () => {
      fetch("api/AccountSet/accidentReportZip?id=" + id + "&idUser=" + iduser, {
        method: "GET",
      }).then((response) => {
        response.blob().then((myblob) => {
          if (myblob !== null) {
            FileDownload(myblob, "AccidentDetails.zip");
          }
        });
      });
    };
  },
  getAccidentsRegistryPDF: (form) => {
    return (dispatch) => {
      dispatch(request());

      fetch("api/AccountSet/getAccidentsRegistryPDF", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const registryPDF = r.registryPDF;
            dispatch(success(registryPDF));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_ACCIDENT_REGISTRY_PDF_REQUEST };
    }
    function success(registryPDF) {
      return {
        type: AccountSConst.GET_ACCIDENT_REGISTRY_PDF_SUCCESS,
        registryPDF,
      };
    }
    function failure(error) {
      return {
        type: AccountSConst.GET_ACCIDENT_REGISTRY_PDF_FAILURE,
        error,
      };
    }
  },

  uploadFile: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/UploadDocs", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docs = r.docs;
            // console.log(docs);
            dispatch(success(docs));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: AccountSConst.UPLOAD_FILE_REQUEST };
    }
    function success(docs) {
      return { type: AccountSConst.UPLOAD_FILE_SUCCESS, docs };
    }
    function failure(error) {
      return { type: AccountSConst.UPLOAD_FILE_FAILURE, error };
    }
  },

  uploadTrainingCertificate: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/UploadTrainingCertificate", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docsTraining = r.docsTraining;

            dispatch(success(docsTraining));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error" + error));
        });
    };

    function request() {
      return { type: AccountSConst.UPLOAD_DRIVERS_DOCS_TRAINING_REQUEST };
    }

    function success(docsTraining) {
      return {
        type: AccountSConst.UPLOAD_DRIVERS_DOCS_TRAINING_SUCCESS,
        docsTraining,
      };
    }

    function failure(error) {
      return {
        type: AccountSConst.UPLOAD_DRIVERS_DOCS_TRAINING_FAILURE,
        error,
      };
    }
  },

  uploadFileUCR: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/UploadDocsUCR", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docsUCR = r.docsUCR;
            dispatch(success(docsUCR));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: AccountSConst.UPLOAD_FILE_REQUEST_UCR };
    }
    function success(docsUCR) {
      return { type: AccountSConst.UPLOAD_FILE_SUCCESS_UCR, docsUCR };
    }
    function failure(error) {
      return { type: AccountSConst.UPLOAD_FILE_FAILURE_UCR, error };
    }
  },


  uploadFileDrivers: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/UploadDocsDrivers", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const docsDrivers = r.docsDrivers;
            dispatch(success(docsDrivers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error" + error));
        });
    };

    function request() {
      return { type: AccountSConst.UPLOAD_DRIVERS_DOCS_REQUEST };
    }
    function success(docsDrivers) {
      return { type: AccountSConst.UPLOAD_DRIVERS_DOCS_SUCCESS, docsDrivers };
    }

    function failure(error) {
      return { type: AccountSConst.UPLOAD_DRIVERS_DOCS_FAILURE, error };
    }
  },

  /////////////////////////////////////////////////////////////////////////////////////////
  uploadFileDriversHazmat: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/UploadDocsDrivers", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const docsDrivers = r.docsDrivers;
            dispatch(success(docsDrivers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error" + error));
        });
    };

    function request() {
      return { type: AccountSConst.UPLOAD_DRIVERS_DOCS_HAZMAT_REQUEST };
    }
    function success(docsDrivers) {
      return {
        type: AccountSConst.UPLOAD_DRIVERS_DOCS_HAZMAT_SUCCESS,
        docsDrivers,
      };
    }

    function failure(error) {
      return { type: AccountSConst.UPLOAD_DRIVERS_DOCS_HAZMAT_FAILURE, error };
    }
  },
  /////////////////////////////////////////////////////////////////////////////////////////
  uploadFileDriversHazmats: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/UploadDocsDrivers", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const docsDrivers = r.docsDrivers;
            dispatch(success(docsDrivers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error" + error));
        });
    };

    function request() {
      return { type: AccountSConst.UPLOAD_DRIVERS_DOCS_HAZMATS_REQUEST };
    }
    function success(docsDrivers) {
      return {
        type: AccountSConst.UPLOAD_DRIVERS_DOCS_HAZMATS_SUCCESS,
        docsDrivers,
      };
    }
    function failure(error) {
      return { type: AccountSConst.UPLOAD_DRIVERS_DOCS_HAZMATS_FAILURE, error };
    }
  },
  /////////////////////////////////////////////////////////////////////////////////////////

  hazmatSecurityPlanUpload: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/UploadDocs", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const hazmatSecurityPlanDocs = r.hazmatSecurityPlanDocs;
            dispatch(success(hazmatSecurityPlanDocs));
          } else {
            dispatch(failure(r.hazmatSecurityPlanDocs));
          }
        })
        .catch((error) => {
          dispatch(failure("Error: " + error));
        });
    };

    function request() {
      return { type: AccountSConst.UPLOAD_SECURITY_PLAN_REQUEST };
    }
    function success(hazmatSecurityPlanDocs) {
      return {
        type: AccountSConst.UPLOAD_SECURITY_PLAN_SUCCESS,
        hazmatSecurityPlanDocs,
      };
    }
    function failure(error) {
      return { type: AccountSConst.UPLOAD_SECURITY_PLAN_FAILURE, error };
    }
  },
  ///////////////////////////////////////////////////////////////////////////
  DeleteDocTrainingCert: (id, userId, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/DeleteDocTrainingCert?id=" +
        id +
        "&userId=" +
        userId +
        "&docType=" +
        docType +
        "&fileName=" +
        fileName,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docsTraining = r.docs;

            dispatch(success(docsTraining));
          } else {
            dispatch(failure("error"));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return {
        type: AccountSConst.DELETE_DOCUMENT_TRAINING_CERTIFICATE_REQUEST,
      };
    }
    function success(docsTraining) {
      return {
        type: AccountSConst.DELETE_DOCUMENT_TRAINING_CERTIFICATE_SUCCESS,
        docsTraining,
      };
    }
    function failure(error) {
      return {
        type: AccountSConst.DELETE_DOCUMENT_TRAINING_CERTIFICATE_FAILURE,
        error,
      };
    }
  },
  ///////////////////////////////////////////////////////////////////////////

  trainingCertificateUploadFile: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/TrainingUploadDocs", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const trainingDocs = r.trainingDocs;
            dispatch(success(trainingDocs));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error Uploading Training Certificate: " + error));
        });
    };

    function request() {
      return { type: AccountSConst.UPLOAD_ALL_HAZMAT_TRAINING_DOC_REQUEST };
    }
    function success(trainingDocs) {
      return {
        type: AccountSConst.UPLOAD_ALL_HAZMAT_TRAINING_DOC_SUCCESS,
        trainingDocs,
      };
    }
    function failure(error) {
      return {
        type: AccountSConst.UPLOAD_ALL_HAZMAT_TRAINING_DOC_FAILURE,
        error,
      };
    }
  },

  getAllTrainingDocuments: (IdCompany) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/getAllTDocs?IdCompany=" +
        IdCompany +
        "&page=" +
        1 +
        "&size=" +
        100,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docsTraining = r.docs;

            dispatch(success(docsTraining));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error" + error));
        });
    };
    function request() {
      return { type: AccountSConst.GET_ALL_HAZMAT_TRAINING_DOC_REQUEST };
    }
    function success(docsTraining) {
      return {
        type: AccountSConst.GET_ALL_HAZMAT_TRAINING_DOC_SUCCESS,
        docsTraining,
      };
    }
    function failure(error) {
      return { type: AccountSConst.GET_ALL_HAZMAT_TRAINING_DOC_FAILURE, error };
    }
  },

  hazmatUploadFile: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/HazmatUploadDocs", { method: "POST", body: form })
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
          dispatch(failure("Error Uploading Docs: " + error));
        });
    };

    function request() {
      return { type: AccountSConst.UPLOAD_FILE_REQUEST };
    }
    function success(docs) {
      return { type: AccountSConst.UPLOAD_FILE_SUCCESS, docs };
    }
    function failure(error) {
      return { type: AccountSConst.UPLOAD_FILE_FAILURE, error };
    }
  },
  getAllHazmatDocuments: (IdCompany) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/getAllHDocs?IdCompany=" +
        IdCompany +
        "&page=" +
        1 +
        "&size=" +
        100,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docsHazmat = r.docsHazmat;

            dispatch(success(docsHazmat));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error" + error));
        });
    };

    function request() {
      return { type: AccountSConst.GET_ALL_HAZMAT_DOCS_REQUEST };
    }
    function success(docsHazmat) {
      return { type: AccountSConst.GET_ALL_HAZMAT_DOCS_SUCCESS, docsHazmat };
    }
    function failure(error) {
      return { type: AccountSConst.GET_ALL_HAZMAT_DOCS_FAILURE, error };
    }
  },
  getCompanyInsuranceInformation(idCompany) {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/GetCompanyInsuranceInformation?IdCompany=" + idCompany,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const insuranceInfo = r.insuranceInfo;
            dispatch(success(insuranceInfo));
          } else {
            dispatch(failure(r.error));
          }
        });
    };

    function request() {
      return { type: AccountSConst.GET_COMPANY_INSURANCE_INFO_REQUEST };
    }
    function success(insuranceInfo) {
      return {
        type: AccountSConst.GET_COMPANY_INSURANCE_INFO_SUCCESS,
        insuranceInfo,
      };
    }
    function failure(error) {
      return { type: AccountSConst.GET_COMPANY_INSURANCE_INFO_FAILURE, error };
    }
  },
  saveCompanyInsuranceInformation(form) {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/SaveCompanyInsuranceInformation", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const insuranceInfo = r.insuranceInfo;
            dispatch(success(insuranceInfo));
          } else {
            dispatch(failure(r.error));
          }
        });
    };

    function request() {
      return { type: AccountSConst.ADD_COMPANY_INSURANCE_INFO_REQUEST };
    }

    function success(insuranceInfo) {
      return {
        type: AccountSConst.ADD_COMPANY_INSURANCE_INFO_SUCCESS,
        insuranceInfo,
      };
    }

    function failure(error) {
      return { type: AccountSConst.ADD_COMPANY_INSURANCE_INFO_FAILURE, error };
    }
  },

  getCompanyNotifications: (IdCompany) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getCompanyNotifications?IdCompany=" + IdCompany, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const CompanyNotifications = r.CompanyNotifications;
            dispatch(success(CompanyNotifications));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };
    function request() {
      return { type: AccountSConst.GET_COMPANY_NOTIFICATIONS_REQUEST };
    }
    function success(CompanyNotifications) {
      return {
        type: AccountSConst.GET_COMPANY_NOTIFICATIONS_SUCCESS,
        CompanyNotifications,
      };
    }
    function failure(error) {
      return { type: AccountSConst.GET_COMPANY_NOTIFICATIONS_FAILURE, error };
    }
  },

  getTrailers: (id, page, size, inactiveMode) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Maintenance/getTrailers?id=" +
        id +
        "&page=" +
        page +
        "&size=" +
        size +
        "&inactiveMode=" +
        inactiveMode,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const trailers = r.trailers;
            dispatch(success(trailers, inactiveMode));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: AccountSConst.GET_TRAILERS_REQUEST };
    }
    function success(trailers, inactiveMode) {
      return {
        type: AccountSConst.GET_TRAILERS_SUCCESS,
        trailers,
        inactiveMode,
      };
    }
    function failure(error) {
      return { type: AccountSConst.GET_TRAILERS_FAILURE, error };
    }
  },

  updateCompanyNotifications: (IdCompany, pestana, notification) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/AccountSet/updateCompanyNotifications?IdCompany=" +
        IdCompany +
        "&pestana=" +
        pestana +
        "&notification=" +
        notification,
        { method: "POST" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          // console.log("RU", r);
          if (r.status === 0) {
            // const newCompanyNotifications = r.newCompanyNotifications;
            dispatch(success());
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server", error));
        });
    };

    function request() {
      return { type: AccountSConst.UPDATE_COMPANY_NOTIFICATIONS_REQUEST };
    }
    function success(newCompanyNotifications) {
      return { type: AccountSConst.UPDATE_COMPANY_NOTIFICATIONS_SUCCESS };
    }
    function failure(error) {
      return {
        type: AccountSConst.UPDATE_COMPANY_NOTIFICATIONS_FAILURE,
        error,
      };
    }
  },

  getAllGeneralAlerts: (IdCompany) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getAllGeneralAlerts?IdCompany=" + IdCompany, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const countGAlerts = r.countGAlerts;
            dispatch(success(countGAlerts));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server", error));
        });
    };

    function request() {
      return { type: AccountSConst.GET_GENERAL_ALERTS_REQUEST };
    }
    function success(countGAlerts) {
      return { type: AccountSConst.GET_GENERAL_ALERTS_SUCCESS, countGAlerts };
    }
    function failure(error) {
      return {
        type: AccountSConst.GET_GENERAL_ALERTS_FAILURE,
        error,
      };
    }
  },
};

export const reducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case AccountSConst.DELETE_DOCUMENT_TRAINING_CERTIFICATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docsTraining: action.docsTraining,

        toastAlertState: true,
        error: "",
        message: "File deleted successfully",
      };

    case AccountSConst.DELETE_DOCUMENT_TRAINING_CERTIFICATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case AccountSConst.DELETE_DOCUMENT_TRAINING_CERTIFICATE_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.GET_ALL_HAZMAT_TRAINING_DOC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docsTraining: action.docsTraining,

        error: "",
        message: "",
      };

    case AccountSConst.GET_ALL_HAZMAT_TRAINING_DOC_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
      };

    case AccountSConst.GET_ALL_HAZMAT_TRAINING_DOC_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.GET_TRAILERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingMCS: false,
        trailers: action.trailers.Items,
        page: action.trailers.CurrentPage,
        count: action.trailers.NumberP,
        error: "",
        message: "",
      };

    case AccountSConst.GET_TRAILERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingMCS: false,
        error: action.error,
        message: "",
      };

    case AccountSConst.GET_TRAILERS_REQUEST:
      return { ...state, isLoading: true, isLoadingMCS: true };

    case AccountSConst.TOGGLE_TOAST_ALERT:
      return { ...state, toastAlertState: action.toastAlert };

    case AccountSConst.TOGGLE_TOAST_ALERT_HAZMAT:
      return { ...state, toastAlertState: action.toastAlertStatehazmat };

    case AccountSConst.TOGGLE_TOAST_ALERT_HAZMATS:
      return { ...state, toastAlertState: action.toastAlertStatehazmats };

    case AccountSConst.SAVE_CREDENTIALSCH_REQUEST:
      return { ...state, isLoading: true, CompanyCredentials: [] };

    case AccountSConst.SAVE_CREDENTIALSCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        CompanyCredentials: action.CompanyCredentials,
        message: "Successfully saved.",
      };

    case AccountSConst.SAVE_CREDENTIALSCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingCredentialsch: false,
        CompanyCredentials: [],
        error: action.error,
        toastAlertState: false,
        message: "Error saving credentials",
      };

    case AccountSConst.GET_CREDENTIALSCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        toastAlertState: false,
        isLoadingCredentialsch: true,
        CompanyCredentials: [],
      };

    case AccountSConst.GET_CREDENTIALSCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingCredentialsch: false,
        CompanyCredentials: action.CompanyCredentials,
      };

    case AccountSConst.GET_CREDENTIALSCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        CompanyCredentials: [],
        error: action.error,
        message: "",
      };
    ////////////////////////////////////////////////
    case AccountSConst.POST_FMCSA_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        toastAlertState: false,
      };

    case AccountSConst.POST_FMCSA_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        message: "Successfully saved.",

      };

    case AccountSConst.POST_FMCSA_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: false,
        message: "",
      };
    ////////////////////////////////////////////////
    case AccountSConst.GET_FMCSA_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        fmcsaInfo: [],
      };
    case AccountSConst.GET_FMCSA_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fmcsaInfo: action.fmcsaInfo,
      };

    case AccountSConst.GET_FMCSA_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
      };
    ////////////////////////////////////////////////
    case AccountSConst.RESET_MESSAGE:
      return {
        ...state,
        message: "",
        usDotAddDocumentsModal: false,
        toastAlertStatehazmat: false,
        toastAlertStatehazmats: false,
      };

    case AccountSConst.GET_DRIVER_LIST_REQUEST:
      return { ...state, isLoading: true, isLoadingDriver: true };

    case AccountSConst.GET_DRIVER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingDriver: false,
        driverList: action.driverList,
        error: "",
      };

    case AccountSConst.GET_DRIVER_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingDriver: false,
        driverList: [],
        error: action.error,
        message: "",
      };

    case AccountSConst.GET_CITIES_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.GET_CITIES_SUCCESS:
      return { ...state, isLoading: false, cities: action.cities, error: "" };

    case AccountSConst.GET_CITIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        cities: [],
        error: action.error,
        message: "",
      };

    case AccountSConst.GET_STATES_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.GET_STATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        states: action.states,
        cities: [],
        error: "",
      };

    case AccountSConst.GET_STATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        states: [],
        cities: [],
        error: action.error,
        message: "",
      };

    case AccountSConst.GET_MAILING_CITIES_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.GET_MAILING_CITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mailingCities: action.cities,
        error: "",
      };

    case AccountSConst.GET_MAILING_CITIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        mailingCities: [],
        error: action.error,
        message: "",
      };

    case AccountSConst.GET_MAILING_STATES_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.GET_MAILING_STATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mailingStates: action.states,
        mailingCities: [],
        error: "",
      };

    case AccountSConst.GET_MAILING_STATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        mailingStates: [],
        mailingCities: [],
        error: action.error,
        message: "",
      };

    case AccountSConst.POST_DATA_COMPANY_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.POST_DATA_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        company: action.company,
        alertsCount: action.alertsCount,
        alerts: action.alerts,
        complet: action.complet,
        toastAlertState: true,
        error: "",
        message: "Company information successfully saved",
      };

    case AccountSConst.POST_DATA_COMPANY_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case AccountSConst.GET_DATA_COMPANY_REQUEST:
      return { ...state, isLoading: true, isCompany: true };

    case AccountSConst.GET_DATA_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCompany: false,
        signatureDate: action.signatureDate,
        company: action.company,
        states: action.states,
        cities: action.cities,
        mailingStates: action.mailingStates,
        mailingCities: action.mailingCities,
        countries: action.countries,
        signature: action.signature,
        alertsCount: action.alertsCount,
        alerts: action.alerts,
        complet: action.complet,
        companyRating: action.cR,
        doc: action.docs,
        error: "",
      };

    case AccountSConst.GET_DATA_COMPANY_FAILURE:
      return {
        ...state,
        isLoading: false,
        isCompany: false,
        error: action.error,
        message: "",
      };

    case AccountSConst.GET_ACTIVEVEHICLES_REQUEST:
      return {
        ...state,
        isLoading: true,
        isVehiclesLoading: true,
      };
    case AccountSConst.GET_ACTIVEVEHICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isVehiclesLoading: false,
        Vehicles: action.Vehicles,
        error: "",
      };
    case AccountSConst.GET_ACTIVEVEHICLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isVehiclesLoading: false,
        error: action.error,
        message: "",
      };
    case AccountSConst.POST_COMPANY_SIGNATURE_REQUEST:
      return { ...state, isLoading: true, message: "", error: "" };

    case AccountSConst.POST_COMPANY_SIGNATURE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "",
        message: "Signature successfully saved",
        signature: action.signature,
      };

    case AccountSConst.POST_COMPANY_SIGNATURE_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case AccountSConst.POST_COMPANY_USER_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.POST_COMPANY_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "",
        message: "New User has been added",
        modalNU: false,
        users: action.items,
        page: action.page,
        count: action.count,
      };

    case AccountSConst.POST_COMPANY_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case AccountSConst.ATTACH_PAYMENT_METHOD_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.ATTACH_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "",
        message: "New Payment Method added",
        paymentMethods: action.items,
        addCardModal: false,
      };

    case AccountSConst.ATTACH_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case AccountSConst.DETACH_PAYMENT_METHOD_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.DETACH_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "",
        message: "Payment Method Removed Succesfully",
        paymentMethods: action.items,
        addCardModal: false,
      };

    case AccountSConst.DETACH_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case AccountSConst.GET_PAYMENT_METHOD_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.GET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "",
        paymentMethods: action.items,
      };

    case AccountSConst.GET_PAYMENT_METHOD_FAILURE:
      return { ...state, isLoading: false, error: "", message: "" };

    case AccountSConst.GET_DEFAULT_PAYMENT_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.GET_DEFAULT_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "",
        defaultPaymentMethod: action.items,
      };

    case AccountSConst.GET_DEFAULT_PAYMENT_FAILURE:
      return { ...state, isLoading: false, error: "", message: "" };

    case AccountSConst.SET_DEFAULT_PAYMENT_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.SET_DEFAULT_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        defaultPaymentMethod: action.items,
        toastAlertState: true,
        error: "",
        message: "Changed PaymentMethod Succesfully",
      };

    case AccountSConst.SET_DEFAULT_PAYMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "Something went wrong",
        message: "",
      };

    case AccountSConst.GET_USERS_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.users.Items,
        inactiveUsers: action.inactiveUsers.Items,
        page: action.users.CurrentPage,
        count: action.users.NumberP,
        error: "",
        message: "",
      };

    case AccountSConst.GET_USERS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case AccountSConst.NEW_USER_TOGGLE:
      return { ...state, modalNU: action.modal, error: "" };

    case AccountSConst.ADD_CARD_MODAL_TOGGLE:
      return { ...state, addCardModal: action.modal, error: "" };

    case AccountSConst.UPLOAD_DOCS_TOGGLE:
      return { ...state, modalDocsUpload: action.modalDocsUpload, error: "" };

    case AccountSConst.DELETE_DOCUMENT_TOGGLE_C:
      return { ...state, modalD: action.modalD, idDelete: action.idD };

    case AccountSConst.DELETE_DOCUMENT_TOGGLE_FILESCOMPANY:
      return {
        ...state,
        modalDeleteFilesCompany: action.modalDeleteFilesCompany,
        idDelete: action.idD,
        fileNameToDelete: action.fileName,
        docTypeToDelete: action.docTypeToDelete,
      };

    case AccountSConst.TOGGLE_USDOT_DOCUMENTS_MODAL:
      return {
        ...state,
        usDotAddDocumentsModal: action.usDotAddDocumentsModal,
      };

    case AccountSConst.TOGGLE_DRUG_TESTING_DOCUMENTS_MODAL:
      return {
        ...state,
        drugTestingModal: action.drugTestingModal,
        messageAR: "",
      };

    case AccountSConst.POST_SAVE_DOCUMENT_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.POST_SAVE_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        docs: action.docs.Items,
        page: action.docs.CurrentPage,
        count: action.docs.NumberP,
        toastAlertState: true,
        message: "File successfully uploaded",
        doc: action.doc,
      };

    case AccountSConst.POST_SAVE_DOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case AccountSConst.GET_DOCUMENTS_REQUEST:
      return { ...state, isLoading: true, doc: [] };

    case AccountSConst.GET_DOCUMENTS_SUCCESS:
      return { ...state, isLoading: false, doc: action.doc, message: "" };

    case AccountSConst.GET_DOCUMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        doc: action.doc,
        error: action.error,
        message: "",
      };

    case AccountSConst.GET_ALL_DOCUMENTS_REQUEST:
      return { ...state, isLoading: true, docs: [] };

    case AccountSConst.GET_ALL_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docs: action.docs.Items,
        pageD: action.docs.CurrentPage,
        countD: action.docs.NumberP,
        error: "",
        message: "",
      };

    case AccountSConst.GET_ALL_DOCUMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case AccountSConst.GET_ALL_HAZMAT_DOCS_REQUEST:
      return { ...state, isLoading: false, docsHazmat: [] };

    case AccountSConst.GET_ALL_HAZMAT_DOCS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docsHazmat: action.docsHazmat,
        error: "",
        message: "",
      };

    case AccountSConst.GET_ALL_HAZMAT_DOCS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case AccountSConst.GET_ACCIDENT_REGISTER_DOCUMENTS_REQUEST:
      return { ...state, isLoading: true, accidentDocs: [] };

    case AccountSConst.GET_ACCIDENT_REGISTER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accidentDocs: action.accidentDocs.Items,
        pageD: action.accidentDocs.CurrentPage,
        countD: action.accidentDocs.NumberP,
        error: "",
        message: "",
      };

    case AccountSConst.GET_ACCIDENT_REGISTER_DOCUMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case AccountSConst.DELETE_DOCUMENT_REQUEST_C:
      return { ...state, isLoading: true };

    case AccountSConst.DELETE_DOCUMENT_SUCCESS_C:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "",
        message: "File deleted successfully",
        idDelete: 0,
        modalDeleteFilesCompany: false,
        usDotAddDocumentsModal: false,
        //drugTestingModal: false,
        fileUploadCompany: true,
        docs: action.docs.Items,
      };

    case AccountSConst.DELETE_DOCUMENT_FAILURE_C:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
        idDelete: 0,
      };

    case AccountSConst.DELETE_DOCUMENT_REQUEST_H:
      return { ...state, isLoading: true };

    case AccountSConst.DELETE_DOCUMENT_SUCCESS_H:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "",
        message: "File deleted successfully",
        idDelete: 0,
        modalDeleteFilesCompany: false,
        usDotAddDocumentsModal: false,
        drugTestingModal: false,
        fileUploadCompany: true,
        docs: action.docs.Items,
      };

    case AccountSConst.DELETE_DOCUMENT_FAILURE_H:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
        idDelete: 0,
      };

    case AccountSConst.DOWNLOAD_DOCUMENT_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.DOWNLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.message,
        error: "",
        idDownload: 0,
      };

    case AccountSConst.DOWNLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
        idDownload: 0,
      };

    case AccountSConst.DELETE_USER_TOGGLE:
      return { ...state, modalDU: action.modalD, idDeleteU: action.idD };

    case AccountSConst.DELETE_USERS_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case AccountSConst.DELETE_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        idDeleteU: 0,
        modalDU: false,
        users: action.users.Items,
        inactiveUsers: action.inactiveUsers.Items,
        page: action.users.CurrentPage,
        count: action.users.NumberP,
        toastAlertState: true,
        error: "",
        message: "User has been deleted Successfully",
      };

    case AccountSConst.DELETE_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
        idDeleteU: 0,
      };

    case AccountSConst.REACTIVATE_USER_TOGGLE:
      return { ...state, modalAU: action.modalA, idReactivateU: action.idD };

    case AccountSConst.REACTIVATE_USERS_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case AccountSConst.REACTIVATE_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        idReactivateU: 0,
        modalAU: false,
        users: action.users.Items,
        inactiveUsers: action.inactiveUsers.Items,
        page: action.users.CurrentPage,
        count: action.users.NumberP,
        toastAlertState: true,
        error: "",
        message: "User has been reactivated Successfully",
      };

    case AccountSConst.REACTIVATE_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
        idReactivateU: 0,
      };
    case AccountSConst.OPEN_OPERATION_CLASSIFICATIONS_TOGGLE:
      return { ...state, modalOperation: action.modal, error: "" };

    case AccountSConst.OPEN_CLASSIFICATIONS_TOGGLE:
      return { ...state, modalClasifications: action.modal, error: "" };

    case AccountSConst.OPEN_HAZARDOUS_MATERIALS_TOGGLE:
      return { ...state, modalHazardous: action.modal, error: "" };

    case AccountSConst.POST_OPERATION_CLASSIFICATIONS_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.POST_OPERATION_CLASSIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OperationC: action.OperationC,
        error: "",
        modalOperation: false,
      };

    case AccountSConst.POST_OPERATION_CLASSIFICATIONS_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case AccountSConst.GET_OPERATION_CLASSIFICATIONS_REQUEST:
      return { ...state, isLoading: true, isLoadingOC: true };

    case AccountSConst.GET_OPERATION_CLASSIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingOC: false,
        OperationC: action.OperationC,
        error: "",
      };

    case AccountSConst.GET_OPERATION_CLASSIFICATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingOC: false,
        error: action.error,
      };

    case AccountSConst.POST_CARGO_CLASSIFICATIONS_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.POST_CARGO_CLASSIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cargoC: action.cargoC,
        error: "",
        modalClasifications: false,
      };

    case AccountSConst.POST_CARGO_CLASSIFICATIONS_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case AccountSConst.GET_CARGO_CLASSIFICATIONS_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.GET_CARGO_CLASSIFICATIONS_SUCCESS:
      return { ...state, isLoading: false, cargoC: action.cargoC, error: "" };

    case AccountSConst.GET_CARGO_CLASSIFICATIONS_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case AccountSConst.SAVE_HAZARD_MATERIAL_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.SAVE_HAZARD_MATERIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hazardMaterial: action.hazardMaterial,
        HmStates: action.states,
        HmCompany: action.company,
        HmOptions: action.options,
        error: "",
        modalHazardous: false,
      };

    case AccountSConst.SAVE_HAZARD_MATERIAL_FAILURE:
      return { ...state, isLoading: false, hazardMaterial: [] };

    case AccountSConst.GET_HAZARD_MATERIAL_REQUEST:
      return { ...state, isLoading: true, isLoadingHm: true };

    case AccountSConst.GET_HAZARD_MATERIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingHm: false,
        hazardMaterial: action.hazardMaterial,
        HmStates: action.states,
        HmCompany: action.company,
        HmOptions: action.options,
        error: "",
      };

    case AccountSConst.GET_HAZARD_MATERIAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingHm: false,
        hazardMaterial: [],
      };

    case AccountSConst.GET_FORM_DATA_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.GET_FORM_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        formData: action.company,
        error: "",
      };

    case AccountSConst.GET_FORM_DATA_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case AccountSConst.GET_ACCIDENT_REGISTRY_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.GET_ACCIDENT_REGISTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accidentRegister: action.aR.Items,
        pageAR: action.aR.CurrentPage,
        countAR: action.aR.NumberP,
        messageAR: "",
        message: "",
      };

    case AccountSConst.GET_ACCIDENT_REGISTRY_FAILURE:
      return {
        ...state,
        isLoading: false,
        messageAR: action.error,
        message: "",
      };

    case AccountSConst.GET_ACCIDENT_DATA_REQUEST:
      return { ...state, isLoading: true, accidentData: {} };

    case AccountSConst.GET_ACCIDENT_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accidentData: action.accidentData,
        messageAR: "",
        message: "",
      };

    case AccountSConst.GET_ACCIDENT_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        accidentData: {},
        messageAR: action.error,
        message: "",
      };

    case AccountSConst.GET_ACCIDENT_REGISTRY_PDF_REQUEST:
      return { ...state, isLoading: true, registryPDF: [] };

    case AccountSConst.GET_ACCIDENT_REGISTRY_PDF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        registryPDF: action.registryPDF,
        messageAR: "",
        message: "",
      };

    case AccountSConst.GET_ACCIDENT_REGISTRY_PDF_FAILURE:
      return {
        ...state,
        isLoading: false,
        registryPDF: [],
        messageAR: action.error,
        message: "",
      };

    case AccountSConst.UPLOAD_FILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoadingUploadManual: true,
        docs: [],
      };

    case AccountSConst.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isLoadingUploadManual: false,
        docs: action.docs.Items,
        error: "",
        toastAlertState: true,
        message: "File succesfully uploaded",
      };

    case AccountSConst.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingUploadManual: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case AccountSConst.UPLOAD_SECURITY_PLAN_REQUEST:
      return { ...state, isLoading: true, hazmatSecurityPlanDocs: [] };

    case AccountSConst.UPLOAD_SECURITY_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hazmatSecurityPlanDocs: action.hazmatSecurityPlanDocs,
        toastAlertState: true,
        message: "File succesfully uploaded.",
      };

    case AccountSConst.UPLOAD_SECURITY_PLAN_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case AccountSConst.GET_COMPANY_INSURANCE_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AccountSConst.GET_COMPANY_INSURANCE_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        insuranceInfo: action.insuranceInfo,
      };
    case AccountSConst.GET_COMPANY_INSURANCE_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case AccountSConst.UPLOAD_FILE_REQUEST_UCR:
      return {
        ...state,
        isLoading: true,
        isLoadingUploadManual: true,
        docsUCR: [],
      };

    case AccountSConst.UPLOAD_FILE_SUCCESS_UCR:
      return {
        ...state,
        isLoading: true,
        isLoadingUploadManual: false,
        docsUCR: action.docsUCR.Items,
        error: "",
        toastAlertState: true,
        message: "File succesfully uploaded",
      };

    case AccountSConst.UPLOAD_FILE_FAILURE_UCR:
      return {
        ...state,
        isLoading: false,
        isLoadingUploadManual: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };
    case AccountSConst.ADD_COMPANY_INSURANCE_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AccountSConst.ADD_COMPANY_INSURANCE_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        message: "Insurance information saved successfully",
        insuranceInfo: action.insuranceInfo,
      };
    case AccountSConst.ADD_COMPANY_INSURANCE_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
      };

    case AccountSConst.UPLOAD_DRIVERS_DOCS_REQUEST:
      return { ...state, isLoading: true, docsDrivers: [] };

    case AccountSConst.UPLOAD_DRIVERS_DOCS_SUCCESS:
      return {
        ...state,
        isLoading: true,
        docsDrivers: action.docsDrivers.Items,
        error: "",
        toastAlertState: true,
        message: "File succesfully uploaded",
      };

    case AccountSConst.UPLOAD_DRIVERS_DOCS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    ////////////////////////////////////////////////////////////////
    case AccountSConst.UPLOAD_DRIVERS_DOCS_HAZMAT_REQUEST:
      return { ...state, isLoading: true, docsDrivers: [] };

    case AccountSConst.UPLOAD_DRIVERS_DOCS_HAZMAT_SUCCESS:
      return {
        ...state,
        isLoading: true,
        docsDrivers: action.docsDrivers.Items,
        error: "",
        toastAlertStatehazmat: true,
        message: "File succesfully uploaded",
      };

    case AccountSConst.UPLOAD_DRIVERS_DOCS_HAZMAT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertStatehazmat: true,
      };
    ////////////////////////////////////////////////////////////////
    case AccountSConst.UPLOAD_DRIVERS_DOCS_HAZMATS_REQUEST:
      return { ...state, isLoading: true, docsDrivers: [] };

    case AccountSConst.UPLOAD_DRIVERS_DOCS_HAZMATS_SUCCESS:
      return {
        ...state,
        isLoading: true,
        docsDrivers: action.docsDrivers.Items,
        error: "",
        toastAlertStatehazmats: true,
        message: "File succesfully uploaded",
      };

    case AccountSConst.UPLOAD_DRIVERS_DOCS_HAZMATS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertStatehazmats: true,
      };
    ////////////////////////////////////////////////////////////////

    case AccountSConst.GET_ALL_DOCUMENTS_REQUEST_DRIVERS:
      return { ...state, isLoading: true, docsDrivers: [] };

    case AccountSConst.GET_ALL_DOCUMENTS_SUCCESS_DRIVERS:
      return {
        ...state,
        isLoading: false,
        docsDrivers: action.docsDrivers.Items,
        pageD: action.docsDrivers.CurrentPage,
        countD: action.docsDrivers.NumberP,
        error: "",
        message: "",
      };

    case AccountSConst.GET_ALL_DOCUMENTS_FAILURE_DRIVERS:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case AccountSConst.DELETE_DRIVERS_DOCS_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.DELETE_DRIVERS_DOCS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "",
        message: "File deleted successfully",
        idDelete: 0,
        modalDeleteFilesCompany: false,
        usDotAddDocumentsModal: false,
        drugTestingModal: false,
        fileUploadCompany: true,
        docsDrivers: action.docsDrivers.Items,
      };

    case AccountSConst.DELETE_DRIVERS_DOCS_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
        idDelete: 0,
      };

    /////////////////////////////////////////////////////////////////////////////
    case AccountSConst.DELETE_DRIVERS_DOCS_HAZMAT_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.DELETE_DRIVERS_DOCS_HAZMAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertStatehazmat: true,
        error: "",
        message: "File deleted successfully",
        idDelete: 0,
        modalDeleteFilesCompany: false,
        usDotAddDocumentsModal: false,
        drugTestingModal: false,
        fileUploadCompany: true,
        docsDrivers: action.docsDrivers.Items,
      };

    case AccountSConst.DELETE_DRIVERS_DOCS_HAZMAT_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertStatehazmat: true,
        error: action.error,
        message: "",
        idDelete: 0,
      };
    /////////////////////////////////////////////////////////////////////////////
    case AccountSConst.DELETE_DRIVERS_DOCS_HAZMATS_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.DELETE_DRIVERS_DOCS_HAZMATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertStatehazmats: true,
        error: "",
        message: "File deleted successfully",
        idDelete: 0,
        modalDeleteFilesCompany: false,
        usDotAddDocumentsModal: false,
        drugTestingModal: false,
        fileUploadCompany: true,
        docsDrivers: action.docsDrivers.Items,
      };

    case AccountSConst.DELETE_DRIVERS_DOCS_HAZMATS_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertStatehazmats: true,
        error: action.error,
        message: "",
        idDelete: 0,
      };
    /////////////////////////////////////////////////////////////////////////////

    case AccountSConst.UPLOAD_DRIVERS_DOCS_TRAINING_REQUEST:
      return {
        ...state,
        isLoading: true,
        docsTraining: [],
      };

    case AccountSConst.UPLOAD_DRIVERS_DOCS_TRAINING_SUCCESS:
      return {
        ...state,
        isLoading: true,
        docsTraining: action.docsTraining.Items,
        error: "",
        toastAlertState: true,
        message: "File succesfully uploaded",
      };

    case AccountSConst.POST_RESIZE_SIGNATURE:
      return {
        ...state,
        resize: action.resize,
      };
    case AccountSConst.UPLOAD_DRIVERS_DOCS_TRAINING_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };
    default:
      return state;

    case AccountSConst.GET_COMPANY_NOTIFICATIONS_REQUEST:
      return { ...state, isLoading: true, isLoadingUsDot: true };

    case AccountSConst.GET_COMPANY_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        CompanyNotifications: action.CompanyNotifications,
        isLoadingUsDot: false,
      };

    case AccountSConst.GET_COMPANY_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "Error",
        isLoadingUsDot: false,
      };

    case AccountSConst.UPDATE_COMPANY_NOTIFICATIONS_REQUEST:
      return { ...state, isLoading: true };

    case AccountSConst.UPDATE_COMPANY_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // newCompanyNotifications: action.newCompanyNotifications,
      };

    case AccountSConst.UPDATE_COMPANY_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "Error failure",
      };

    case AccountSConst.GET_GENERAL_ALERTS_REQUEST:
      return { ...state, isLoadingAllGAlerts: true };

    case AccountSConst.GET_GENERAL_ALERTS_SUCCESS:
      return {
        ...state,
        isLoadingAllGAlerts: false,
        countGAlerts: action.countGAlerts,
      };

    case AccountSConst.GET_GENERAL_ALERTS_FAILURE:
      return {
        ...state,
        isLoadingAllGAlerts: false,
        toastAlertState: true,
        error: action.error,
        message: "Error failure",
      };
  }
};
