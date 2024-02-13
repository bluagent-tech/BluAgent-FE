import DriversConst from "./../constants/DriversConts";
const initialState = {
  Countries: [],
  States: [],
  StatesM: [],
  Cities: [],
  driver: {},
  company: {},
  isLoading: false,
  isLoadingM: false,
  notifications: {},
  message: "",
  error: "",
  messageS: "",
  errorS: "",
  errorM: "",
  modalA: false,
  address: {},
  modalDE: false,
  drivingEx: {},
  modalAR: false,
  accidentR: {},
  modalTC: false,
  trafficC: {},
  modalNR: false,
  record: {},
  signature: "",
  pageA: 0,
  countA: 0,
  addresses: [],
  pageDE: 0,
  countDE: 0,
  drivingExList: [],
  pageAR: 0,
  countAR: 0,
  accidentRecList: [],
  pageTC: 0,
  countTC: 0,
  trafficCList: [],
  pageER: 0,
  countER: 0,
  employmentRList: [],
  modalRT: false,
  modalDMV: false,
  pageDMV: 0,
  countDMV: 0,
  DMVList: [],
  pagePullNotice: 0,
  countPullNotice: 0,
  employerPullNotice: [],
  modalEA: false,
  companyInfo: {},
  page: 0,
  count: 0,
  modalD1: false,
  card: [],
  idDelete1: 0,
  modalLI: false,
  pEmployer: {},
  pageLQ: 0,
  countLQ: 0,
  LQList: [],
  LQEHList: [],
  LetterInquiry: [],
  LetterInAndEmployHis: [],
  modalEH: false,
  pageEH: 0,
  countEH: 0,
  EHList: [],
  modalRD: false,
  pageRD: 0,
  countRD: 0,
  RDList: [],
  modalCV: false,
  pageV: 0,
  countV: 0,
  VList: [],
  pageCV: 0,
  countCV: 0,
  CVList: [],
  pageDrug: 0,
  countDrug: 0,
  DrugList: [],
  pageAlcohol: 0,
  countAlcohol: 0,
  AlcoholList: [],
  modalMC: false,
  pageMC: 0,
  countMC: 0,
  MCList: [],
  modalROT: false,
  roadTD: {},
  modalME: false,
  dataME: [],
  dmvDate: null,
  modalCP: false,
  docs: [],
  modal1: false,
  idDelte: 0,
  modalD: false,
  alertsCount: 0,
  modalDA: false,
  alerts: [],
  fitness: [],
  roadTestL: [],
  pageRoad: 0,
  countRoad: 0,
  eAList: [],
  pageEA: 0,
  countEA: 0,
  toastAlertState: false,
  driverId: 0,
  docType: "",
  fileName: "",
  idDownload: 0,
};
const FileDownload = require("js-file-download");

export const actionCreators = {
  toggleToastAlert: (status) => {
    return (dispatch, getState) => {
      const toastAlert = status;
      dispatch(OpenClose(toastAlert));
    };
    function OpenClose(toastAlert) {
      return { type: DriversConst.TOGGLE_TOAST_ALERT, toastAlert };
    }
  },
  clean: () => ({ type: DriversConst.CLEAN }),
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
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_STATES_REQUEST };
    }
    function success(states) {
      return { type: DriversConst.GET_STATES_SUCCESS, states };
    }
    function failure(error) {
      return { type: DriversConst.GET_STATES_FAILURE, error };
    }
  },

  getCities: (State) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/AccountSet/getCities?idstate=" + State, {
        method: "GET",
      })
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
      return { type: DriversConst.GET_CITIES_REQUEST };
    }
    function success(cities) {
      return { type: DriversConst.GET_CITIES_SUCCESS, cities };
    }
    function failure(error) {
      return { type: DriversConst.GET_CITIES_FAILURE, error };
    }
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
            const { Company } = r.company;
            const complet = r.complet;
            dispatch(success(Company));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_COMPANY_INFO_REQUEST };
    }
    function success(company) {
      return {
        type: DriversConst.GET_COMPANY_INFO_SUCCESS,
        company,
      };
    }
    function failure(error) {
      return { type: DriversConst.GET_COMPANY_INFO_FAILURE, error };
    }
  },
  /*     get / save notifications features are not currently being used but are for next use
    getNotifications: (idu) => {
        return (dispatch) => {
            dispatch(request());
            fetch('api/Drivers/getNotifications?idu=' + idu, { method: 'GET' })
                .then(res => res.json())
                .then(response => {
                    const r = JSON.parse(response);

                    if (r.status === 0) {
                        const noti = r.notifications;
                        dispatch(success(noti));
                    } else { dispatch(failure(r.error)); }

                }).catch(error => { dispatch(failure("Error in the Server")); });
        };

        function request() { return { type: DriversConst.GET_NOTIFICATIONS_REQUEST }; }
        function success(notifications) { return { type: DriversConst.GET_NOTIFICATIONS_SUCCESS, notifications }; }
        function failure(error) { return { type: DriversConst.GET_NOTIFICATIONS_FAILURE, error }; }
    },
    saveNotifications: (form) => {
        return (dispatch) => {
            dispatch(request());
            fetch('api/Drivers/saveNotifications', { method: 'POST', body: form })
                .then(res => res.json())
                .then(response => {
                    const r = JSON.parse(response);

                    if (r.status === 0) {
                        const noti = r.notifications;
                        const alertsCount = r.alertsCount; 
                        const alerts = r.alerts;
                        const message = r.message;
                        dispatch(success(noti, alerts, alertsCount, message));
                        setTimeout(() => { dispatch({ type: DriversConst.CLEAN_MESSAGE }); }, 3000);
                    } else { dispatch(failure(r.error)); }

                }).catch(error => { dispatch(failure("Error in the Server")); });
        };

        function request() { return { type: DriversConst.SAVE_NOTIFICATIONS_REQUEST }; }
        function success(notifications, alerts, alertsCount, message) { return { type: DriversConst.SAVE_NOTIFICATIONS_SUCCESS, notifications, alerts, alertsCount, message }; }
        function failure(error) { return { type: DriversConst.SAVE_NOTIFICATIONS_FAILURE, error }; }
    },
    */
  getDriverData: (id, idCompany) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getDriverDataNew?id=" + id + "&idCompany=" + idCompany,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const driver = r.driver;
            var c = r.company;
            if (c === null) {
              c = {};
            }
            dispatch(success(driver, c));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_DATA_DRIVER_REQUEST };
    }
    function success(driver, company) {
      return {
        type: DriversConst.GET_DATA_DRIVER_SUCCESS,
        driver,
        company,
      };
    }
    function failure(error) {
      return { type: DriversConst.GET_DATA_DRIVER_FAILURE, error };
    }
  },
  saveDriverData: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveDriverData", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const driver = r.driver.driver;
            const alertsCount = r.alertsCount;
            const alerts = r.alerts;
            dispatch(success(driver, alerts, alertsCount));
            setTimeout(() => {
              dispatch({ type: DriversConst.CLEAN_MESSAGE });
            }, 3000);
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Whoops! Error Saving Driver Try Again! ${error}`));
        });
    };

    function request() {
      return { type: DriversConst.POST_DATA_DRIVER_REQUEST };
    }
    function success(driver, alerts, alertsCount) {
      return {
        type: DriversConst.POST_DATA_DRIVER_SUCCESS,
        driver,
        alerts,
        alertsCount,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_DATA_DRIVER_FAILURE, error };
    }
  },

  saveSignatureFileEmployerHistory: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveSignatureFileLastEmployerHistory", {
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
          dispatch(failure("Error Can't save signature file." + error));
        });
    };

    function request() {
      return { type: DriversConst.POST_DATA_SIGNATURE_EMPLOYER_REQUEST };
    }
    function success(signature, driver) {
      return {
        type: DriversConst.POST_DATA_SIGNATURE_EMPLOYER_SUCCESS,
        signature,
        driver,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.POST_DATA_SIGNATURE_EMPLOYER_FAILURE,
        error,
      };
    }
  },

  saveSignatureFileEmployer: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveSignatureFileLastEmployer", {
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
          dispatch(failure("Error Can't save signature file." + error));
        });
    };

    function request() {
      return { type: DriversConst.POST_DATA_SIGNATURE_EMPLOYER_REQUEST };
    }
    function success(signature, driver) {
      return {
        type: DriversConst.POST_DATA_SIGNATURE_EMPLOYER_SUCCESS,
        signature,
        driver,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.POST_DATA_SIGNATURE_EMPLOYER_FAILURE,
        error,
      };
    }
  },

  saveSignatureFile: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveSignatureFile", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var sig = r.signature;
            var driver = r.driver;
            dispatch(success(sig, driver));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_DATA_SIGNATURE_REQUEST };
    }
    function success(signature, driver) {
      return {
        type: DriversConst.POST_DATA_SIGNATURE_SUCCESS,
        signature,
        driver,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_DATA_SIGNATURE_FAILURE, error };
    }
  },
  saveAddress: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveAddress", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var ad = r.address;
            var driver = r.driver;
            var c = r.company;
            dispatch(success(ad.Items, ad.CurrentPage, ad.NumberP, driver, c));
            document.forms["FormNewA"].reset();
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_NEW_ADDRESS_REQUEST };
    }
    function success(items, page, count, driver, company) {
      return {
        type: DriversConst.POST_NEW_ADDRESS_SUCCESS,
        items,
        page,
        count,
        driver,
        company,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_NEW_ADDRESS_FAILURE, error };
    }
  },
  saveDrivingExp: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveDrivingExp", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var ad = r.drivingExp;
            dispatch(success(ad.Items, ad.CurrentPage, ad.NumberP));
            document.forms["formDE"].reset();
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_NEW_DRIVINGEXP_REQUEST };
    }
    function success(items, page, count) {
      return {
        type: DriversConst.POST_NEW_DRIVINGEXP_SUCCESS,
        items,
        page,
        count,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_NEW_DRIVINGEXP_FAILURE, error };
    }
  },
  saveAccidentRec: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveAccidentRec", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var ad = r.accidentRec;
            dispatch(success(ad.Items, ad.CurrentPage, ad.NumberP));
            document.forms["formAR"].reset();
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_NEW_ACCIDENTREC_REQUEST };
    }
    function success(items, page, count) {
      return {
        type: DriversConst.POST_NEW_ACCIDENTREC_SUCCESS,
        items,
        page,
        count,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_NEW_ACCIDENTREC_FAILURE, error };
    }
  },
  saveTrafficConv: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveTrafficConv", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var ad = r.trafficConvL;
            dispatch(success(ad.Items, ad.CurrentPage, ad.NumberP));
            document.forms["formTC"].reset();
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_NEW_TRAFFICCONV_REQUEST };
    }
    function success(items, page, count) {
      return {
        type: DriversConst.POST_NEW_TRAFFICCONV_SUCCESS,
        items,
        page,
        count,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_NEW_TRAFFICCONV_FAILURE, error };
    }
  },
  saveEmploymentR: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveEmpoymentFull", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          //console.log("response: " + r);
          if (r.status === 0) {
            var ad = r.employmentRL;
            dispatch(success(ad.Items, ad.CurrentPage, ad.NumberP));
            document.forms["formRecord"].reset();
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_NEW_EMPLOYMENTR_REQUEST };
    }
    function success(items, page, count) {
      return {
        type: DriversConst.POST_NEW_EMPLOYMENTR_SUCCESS,
        items,
        page,
        count,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_NEW_EMPLOYMENTR_FAILURE, error };
    }
  },
  saveDrugAlcoholTest: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveDrugAlcoholTest", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drugTest = r.drugTest;
            const alcoholTest = r.alcoholTest;
            var fitness = r.fitness;
            dispatch(success(drugTest, alcoholTest, fitness));
            document.forms["formPE"].reset();
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_DRUG_ALCOHOL_TEST_REQUEST };
    }
    function success(drugTest, alcoholTest, fitness) {
      return {
        type: DriversConst.POST_DRUG_ALCOHOL_TEST_SUCCESS,
        drugTest,
        alcoholTest,
        fitness,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.POST_DRUG_ALCOHOL_TEST_FAILURE,
        error,
      };
    }
  },
  saveEditDrugAlcoholTest: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveEditDrugAlcoholTest", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const DrugList = r.drugTest;
            dispatch(success(DrugList));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.EDIT_DRUG_ALCOHOL_TEST_REQUEST };
    }
    function success(DrugList) {
      return {
        type: DriversConst.EDIT_DRUG_ALCOHOL_TEST_SUCCESS,
        DrugList,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.EDIT_DRUG_ALCOHOL_TEST_FAILURE,
        error,
      };
    }
  },
  saveEditDrugAlcoholTest2: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveEditDrugAlcoholTest", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const AlcoholList = r.alcoholTest;
            dispatch(success(AlcoholList));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.EDIT_DRUG_ALCOHOL_TEST2_REQUEST };
    }
    function success(AlcoholList) {
      return {
        type: DriversConst.EDIT_DRUG_ALCOHOL_TEST2_SUCCESS,
        AlcoholList,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.EDIT_DRUG_ALCOHOL_TEST2_FAILURE,
        error,
      };
    }
  },
  saveMedicalCertificate: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveMedicalCertificate", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var list = r.list;
            const alertsCount = r.alertsCount;
            const alerts = r.alerts;
            var fitness = r.fitness;
            dispatch(
              success(
                list.Items,
                list.CurrentPage,
                list.NumberP,
                alerts,
                alertsCount,
                fitness
              )
            );
            document.forms["formMC"].reset();
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_MEDICAL_CERTIFICATE_REQUEST };
    }
    function success(items, page, count, alerts, alertsCount, fitness) {
      return {
        type: DriversConst.POST_MEDICAL_CERTIFICATE_SUCCESS,
        items,
        page,
        count,
        alerts,
        alertsCount,
        fitness,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.POST_MEDICAL_CERTIFICATE_FAILURE,
        error,
      };
    }
  },
  deleteMedicalCertificate(
    id,
    medicalCertificateID,
    idDriver,
    medicalFile,
    idCompany,
    callback
  ) {
    return (dispatch) => {
      dispatch(request());

      fetch(
        "api/Drivers/DeleteMedicalCertificate?id=" +
        id +
        "&medicalCertificateID=" +
        medicalCertificateID +
        "&idDriver=" +
        idDriver +
        "&idCompany=" +
        idCompany +
        "&medicalFile=" +
        medicalFile,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const MCList = r.MCList.Items;
            const message = r.message;
            const page = r.MCList.CurrentPage;
            const count = r.MCList.NumberP;
            dispatch(success(MCList, page, count, message))
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(error));
        });
    };

    function request() {
      return { type: DriversConst.DELETE_DRIVER_MEDICAL_CERTIFICATE_REQUEST };
    }
    function success(MCList, page, count, message) {
      return {
        type: DriversConst.DELETE_DRIVER_MEDICAL_CERTIFICATE_SUCCESS,
        MCList,
        message,
        page,
        count,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.DELETE_DRIVER_MEDICAL_CERTIFICATE_FAILURE,
        error,
      };
    }
  },
  saveDMVRecord: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveDMVRecord", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const dmvL = r.dmvL;
            const alertsCount = r.alertsCount;
            const alerts = r.alerts;
            var fitness = r.fitness;
            dispatch(success(dmvL, alerts, alertsCount, fitness));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_DMV_RECORD_REQUEST };
    }
    function success(dmvR, alerts, alertsCount, fitness) {
      return {
        type: DriversConst.POST_DMV_RECORD_SUCCESS,
        dmvR,
        alerts,
        alertsCount,
        fitness,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_DMV_RECORD_FAILURE, error };
    }
  },
  savePullNotice: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/savePullNotice", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const epnL = r.epnL;
            dispatch(success(epnL));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_EMPLOYER_PULL_NOTICE_REQUEST };
    }
    function success(epnL) {
      return {
        type: DriversConst.POST_EMPLOYER_PULL_NOTICE_SUCCESS,
        epnL,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.POST_EMPLOYER_PULL_NOTICE_FAILURE,
        error,
      };
    }
  },
  sendLQ: (form, signature) => {
    return (dispatch, getState) => {
      dispatch(request());
      if (getState().drivers.pEmployer.EmployerName !== undefined) {
        if (signature !== null) {
          fetch("api/Drivers/saveLetterofInquiry", {
            method: "POST",
            body: form,
          })
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                var list = r.list;
                var fitness = r.fitness;
                dispatch(
                  success(list.Items, list.CurrentPage, list.NumberP, fitness)
                );
              } else {
                dispatch(failure(r.error));
              }
            })
            .catch((error) => {
              dispatch(failure("Error in the Server"));
            });
        } else {
          dispatch(failure("Driver's signature is Required"));
        }
      } else {
        dispatch(failure("Record Required"));
      }
    };

    function request() {
      return { type: DriversConst.POST_SEND_LQ_REQUEST };
    }
    function success(items, page, count, fitness) {
      return {
        type: DriversConst.POST_SEND_LQ_SUCCESS,
        items,
        page,
        count,
        fitness,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_SEND_LQ_FAILURE, error };
    }
  },
  sendEH: (form, signature) => {
    return (dispatch, getState) => {
      dispatch(request());
      if (getState().drivers.pEmployer.EmployerName !== undefined) {
        if (signature !== null) {
          fetch("api/Drivers/saveEmploymentHistory", {
            method: "POST",
            body: form,
          })
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                var list = r.list;
                var fitness = r.fitness;
                dispatch(
                  success(list.Items, list.CurrentPage, list.NumberP, fitness)
                );
              } else {
                dispatch(failure(r.error));
              }
            })
            .catch((error) => {
              dispatch(failure("Error in the Server"));
            });
        } else {
          dispatch(failure("Driver's signature is Required"));
        }
      } else {
        dispatch(failure("Record Required"));
      }
    };

    function request() {
      return { type: DriversConst.POST_SEND_EH_REQUEST };
    }
    function success(items, page, count, fitness) {
      return {
        type: DriversConst.POST_SEND_EH_SUCCESS,
        items,
        page,
        count,
        fitness,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_SEND_EH_FAILURE, error };
    }
  },
  saveARD: (form, signature) => {
    return (dispatch, getState) => {
      dispatch(request());
      //var d = new Date().getTime(); var dd = new Date(getState().drivers.dmvDate).getTime(); (dd > d) &&
      if (
        getState().drivers.dmvDate !== null &&
        getState().drivers.companyInfo.DbaName !== undefined
      ) {
        if (signature !== null) {
          fetch("api/Drivers/saveAnnualReviewDMV", {
            method: "POST",
            body: form,
          })
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                var list = r.list;
                var fitness = r.fitness;
                dispatch(
                  success(list.Items, list.CurrentPage, list.NumberP, fitness)
                );
              } else {
                dispatch(failure(r.error));
              }
            })
            .catch((error) => {
              dispatch(failure("Error in the Server"));
            });
        } else {
          dispatch(failure("DER's signature is Required"));
        }
      } else {
        dispatch(
          failure("Dmv Record, SSN(if applicable) and Company Info Required")
        );
      }
    };

    function request() {
      return { type: DriversConst.POST_REVIEW_DMV_REQUEST };
    }
    function success(items, page, count, fitness) {
      return {
        type: DriversConst.POST_REVIEW_DMV_SUCCESS,
        items,
        page,
        count,
        fitness,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_REVIEW_DMV_FAILURE, error };
    }
  },
  saveV: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveViolation", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var list = r.list;
            dispatch(success(list.Items, list.CurrentPage, list.NumberP));
            document.forms["formV"].reset();
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_VIOLATION_REQUEST };
    }
    function success(items, page, count) {
      return {
        type: DriversConst.POST_VIOLATION_SUCCESS,
        items,
        page,
        count,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_VIOLATION_FAILURE, error };
    }
  },
  certificateV: (id, signatureD, signatureA) => {
    return (dispatch) => {
      dispatch(request());
      if (signatureD !== null && signatureA !== null) {
        fetch("api/Drivers/certificateViolation", {
          method: "POST",
          body: id,
        })
          .then((res) => res.json())
          .then((response) => {
            const r = JSON.parse(response);
            if (r.status === 0) {
              var list = r.VList;
              var listC = r.CList;
              var fitness = r.fitness;
              dispatch(
                success(
                  list.Items,
                  list.CurrentPage,
                  list.NumberP,
                  listC.Items,
                  listC.CurrentPage,
                  listC.NumberP,
                  fitness
                )
              );
            } else {
              dispatch(failure(r.error));
            }
          })
          .catch((error) => {
            dispatch(failure("Error in the Server"));
          });
      } else {
        dispatch(failure("The signature of the driver and Der are required"));
      }
    };

    function request() {
      return { type: DriversConst.POST_CVIOLATION_REQUEST };
    }
    function success(items, page, count, itemsC, pageC, countC, fitness) {
      return {
        type: DriversConst.POST_CVIOLATION_SUCCESS,
        items,
        page,
        count,
        itemsC,
        pageC,
        countC,
        fitness,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_CVIOLATION_FAILURE, error };
    }
  },
  saveRoadT: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/SaveRoadTest2", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var list = r.roadTestList;
            var fitness = r.fitness;
            dispatch(
              success(list.Items, list.CurrentPage, list.NumberP, fitness)
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
      return { type: DriversConst.POST_ROAD_TEST_REQUEST };
    }
    function success(items, page, count, fitness) {
      return {
        type: DriversConst.POST_ROAD_TEST_SUCCESS,
        items,
        page,
        count,
        fitness,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_ROAD_TEST_FAILURE, error };
    }
  },

  saveEmploymentApp: (form, signature) => {
    return (dispatch) => {
      dispatch(request());
      if (signature !== null) {
        fetch("api/Drivers/SaveEmploymentApplication", {
          method: "POST",
          body: form,
        })
          .then((res) => res.json())
          .then((response) => {
            const r = JSON.parse(response);
            if (r.status === 0) {
              var ea = r.employmentApplications;
              var fitness = r.fitness;
              dispatch(success(ea.Items, ea.CurrentPage, ea.NumberP, fitness));
            } else {
              dispatch(failure(r.error));
            }
          })
          .catch((error) => {
            dispatch(failure("Error in the Server"));
          });
      } else {
        dispatch(failure("Driver's signature is Required"));
      }
    };
    function request() {
      return { type: DriversConst.POST_EMPLOYMENT_APP_REQUEST };
    }
    function success(items, page, count, fitness) {
      return {
        type: DriversConst.POST_EMPLOYMENT_APP_SUCCESS,
        items,
        page,
        count,
        fitness,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_EMPLOYMENT_APP_FAILURE, error };
    }
  },
  saveInquiryAnswer: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveInquiryAnswer", {
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
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_INQUIRY_ANSWER_REQUEST };
    }
    function success() {
      return { type: DriversConst.POST_INQUIRY_ANSWER_SUCCESS };
    }
    function failure(error) {
      return { type: DriversConst.POST_INQUIRY_ANSWER_FAILURE, error };
    }
  },

  updateInquiryAnswer: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveInquiryAnswerUpdate", {
        method: "PUT",
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
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_INQUIRY_ANSWER_REQUEST };
    }
    function success() {
      return { type: DriversConst.POST_INQUIRY_ANSWER_SUCCESS };
    }
    function failure(error) {
      return { type: DriversConst.POST_INQUIRY_ANSWER_FAILURE, error };
    }
  },

  signaturePadIsEmpty: () => {
    return (dispatch) => {
      dispatch(failure("Empty Signature"));
    };
    function failure(error) {
      return { type: DriversConst.POST_INQUIRY_ANSWER_FAILURE, error };
    }
  },

  saveEHistoryAnswer: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveEHistoryAnswer", {
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
          dispatch(failure("Error in the Server"));
        });
    };
    function request() {
      return { type: DriversConst.POST_EHISTORY_ANSWER_REQUEST };
    }
    function success() {
      return { type: DriversConst.POST_EHISTORY_ANSWER_SUCCESS };
    }
    function failure(error) {
      return { type: DriversConst.POST_EHISTORY_ANSWER_FAILURE, error };
    }
  },

  /////////////////////////////////////
  saveLetterInAndEmployHis: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveLetterInAndEmployHis", {
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
          dispatch(failure("Error in the Server"));
        });
    };
    function request() {
      return { type: DriversConst.POST_LETTEREMPLOY_REQUEST };
    }
    function success() {
      return { type: DriversConst.POST_LETTEREMPLOY_SUCCESS };
    }
    function failure(error) {
      return { type: DriversConst.POST_LETTEREMPLOY_FAILURE, error };
    }
  },

  changePassword: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/changePassword", { method: "POST", body: form })
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
      return { type: DriversConst.POST_CHANGE_PASSWORD_REQUEST };
    }
    function success() {
      return { type: DriversConst.POST_CHANGE_PASSWORD_SUCCESS };
    }
    function failure(error) {
      return { type: DriversConst.POST_CHANGE_PASSWORD_FAILURE, error };
    }
  },
  toggleAd: (address) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalA;
      if (address !== null) {
        fetch(
          "api/AccountSet/getSAndC?idS=" +
          address.IdState +
          "&idC=" +
          address.IdCountry,
          { method: "GET" }
        )
          .then((res) => res.json())
          .then((response) => {
            const r = JSON.parse(response);
            if (r.status === 0) {
              dispatch(OpenClose(modal, address, r.states, r.cities));
            } else {
              dispatch(OpenClose(modal, address, [], []));
            }
          })
          .catch((error) => {
            dispatch(OpenClose(modal, address, [], []));
          });
      } else {
        dispatch(OpenClose(modal, {}, [], []));
      }
    };
    function OpenClose(modal, address, states, cities) {
      return {
        type: DriversConst.NEW_ADDRESS_TOGGLE,
        modal,
        address,
        states,
        cities,
      };
    }
  },
  toggleDE: (row) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalDE;
      if (row !== null) {
        dispatch(OpenClose(modal, row));
      } else {
        dispatch(OpenClose(modal, {}));
      }
    };
    function OpenClose(modal, drivingEx) {
      return {
        type: DriversConst.DRIVING_EXPERIENCE_TOGGLE,
        modal,
        drivingEx,
      };
    }
  },
  toggleAR: (row) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalAR;
      if (row !== null) {
        dispatch(OpenClose(modal, row));
      } else {
        dispatch(OpenClose(modal, {}));
      }
    };
    function OpenClose(modal, accidentR) {
      return {
        type: DriversConst.ACCIDENT_RECORD_TOGGLE,
        modal,
        accidentR,
      };
    }
  },
  toggleTC: (row) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalTC;
      if (row !== null) {
        dispatch(OpenClose(modal, row));
      } else {
        dispatch(OpenClose(modal, {}));
      }
    };
    function OpenClose(modal, trafficC) {
      return {
        type: DriversConst.TRAFFIC_CONVICTIONS_TOGGLE,
        modal,
        trafficC,
      };
    }
  },
  toggleNR: (row) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalNR;
      if (row !== null) {
        fetch("api/Drivers/getSAndC?id=" + row.State, { method: "GET" })
          .then((res) => res.json())
          .then((response) => {
            const r = JSON.parse(response);
            if (r.status === 0) {
              dispatch(OpenClose(modal, row, r.states, r.cities));
            } else {
              dispatch(OpenClose(modal, row, [], []));
            }
          })
          .catch((error) => {
            dispatch(OpenClose(modal, row, [], []));
          });
      } else {
        fetch("api/Drivers/getSAndC?id=" + 0, { method: "GET" })
          .then((res) => res.json())
          .then((response) => {
            const r = JSON.parse(response);
            if (r.status === 0) {
              dispatch(OpenClose(modal, {}, r.states, r.cities));
            } else {
              dispatch(OpenClose(modal, {}, [], []));
            }
          })
          .catch((error) => {
            dispatch(OpenClose(modal, {}, [], []));
          });
      }
    };
    function OpenClose(modal, record, states, cities) {
      return {
        type: DriversConst.NEW_RECORDS_TOGGLE,
        modal,
        record,
        states,
        cities,
      };
    }
  },
  toggleDMV: (id) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalDMV;
      if (modal) {
        if (id !== null) {
          fetch(
            "api/Drivers/getDMVRList?id=" + id + "&page=" + 1 + "&size=" + 3,
            { method: "GET" }
          )
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                const dmvR = r.dmvR;
                const epnL = r.epnL;
                dispatch(
                  OpenClose(
                    modal,
                    dmvR.Items,
                    dmvR.CurrentPage,
                    dmvR.NumberP,
                    epnL.Items,
                    epnL.CurrentPage,
                    epnL.NumberP
                  )
                );
              } else {
                dispatch(OpenClose(modal, [], 0, 0, [], 0, 0));
              }
            })
            .catch((error) => {
              dispatch(OpenClose(modal, [], 0, 0, [], 0, 0));
            });
        } else {
          dispatch(OpenClose(modal, [], 0, 0, [], 0, 0));
        }
      } else {
        dispatch(OpenClose(modal, [], 0, 0, [], 0, 0));
      }
    };
    function OpenClose(
      modal,
      dmvList,
      page,
      count,
      epnList,
      pageEPN,
      countEPN
    ) {
      return {
        type: DriversConst.DMV_RECORD_TOGGLE,
        modal,
        dmvList,
        page,
        count,
        epnList,
        pageEPN,
        countEPN,
      };
    }
  },
  toggleEA: (id, idc) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalEA;
      if (modal) {
        if (id !== null) {
          fetch("api/Drivers/getDataCompanyC?id=" + id + "&idc=" + idc, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                var ea = r.employmentApplications;
                dispatch(
                  OpenClose(modal, ea.Items, ea.CurrentPage, ea.NumberP)
                );
              } else {
                dispatch(OpenClose(modal, [], 0, 0));
              }
            })
            .catch((error) => {
              dispatch(OpenClose(modal, [], 0, 0));
            });
        } else {
          dispatch(OpenClose(modal, [], 0, 0));
        }
      } else {
        dispatch(OpenClose(modal, [], 0, 0));
      }
    };
    function OpenClose(modal, items, page, count) {
      return {
        type: DriversConst.EMPLOYMENT_APP_TOGGLE,
        modal,
        items,
        page,
        count,
      };
    }
  },
  toggleLI: (id) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalLI;
      if (modal) {
        if (id !== null) {
          fetch("api/Drivers/getDataPEmployer?id=" + id, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                const e = r.pEmployer;
                var list = r.list;
                dispatch(
                  OpenClose(
                    modal,
                    e,
                    list.Items,
                    list.CurrentPage,
                    list.NumberP
                  )
                );
              } else {
                dispatch(OpenClose(modal, {}, [], 0, 0));
              }
            })
            .catch((error) => {
              dispatch(OpenClose(modal, {}, [], 0, 0));
            });
        } else {
          dispatch(OpenClose(modal, {}, [], 0, 0));
        }
      } else {
        dispatch(OpenClose(modal, {}, [], 0, 0));
      }
    };
    function OpenClose(modal, e, items, page, count) {
      return {
        type: DriversConst.LETTER_INQUIRY_TOGGLE,
        modal,
        e,
        items,
        page,
        count,
      };
    }
  },
  toggleLIandEH: (id) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalEH;
      if (modal) {
        if (id !== null) {
          fetch("api/Drivers/getDataPEmployerLIEH?id=" + id, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                const e = r.pEmployer;
                var list = r.list;
                dispatch(
                  OpenClose(
                    modal,
                    e,
                    list.Items,
                    list.CurrentPage,
                    list.NumberP
                  )
                );
              } else {
                dispatch(OpenClose(modal, {}, [], 0, 0));
              }
            })
            .catch((error) => {
              dispatch(OpenClose(modal, {}, [], 0, 0));
            });
        } else {
          dispatch(OpenClose(modal, {}, [], 0, 0));
        }
      } else {
        dispatch(OpenClose(modal, {}, [], 0, 0));
      }
    };
    function OpenClose(modal, e, items, page, count) {
      return {
        type: DriversConst.LETTER_INQUIRY_AND_EMPLOYER_HISTORY_TOGGLE,
        modal,
        e,
        items,
        page,
        count,
      };
    }
  },
  toggleLIDashboard: (id) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalLIDashboard;
      if (modal) {
        if (id !== null) {
          fetch("api/Drivers/getDataPEmployer?id=" + id, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                const e = r.pEmployer;
                var list = r.list;
                dispatch(
                  OpenClose(
                    modal,
                    e,
                    list.Items,
                    list.CurrentPage,
                    list.NumberP
                  )
                );
              } else {
                dispatch(OpenClose(modal, {}, [], 0, 0));
              }
            })
            .catch((error) => {
              dispatch(OpenClose(modal, {}, [], 0, 0));
            });
        } else {
          dispatch(OpenClose(modal, {}, [], 0, 0));
        }
      } else {
        dispatch(OpenClose(modal, {}, [], 0, 0));
      }
    };
    function OpenClose(modal, e, items, page, count) {
      return {
        type: DriversConst.LETTER_INQUIRY_TOGGLE_DASHBOARD,
        modal,
        e,
        items,
        page,
        count,
      };
    }
  },

  toggleEH: (id) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalEH;
      if (modal) {
        if (id !== null) {
          fetch("api/Drivers/getDataPEmployerEH?id=" + id, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                var e = r.pEmployer;
                var list = r.list;
                dispatch(
                  OpenClose(
                    modal,
                    e,
                    list.Items,
                    list.CurrentPage,
                    list.NumberP
                  )
                );
              } else {
                dispatch(OpenClose(modal, {}, [], 0, 0));
              }
            })
            .catch((error) => {
              dispatch(OpenClose(modal, {}, [], 0, 0));
            });
        } else {
          dispatch(OpenClose(modal, {}, [], 0, 0));
        }
      } else {
        dispatch(OpenClose(modal, {}, [], 0, 0));
      }
    };
    function OpenClose(modal, e, items, page, count) {
      return {
        type: DriversConst.EMPLOYMENT_HISTORY_TOGGLE,
        modal,
        e,
        items,
        page,
        count,
      };
    }
  },
  toggleRD: (id, idLoggedUser, idCompany) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalRD;
      if (modal) {
        if (id !== null) {
          fetch(
            "api/Drivers/getAnnualReviewDMVList?id=" +
            id +
            "&page=" +
            1 +
            "&size=" +
            3 +
            "&idLoggedUser=" +
            idLoggedUser +
            "&idCompany=" +
            idCompany,
            { method: "GET" }
          )
            .then((res) => res.json())
            .then((response) => {
              var dmv = null;
              var f = null;
              const r = JSON.parse(response);
              if (r.status === 0) {
                var list = r.ARDList;
                dmv = r.dmv;
                f = null;
                if (dmv !== null) {
                  f = dmv.DmvExp;
                }
                dispatch(
                  OpenClose(
                    modal,
                    list.Items,
                    list.CurrentPage,
                    list.NumberP,
                    f
                  )
                );
              } else if (r.status === 1) {
                dmv = r.dmv;
                f = null;
                if (dmv !== null) {
                  f = dmv.DmvExp;
                }
                dispatch(OpenClose(modal, [], 0, 0, f));
              } else {
                dispatch(OpenClose(modal, [], 0, 0, null));
              }
            })
            .catch((error) => {
              dispatch(OpenClose(modal, [], 0, 0, null));
            });
        } else {
          dispatch(OpenClose(modal, [], 0, 0, null));
        }
      } else {
        dispatch(OpenClose(modal, [], 0, 0, null));
      }
    };
    function OpenClose(modal, items, page, count, f) {
      return {
        type: DriversConst.REVIEW_DMV_TOGGLE,
        modal,
        items,
        page,
        count,
        f,
      };
    }
  },
  toggleCV: (id) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalCV;
      if (modal) {
        if (id !== null) {
          fetch("api/Drivers/getVAndClist?id=" + id, { method: "GET" })
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                var list = r.VList;
                var listC = r.CList;
                dispatch(
                  OpenClose(
                    modal,
                    list.Items,
                    list.CurrentPage,
                    list.NumberP,
                    listC.Items,
                    listC.CurrentPage,
                    listC.NumberP
                  )
                );
              } else {
                dispatch(OpenClose(modal, [], 0, 0, [], 0, 0));
              }
            })
            .catch((error) => {
              dispatch(OpenClose(modal, [], 0, 0, [], 0, 0));
            });
        } else {
          dispatch(OpenClose(modal, [], 0, 0, [], 0, 0));
        }
      } else {
        dispatch(OpenClose(modal, [], 0, 0, [], 0, 0));
      }
    };
    function OpenClose(modal, items, page, count, itemsC, pageC, countC) {
      return {
        type: DriversConst.CERTIFICATION_VIOLATIONS_TOGGLE,
        modal,
        items,
        page,
        count,
        itemsC,
        pageC,
        countC,
      };
    }
  },
  toggleMC: (id) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalMC;
      if (modal) {
        if (id !== null) {
          fetch(
            "api/Drivers/getMedicalCertificates?id=" +
            id +
            "&page=" +
            1 +
            "&size=" +
            3,
            { method: "GET" }
          )
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                const list = r.medicalC;
                dispatch(
                  OpenClose(modal, list.Items, list.CurrentPage, list.NumberP)
                );
              } else {
                dispatch(OpenClose(modal, [], 0, 0));
              }
            })
            .catch((error) => {
              dispatch(OpenClose(modal, [], 0, 0));
            });
        } else {
          dispatch(OpenClose(modal, [], 0, 0));
        }
      } else {
        dispatch(OpenClose(modal, [], 0, 0));
      }
    };
    function OpenClose(modal, items, page, count) {
      return {
        type: DriversConst.MEDICAL_CERTIFICATE_TOGGLE,
        modal,
        items,
        page,
        count,
      };
    }
  },
  toggleROT: (id, idS, idc, idLoggedUser) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalROT;
      if (modal) {
        if (id !== null) {
          fetch(
            "api/Drivers/getRoadTestData?id=" +
            id +
            "&idS=" +
            idS +
            "&idc=" +
            idc +
            "&idLoggedUser=" +
            idLoggedUser,
            { method: "GET" }
          )
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                var data = r.roadTData;
                var states = r.states;
                var list = r.roadTestList;
                dispatch(
                  OpenClose(
                    modal,
                    data,
                    states,
                    list.Items,
                    list.CurrentPage,
                    list.NumberP
                  )
                );
              } else {
                dispatch(OpenClose(modal, {}, [], [], 0, 0));
              }
            })
            .catch((error) => {
              dispatch(OpenClose(modal, {}, [], [], 0, 0));
            });
        } else {
          dispatch(OpenClose(modal, {}, [], [], 0, 0));
        }
      } else {
        dispatch(OpenClose(modal, {}, [], [], 0, 0));
      }
    };
    function OpenClose(modal, data, states, items, page, count) {
      return {
        type: DriversConst.ROAD_TEST_TOGGLE,
        modal,
        data,
        states,
        items,
        page,
        count,
      };
    }
  },
  toggleME: (id) => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalME;
      if (modal) {
        if (id !== null) {
          fetch("api/Drivers/getDataME?id=" + id, { method: "GET" })
            .then((res) => res.json())
            .then((response) => {
              const r = JSON.parse(response);
              if (r.status === 0) {
                const list = r.data;
                dispatch(OpenClose(modal, list));
              } else {
                dispatch(OpenClose(modal, []));
              }
            })
            .catch((error) => {
              dispatch(OpenClose(modal, []));
            });
        } else {
          dispatch(OpenClose(modal, []));
        }
      } else {
        dispatch(OpenClose(modal, []));
      }
    };
    function OpenClose(modal, data) {
      return { type: DriversConst.MULTI_EMP_TOGGLE, modal, data };
    }
  },
  toggleCP: () => {
    return (dispatch, getState) => {
      const modal = !getState().drivers.modalCP;
      dispatch(OpenClose(modal));
    };
    function OpenClose(modal) {
      return { type: DriversConst.CHANGE_PASSWORD_TOGGLE, modal };
    }
  },

  toggleD1: (id) => {
    return (dispatch, getState) => {
      var modalD1 = !getState().drivers.modalD1;
      var idD = 0;
      if (modalD1) {
        idD = id;
      }
      dispatch(OpenClose(modalD1, idD));
    };
    function OpenClose(modalD1, idD) {
      return {
        type: DriversConst.DELETE_DRIVER_CARD_TOGGLE,
        modalD1,
        idD,
      };
    }
  },
  addCard: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/addCard", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const card = r.card;
            dispatch(success(card));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.POST_ADD_DRIVER_CARD_REQUEST };
    }
    function success(card) {
      return { type: DriversConst.POST_ADD_DRIVER_CARD_SUCCESS, card };
    }
    function failure(error) {
      return { type: DriversConst.POST_ADD_DRIVER_CARD_FAILURE, error };
    }
  },
  getCards: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getCards?id=" + id + "&page=" + page + "&size=" + size,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const card = r.card;
            dispatch(success(card));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_DRIVER_CARDS_REQUEST };
    }
    function success(card) {
      return { type: DriversConst.GET_DRIVER_CARDS_SUCCESS, card };
    }
    function failure(error) {
      return { type: DriversConst.GET_DRIVER_CARDS_FAILURE, error };
    }
  },
  statusUpdate: (idc, idd) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/statusUpdate?idc=" + idc + "&idd=" + idd, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const card = r.card;
            dispatch(success(card));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_DRIVER_CARDS_REQUEST };
    }
    function success(card) {
      return { type: DriversConst.GET_DRIVER_CARDS_SUCCESS, card };
    }
    function failure(error) {
      return { type: DriversConst.GET_DRIVER_CARDS_FAILURE, error };
    }
  },
  deleteCard: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/deleteCard?id=" + id, { method: "DELETE" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const card = r.card;
            dispatch(success(card));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.DELETE_DRIVER_CARD_REQUEST };
    }
    function success(card) {
      return { type: DriversConst.DELETE_DRIVER_CARD_SUCCESS, card };
    }
    function failure(error) {
      return { type: DriversConst.DELETE_DRIVER_CARD_FAILURE, error };
    }
  },

  getAddress: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getAddress?id=" + id + "&page=" + page + "&size=" + size,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const address = r.address;
            dispatch(success(address));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_LIST_ADDRESS_REQUEST };
    }
    function success(address) {
      return { type: DriversConst.GET_LIST_ADDRESS_SUCCESS, address };
    }
    function failure(error) {
      return { type: DriversConst.GET_LIST_ADDRESS_FAILURE, error };
    }
  },
  getDrivingExp: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getDrivingExp?id=" +
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
            const drivingExp = r.drivingExp;
            dispatch(success(drivingExp));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_LIST_DRIVINGEXP_REQUEST };
    }
    function success(drivingExp) {
      return {
        type: DriversConst.GET_LIST_DRIVINGEXP_SUCCESS,
        drivingExp,
      };
    }
    function failure(error) {
      return { type: DriversConst.GET_LIST_DRIVINGEXP_FAILURE, error };
    }
  },
  getAccidentRec: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getAccidentRec?id=" +
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
            const accidentRec = r.accidentRec;
            dispatch(success(accidentRec));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_LIST_ACCIDENTREC_REQUEST };
    }
    function success(accidentRec) {
      return {
        type: DriversConst.GET_LIST_ACCIDENTREC_SUCCESS,
        accidentRec,
      };
    }
    function failure(error) {
      return { type: DriversConst.GET_LIST_ACCIDENTREC_FAILURE, error };
    }
  },
  getTrafficConv: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getTrafficConv?id=" +
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
            const trafficConv = r.trafficConv;
            dispatch(success(trafficConv));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_LIST_TRAFFICCONV_REQUEST };
    }
    function success(trafficConv) {
      return {
        type: DriversConst.GET_LIST_TRAFFICCONV_SUCCESS,
        trafficConv,
      };
    }
    function failure(error) {
      return { type: DriversConst.GET_LIST_TRAFFICCONV_FAILURE, error };
    }
  },
  getEmploymentR: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getEmploymentR?id=" +
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
            const employmentR = r.employmentR;
            dispatch(success(employmentR));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_LIST_EMPLOYMENTR_REQUEST };
    }
    function success(employmentR) {
      return {
        type: DriversConst.GET_LIST_EMPLOYMENTR_SUCCESS,
        employmentR,
      };
    }
    function failure(error) {
      return { type: DriversConst.GET_LIST_EMPLOYMENTR_FAILURE, error };
    }
  },
  getDMVRList: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getDMVRList?id=" + id + "&page=" + page + "&size=" + size,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const dmvR = r.dmvR;
            dispatch(success(dmvR));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_LIST_DMVR_REQUEST };
    }
    function success(dmvR) {
      return { type: DriversConst.GET_LIST_DMVR_SUCCESS, dmvR };
    }
    function failure(error) {
      return { type: DriversConst.GET_LIST_DMVR_FAILURE, error };
    }
  },
  deleteDMVRecord: (idUser, idDmv, idCompany, fileName) => {
    return (dispatch) => {
      dispatch(request());

      fetch(
        "api/Drivers/DeleteDmvRecord?idUser=" +
        idUser +
        "&idDmv=" +
        idDmv +
        "&idCompany=" +
        idCompany +
        "&fileName=" +
        fileName,
        { method: "POST" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const dmvL = r.dmvL;
            const alertsCount = r.alertsCount;
            const alerts = r.alerts;
            var fitness = r.fitness;
            dispatch(success(dmvL, alerts, alertsCount, fitness));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.DELETE_DMV_RECORD_REQUEST };
    }

    function success(dmvL, alerts, alertsCount, fitness) {
      return {
        type: DriversConst.DELETE_DMV_RECORD_SUCCESS,
        dmvL,
        alerts,
        alertsCount,
        fitness,
      };
    }

    function failure(error) {
      return { type: DriversConst.DELETE_DMV_RECORD_FAILURE, error };
    }
  },
  getEPNList: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getEPNList?id=" + id + "&page=" + page + "&size=" + size,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const epnL = r.epnL;
            dispatch(success(epnL));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_EMPLOYER_PULL_NOTICE_REQUEST };
    }
    function success(epnL) {
      return {
        type: DriversConst.GET_EMPLOYER_PULL_NOTICE_SUCCESS,
        epnL,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.GET_EMPLOYER_PULL_NOTICE_FAILURE,
        error,
      };
    }
  },
  deleteEpnRecord: (idUser, idDmv, idCompany, fileName) => {
    return (dispatch) => {
      dispatch(request());

      fetch(
        "api/Drivers/DeleteEpnRecord?idUser=" +
        idUser +
        "&idEpn=" +
        idDmv +
        "&idCompany=" +
        idCompany +
        "&fileName=" +
        fileName,
        { method: "POST" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const epnL = r.epnL;
            dispatch(success(epnL));
          } else {
            dispatch(failure(r.error));
          }
        });
    };

    function request() {
      return { type: DriversConst.DELETE_EPN_RECORD_REQUEST };
    }

    function success(epnL) {
      return {
        type: DriversConst.DELETE_EPN_RECORD_SUCCESS,
        epnL,
      };
    }

    function failure(error) {
      return {
        type: DriversConst.DELETE_EPN_RECORD_FAILURE,
        error,
      };
    }
  },
  getLQList: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getLetterofInquiry?id=" +
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
            const lQ = r.lQ;
            dispatch(success(lQ));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_LIST_LQ_REQUEST };
    }
    function success(lQ) {
      return { type: DriversConst.GET_LIST_LQ_SUCCESS, lQ };
    }
    function failure(error) {
      return { type: DriversConst.GET_LIST_LQ_FAILURE, error };
    }
  },
  ///////////////////////////////////////////////////////////
  getLetterInAndEmployHis: (id, IdEmploymentRecord) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/getLetterInAndEmployHis?id=" + id +
        "&IdEmploymentRecord=" +
        IdEmploymentRecord, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            // const lQ = r.lQ;
            const lQeH = r.lQeH;
            dispatch(success(lQeH));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };
    function request() {
      return { type: DriversConst.GET_LQEH_REQUEST };
    }
    function success(lQeH) {
      return { type: DriversConst.GET_LQEH_SUCCESS, lQeH };
    }
    function failure(error) {
      return { type: DriversConst.GET_LQEH_FAILURE, error };
    }
  },


  getLetterofInquiry: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/getOneLetterofInquiry?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const lQ = r.lQ;
            dispatch(success(lQ));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_LETTERINQUIRY_REQUEST };
    }
    function success(lQ) {
      return { type: DriversConst.GET_LETTERINQUIRY_SUCCESS, lQ };
    }
    function failure(error) {
      return { type: DriversConst.GET_LETTERINQUIRY_FAILURE, error };
    }
  },
  getOneEmploymentHistory: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/getOneEmploymentHistory?id=" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const eh = r.eh;
            dispatch(success(eh));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_HISTORYEMPLOYER_REQUEST };
    }
    function success(eh) {
      return { type: DriversConst.GET_HISTORYEMPLOYER_SUCCESS, eh };
    }
    function failure(error) {
      return { type: DriversConst.GET_HISTORYEMPLOYER_FAILURE, error };
    }
  },
  getEHList: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getEmploymentHistoryList?id=" +
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
            const EH = r.EH;
            dispatch(success(EH));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_LIST_EH_REQUEST };
    }
    function success(EH) {
      return { type: DriversConst.GET_LIST_EH_SUCCESS, EH };
    }
    function failure(error) {
      return { type: DriversConst.GET_LIST_EH_FAILURE, error };
    }
  },
  getRDList: (id, page, size, idLoggedUser, idCompany) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getAnnualReviewDMVList?id=" +
        id +
        "&page=" +
        page +
        "&size=" +
        size +
        "&idLoggedUser=" +
        idLoggedUser +
        "&idCompany=" +
        idCompany,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const ARDList = r.ARDList;
            dispatch(success(ARDList));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_LIST_RD_REQUEST };
    }
    function success(ARDList) {
      return { type: DriversConst.GET_LIST_RD_SUCCESS, ARDList };
    }
    function failure(error) {
      return { type: DriversConst.GET_LIST_RD_FAILURE, error };
    }
  },
  getVList: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getViolationsList?id=" +
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
            const VList = r.VList;
            dispatch(success(VList));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_VIOLATIONS_REQUEST };
    }
    function success(VList) {
      return { type: DriversConst.GET_VIOLATIONS_SUCCESS, VList };
    }
    function failure(error) {
      return { type: DriversConst.GET_VIOLATIONS_FAILURE, error };
    }
  },
  getCVList: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getCertificationsList?id=" +
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
            const CVList = r.CVList;
            dispatch(success(CVList));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_CERTIFICATIONS_REQUEST };
    }
    function success(CVList) {
      return { type: DriversConst.GET_CERTIFICATIONS_SUCCESS, CVList };
    }
    function failure(error) {
      return { type: DriversConst.GET_CERTIFICATIONS_FAILURE, error };
    }
  },
  getPEList: (id, pageD, sizeD, pageA, sizeA) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getDrugAlcoholTestList?id=" +
        id +
        "&pageD=" +
        pageD +
        "&sizeD=" +
        sizeD +
        "&pageA=" +
        pageA +
        "&sizeA=" +
        sizeA,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drugTest = r.drugTest;
            const alcoholTest = r.alcoholTest;
            dispatch(success(drugTest, alcoholTest));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_LIST_DRUG_ALCOHOL_TEST_REQUEST };
    }
    function success(drugTest, alcoholTest) {
      return {
        type: DriversConst.GET_LIST_DRUG_ALCOHOL_TEST_SUCCESS,
        drugTest,
        alcoholTest,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.GET_LIST_DRUG_ALCOHOL_TEST_FAILURE,
        error,
      };
    }
  },
  getMCList: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getMedicalCertificates?id=" +
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
            const medicalC = r.medicalC;
            dispatch(success(medicalC));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_LIST_MEDICAL_CERTIFICATE_REQUEST };
    }
    function success(list) {
      return {
        type: DriversConst.GET_LIST_MEDICAL_CERTIFICATE_SUCCESS,
        list,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.GET_LIST_MEDICAL_CERTIFICATE_FAILURE,
        error,
      };
    }
  },
  getDriverFitness: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/getDriverFitness?id=" + id, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const fitness = r.fitness;

            dispatch(success(fitness));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_DRIVER_FITNESS_REQUEST };
    }
    function success(list) {
      return { type: DriversConst.GET_DRIVER_FITNESS_SUCCESS, list };
    }
    function failure(error) {
      return { type: DriversConst.GET_DRIVER_FITNESS_FAILURE, error };
    }
  },
  getRoadTestList: (id, page, size, idc, idLoggedUser) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getRoadTestList?id=" +
        id +
        "&page=" +
        page +
        "&size=" +
        size +
        "&idc=" +
        idc +
        "&idLoggedUser=",
        idLoggedUser,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var list = r.roadTestList;
            dispatch(success(list.Items, list.CurrentPage, list.NumberP));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_ROADTEST_REQUEST };
    }
    function success(items, page, count) {
      return {
        type: DriversConst.GET_ROADTEST_SUCCESS,
        items,
        page,
        count,
      };
    }
    function failure(error) {
      return { type: DriversConst.GET_ROADTEST_FAILURE, error };
    }
  },
  getEmploymentApplications: (id, idc, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getEmploymentApplications?id=" +
        id +
        "&page=" +
        page +
        "&size=" +
        size +
        "&idc=" +
        idc,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var list = r.employmentApplications;
            dispatch(success(list.Items, list.CurrentPage, list.NumberP));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.GET_EMPLOYMENT_APP_REQUEST };
    }
    function success(items, page, count) {
      return {
        type: DriversConst.GET_EMPLOYMENT_APP_SUCCESS,
        items,
        page,
        count,
      };
    }
    function failure(error) {
      return { type: DriversConst.GET_EMPLOYMENT_APP_FAILURE, error };
    }
  },

  toggleD: (id, driverId, docType, fileName) => {
    return (dispatch, getState) => {
      var modalD = !getState().drivers.modalD;
      var idD = 0;
      var driverID = 0;
      var dType = "";
      var fName = "";
      if (modalD) {
        var modalResponse = {
          idD: id,
          driverID: driverId,
          dType: docType,
          fName: fileName,
        };
        dispatch(
          OpenClose(
            modalD,
            modalResponse.idD,
            modalResponse.driverID,
            modalResponse.dType,
            modalResponse.fName
          )
        );
      }
    };
    function OpenClose(modalD, idD, driverID, dType, fName) {
      return {
        type: DriversConst.DELETE_DRIVER_DOCUMENT_TOGGLE,
        modalD,
        idD,
        driverID,
        dType,
        fName,
      };
    }
  },
  saveDoc: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveDoc", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docs = r.docs;
            const doc = r.doc;
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
      return { type: DriversConst.POST_SAVE_DRIVER_DOCUMENT_REQUEST };
    }
    function success(docs, doc) {
      return {
        type: DriversConst.POST_SAVE_DRIVER_DOCUMENT_SUCCESS,
        docs,
        doc,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.POST_SAVE_DRIVER_DOCUMENT_FAILURE,
        error,
      };
    }
  },
  getDocuments: (id, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/getDocuments?id=" + id + "&page=" + page + "&size=" + size,
        { method: "GET" }
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
      return { type: DriversConst.GET_ALL_DRIVER_DOCUMENTS_REQUEST };
    }
    function success(docs) {
      return {
        type: DriversConst.GET_ALL_DRIVER_DOCUMENTS_SUCCESS,
        docs,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.GET_ALL_DRIVER_DOCUMENTS_FAILURE,
        error,
      };
    }
  },
  deleteDoc: (id, driverId, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/deleteDoc?id=" +
        id +
        "&idCompany=" +
        JSON.parse(localStorage.getItem("idCompany")) +
        "&driverId=" +
        driverId +
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
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.DELETE_DRIVER_DOCUMENT_REQUEST };
    }
    function success(docs) {
      return { type: DriversConst.DELETE_DRIVER_DOCUMENT_SUCCESS, docs };
    }
    function failure(error) {
      return {
        type: DriversConst.DELETE_DRIVER_DOCUMENT_FAILURE,
        error,
      };
    }
  },
  deleteDocDAComplianceDrug: (id, driverId, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/deleteDrugAlcoholCompliance?id=" +
        id +
        "&idCompany=" +
        JSON.parse(localStorage.getItem("idCompany")) +
        "&driverId=" +
        driverId +
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
            const DrugList = r.drugTest;
            dispatch(success(DrugList));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.DELETE_DRIVER_COMPLIANCEDRUG_REQUEST };
    }
    function success(DrugList) {
      return {
        type: DriversConst.DELETE_DRIVER_COMPLIANCEDRUG_SUCCESS,
        DrugList,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.DELETE_DRIVER_COMPLIANCEDRUG_FAILURE,
        error,
      };
    }
  },
  deleteDocDAComplianceAlcohol: (id, driverId, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/deleteDrugAlcoholCompliance?id=" +
        id +
        "&idCompany=" +
        JSON.parse(localStorage.getItem("idCompany")) +
        "&driverId=" +
        driverId +
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
            const AlcoholList = r.alcoholTest;
            dispatch(success(AlcoholList));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DriversConst.DELETE_DRIVER_COMPLIANCEALCOHOL_REQUEST };
    }
    function success(AlcoholList) {
      return {
        type: DriversConst.DELETE_DRIVER_COMPLIANCEALCOHOL_SUCCESS,
        AlcoholList,
      };
    }
    function failure(error) {
      return {
        type: DriversConst.DELETE_DRIVER_COMPLIANCEALCOHOL_FAILURE,
        error,
      };
    }
  },
  downloadDoc: (idd, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/downloadDocument?idd=" +
        idd +
        "&idCompany=" +
        JSON.parse(localStorage.getItem("idCompany")) +
        "&docType=" +
        docType +
        "&fileName=" +
        fileName,
        { method: "GET" }
      )
        .then((response) => {
          response.blob().then((myblob) => {
            if (myblob !== null) {
              if (docType !== "") {
                FileDownload(myblob, fileName);
              } else {
                FileDownload(myblob, "error.png");
              }
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
      return { type: DriversConst.DOWNLOAD_DOCUMENT_DRIVER_REQUEST };
    }
    function success() {
      return { type: DriversConst.DOWNLOAD_DOCUMENT_DRIVER_SUCCESS };
    }
    function failure(error) {
      return {
        type: DriversConst.DOWNLOAD_DOCUMENT_DRIVER_FAILURE,
        error,
      };
    }
  },

  toggleA: () => {
    return (dispatch, getState) => {
      const modalDA = !getState().drivers.modalDA;
      dispatch(OpenClose(modalDA));
    };
    function OpenClose(modalDA) {
      return { type: DriversConst.OPEN_DRIVER_ALERTS_TOGGLE, modalDA };
    }
  },

  getAlerts: (id) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/getAlerts?id=" + id, { method: "GET" })
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
      return { type: DriversConst.GET_DRIVER_ALERTS_REQUEST };
    }
    function success(alertsCount, alerts) {
      return {
        type: DriversConst.GET_DRIVER_ALERTS_SUCCESS,
        alertsCount,
        alerts,
      };
    }
    function failure(error) {
      return { type: DriversConst.GET_DRIVER_ALERTS_FAILURE, error };
    }
  },
  sendLetterOfInquiry: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/sendLetterOfInquiry", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          var r = JSON.parse(response);
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
      return { type: DriversConst.SEND_LETTER_OF_INQUIRY_REQUEST };
    }
    function success() {
      return { type: DriversConst.SEND_LETTER_OF_INQUIRY_SUCCESS };
    }
    function failure(error) {
      return {
        type: DriversConst.SEND_LETTER_OF_INQUIRY_FAILURE,
        error,
      };
    }
  },
  saveDriverLogo: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/Drivers/saveDriverLogo", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const driver = r.driver;
            dispatch(success(driver));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: DriversConst.POST_DATA_USER_REQUEST };
    }
    function success(driver) {
      return {
        type: DriversConst.POST_DATA_USER_SUCCESS,
        driver,
      };
    }
    function failure(error) {
      return { type: DriversConst.POST_DATA_USER_FAILURE, error };
    }
  },
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case DriversConst.TOGGLE_TOAST_ALERT:
      return { ...state, toastAlertState: action.toastAlert };

    case DriversConst.CLEAN_MESSAGE:
      return { ...state, message: "" };
    /*
        case DriversConst.GET_NOTIFICATIONS_REQUEST:
            return { ...state, isLoading: true };

        case DriversConst.GET_NOTIFICATIONS_SUCCESS:
            return { ...state, isLoading: false, notifications: action.notifications, error: '', message: '' };

        case DriversConst.GET_NOTIFICATIONS_FAILURE:
            return { ...state, isLoading: false, error: action.error, message: '',toastAlertState: true  };

        case DriversConst.SAVE_NOTIFICATIONS_REQUEST:
            return { ...state, isLoading: true };

        case DriversConst.SAVE_NOTIFICATIONS_SUCCESS:
            return { ...state, isLoading: false, notifications: action.notifications, alertsCount: action.alertsCount, alerts: action.alerts, error: '',toastAlertState: true, message: "The Notification has been saved" };

        case DriversConst.SAVE_NOTIFICATIONS_FAILURE:
            return { ...state, isLoading: false, error: action.error, message: '',toastAlertState: true  };
            */
    case DriversConst.CLEAN:
      return {
        ...state,
        error: "",
        message: "",
        notifications: {},
        driver: {},
        addresses: [],
        pageA: 0,
        countA: 0,
        drivingExList: [],
        pageDE: 0,
        countDE: 0,
        pageAR: 0,
        countAR: 0,
        accidentRecList: [],
        pageTC: 0,
        countTC: 0,
        trafficCList: [],
        pageER: 0,
        countER: 0,
        employmentRList: [],
        signature: "",
        signatureEmployer: "",
        companyInfo: {},
        docs: [],
        alert: [],
        alerts: [],
        fitness: [],
        modalLI: false,
        modalEH: false,
        modalLIDashboard: false,
      };

    case DriversConst.GET_DATA_DRIVER_REQUEST:
      return {
        ...state,
        isLoading: true,
        messageS: "",
        errorS: "",
        error: "",
        message: "",
      };

    case DriversConst.GET_DATA_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        driver: action.driver.driver,
        States: action.driver.States,
        Countries: action.driver.Countries,
        signature: action.driver.driver.FileSignature,
        companyInfo: action.company,
      };

    case DriversConst.GET_DATA_DRIVER_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DriversConst.POST_DATA_DRIVER_REQUEST:
      return { ...state, isLoading: true, error: "", message: "" };

    case DriversConst.POST_DATA_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "Driver information successfully saved",
        toastAlertState: true,
        driver: action.driver,
        alertsCount: action.alertsCount,
        alerts: action.alerts,
      };

    case DriversConst.POST_DATA_DRIVER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case DriversConst.NEW_ADDRESS_TOGGLE:
      return {
        ...state,
        modalA: action.modal,
        address: action.address,
        StatesM: action.states,
        Cities: action.cities,
        errorM: "",
      };

    case DriversConst.DRIVING_EXPERIENCE_TOGGLE:
      return {
        ...state,
        modalDE: action.modal,
        drivingEx: action.drivingEx,
        errorM: "",
      };

    case DriversConst.ACCIDENT_RECORD_TOGGLE:
      return {
        ...state,
        modalAR: action.modal,
        accidentR: action.accidentR,
        errorM: "",
      };

    case DriversConst.TRAFFIC_CONVICTIONS_TOGGLE:
      return {
        ...state,
        modalTC: action.modal,
        trafficC: action.trafficC,
        errorM: "",
      };

    case DriversConst.DMV_RECORD_TOGGLE:
      return {
        ...state,
        modalDMV: action.modal,
        errorM: "",
        DMVList: action.dmvList,
        pageDMV: action.page,
        countDMV: action.count,
        employerPullNotice: action.epnList,
        pagePullNotice: action.pageEPN,
        countPullNotice: action.countEPN,
      };

    case DriversConst.EMPLOYMENT_APP_TOGGLE:
      return {
        ...state,
        modalEA: action.modal,
        errorM: "",
        eAList: action.items,
        pageEA: action.page,
        countEA: action.count,
      };

    case DriversConst.LETTER_INQUIRY_TOGGLE:
      return {
        ...state,
        modalLI: action.modal,
        errorM: "",
        pEmployer: action.e,
        LQList: action.items,
        pageLQ: action.page,
        countLQ: action.count,
      }; //Falta de pasar

    case DriversConst.LETTER_INQUIRY_AND_EMPLOYER_HISTORY_TOGGLE:
      return {
        ...state,
        modalEH: action.modal,
        errorM: "",
        pEmployer: action.e,
        LQEHList: action.items,
        pageLQ: action.page,
        countLQ: action.count,
      }; //Falta de pasar

    case DriversConst.LETTER_INQUIRY_TOGGLE_DASHBOARD:
      return {
        ...state,
        modalLIDashboard: action.modal,
        errorM: "",
        pEmployer: action.e,
        LQList: action.items,
        pageLQ: action.page,
        countLQ: action.count,
      };

    case DriversConst.EMPLOYMENT_HISTORY_TOGGLE:
      return {
        ...state,
        modalEH: action.modal,
        errorM: "",
        pEmployer: action.e,
        EHList: action.items,
        pageEH: action.page,
        countEH: action.count,
      }; //Falta de pasar

    case DriversConst.REVIEW_DMV_TOGGLE:
      return {
        ...state,
        modalRD: action.modal,
        errorM: "",
        RDList: action.items,
        pageRD: action.page,
        countRD: action.count,
        dmvDate: action.f,
      }; //Falta de pasar

    case DriversConst.CERTIFICATION_VIOLATIONS_TOGGLE:
      return {
        ...state,
        modalCV: action.modal,
        errorM: "",
        VList: action.items,
        pageV: action.page,
        countV: action.count,
        CVList: action.itemsC,
        pageCV: action.pageC,
        countCV: action.countC,
      }; //Falta de pasar

    case DriversConst.MEDICAL_CERTIFICATE_TOGGLE:
      return {
        ...state,
        modalMC: action.modal,
        errorM: "",
        MCList: action.items,
        pageMC: action.page,
        countMC: action.count,
      }; //Falta de pasar

    case DriversConst.MULTI_EMP_TOGGLE:
      return { ...state, modalME: action.modal, dataME: action.data }; //Falta de pasar

    case DriversConst.CHANGE_PASSWORD_TOGGLE:
      return { ...state, modalCP: action.modal, errorM: "", messageM: "" };

    case DriversConst.ROAD_TEST_TOGGLE:
      return {
        ...state,
        modalROT: action.modal,
        errorM: "",
        messageM: "",
        roadTD: action.data,
        StatesM: action.states,
        roadTestL: action.items,
        pageRoad: action.page,
        countRoad: action.count,
      };

    case DriversConst.NEW_RECORDS_TOGGLE:
      return {
        ...state,
        modalNR: action.modal,
        record: action.record,
        StatesM: action.states,
        Cities: action.cities,
        errorM: "",
      };

    case DriversConst.POST_DATA_SIGNATURE_REQUEST:
      return { ...state, isLoading: true, messageS: "", errorS: "" };

    case DriversConst.POST_DATA_SIGNATURE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        toastAlertState: true,
        message: "Signature successfully saved",
        signature: action.signature,
        driver: action.driver.driver,
      };

    case DriversConst.POST_DATA_SIGNATURE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.SEND_LETTER_OF_INQUIRY_REQUEST:
      return { ...state, isLoading: true, message: "", error: "" };

    case DriversConst.SEND_LETTER_OF_INQUIRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        toastAlertState: true,
        message: "Email was sent succesfully",
      };

    case DriversConst.SEND_LETTER_OF_INQUIRY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.GET_STATES_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case DriversConst.GET_STATES_SUCCESS:
      return { ...state, isLoading: false, StatesM: action.states };

    case DriversConst.GET_STATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        StatesM: [],
        Cities: [],
        error: action.error,
        message: "",
      };

    case DriversConst.GET_CITIES_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case DriversConst.GET_CITIES_SUCCESS:
      return { ...state, isLoading: false, Cities: action.cities };

    case DriversConst.GET_CITIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        Cities: [],
        error: action.error,
        message: "",
      };

    case DriversConst.POST_NEW_ADDRESS_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.POST_NEW_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        toastAlertState: true,
        error: "",
        message: "Address has been saved Succesfully",
        modalA: false,
        StatesM: [],
        Cities: [],
        addresses: action.items,
        pageA: action.page,
        countA: action.count,
        driver: action.driver.driver,
        companyInfo: action.company,
      };

    case DriversConst.POST_NEW_ADDRESS_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        errorM: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.GET_LIST_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: action.address.Items,
        pageA: action.address.CurrentPage,
        countA: action.address.NumberP,
      };

    case DriversConst.POST_NEW_DRIVINGEXP_REQUEST:
      return { ...state, isLoadingM: true, error: "" };

    case DriversConst.POST_NEW_DRIVINGEXP_SUCCESS:
      return {
        ...state,
        modalDE: false,
        toastAlertState: true,
        message: "saved Succesfully",
        error: "",
        isLoadingM: false,
        drivingExList: action.items,
        pageDE: action.page,
        countDE: action.count,
      };

    case DriversConst.POST_NEW_DRIVINGEXP_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.POST_NEW_ACCIDENTREC_REQUEST:
      return { ...state, isLoadingM: true, error: "" };

    case DriversConst.POST_NEW_ACCIDENTREC_SUCCESS:
      return {
        ...state,
        modalAR: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        isLoadingM: false,
        accidentRecList: action.items,
        pageAR: action.page,
        countAR: action.count,
      };

    case DriversConst.POST_NEW_ACCIDENTREC_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.POST_NEW_TRAFFICCONV_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.POST_NEW_TRAFFICCONV_SUCCESS:
      return {
        ...state,
        modalTC: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        isLoadingM: false,
        trafficCList: action.items,
        pageTC: action.page,
        countTC: action.count,
      };

    case DriversConst.POST_NEW_TRAFFICCONV_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.POST_NEW_EMPLOYMENTR_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.POST_NEW_EMPLOYMENTR_SUCCESS:
      return {
        ...state,
        modalNR: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        isLoadingM: false,
        employmentRList: action.items,
        pageER: action.page,
        countER: action.count,
      };

    case DriversConst.POST_NEW_EMPLOYMENTR_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.POST_DRUG_ALCOHOL_TEST_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.POST_DRUG_ALCOHOL_TEST_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        DrugList: action.drugTest.Items,
        pageDrug: action.drugTest.CurrentPage,
        countDrug: action.drugTest.NumberP,
        AlcoholList: action.alcoholTest.Items,
        pageAlcohol: action.alcoholTest.CurrentPage,
        countAlcohol: action.alcoholTest.NumberP,
        fitness: action.fitness,
      };

    case DriversConst.POST_DRUG_ALCOHOL_TEST_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.EDIT_DRUG_ALCOHOL_TEST_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.EDIT_DRUG_ALCOHOL_TEST_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        DrugList: action.DrugList,
        toastAlertState: true,
        message: "Saved Succesfully",
      };

    case DriversConst.EDIT_DRUG_ALCOHOL_TEST_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.EDIT_DRUG_ALCOHOL_TEST2_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.EDIT_DRUG_ALCOHOL_TEST2_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        AlcoholList: action.AlcoholList,
        toastAlertState: true,
        message: "Saved Succesfully",
      };

    case DriversConst.DELETE_DRIVER_COMPLIANCEDRUG_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.DELETE_DRIVER_COMPLIANCEDRUG_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        DrugList: action.DrugList,
        toastAlertState: true,
        message: "Successfully Deleted",
      };

    case DriversConst.DELETE_DRIVER_COMPLIANCEDRUG_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.DELETE_DRIVER_COMPLIANCEALCOHOL_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.DELETE_DRIVER_COMPLIANCEALCOHOL_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        AlcoholList: action.AlcoholList,
        toastAlertState: true,
        message: "Successfully Deleted",
      };

    case DriversConst.DELETE_DRIVER_COMPLIANCEALCOHOL_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.EDIT_DRUG_ALCOHOL_TEST2_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.POST_MEDICAL_CERTIFICATE_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.POST_MEDICAL_CERTIFICATE_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        MCList: action.items,
        pageMC: action.page,
        countMC: action.count,
        alertsCount: action.alertsCount,
        alerts: action.alerts,
        fitness: action.fitness,
      };

    case DriversConst.POST_MEDICAL_CERTIFICATE_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.POST_DMV_RECORD_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.POST_DMV_RECORD_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        DMVList: action.dmvR.Items,
        pageDMV: action.dmvR.CurrentPage,
        countDMV: action.dmvR.NumberP,
        alertsCount: action.alertsCount,
        alerts: action.alerts,
        fitness: action.fitness,
      };

    case DriversConst.POST_DMV_RECORD_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.POST_EMPLOYER_PULL_NOTICE_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.POST_EMPLOYER_PULL_NOTICE_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        employerPullNotice: action.epnL.Items,
        pagePullNotice: action.epnL.CurrentPage,
        countPullNotice: action.epnL.NumberP,
        modalDMV: true,
      };

    case DriversConst.POST_EMPLOYER_PULL_NOTICE_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.POST_SEND_LQ_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" }; //Falta de pasar

    case DriversConst.POST_SEND_LQ_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        LQList: action.items,
        pageLQ: action.page,
        countLQ: action.count,
        fitness: action.fitness,
      }; //Falta de pasar

    case DriversConst.POST_SEND_LQ_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      }; //Falta de pasar

    case DriversConst.POST_SEND_EH_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" }; //Falta de pasar

    case DriversConst.POST_SEND_EH_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        EHList: action.items,
        pageEH: action.page,
        countEH: action.count,
        fitness: action.fitness,
      }; //Falta de pasar

    case DriversConst.POST_SEND_EH_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      }; //Falta de pasar

    case DriversConst.POST_REVIEW_DMV_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" }; //Falta de pasar

    case DriversConst.POST_REVIEW_DMV_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        RDList: action.items,
        pageRD: action.page,
        countRD: action.count,
        fitness: action.fitness,
      }; //Falta de pasar

    case DriversConst.POST_REVIEW_DMV_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      }; //Falta de pasar

    case DriversConst.POST_VIOLATION_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" }; //Falta de pasar

    case DriversConst.POST_VIOLATION_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        VList: action.items,
        pageV: action.page,
        countV: action.count,
      }; //Falta de pasar

    case DriversConst.POST_VIOLATION_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      }; //Falta de pasar

    case DriversConst.POST_CVIOLATION_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" }; //Falta de pasar

    case DriversConst.POST_CVIOLATION_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        VList: action.items,
        pageV: action.page,
        countV: action.count,
        pageCV: action.pageC,
        countCV: action.countC,
        CVList: action.itemsC,
        fitness: action.fitness,
      }; //Falta de pasar

    case DriversConst.POST_CVIOLATION_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      }; //Falta de pasar

    case DriversConst.POST_ROAD_TEST_REQUEST:
      return { ...state, isLoadingM: true, error: "" };

    case DriversConst.POST_ROAD_TEST_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
        roadTestL: action.items,
        pageRoad: action.page,
        countRoad: action.count,
        fitness: action.fitness,
      };

    case DriversConst.POST_ROAD_TEST_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.POST_CHANGE_PASSWORD_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case DriversConst.POST_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
      };

    case DriversConst.POST_CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.GET_LIST_DRIVINGEXP_SUCCESS:
      return {
        ...state,
        drivingExList: action.drivingExp.Items,
        pageDE: action.drivingExp.CurrentPage,
        countDE: action.drivingExp.NumberP,
      };

    case DriversConst.GET_LIST_ACCIDENTREC_SUCCESS:
      return {
        ...state,
        accidentRecList: action.accidentRec.Items,
        pageAR: action.accidentRec.CurrentPage,
        countAR: action.accidentRec.NumberP,
      };

    case DriversConst.GET_LIST_TRAFFICCONV_SUCCESS:
      return {
        ...state,
        trafficCList: action.trafficConv.Items,
        pageTC: action.trafficConv.CurrentPage,
        countTC: action.trafficConv.NumberP,
      };

    case DriversConst.GET_LIST_DRUG_ALCOHOL_TEST_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.GET_LIST_DRUG_ALCOHOL_TEST_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        DrugList: action.drugTest.Items,
        pageDrug: action.drugTest.CurrentPage,
        countDrug: action.drugTest.NumberP,
        AlcoholList: action.alcoholTest.Items,
        pageAlcohol: action.alcoholTest.CurrentPage,
        countAlcohol: action.alcoholTest.NumberP,
      };

    case DriversConst.GET_LIST_DRUG_ALCOHOL_TEST_FAILURE:
      return { ...state, isLoadingM: false, error: action.error, message: "" };

    case DriversConst.GET_LIST_DMVR_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.GET_LIST_DMVR_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        DMVList: action.dmvR.Items,
        pageDMV: action.dmvR.CurrentPage,
        countDMV: action.dmvR.NumberP,
      };

    case DriversConst.GET_LIST_DMVR_FAILURE:
      return { ...state, isLoadingM: false, error: action.error, message: "" };

    case DriversConst.GET_EMPLOYER_PULL_NOTICE_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.GET_EMPLOYER_PULL_NOTICE_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        employerPullNotice: action.epnL.Items,
        pagePullNotice: action.epnL.CurrentPage,
        countPullNotice: action.epnL.NumberP,
      };

    case DriversConst.GET_EMPLOYER_PULL_NOTICE_FAILURE:
      return { ...state, isLoadingM: false, error: action.error, message: "" };

    case DriversConst.GET_LIST_LQ_SUCCESS:
      return {
        ...state,
        LQList: action.lQ.Items,
        pageLQ: action.lQ.CurrentPage,
        countLQ: action.lQ.NumberP,
      }; //Falta de pasar

    case DriversConst.GET_LETTERINQUIRY_SUCCESS:
      return { ...state, LetterInquiry: action.lQ.Items };

    case DriversConst.GET_LQEH_SUCCESS:
      return { ...state, LetterInAndEmployHis: action.lQeH.Items };

    case DriversConst.GET_LIST_EH_SUCCESS:
      return {
        ...state,
        EHList: action.EH.Items,
        pageEH: action.EH.CurrentPage,
        countEH: action.EH.NumberP,
      }; //Falta de pasar

    case DriversConst.GET_LIST_RD_SUCCESS:
      return {
        ...state,
        RDList: action.ARDList.Items,
        pageRD: action.ARDList.CurrentPage,
        countRD: action.ARDList.NumberP,
      }; //Falta de pasar

    case DriversConst.GET_VIOLATIONS_SUCCESS:
      return {
        ...state,
        VList: action.VList.Items,
        pageV: action.VList.CurrentPage,
        countV: action.VList.NumberP,
      }; //Falta de pasar

    case DriversConst.GET_CERTIFICATIONS_SUCCESS:
      return {
        ...state,
        CVList: action.CVList.Items,
        pageCV: action.CVList.CurrentPage,
        countCV: action.CVList.NumberP,
      }; //Falta de pasar

    case DriversConst.GET_LIST_MEDICAL_CERTIFICATE_SUCCESS:
      return {
        ...state,
        MCList: action.list.Items,
        pageMC: action.list.CurrentPage,
        countMC: action.list.NumberP,
      }; //Falta de pasar

    case DriversConst.GET_DRIVER_FITNESS_SUCCESS:
      return { ...state, fitness: action.list };

    case DriversConst.GET_ROADTEST_SUCCESS:
      return {
        ...state,
        roadTestL: action.items,
        pageRoad: action.page,
        countRoad: action.count,
      };

    case DriversConst.POST_ADD_DRIVER_CARD_REQUEST:
      return { ...state, isLoading: true };

    case DriversConst.POST_ADD_DRIVER_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        card: action.card.Items,
        page: action.card.CurrentPage,
        count: action.card.NumberP,
        error: "",
        toastAlertState: true,
        message: "Saved Succesfully",
      };

    case DriversConst.POST_ADD_DRIVER_CARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.GET_DRIVER_CARDS_REQUEST:
      return { ...state, isLoading: true };

    case DriversConst.GET_DRIVER_CARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        card: action.card.Items,
        page: action.card.CurrentPage,
        count: action.card.NumberP,
        error: "",
        message: "",
      };

    case DriversConst.GET_DRIVER_CARDS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DriversConst.DELETE_DRIVER_CARD_TOGGLE:
      return { ...state, modalD1: action.modalD1, idDelete1: action.idD };

    case DriversConst.DELETE_DRIVER_CARD_REQUEST:
      return { ...state, isLoading: true };

    case DriversConst.DELETE_DRIVER_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        card: action.card.Items,
        page: action.card.CurrentPage,
        count: action.card.NumberP,
        error: "",
        message: "Deleted Successfully",
        toastAlertState: true,
        idDelete1: 0,
        modalD1: false,
      };

    case DriversConst.DELETE_DRIVER_CARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
        idDelete: 0,
      };

    case DriversConst.DELETE_DRIVER_DOCUMENT_TOGGLE:
      return {
        ...state,
        modalD: action.modalD,
        idDelete: action.idD,
        driverId: action.driverID,
        docType: action.dType,
        fileName: action.fName,
      };

    case DriversConst.DOWNLOAD_DOCUMENT_DRIVER_REQUEST:
      return { ...state, isLoading: true };

    case DriversConst.DOWNLOAD_DOCUMENT_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.message,
        error: "",
        idDownload: 0,
      };

    case DriversConst.DOWNLOAD_DOCUMENT_DRIVER_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
        idDownload: 0,
      };

    case DriversConst.POST_SAVE_DRIVER_DOCUMENT_REQUEST:
      return { ...state, isLoading: true };

    case DriversConst.POST_SAVE_DRIVER_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docs: action.docs.Items,
        page: action.docs.CurrentPage,
        count: action.docs.NumberP,
        error: "",
        message: "File successfully uploaded",
        toastAlertState: true,
        modal1: true,
      };

    case DriversConst.POST_SAVE_DRIVER_DOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case DriversConst.GET_ALL_DRIVER_DOCUMENTS_REQUEST:
      return { ...state, isLoading: true, docs: [] };

    case DriversConst.GET_ALL_DRIVER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docs: action.docs.Items,
        page: action.docs.CurrentPage,
        count: action.docs.NumberP,
        error: "",
        message: "",
      };

    case DriversConst.GET_ALL_DRIVER_DOCUMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DriversConst.GET_HISTORYEMPLOYER_REQUEST:
      return { ...state, isLoading: true, eh: [] };

    case DriversConst.GET_HISTORYEMPLOYER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        EmploymentHistory: action.eh.Items,
        // eh: action.eh,
        error: "",
        message: "",
      };

    case DriversConst.GET_HISTORYEMPLOYER_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "Error employment record" };

    case DriversConst.DELETE_DRIVER_DOCUMENT_REQUEST:
      return { ...state, isLoading: true };

    case DriversConst.DELETE_DRIVER_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docs: action.docs.Items,
        page: action.docs.CurrentPage,
        count: action.docs.NumberP,
        error: "",
        message: "Deleted Successfully",
        toastAlertState: true,
        idDelete: 0,
        modalD: false,
        modal1: true,
      };

    case DriversConst.DELETE_DRIVER_DOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDelete: 0,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.OPEN_DRIVER_ALERTS_TOGGLE:
      return { ...state, modalDA: action.modalDA, error: "" };

    case DriversConst.GET_DRIVER_ALERTS_REQUEST:
      return { ...state, isLoading: true, alerts: [], alertsCount: 0 };

    case DriversConst.GET_DRIVER_ALERTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertsCount: action.alertsCount,
        message: "",
        alerts: action.alerts,
      };

    case DriversConst.GET_DRIVER_ALERTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        alerts: [],
        alertsCount: 0,
        error: action.error,
        message: "",
      };

    case DriversConst.POST_EMPLOYMENT_APP_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.POST_EMPLOYMENT_APP_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        eAList: action.items,
        pageEA: action.page,
        countEA: action.count,
        fitness: action.fitness,
        error: "",
        message: "Saved Succesfully",
        toastAlertState: true,
      };

    case DriversConst.POST_EMPLOYMENT_APP_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DriversConst.GET_EMPLOYMENT_APP_SUCCESS:
      return {
        ...state,
        eAList: action.items,
        countEA: action.count,
        pageEA: action.page,
      };

    case DriversConst.GET_LIST_EMPLOYMENTR_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DriversConst.GET_LIST_EMPLOYMENTR_SUCCESS:
      return {
        ...state,
        modalNR: false,
        error: "",
        employmentRList: action.employmentR.Items,
        pageER: action.employmentR.CurrentPage,
        countER: action.employmentR.NumberP,
      };

    case DriversConst.GET_LIST_EMPLOYMENTR_FAILURE:
      return { ...state, isLoadingM: false, error: action.error, message: "" };

    case DriversConst.POST_INQUIRY_ANSWER_REQUEST:
      return { ...state, isLoading: true, error: "", message: "" };

    case DriversConst.POST_INQUIRY_ANSWER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Saved Correctly",
        // toastAlertState: true,
        error: "",
      };

    case DriversConst.POST_INQUIRY_ANSWER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        toastAlertState: false,
        message: "",
      };

    case DriversConst.POST_EHISTORY_ANSWER_REQUEST:
      return { ...state, isLoading: true, error: "", message: "" };

    case DriversConst.POST_EHISTORY_ANSWER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Saved Correctly",
        toastAlertState: true,
        error: "",
      };

    case DriversConst.POST_EHISTORY_ANSWER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };
    case DriversConst.DELETE_DRIVER_MEDICAL_CERTIFICATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoadingM: true,
      };
    case DriversConst.DELETE_DRIVER_MEDICAL_CERTIFICATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: action.message,
        MCList: action.MCList,
        pageMC: action.page,
        countMC: action.count,
        modalD: false,
      };
    case DriversConst.DELETE_DRIVER_MEDICAL_CERTIFICATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        MCList: [],
        error: action.error,
        isLoading: false,
        isLoadingM: false,
        error: action.error,
        modalD: false,
      };
    case DriversConst.DELETE_DMV_RECORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DriversConst.DELETE_DMV_RECORD_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: "Deleted Succesfully",
        DMVList: action.dmvL.Items,
        pageDMV: action.dmvL.CurrentPage,
        countDMV: action.dmvL.NumberP,
        alertsCount: action.alertsCount,
        alerts: action.alerts,
        fitness: action.fitness,
      };
    case DriversConst.DELETE_DMV_RECORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: action.error,
      };
    case DriversConst.DELETE_EPN_RECORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DriversConst.DELETE_EPN_RECORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        message: "Deleted Succesfully",
        employerPullNotice: action.epnL.Items,
        pagePullNotice: action.epnL.CurrentPage,
        countPullNotice: action.epnL.NumberP,
      };
    case DriversConst.DELETE_EPN_RECORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: action.error,
      };

    case DriversConst.GET_COMPANY_INFO_REQUEST:
      return { ...state, isLoading: true };

    case DriversConst.GET_COMPANY_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        company: action.company,

        error: "",
      };

    case DriversConst.GET_COMPANY_INFO_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

      case DriversConst.POST_DATA_USER_REQUEST:
      return { ...state, isLoading: true };

    case DriversConst.POST_DATA_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        driver: action.driver,
        toastAlertState: true,
        error: "",
        message: "Driver information successfully saved",
      };

    case DriversConst.POST_DATA_USER_FAILURE:
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
};
