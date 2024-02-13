import DATConst from "./../constants/DrugAndAlcoholTesting";
const emptySignature =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC";
const initialState = {
  drivers: [],
  driver: {},
  alertsCount: 0,
  alerts: [],
  countries: [],
  modalDrivers: false,
  driversNonE: [],
  pageNonE: 0,
  countNonE: 0,
  NonenrolledExport: [],
  driversE: [],
  pageE: 0,
  countE: 0,
  driversNE: [],
  pageNE: 0,
  countNE: 0,
  error: "",
  isLoading: false,
  modalERL: false,
  message: "",
  modalCF: false,
  idEnroll: 0,
  enrolledExport: [],
  docs: [],
  MISDocs: [],
  certificate: [],
  pageCE: 0,
  countCE: 0,
  modalDA: false,
  modalDDA: false,
  idDeleteDA: 0,
  training: [],
  pageST: 0,
  countST: 0,
  modalDST: false,
  idDeleteST: 0,
  toastAlertState: false,
  drugToastAlertState: false,
  modalDT: false,
  Id: 0,
  pageDrug: 0,
  countDrug: 0,
  DrugList: [],
  pageAlcohol: 0,
  countAlcohol: 0,
  AlcoholList: [],
  docsDAT: [],
  idDeleteDoc: 0,
  modalD: false,
  page: 0,
  count: 0,
  driversList: [],
  scheduleDyA: {},
  scheduleTestComplete: 0,
  scheduleTestInProcess: 0,
  scheduledTestAlcoholComplete: 0,
  scheduledTestInAlcoholProcess: 0,
  busyDays: [],
  appointmentSchedule: [],
  scheduledTests: [],
  scheduledAlcoholTest: [],
  idDownload: 0,
  driverId: 0,
  fileName: "",
  IdScheduled: 0,
  modalCancel: false,
  modalCancelAlcohol: false,
  addCardModal: false,
  paymentMethods: [],
  defaultPaymentMethod: "",
  modalDeleteFilesDrugTest: false,
  fileNameToDelete: "",
  docTypeToDelete: "",
  providerDrugTest: [],
  DrugTestData: {},
  AlcoholTestData: {},
  modalDrugTest: false,
  modalAlcoholTest: false,
  scheduleData: {},
  alcoholScheduleData: {},
  collectorSignature: "",
  donorSignature: "",
  fileComplianceByDrugTest: "",
  FileCompliance: "",
  modalDeleteSchedule: false,
  modalDeleteScheduleAlcohol: false,
  modalRandomTest: false,
  Q1remainingDrivers: 0,
  Q1PercentageOfDrugtestDrivers: 0,
  Q2remainingDrivers: 0,
  Q2PercentageOfDrugtestDrivers: 0,
  Q3remainingDrivers: 0,
  Q3PercentageOfDrugtestDrivers: 0,
  Q4remainingDrivers: 0,
  Q4PercentageOfDrugtestDrivers: 0,
  driversRandomList: [],
  logsRandom: [],
  scheduledAlcoholTests: [],
  scheduledAlcoholTestsCompleted: 0,
  scheduledAlcoholTestsInProcess: 0,
  providerAlcoholTests: [],
  scheduledAlcoholTestData: {},
  alcoholTest: {},
  updateSuccessful: false,
  enrollmentFiles: [],
  validationRequest: "",
  MISCollectionReport: {},
  DotDriversMIS: {},
  QuantityDrivers: 0,
  CompanyData: {},
  modalD1: false,
  MISReports: [],
  DOTDrivers: [],
  ValidationMIS: false,
  isLoadingMIS: false,
  isLoadingRandom: false,
  modalDeleteDA: false,
  modalDeleteDAEC: false,
  modalActivateDA: false,
};
const FileDownload = require("js-file-download");

export const actionCreators = {
  toggleToastAlert: (status) => {
    return (dispatch, getState) => {
      const toastAlert = status;
      dispatch(OpenClose(toastAlert));
    };
    function OpenClose(toastAlert) {
      return { type: DATConst.TOGGLE_TOAST_ALERT, toastAlert };
    }
  },
  toggleDrugToastAlert: (status) => {
    return (dispatch, getState) => {
      const toastAlert = status;
      dispatch(OpenClose(toastAlert));
    };
    function OpenClose(toastAlert) {
      return { type: DATConst.TOGGLE_DRUG_TOAST_ALERT, toastAlert };
    }
  },
  validateRandom: (status) => {
    return (dispatch, getState) => {
      let toastAlert
      if(status == 0){
        toastAlert = false ;
      }else {toastAlert = true}
      dispatch(OpenClose(toastAlert));
    };
    function OpenClose(toastAlert) {
      return { type: DATConst.TOGGLE_RANDOM_VALIDATION, toastAlert };
    }
  },
  getRandomStats: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/DrugAndAlcoholTesting/RandomStats", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const Q1remainingDrivers = r.Q1remainingDrivers;
            const Q1PercentageOfDrugtestDrivers =
              r.Q1PercentageOfDrugtestDrivers;
            const Q2remainingDrivers = r.Q2remainingDrivers;
            const Q2PercentageOfDrugtestDrivers =
              r.Q2PercentageOfDrugtestDrivers;
            const Q3remainingDrivers = r.Q3remainingDrivers;
            const Q3PercentageOfDrugtestDrivers =
              r.Q3PercentageOfDrugtestDrivers;
            const Q4remainingDrivers = r.Q4remainingDrivers;
            const Q4PercentageOfDrugtestDrivers =
              r.Q4PercentageOfDrugtestDrivers;
            dispatch(
              success(
                Q1remainingDrivers,
                Q1PercentageOfDrugtestDrivers,
                Q2remainingDrivers,
                Q2PercentageOfDrugtestDrivers,
                Q3remainingDrivers,
                Q3PercentageOfDrugtestDrivers,
                Q4remainingDrivers,
                Q4PercentageOfDrugtestDrivers
              )
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error Sorting New Random Tests: ${error}`));
        });
    };
    function request() {
      return { type: DATConst.GET_STATS_REQUEST };
    }
    function success(
      Q1remainingDrivers,
      Q1PercentageOfDrugtestDrivers,
      Q2remainingDrivers,
      Q2PercentageOfDrugtestDrivers,
      Q3remainingDrivers,
      Q3PercentageOfDrugtestDrivers,
      Q4remainingDrivers,
      Q4PercentageOfDrugtestDrivers
    ) {
      return {
        type: DATConst.GET_STATS_SUCCESS,
        Q1remainingDrivers,
        Q1PercentageOfDrugtestDrivers,
        Q2remainingDrivers,
        Q2PercentageOfDrugtestDrivers,
        Q3remainingDrivers,
        Q3PercentageOfDrugtestDrivers,
        Q4remainingDrivers,
        Q4PercentageOfDrugtestDrivers,
      };
    }
    function failure(error) {
      return { type: DATConst.GET_STATS_FAILURE, error };
    }
  },
  resetMessage: () => {
    return (dispatch, getState) => {
      dispatch(ResetMessage());
    };
    function ResetMessage() {
      return { type: DATConst.RESET_MESSAGE };
    }
  },
  ////////////////////////////////////////////////////////////////////
  toggleD1: (id) => {
    return (dispatch, getState) => {
      var modalDeleteDA = !getState().drugAndAlcoholTesting.modalDeleteDA;
      var idD = 0;
      if (modalDeleteDA) {
        idD = id;
      }
      dispatch(OpenClose(modalDeleteDA, idD));
    };
    function OpenClose(modalDeleteDA, idD) {
      return { type: DATConst.DELETE_DRIVER_TOGGLE, modalDeleteDA, idD };
    }
  },
  toggleRestore: (id) => {
    return (dispatch, getState) => {
      var modalActivateDA = !getState().drugAndAlcoholTesting.modalActivateDA;
      var idD = 0;
      if (modalActivateDA) {
        idD = id;
      }
      dispatch(OpenClose(modalActivateDA, idD));
    };
    function OpenClose(modalActivateDA, idD) {
      return { type: DATConst.RESTORE_DRIVER_TOGGLE, modalActivateDA, idD };
    }
  },
  ////////////////////////////////////////////////////////////////////
  toggleD2: (id, docType2, docName2) => {
    return (dispatch, getState) => {
      var modalDeleteDAEC = !getState().drugAndAlcoholTesting.modalDeleteDAEC;
      // var modalDeleteDAEC = !getState().dqf.modalDeleteDAEC;
      var idD = 0;
      var docTypeDelete2 = "";
      var docNameDelete2 = "";
      if (modalDeleteDAEC) {
        idD = id;
        docNameDelete2 = docName2;
        docTypeDelete2 = docType2;
      }
      dispatch(OpenClose(modalDeleteDAEC, idD, docTypeDelete2, docNameDelete2));
    };
    function OpenClose(modalDeleteDAEC, idD, docTypeDelete2, docNameDelete2) {
      return {
        type: DATConst.DELETE_DOC_TOGGLE,
        modalDeleteDAEC,
        idD,
        docTypeDelete2,
        docNameDelete2,
      };
    }
  },
  ////////////////////////////////////////////////////////////////////
  confirmCollectorSign: (signature) => {
    if (signature !== emptySignature) {
      return (dispatch) => {
        dispatch(success(signature));
      };
    } else {
      return (dispatch) => {
        dispatch(failure(signature));
      };
    }
    function success(signature) {
      return {
        type: DATConst.CONFIRM_COLLECTOR_SIGNATURE_SUCCESS,
        signature,
      };
    }
    function failure(signature) {
      return {
        type: DATConst.CONFIRM_COLLECTOR_SIGNATURE_FAILURE,
        signature,
      };
    }
  },
  confirmDonorSign: (signature) => {
    if (signature !== emptySignature) {
      return (dispatch) => {
        dispatch(success(signature));
      };
    } else {
      return (dispatch) => {
        dispatch(failure(signature));
      };
    }
    function success(signature) {
      return { type: DATConst.CONFIRM_DONOR_SIGNATURE_SUCCESS, signature };
    }
    function failure(signature) {
      return { type: DATConst.CONFIRM_DONOR_SIGNATURE_FAILURE, signature };
    }
  },
  toggleDrugDoc: (id, idu) => {
    return (dispatch, getState) => {
      const modal = !getState().drugAndAlcoholTesting.modalDT;
      if (id !== null && id !== 0) {
        fetch(
          "api/DrugAndAlcoholTesting/getDrugAlcholDoc?idD=" +
            id +
            "&idu=" +
            idu,
          { method: "GET" }
        )
          .then((res) => res.json())
          .then((response) => {
            const r = JSON.parse(response);
            if (r.status === 0) {
              const drug = r.drugTest;
              const alcohol = r.alcoholTest;
              const docs = r.docs;
              dispatch(
                OpenClose(
                  modal,
                  id,
                  drug.Items,
                  drug.CurrentPage,
                  drug.NumberP,
                  alcohol.Items,
                  alcohol.CurrentPage,
                  alcohol.NumberP,
                  docs.Items,
                  docs.CurrentPage,
                  docs.NumberP
                )
              );
            } else {
              dispatch(OpenClose(modal, id, [], 0, 0, [], 0, 0, [], 0, 0));
            }
          })
          .catch((error) => {
            dispatch(OpenClose(modal, id, [], 0, 0, [], 0, 0, [], 0, 0));
          });
      } else {
        dispatch(OpenClose(modal, id, [], 0, 0, [], 0, 0, [], 0, 0));
      }
    };
    function OpenClose(
      modal,
      id,
      Durgitems,
      Drugpage,
      Drugcount,
      Alcoholitems,
      Alcoholpage,
      Alcoholcount,
      Docitems,
      Docpage,
      Doccount
    ) {
      return {
        type: DATConst.TOGGLE_DRUG_TEST,
        modal,
        id,
        Durgitems,
        Drugpage,
        Drugcount,
        Alcoholitems,
        Alcoholpage,
        Alcoholcount,
        Docitems,
        Docpage,
        Doccount,
      };
    }
  },
  toggleERL: (id) => {
    return (dispatch, getState) => {
      const modal = !getState().drugAndAlcoholTesting.modalERL;
      if (id !== null) {
        fetch(
          "api/DrugAndAlcoholTesting/getDrivers?idu=" +
            id +
            "&page=" +
            1 +
            "&size=" +
            7 +
            "&s=" +
            false,
          { method: "GET" }
        )
          .then((res) => res.json())
          .then((response) => {
            const r = JSON.parse(response);
            if (r.status === 0) {
              const drivers = r.drivers;
              dispatch(
                OpenClose(
                  modal,
                  drivers.Items,
                  drivers.CurrentPage,
                  drivers.NumberP
                )
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
    };
    function OpenClose(modal, items, page, count) {
      return {
        type: DATConst.ENROLL_DRIVER_TOGGLE,
        modal,
        items,
        page,
        count,
      };
    }
    },
    getDriversCollectorE: (idC, page, size, s, dot) => {
        return (dispatch) => {
            dispatch(request());
            fetch(
                "api/DrugAndAlcoholTesting/getDriversCollector?idC=" +
                idC +
                "&page=" +
                page +
                "&size=" +
                size +
                "&s=" +
                s +
                "&dot=" +
                dot,
                { method: "GET" }
            )
                .then((res) => res.json())
                .then((response) => {
                    const r = JSON.parse(response);
                    if (r.status === 0) {
                        const drivers = r["Dot drivers"];
                        const enrolledExport = r.enrolledExport;
                        dispatch(success(drivers, enrolledExport));
                    } else {
                        dispatch(failure(r.error));
                    }
                })
                .catch((error) => {
                    dispatch(failure(`Can't get Enrolled Drivers: ${error}`));
                });
        };

        function request() {
            return { type: DATConst.GET_DRIVERS_DAT_REQUEST };
        }
        function success(drivers, enrolledExport) {
            return {
                type: DATConst.GET_DRIVERS_DAT_SUCCESS,
                drivers,
                enrolledExport,
            };
        }
        function failure(error) {
            return { type: DATConst.GET_DRIVERS_DAT_FAILURE, error };
        }
    },
  getDriversE: (idu, page, size, s, dot) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/getDrivers?idu=" +
          idu +
          "&page=" +
          page +
          "&size=" +
          size +
          "&s=" +
          s +
          "&dot=" +
          dot,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drivers = r["Dot drivers"];
            const enrolledExport = r.enrolledExport;
            dispatch(success(drivers, enrolledExport));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Can't get Enrolled Drivers: ${error}`));
        });
    };

    function request() {
      return { type: DATConst.GET_DRIVERS_DAT_REQUEST };
    }
    function success(drivers, enrolledExport) {
      return {
        type: DATConst.GET_DRIVERS_DAT_SUCCESS,
        drivers,
        enrolledExport,
      };
    }
    function failure(error) {
      return { type: DATConst.GET_DRIVERS_DAT_FAILURE, error };
    }
  },
  getDriversNonE: (idu, page, size, s, dot) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/getDrivers?idu=" +
          idu +
          "&page=" +
          page +
          "&size=" +
          size +
          "&s=" +
          s +
          "&dot=" +
          dot,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drivers = r["Non dot drivers"];
            const enrolledExport = r.enrolledExport;
            dispatch(success(drivers, enrolledExport));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Can't get Enrolled Drivers: ${error}`));
        });
    };

    function request() {
      return { type: DATConst.GET_NONDOTDRIVERS_DAT_REQUEST };
    }
    function success(drivers, enrolledExport) {
      return {
        type: DATConst.GET_NONDOTDRIVERS_DAT_SUCCESS,
        drivers,
        enrolledExport,
      };
    }
    function failure(error) {
      return { type: DATConst.GET_NONDOTDRIVERS_DAT_FAILURE, error };
    }
    },
    getDriversCollectorNonE: (idC, page, size, s, dot) => {
        return (dispatch) => {
            dispatch(request());
            fetch(
                "api/DrugAndAlcoholTesting/getDriversCollector?idC=" +
                idC +
                "&page=" +
                page +
                "&size=" +
                size +
                "&s=" +
                s +
                "&dot=" +
                dot,
                { method: "GET" }
            )
                .then((res) => res.json())
                .then((response) => {
                    const r = JSON.parse(response);
                    if (r.status === 0) {
                        const drivers = r["Non dot drivers"];
                        const enrolledExport = r.enrolledExport;
                        dispatch(success(drivers, enrolledExport));
                    } else {
                        dispatch(failure(r.error));
                    }
                })
                .catch((error) => {
                    dispatch(failure(`Can't get Enrolled Drivers: ${error}`));
                });
        };

        function request() {
            return { type: DATConst.GET_NONDOTDRIVERS_DAT_REQUEST };
        }
        function success(drivers, enrolledExport) {
            return {
                type: DATConst.GET_NONDOTDRIVERS_DAT_SUCCESS,
                drivers,
                enrolledExport,
            };
        }
        function failure(error) {
            return { type: DATConst.GET_NONDOTDRIVERS_DAT_FAILURE, error };
        }
    },
  ExportEnrolledDrivers: (idu, page, size, s) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/ExportEnrolledDrivers?idu=" +
          idu +
          "&s=" +
          s,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const enrolledExport = r.enrolledExport;
            dispatch(success(enrolledExport));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DATConst.EXPORT_ENROLL_DRIVER_REQUEST };
    }
    function success(enrolledExport) {
      return {
        type: DATConst.EXPORT_ENROLL_DRIVER_SUCCESS,
        enrolledExport,
      };
    }
    function failure(error) {
      return { type: DATConst.EXPORT_ENROLL_DRIVER_FAILURE, error };
    }
  },
  getDriversNE: (idu, page, size, dot) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/getDrivers?idu=" +
          idu +
          "&page=" +
          page +
          "&size=" +
          size +
          "&s=" +
          false +
          "&dot=" +
          dot,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drivers = r["Non dot drivers"];
            dispatch(success(drivers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DATConst.GET_DRIVERSNE_DAT_REQUEST };
    }
    function success(drivers) {
      return { type: DATConst.GET_DRIVERSNE_DAT_SUCCESS, drivers };
    }
    function failure(error) {
      return { type: DATConst.GET_DRIVERSNE_DAT_FAILURE, error };
    }
  },
  enrollDriver: (id, idu, enroll) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/enrollDriver?id=" +
          id +
          "&idu=" +
          idu +
          "&enroll=" +
          enroll,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var driversE = r.driversE;
            var driversNE = r.driversNE;
            dispatch(success(driversE, driversNE, enroll));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DATConst.ENROLL_DRIVER_REQUEST };
    }
    function success(driversE, driversNE, enroll) {
      return { type: DATConst.ENROLL_DRIVER_SUCCESS, driversE, driversNE };
    }
    function failure(error) {
      return { type: DATConst.ENROLL_DRIVER_FAILURE, error };
    }
  },
  toggleCF: () => {
    return (dispatch, getState) => {
      const modal = !getState().drugAndAlcoholTesting.modalCF;
      dispatch(OpenClose(modal));
    };
    function OpenClose(modal) {
      return { type: DATConst.CONFIRMATION_ENROLL_TOGGLE, modal };
    }
  },

  toggleDA: () => {
    var id = JSON.parse(localStorage.getItem("user")).Id;
    return (dispatch, getState) => {
      const modal = !getState().drugAndAlcoholTesting.modalDA;
      if (id !== null) {
        fetch("api/DrugAndAlcoholTesting/getDocs?idu=" + id, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((response) => {
            const r = JSON.parse(response);
            if (r.status !== 2) {
              const d = r.docs;
              var list = r.certificate;
              var list2 = r.training;
              dispatch(
                OpenClose(
                  modal,
                  d,
                  list.Items,
                  list.CurrentPage,
                  list.NumberP,
                  list2.Items,
                  list2.CurrentPage,
                  list2.NumberP
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
    };

    function OpenClose(modal, d, items, page, count, items2, page2, count2) {
      return {
        type: DATConst.DRUGSTEST_DOCS_TOGGLE,
        modal,
        d,
        items,
        page,
        count,
        items2,
        page2,
        count2,
      };
    }
  },
  toggleDDA: (id) => {
    return (dispatch, getState) => {
      var modalDDA = !getState().drugAndAlcoholTesting.modalDDA;
      var idD = 0;
      if (modalDDA) {
        idD = id;
      }
      dispatch(OpenClose(modalDDA, idD));
    };
    function OpenClose(modalDDA, idD) {
      return { type: DATConst.DELETE_CERTIFICATES_TOGGLE, modalDDA, idD };
    }
  },
  toggleDST: (id) => {
    return (dispatch, getState) => {
      var modalDST = !getState().drugAndAlcoholTesting.modalDST;
      var idD = 0;
      if (modalDST) {
        idD = id;
      }
      dispatch(OpenClose(modalDST, idD));
    };
    function OpenClose(modalDST, idD) {
      return { type: DATConst.DELETE_TRAINING_TOGGLE, modalDST, idD };
    }
  },
  saveDoc: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DrugAndAlcoholTesting/saveDoc", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const docs = r.docs;
            const certificate = r.certificate;
            const training = r.training;
            dispatch(success(docs, certificate, training));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };
    function request() {
      return { type: DATConst.SAVE_DRUGSTEST_DOCS_REQUEST };
    }
    function success(docs, certificate, training) {
      return {
        type: DATConst.SAVE_DRUGSTEST_DOCS_SUCCESS,
        docs,
        certificate,
        training,
      };
    }
    function failure(error) {
      return { type: DATConst.SAVE_DRUGSTEST_DOCS_FAILURE, error };
    }
  },
  getCertificates: (idu, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/getCertificates?idu=" +
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
            const certificate = r.certificate;
            dispatch(success(certificate));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DATConst.GET_CERTIFICATES_REQUEST };
    }
    function success(certificate) {
      return { type: DATConst.GET_CERTIFICATES_SUCCESS, certificate };
    }
    function failure(error) {
      return { type: DATConst.GET_CERTIFICATES_FAILURE, error };
    }
  },
  deleteCertificate: (id, idu) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/deleteCertificate?id=" + id + "&idu=" + idu,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const certificate = r.certificate;
            dispatch(
              success(
                certificate.Items,
                certificate.CurrentPage,
                certificate.NumberP
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
      return { type: DATConst.DELETE_CERTIFICATES_REQUEST };
    }
    function success(items, page, count) {
      return {
        type: DATConst.DELETE_CERTIFICATES_SUCCESS,
        items,
        page,
        count,
      };
    }
    function failure(error) {
      return { type: DATConst.DELETE_CERTIFICATES_FAILURE, error };
    }
  },
  getTraining: (idu, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/getTraining?idu=" +
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
            const training = r.training;
            dispatch(success(training));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DATConst.GET_TRAINING_REQUEST };
    }
    function success(training) {
      return { type: DATConst.GET_TRAINING_SUCCESS, training };
    }
    function failure(error) {
      return { type: DATConst.GET_TRAINING_FAILURE, error };
    }
  },
  deleteTraining: (id, idu) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/deleteTraining?id=" + id + "&idu=" + idu,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const training = r.training;
            dispatch(
              success(training.Items, training.CurrentPage, training.NumberP)
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
      return { type: DATConst.DELETE_TRAINING_REQUEST };
    }
    function success(items2, page2, count2) {
      return {
        type: DATConst.DELETE_TRAINING_SUCCESS,
        items2,
        page2,
        count2,
      };
    }
    function failure(error) {
      return { type: DATConst.DELETE_TRAINING_FAILURE, error };
    }
  },
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
      return { type: DATConst.GET_DATA_DRIVER_REQUEST };
    }
    function success(driver, company) {
      return {
        type: DATConst.GET_DATA_DRIVER_SUCCESS,
        driver,
        company,
      };
    }
    function failure(error) {
      return { type: DATConst.GET_DATA_DRIVER_FAILURE, error };
    }
  },
  saveDrugAlcoholTest: (form, callback, closeModal) => {
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
            callback();
            closeModal();
            const drugTest = r.drugTest;
            const alcoholTest = r.alcoholTest;
            var fitness = r.fitness;

            dispatch(success(drugTest, alcoholTest, fitness));
          } else {
            closeModal();
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DATConst.POST_DRUG_ALCOHOL_TEST_REQUEST };
    }
    function success(drugTest, alcoholTest, fitness) {
      return {
        type: DATConst.POST_DRUG_ALCOHOL_TEST_SUCCESS,
        drugTest,
        alcoholTest,
        fitness,
      };
    }
    function failure(error) {
      return { type: DATConst.POST_DRUG_ALCOHOL_TEST_FAILURE, error };
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
      return { type: DATConst.GET_LIST_DRUG_ALCOHOL_TEST_REQUEST };
    }
    function success(drugTest, alcoholTest) {
      return {
        type: DATConst.GET_LIST_DRUG_ALCOHOL_TEST_SUCCESS,
        drugTest,
        alcoholTest,
      };
    }
    function failure(error) {
      return { type: DATConst.GET_LIST_DRUG_ALCOHOL_TEST_FAILURE, error };
    }
  },
  saveDocDA: (form) => {
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
      return { type: DATConst.POST_SAVE_DRIVER_DOCUMENT_REQUEST };
    }
    function success(docs, doc) {
      return {
        type: DATConst.POST_SAVE_DRIVER_DOCUMENT_SUCCESS,
        docs,
        doc,
      };
    }
    function failure(error) {
      return { type: DATConst.POST_SAVE_DRIVER_DOCUMENT_FAILURE, error };
    }
  },
  deleteDocOfDriver: (id, driverId, docType, fileName) => {
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
      return { type: DATConst.DELETE_DRIVER_DOCUMENT_REQUEST };
    }
    function success(docs) {
      return { type: DATConst.DELETE_DRIVER_DOCUMENT_SUCCESS, docs };
    }
    function failure(error) {
      return { type: DATConst.DELETE_DRIVER_DOCUMENT_FAILURE, error };
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
      return { type: DATConst.GET_ALL_DRIVER_DOCUMENTS_REQUEST };
    }
    function success(docs) {
      return { type: DATConst.GET_ALL_DRIVER_DOCUMENTS_SUCCESS, docs };
    }
    function failure(error) {
      return { type: DATConst.GET_ALL_DRIVER_DOCUMENTS_FAILURE, error };
    }
  },
  toggleD: (id, driverId, docType, fileName) => {
    return (dispatch, getState) => {
      var modalD = !getState().drivers.modalD;
      var idD = 0;
      var driver = 0;
      var dType = "";
      var fName = "";
      if (modalD) {
        return [
          (idD = id),
          (driver = driverId),
          (dType = docType),
          (fName = fileName),
        ];
      }
      dispatch(OpenClose(modalD, idD, driver, dType, fName));
    };
    function OpenClose(modalD, idD, driver, dType, fName) {
      return {
        type: DATConst.DELETE_DRIVER_DOCUMENT_TOGGLE,
        modalD,
        idD,
        driver,
        dType,
        fName,
      };
    }
    },
    getDriverListCollector: (idC) => {
        return (dispatch) => {
            dispatch(request());
            fetch("api/AccountSet/getDriversCollector?idC=" + idC, { method: "GET" })
                .then((res) => res.json())
                .then((response) => {
                    const r = JSON.parse(response);
                    if (r.status === 0) {
                        const driverList = r.driverList;
                        dispatch(success(r.driverList));
                    } else {
                        dispatch(failure(r.error));
                    }
                })
                .catch((error) => {
                    dispatch(failure("Cant get Drivers Drug Test List: " + error));
                });
        };
        function request() {
            return { type: DATConst.GET_DRIVERS_LIST_REQUEST };
        }
        function success(driverList) {
            return { type: DATConst.GET_DRIVERS_LIST_SUCCESS, driverList };
        }
        function failure(error) {
            return { type: DATConst.GET_DRIVERS_LIST_FAILURE, error };
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
            dispatch(success(r.driverList));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Cant get Drivers Drug Test List: " + error));
        });
    };
    function request() {
      return { type: DATConst.GET_DRIVERS_LIST_REQUEST };
    }
    function success(driverList) {
      return { type: DATConst.GET_DRIVERS_LIST_SUCCESS, driverList };
    }
    function failure(error) {
      return { type: DATConst.GET_DRIVERS_LIST_FAILURE, error };
    }
  },
  scheduleAlcoholTest: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DrugAndAlcoholTesting/CreateScheduleAlcoholTest", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const scheduleTest = r.scheduledAlcoholTest;
            const aSchedule = r.aSchedule;
            const busyDays = r.busyDays;
            dispatch(success(scheduleTest, aSchedule, busyDays));
          } else {
            dispatch(failure(r.error + console.log(r.error)));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error Saving Test ${error}`));
        });
    };

    function request() {
      return { type: DATConst.POST_SCHEDULE_ALCOHOL_TEST_REQUEST };
    }
    function success(scheduleTest, aSchedule, busyDays) {
      return {
        type: DATConst.POST_SCHEDULE_ALCOHOL_TEST_SUCCESS,
        scheduleTest,
        aSchedule,
        busyDays,
      };
    }

    function failure(error) {
      return { type: DATConst.POST_SCHEDULE_ALCOHOL_TEST_FAILURE, error };
    }
  },
  scheduleDrugTest: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DrugAndAlcoholTesting/createScheduleDrugTest", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())

        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const schedule = r.schedule;
            const aSchedule = r.aSchedule;
            const busyDays = r.busyDays;
            dispatch(success(schedule, aSchedule, busyDays));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error saving Drug Test"));
        });
    };

    function request() {
      return { type: DATConst.POST_SCHEDULE_DRUG_TEST_REQUEST };
    }
    function success(schedule, aSchedule, busyDays) {
      return {
        type: DATConst.POST_SCHEDULE_DRUG_TEST_SUCCESS,
        schedule,
        aSchedule,
        busyDays,
      };
    }
    function failure(error) {
      return { type: DATConst.POST_SCHEDULE_DRUG_TEST_FAILURE, error };
    }
  },
  finishScheduleAlcoholTest: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DrugAndAlcoholTesting/FinishScheduleAlcoholTest", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const schedule = r.schedule;
            const aSchedule = r.aSchedule;
            const busyDays = r.busyDays;
            const status = r.status;
            dispatch(success(schedule, aSchedule, busyDays, status));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(error));
        });
    };

    function request() {
      return { type: DATConst.FINISH_SCHEDULE_ALCOHOL_TEST_REQUEST };
    }
    function success(schedule, aSchedule, busyDays, status) {
      return {
        type: DATConst.FINISH_SCHEDULE_ALCOHOL_TEST_SUCCESS,
        schedule,
        aSchedule,
        busyDays,
        status,
      };
    }
    function failure(error) {
      return { type: DATConst.FINISH_SCHEDULE_ALCOHOL_TEST_FAILURE, error };
    }
  },
  finishScheduleDrugTest: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DrugAndAlcoholTesting/FinishScheduleDrugTest", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const schedule = r.schedule;
            const aSchedule = r.aSchedule;
            const busyDays = r.busyDays;
            const status = r.status;
            dispatch(success(schedule, aSchedule, busyDays, status));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(error));
        });
    };

    function request() {
      return { type: DATConst.FINISH_SCHEDULE_DRUG_TEST_REQUEST };
    }
    function success(schedule, aSchedule, busyDays, status) {
      return {
        type: DATConst.FINISH_SCHEDULE_DRUG_TEST_SUCCESS,
        schedule,
        aSchedule,
        busyDays,
        status,
      };
    }
    function failure(error) {
      return { type: DATConst.FINISH_SCHEDULE_DRUG_TEST_FAILURE, error };
    }
  },

  scheduleForDay: (date, type) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/appointmentScheduleForDay?selectedDay=" +
          date +
          "&type=" +
          type,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const schedule = r.hours;
            dispatch(success(schedule));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Cant schedule Appointment" + error));
        });
    };

    function request() {
      return { type: DATConst.GET_SCHEDULE_FOR_DAY_REQUEST };
    }
    function success(schedule) {
      return { type: DATConst.GET_SCHEDULE_FOR_DAY_SUCCESS, schedule };
    }
    function failure(error) {
      return { type: DATConst.GET_SCHEDULE_FOR_DAY_FAILURE, error };
    }
  },

  getScheduledTestsAlcohol: (idu, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DrugAndAlcoholTesting/GetScheduledAlcoholTests?idu=" + idu, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const scheduledAlcoholTests = r.scheduledAlcoholTests;
            const scheduledData = r.scheduledData;
            const scheduledAlcoholTestsInProcess =
              r.scheduledAlcoholTestsInProcess;
            dispatch(
              success(
                scheduledAlcoholTests,
                scheduledData,
                scheduledAlcoholTestsInProcess
              )
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error handling data from Scheduled Test!" + error));
        });
    };

    function request() {
      return { type: DATConst.GET_ALCOHOL_SCHEDULED_TESTS_REQUEST };
    }

    function success(
      scheduledAlcoholTests,
      scheduledData,
      scheduledAlcoholTestsInProcess
    ) {
      return {
        type: DATConst.GET_ALCOHOL_SCHEDULED_TESTS_SUCCESS,
        scheduledAlcoholTests,
        scheduledData,
        scheduledAlcoholTestsInProcess,
      };
    }

    function failure(error) {
      return { type: DATConst.GET_ALCOHOL_SCHEDULED_TESTS_FAILURE, error };
    }
  },

  getScheduledTests: (idu, page, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DrugAndAlcoholTesting/getScheduledTests?idu=" + idu, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const schedule = r.schedule;
            const scheduledData = r.scheduledData;
            const scheduleTestInProcess = r.scheduleTestInProcess;
            dispatch(success(schedule, scheduledData, scheduleTestInProcess));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: DATConst.GET_DRUG_SCHEDULED_TESTS_REQUEST };
    }
    function success(schedule, scheduledData, scheduleTestInProcess) {
      return {
        type: DATConst.GET_DRUG_SCHEDULED_TESTS_SUCCESS,
        schedule,
        scheduledData,
        scheduleTestInProcess,
      };
    }
    function failure(error) {
      return { type: DATConst.GET_DRUG_SCHEDULED_TESTS_FAILURE, error };
    }
    },

    getScheduledTestsCollector: (idC, page, size) => {
        return (dispatch) => {
            dispatch(request());
            fetch("api/DrugAndAlcoholTesting/getScheduledTestsCollector?idC=" + idC, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((response) => {
                    const r = JSON.parse(response);
                    if (r.status === 0) {
                        const schedule = r.schedule;
                        const scheduledData = r.scheduledData;
                        const scheduleTestInProcess = r.scheduleTestInProcess;
                        dispatch(success(schedule, scheduledData, scheduleTestInProcess));
                    } else {
                        dispatch(failure(r.error));
                    }
                })
                .catch((error) => {
                    dispatch(failure("Error in the Server" + error));
                });
        };

        function request() {
            return { type: DATConst.GET_DRUG_SCHEDULED_TESTS_REQUEST };
        }
        function success(schedule, scheduledData, scheduleTestInProcess) {
            return {
                type: DATConst.GET_DRUG_SCHEDULED_TESTS_SUCCESS,
                schedule,
                scheduledData,
                scheduleTestInProcess,
            };
        }
        function failure(error) {
            return { type: DATConst.GET_DRUG_SCHEDULED_TESTS_FAILURE, error };
        }
    },

  cancelScheduledAlcoholTest: (ids, details, idu) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/CancelAlcoholScheduled?idS=" +
          ids +
          "&cancelDetails=" +
          details +
          "&idu=" +
          idu,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const schedule = r.schedule;
            const scheduledData = r.scheduledData;
            const scheduleTestInProcess = r.scheduleTestInProcess;
            dispatch(success(schedule, scheduledData, scheduleTestInProcess));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error on Cancel Schedule: " + error));
        });
    };

    function request() {
      return { type: DATConst.GET_ALCOHOL_SCHEDULED_TESTS_REQUEST };
    }
    function success(
      schedule,
      scheduledData,
      scheduleTestInProcess,
      alcoholSchedule
    ) {
      return {
        type: DATConst.GET_ALCOHOL_SCHEDULED_TESTS_SUCCESS,
        schedule,
        scheduledData,
        scheduleTestInProcess,
      };
    }
    function failure(error) {
      return { type: DATConst.GET_ALCOHOL_SCHEDULED_TESTS_FAILURE, error };
    }
  },
  cancelScheduledTest: (ids, details, idu) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/cancelScheduled?idS=" +
          ids +
          "&cancelDetails=" +
          details +
          "&idu=" +
          idu,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const schedule = r.schedule;
            const scheduledData = r.scheduledData;
            const scheduleTestInProcess = r.scheduleTestInProcess;
            dispatch(success(schedule, scheduledData, scheduleTestInProcess));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server" + error));
        });
    };

    function request() {
      return { type: DATConst.GET_DRUG_SCHEDULED_TESTS_REQUEST };
    }
    function success(
      schedule,
      scheduledData,
      scheduleTestInProcess,
      alcoholSchedule
    ) {
      return {
        type: DATConst.GET_DRUG_SCHEDULED_TESTS_SUCCESS,
        schedule,
        scheduledData,
        scheduleTestInProcess,
      };
    }
    function failure(error) {
      return { type: DATConst.GET_DRUG_SCHEDULED_TESTS_FAILURE, error };
    }
  },

  getScheduledTestDataAlcohol: (ids) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/getScheduledTestDataAlcohol?ids=" + ids,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const scheduledAlcoholTestData = r.scheduledData;
            dispatch(success(scheduledAlcoholTestData));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error getting Schedule Alcohol Data ${error}`));
        });
    };

    function request() {
      return {
        type: DATConst.GET_ALCOHOL_SCHEDULED_TEST_DATA_CLIENT_REQUEST,
      };
    }
    function success(scheduledAlcoholTestData) {
      return {
        type: DATConst.GET_ALCOHOL_SCHEDULED_TEST_DATA_CLIENT_SUCCESS,
        scheduledAlcoholTestData,
      };
    }
    function failure(error) {
      return {
        type: DATConst.GET_ALCOHOL_SCHEDULED_TEST_DATA_CLIENT_FAILURE,
        error,
      };
    }
  },

  getScheduledTestData: (ids) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DrugAndAlcoholTesting/getScheduledTestData?ids=" + ids, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const schedule = r.scheduledData;
            dispatch(success(schedule));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DATConst.GET_DRUG_SCHEDULED_TEST_DATA_REQUEST };
    }
    function success(schedule) {
      return {
        type: DATConst.GET_DRUG_SCHEDULED_TEST_DATA_SUCCESS,
        schedule,
      };
    }
    function failure(error) {
      return {
        type: DATConst.GET_DRUG_SCHEDULED_TEST_DATA_FAILURE,
        error,
      };
    }
  },
  toggleCancelScheduled: (id) => {
    return (dispatch, getState) => {
      var modalC = !getState().drugAndAlcoholTesting.modalCancel;
      var idD = 0;
      if (modalC) {
        idD = id;
      }
      dispatch(OpenClose(modalC, idD));
    };
    function OpenClose(modalC, idD) {
      return { type: DATConst.CANCEL_SCHEDULED_TOGGLE, modalC, idD };
    }
  },

  toggleCancelAlcoholSchedule: (id) => {
    return (dispatch, getState) => {
      var modalC = !getState().drugAndAlcoholTesting.modalCancelAlcohol;
      var idD = 0;
      if (modalC) {
        idD = id;
      }
      dispatch(OpenClose(modalC, idD));
    };
    function OpenClose(modalC, idD) {
      return { type: DATConst.CANCEL_ALCOHOL_SCHEDULED_TOGGLE, modalC, idD };
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
      return { type: DATConst.GET_PAYMENT_METHOD_REQUEST };
    }
    function success(items) {
      return { type: DATConst.GET_PAYMENT_METHOD_SUCCESS, items };
    }
    function failure(error) {
      return { type: DATConst.GET_PAYMENT_METHOD_FAILURE, error };
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
      return { type: DATConst.GET_DEFAULT_PAYMENT_REQUEST };
    }
    function success(items) {
      return { type: DATConst.GET_DEFAULT_PAYMENT_SUCCESS, items };
    }
    function failure(error) {
      return { type: DATConst.GET_DEFAULT_PAYMENT_FAILURE, error };
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
      return { type: DATConst.SET_DEFAULT_PAYMENT_REQUEST };
    }
    function success(items) {
      return { type: DATConst.SET_DEFAULT_PAYMENT_SUCCESS, items };
    }
    function failure(error) {
      return { type: DATConst.SET_DEFAULT_PAYMENT_FAILURE, error };
    }
  },
  chargeTest: (id, amount, method) => {
    let form = new FormData();
    form.append("idUser", id);
    form.append("amount", amount);
    form.append("paymentMethod", method);

    return (dispatch) => {
      dispatch(request());
      fetch("api/Stripe/DefaultCharge", { method: "POST", body: form })
        .then((result) => {
          dispatch(success());
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DATConst.CHARGE_TEST_REQUEST };
    }
    function success() {
      return { type: DATConst.CHARGE_TEST_SUCCESS };
    }
    function failure(error) {
      return { type: DATConst.CHARGE_TEST_FAILURE, error };
    }
  },
  toggleAddCardModal: () => {
    return (dispatch, getState) => {
      const modal = !getState().drugAndAlcoholTesting.addCardModal;
      dispatch(OpenClose(modal));
    };
    function OpenClose(modal) {
      return { type: DATConst.ADD_CARD_MODAL_TOGGLE, modal };
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
      return { type: DATConst.ATTACH_PAYMENT_METHOD_REQUEST };
    }
    function success(items) {
      return { type: DATConst.ATTACH_PAYMENT_METHOD_SUCCESS, items };
    }
    function failure(error) {
      return { type: DATConst.ATTACH_PAYMENT_METHOD_FAILURE, error };
    }
  },
  toggleDeleteScheduledDrug: (id) => {
    return (dispatch, getState) => {
      var modal = !getState().drugAndAlcoholTesting.modalDeleteSchedule;
      var idDelete = 0;
      if (modal) {
        idDelete = id;
      }
      dispatch(OpenClose(modal, idDelete));
    };
    function OpenClose(modal, idDelete) {
      return { type: DATConst.DELETE_SCHEDULED_TOGGLE, modal, idDelete };
    }
  },

  toggleDeleteScheduledAlcohol: (id) => {
    return (dispatch, getState) => {
      var modal = !getState().drugAndAlcoholTesting.modalDeleteScheduleAlcohol;
      var idDelete = 0;
      if (modal) {
        idDelete = id;
      }
      dispatch(OpenClose(modal, idDelete));
    };
    function OpenClose(modal, idDelete) {
      return {
        type: DATConst.DELETE_SCHEDULED_ALCOHOL_TOGGLE,
        modal,
        idDelete,
      };
    }
  },

  deleteScheduledAlcohol: (idSchedule, userId) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/deleteScheduleAlcoholTest?idSchedule=" +
          idSchedule +
          "&iduser=" +
          userId,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const schedule = r.schedule;
            dispatch(success(schedule));
          } else {
            dispatch(failure("error"));
          }
        })
        .catch((error) => {
          dispatch(failure("Error delete Scheduled Test" + error));
        });
    };

    function request() {
      return { type: DATConst.DELETE_ALCOHOL_SCHEDULED_TEST_REQUEST };
    }
    function success(schedule) {
      return {
        type: DATConst.DELETE_ALCOHOL_SCHEDULED_TEST_SUCCESS,
        schedule,
      };
    }
    function failure(error) {
      return { type: DATConst.DELETE_ALCOHOL_SCHEDULED_TEST_FAILURE, error };
    }
  },

  deleteScheduledDrug: (idSchedule, userId) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/deleteScheduleDrugTest?idSchedule=" +
          idSchedule +
          "&iduser=" +
          userId,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const schedule = r.schedule;
            dispatch(success(schedule));
          } else {
            dispatch(failure("error"));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DATConst.DELETE_DRUG_SCHEDULED_TEST_REQUEST };
    }
    function success(schedule) {
      return {
        type: DATConst.DELETE_DRUG_SCHEDULED_TEST_SUCCESS,
        schedule,
      };
    }
    function failure(error) {
      return { type: DATConst.DELETE_DRUG_SCHEDULED_TEST_FAILURE, error };
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
      return { type: DATConst.GET_ALL_DOCUMENTS_REQUEST };
    }
    function success(docs) {
      return { type: DATConst.GET_ALL_DOCUMENTS_SUCCESS, docs };
    }
    function failure(error) {
      return { type: DATConst.GET_ALL_DOCUMENTS_FAILURE, error };
    }
  },
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
      return { type: DATConst.DELETE_DOCUMENT_REQUEST_C };
    }
    function success(docs) {
      return { type: DATConst.DELETE_DOCUMENT_SUCCESS_C, docs };
    }
    function failure(error) {
      return { type: DATConst.DELETE_DOCUMENT_FAILURE_C, error };
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
      return { type: DATConst.DOWNLOAD_DOCUMENT_REQUEST };
    }
    function success() {
      return { type: DATConst.DOWNLOAD_DOCUMENT_SUCCESS };
    }
    function failure(error) {
      return { type: DATConst.DOWNLOAD_DOCUMENT_FAILURE, error };
    }
  },
  toggleDeleteFilesDrugTestModal: (id, docType, descriptionDoc) => {
    return (dispatch, getState) => {
      var modalDeleteFilesDrugTest = !getState().drugAndAlcoholTesting
        .modalDeleteFilesDrugTest;
      var idD = 0;
      var fileName = "";
      var docTypeToDelete = "";
      if (modalDeleteFilesDrugTest) {
        idD = id;
        fileName = descriptionDoc;
        docTypeToDelete = docType;
      }
      dispatch(
        OpenClose(modalDeleteFilesDrugTest, idD, docTypeToDelete, fileName)
      );
    };
    function OpenClose(
      modalDeleteFilesDrugTest,
      idD,
      docTypeToDelete,
      fileName
    ) {
      return {
        type: DATConst.DELETE_DOCUMENT_TOGGLE_FILES_DRUGTEST,
        modalDeleteFilesDrugTest,
        idD,
        docTypeToDelete,
        fileName,
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
      return { type: DATConst.UPLOAD_FILE_REQUEST };
    }
    function success(docs) {
      return { type: DATConst.UPLOAD_FILE_SUCCESS, docs };
    }
    function failure(error) {
      return { type: DATConst.UPLOAD_FILE_FAILURE, error };
    }
  },
  downloadDrugTestResult: (
    idComplince,
    idDriver,
    idUser,
    docType,
    specimen
  ) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/downloadDrugTestResult?idCompliance=" +
          idComplince +
          "&idDriver=" +
          idDriver +
          "&idUser=" +
          idUser +
          "&docType=" +
          docType,
        { method: "GET" }
      )
        .then((response) => {
          response.blob().then((myblob) => {
            if (myblob !== null) {
              FileDownload(myblob, specimen + ".pdf");
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
      return { type: DATConst.DOWNLOAD_DOCUMENT_COLLECTOR_REQUEST };
    }
    function success() {
      return { type: DATConst.DOWNLOAD_DOCUMENT_COLLECTOR_SUCCESS };
    }
    function failure(error) {
      return { type: DATConst.DOWNLOAD_DOCUMENT_COLLECTOR_FAILURE, error };
    }
  },
  getProviderScheduledTests: (provider) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/getProviderScheduledTests?provider=" +
          provider,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const providerDrugTest = r.providerDrugTest;
            dispatch(success(providerDrugTest));
          } else {
            dispatch(failure("error"));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DATConst.GET_DRUG_SCHEDULED_TEST_PROVIDER_REQUEST };
    }
    function success(providerDrugTest) {
      return {
        type: DATConst.GET_DRUG_SCHEDULED_TEST_PROVIDER_SUCCESS,
        providerDrugTest,
      };
    }
    function failure(error) {
      return {
        type: DATConst.GET_DRUG_SCHEDULED_TEST_PROVIDER_FAILURE,
        error,
      };
    }
  },
  getProviderScheduledDrugTestData: (idScheduledTest) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/getProviderScheduledDrugTestData?idScheduledTest=" +
          idScheduledTest,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const scheduleData = r.scheduleData;
            const DrugTestData = r.DrugTestData;
            const fileComplianceByDrugTest = r.FileCompliance;
            dispatch(success(scheduleData, DrugTestData, fileComplianceByDrugTest));
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
        type: DATConst.GET_DRUG_SCHEDULED_TEST_DATA_PROVIDER_REQUEST,
      };
    }
    function success(scheduleData, DrugTestData, fileComplianceByDrugTest) {
      return {
        type: DATConst.GET_DRUG_SCHEDULED_TEST_DATA_PROVIDER_SUCCESS,
        scheduleData,
        DrugTestData,
        fileComplianceByDrugTest,
      };
    }
    function failure(error) {
      return {
        type: DATConst.GET_DRUG_SCHEDULED_TEST_DATA_PROVIDER_FAILURE,
        error,
      };
    }
  },
  createDrugTest: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DrugAndAlcoholTesting/createDrugTest", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const providerDrugTest = r.providerDrugTest;
            dispatch(success(providerDrugTest));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DATConst.POST_DRUG_TEST_REQUEST };
    }
    function success(providerDrugTest) {
      return {
        type: DATConst.POST_DRUG_TEST_SUCCESS,
        providerDrugTest,
      };
    }
    function failure(error) {
      return { type: DATConst.POST_DRUG_TEST_FAILURE, error };
    }
  },
  createAlcoholTest: (form, callback) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DrugAndAlcoholTesting/createAlcoholTest", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const providerDrugTest = r.providerAlcoholTests;
            callback();
            dispatch(success(providerDrugTest));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error in the Server"));
        });
    };

    function request() {
      return { type: DATConst.POST_DRUG_TEST_REQUEST };
    }
    function success(providerDrugTest) {
      return {
        type: DATConst.POST_DRUG_TEST_SUCCESS,
        providerDrugTest,
      };
    }
    function failure(error) {
      return { type: DATConst.POST_DRUG_TEST_FAILURE, error };
    }
  },
  openCloseDrugTest: (id) => {
    return (dispatch, getState) => {
      const modal = !getState().drugAndAlcoholTesting.modalDrugTest;
      if (id !== null) {
        fetch(
          "api/DrugAndAlcoholTesting/getProviderScheduledDrugTestData?idScheduledTest=" +
            id,
          { method: "GET" }
        )
          .then((res) => res.json())
          .then((response) => {
            const r = JSON.parse(response);
            if (r.status === 0) {
              const DrugTestData = r.DrugTestData;
              const scheduleData = r.scheduleData;
              const fileComplianceByDrugTest = r.FileCompliance;
              dispatch(OpenClose(modal, DrugTestData, scheduleData, fileComplianceByDrugTest));
            } else {
              dispatch(OpenClose(modal, {}, {}));
            }
          })
          .catch((error) => {
            dispatch(OpenClose(modal, {}, {}));
          });
      } else {
        dispatch(OpenClose(modal, {}, {}));
      }
    };

    function OpenClose(modal, drugTest, scheduleData, fileComplianceByDrugTest) {
      return {
        type: DATConst.TOGGLE_DRUG_TEST_COLLECTOR,
        modal,
        drugTest,
        scheduleData,
        fileComplianceByDrugTest
      };
    }
  },
  openCloseAlcoholTest: (id) => {
    return (dispatch, getState) => {
      const modal = !getState().drugAndAlcoholTesting.modalAlcoholTest;
      if (id !== null) {
        fetch(
          "api/DrugAndAlcoholTesting/GetProviderScheduledAlcoholTestData?idScheduledTest=" +
            id,
          { method: "GET" }
        )
          .then((res) => res.json())
          .then((response) => {
            const r = JSON.parse(response);
            if (r.status === 0) {
              const alcoholTest = r.alcoholTest;
              const alcoholScheduleData = r.scheduledAlcoholTestData;
              const FileCompliance = r.FileCompliance;
              dispatch(OpenClose(modal, alcoholTest, alcoholScheduleData, FileCompliance));
            } else {
              dispatch(OpenClose(modal, {}, {}));
            }
          })
          .catch((error) => {
            dispatch(OpenClose(modal, {}, {}));
          });
      } else {
        dispatch(OpenClose(modal, {}, {}));
      }
    };

    function OpenClose(modal, alcoholTest, alcoholScheduleData, FileCompliance) {
      return {
        type: DATConst.TOGGLE_ALCOHOL_TEST_COLLECTOR,
        modal,
        alcoholTest,
        alcoholScheduleData,
        FileCompliance
      };
    }
  },
  deleteDocOfCollector: (id, companyId, driverId, docType, fileName) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/deleteDurgTestResult?id=" +
          id +
          "&idCompany=" +
          companyId +
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
      return { type: DATConst.DELETE_DOCUMENT_COLLECTOR_REQUEST };
    }
    function success() {
      return { type: DATConst.DELETE_DOCUMENT_COLLECTOR_SUCCESS };
    }
    function failure(error) {
      return { type: DATConst.DELETE_DOCUMENT_COLLECTOR_FAILURE, error };
    }
  },
  downloadDocCollector: (id, idCompany, docType, fileName, specimen) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/Drivers/downloadDocument?idd=" +
          id +
          "&idCompany=" +
          idCompany +
          "&docType=" +
          docType +
          "&fileName=" +
          fileName,
        { method: "GET" }
      )
        .then((response) => {
          response.blob().then((myblob) => {
            if (myblob !== null) {
              FileDownload(myblob, specimen + ".pdf"); //"filex.pdf"
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
      return { type: DATConst.DOWNLOAD_DOCUMENT_COLLECTOR_REQUEST };
    }
    function success() {
      return { type: DATConst.DOWNLOAD_DOCUMENT_COLLECTOR_SUCCESS };
    }
    function failure(error) {
      return { type: DATConst.DOWNLOAD_DOCUMENT_COLLECTOR_FAILURE, error };
    }
  },
  SaveCollectorSignature: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DrugAndAlcoholTesting/SaveCollectorSignature", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((signature) => {
          if (signature.value === "CollectorSignature.png") {
            dispatch(success(signature.value));
          } else {
            dispatch(failure(signature.value));
          }
        })
        .catch((error) => dispatch(failure(error)));
    };

    function request() {
      return { type: DATConst.POST_COLLECTOR_SIGNATURE_REQUEST };
    }
    function success(signature) {
      return {
        type: DATConst.POST_COLLECTOR_SIGNATURE_SUCCESS,
        signature,
      };
    }
    function failure(error) {
      return { type: DATConst.POST_COLLECTOR_SIGNATURE_FAILURE, error };
    }
  },
  updatStatusScheduleDrug: (id, status, cancelDetails) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/updatStatusScheduleDrugTest?idSchedule=" +
          id +
          "&status=" +
          status +
          "&cancelDetails=" +
          cancelDetails,
        { method: "get" }
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
      return { type: DATConst.UPDATE_STATUS_SCHEDULE_REQUEST };
    }
    function success() {
      return { type: DATConst.UPDATE_STATUS_SCHEDULE_SUCCESS };
    }
    function failure(error) {
      return { type: DATConst.UPDATE_STATUS_SCHEDULE_FAILURE, error };
    }
  },

  addNewDriver: (form) => {
    return (dispatch) => {
      dispatch(requestDriver());
      fetch("api/DQF/addNewDriver", { method: "POST", body: form })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const drivers = r.drivers;
            dispatch(addDriverSuccess(drivers));
          } else {
            dispatch(addDriverFail(r.error));
          }
        })
        .catch((error) => {
          dispatch(addDriverFail(`Can't Add Driver ${error}`));
        });
    };

    function requestDriver() {
      return { type: DATConst.POST_NEW_DRIVER_REQUEST };
    }
    function addDriverSuccess(drivers) {
      return { type: DATConst.POST_NEW_DRIVER_SUCCESS, drivers };
    }

    function addDriverFail(error) {
      return { type: DATConst.POST_NEW_DRIVER_FAILURE, error };
    }
  },

  getCountries: () => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DQF/getCountries", { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);

          if (r.status === 0) {
            const countries = r.countries;
            dispatch(success(countries));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error Loading Countries ...${error}`));
        });
    };
    function request() {
      return { type: DATConst.GET_COUNTRIES_REQUEST };
    }
    function success(countries) {
      return { type: DATConst.GET_COUNTRIES_SUCCESS, countries };
    }
    function failure(error) {
      return { type: DATConst.GET_COUNTRIES_FAILURE, error };
    }
  },

  toggle: (modalDriver) => {
    return (dispatch) => {
      const modal = !modalDriver;
      dispatch(OpenClose(modal));
    };
    function OpenClose(modal) {
      return { type: DATConst.NEW_DRIVER_TOGGLE, modal };
    }
  },

  getRandomAllTests: (Q, IdComapy) => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/DrugAndAlcoholTesting/Random" + Q, IdComapy, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const randomTests = r.randomTests;
            dispatch(success(randomTests));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error Loading Random Tests: ${error}`));
        });
    };
    function request() {
      return { type: DATConst.GET_RANDOM_TEST_REQUEST };
    }
    function success(randomTest) {
      return { type: DATConst.GET_RANDOM_TEST_SUCCESS, randomTest };
    }
    function failure(error) {
      return { type: DATConst.GET_RANDOM_TEST_FAILURE, error };
    }
  },

  generateRandomTest: (form, callback) => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/DrugAndAlcoholTesting/Random", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const driversRandomList = r.driversRandomList;
            const logsRandom = r.logsRandom;
            dispatch(success(driversRandomList, logsRandom));
          } else {
            dispatch(failure(r.error));
          }
          callback();
        })
        .catch((error) => {
          dispatch(failure(`Error Sorting New Random Tests: ${error}`));
        });
    };
    function request() {
      return { type: DATConst.RESORT_RANDOM_TEST_REQUEST };
    }
    function success(driversRandomList, logsRandom) {
      return {
        type: DATConst.RESORT_RANDOM_TEST_SUCCESS,
        driversRandomList,
        logsRandom,
      };
    }
    function failure(error) {
      return { type: DATConst.RESORT_RADOM_TEST_FAILURE, error };
    }
  },

  sendEmail: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/DrugAndAlcoholTesting/SendEmail", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            console.log('Send email success')
          } else {
            console.log('Send email failure')
          }
        })
        .catch((error) => {
          console.log('Peticion a backend de enviar email fallida')
        });
    };
    function request() {
      return { type: DATConst.MAIL_RANDOM_DRUG_TEST_GENERATED_REQUEST };
    }
  },

  generateReSchedule: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/DrugAndAlcoholTesting/generateReSchedule", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const rescheduleList = r.rescheduleList;
            const logsRandom = r.logsRandom;
            dispatch(success(rescheduleList, logsRandom));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error Sorting New Random Tests: ${error}`));
        });
    };
    function request() {
      return { type: DATConst.RESORT_RANDOM_TEST_REQUEST };
    }
    function success(driversRandomList, logsRandom) {
      return {
        type: DATConst.RESORT_RANDOM_TEST_SUCCESS,
        driversRandomList,
        logsRandom,
      };
    }
    function failure(error) {
      return { type: DATConst.RESORT_RADOM_TEST_FAILURE, error };
    }
  },

  generateRandomAlcoholTest: (form, callback) => {
    return (dispatch) => {
      dispatch(request());
      fetch("/api/DrugAndAlcoholTesting/RandomAlcohol", {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const driversRandomList = r.driversRandomList;
            const logsRandom = r.logsRandom;
            dispatch(success(driversRandomList, logsRandom));
          } else {
            dispatch(failure(r.error));
          }
          callback();
        })
        .catch((error) => {
          dispatch(failure(`Error Sorting New Random Tests: ${error}`));
        });
    };
    function request() {
      return { type: DATConst.RESORT_RANDOM_TEST_REQUEST };
    }
    function success(driversRandomList, logsRandom) {
      return {
        type: DATConst.RESORT_RANDOM_TEST_SUCCESS,
        driversRandomList,
        logsRandom,
      };
    }
    function failure(error) {
      return { type: DATConst.RESORT_RADOM_TEST_FAILURE, error };
    }
  },
  getProviderScheduledAlcoholTests: (provider) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "/api/DrugAndAlcoholTesting/GetProviderScheduledAlcoholTests?provider=" +
          provider,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const providerAlcoholTests = r.providerAlcoholTests;
            dispatch(success(providerAlcoholTests));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Couldn't retrieve data from the server"));
        });
    };

    function request() {
      return { type: DATConst.GET_ALCOHOL_SCHEDULED_TEST_PROVIDER_REQUEST };
    }

    function success(providerAlcoholTests) {
      return {
        type: DATConst.GET_ALCOHOL_SCHEDULED_TEST_PROVIDER_SUCCESS,
        providerAlcoholTests,
      };
    }

    function failure(error) {
      return {
        type: DATConst.GET_ALCOHOL_SCHEDULED_TEST_PROVIDER_FAILURE,
        error,
      };
    }
  },
  getProviderScheduledAlcoholTestData: (idScheduledTest) => {
    return (dispatch) => {
      dispatch(request());

      fetch(
        "/api/DrugAndAlcoholTesting/GetProviderScheduledAlcoholTestData?idScheduledTest=" +
          idScheduledTest,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const scheduledAlcoholTestData = r.scheduledAlcoholTestData;
            const alcoholTest = r.alcoholTest;
            const FileCompliance = r.FileCompliance;
            dispatch(
              success(scheduledAlcoholTestData, alcoholTest, FileCompliance)
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(error));
        });
    };

    function request() {
      return { type: DATConst.GET_ALCOHOL_SCHEDULED_TEST_DATA_REQUEST };
    }

    function success(scheduledAlcoholTestData, alcoholTest, FileCompliance) {
      return {
        type: DATConst.GET_ALCOHOL_SCHEDULED_TEST_DATA_SUCCESS,
        scheduledAlcoholTestData,
        alcoholTest,
        FileCompliance,
      };
    }

    function failure(error) {
      return {
        type: DATConst.GET_ALCOHOL_SCHEDULED_TEST_DATA_FAILURE,
        error,
      };
    }
  },
  UpdateStatusScheduleAlcoholTest(id, status, cancelDetails) {
    return (dispatch) => {
      dispatch(request());

      fetch(
        "/api/DrugAndAlcoholTesting/UpdateStatusScheduleAlcoholTest?idSchedule=" +
          id +
          "&status=" +
          status +
          "&cancelDetails=" +
          cancelDetails
      )
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            dispatch(success());
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(error));
        });
    };

    function request() {
      return { type: DATConst.UPDATE_STATUS_SCHEDULE_REQUEST };
    }

    function success() {
      return { type: DATConst.UPDATE_STATUS_SCHEDULE_SUCCESS };
    }

    function failure(error) {
      return {
        type: DATConst.UPDATE_STATUS_SCHEDULE_FAILURE,
        error,
      };
    }
  },

  saveDriverData: (form) => {
    return (dispatch) => {
      dispatch(request());
      fetch("api/DonnorInformation/UpdateDonnorDataInformation", {
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
        .catch((error) => failure(`Error Updating Donnor: ${error}`));
    };
    function request() {
      return { type: DATConst.POST_DATA_DRIVER_REQUEST };
    }
    function success() {
      return {
        type: DATConst.POST_DATA_DRIVER_SUCCESS,
      };
    }
    function failure(error) {
      return { type: DATConst.POST_DATA_DRIVER_FAILURE, error };
    }
  },

  getAllEnrollmentDocuments: (id, page, size) => {
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
            const enrollmentFiles = r.enrollmentFiles;
            dispatch(success(enrollmentFiles));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error handling data from Schedule Test!" + error));
        });
    };
    function request() {
      return { type: DATConst.GET_ENROLLMENT_DOCUMENTS_REQUEST };
    }
    function success(enrollmentFiles) {
      return {
        type: DATConst.GET_ENROLLMENT_DOCUMENTS_SUCCESS,
        enrollmentFiles,
      };
    }
    function failure(error) {
      return { type: DATConst.GET_ENROLLMENT_DOCUMENTS_FAILURE, error };
    }
  },
  cleanStepperData: (state) => {
    return (dispatch, getState) => {
      dispatch(Clean());
    };
    function Clean() {
      return { type: DATConst.DELETE_DATA_STEPPER_SUCCESS };
    }
  },

  //MIS DATOS
  MISReport: (id, dateActual, topDateActual) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "/api/DrugAndAlcoholTesting/MISData?idCompany=" +
          id +
          "&date=" +
          dateActual +
          "&topDate=" +
          topDateActual,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            const MISCollectionReport = r.MISCollectionReport;
            const DotDriversMIS = r.dotDriversList;
            const QuantityDrivers = DotDriversMIS.length;
            const CompanyData = r.CompanyData;
            dispatch(
              exito(
                MISCollectionReport,
                DotDriversMIS,
                QuantityDrivers,
                CompanyData
              )
            );
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure(`Error MIS report: ${error}`));
        });
    };
    function request() {
      return { type: DATConst.GET_MISREPORT_DOCUMENTS_REQUEST };
    }
    function exito(
      MISCollectionReport,
      DotDriversMIS,
      QuantityDrivers,
      CompanyData
    ) {
      return {
        type: DATConst.GET_MISREPORT_DOCUMENTS_SUCCESS,
        MISCollectionReport,
        DotDriversMIS,
        QuantityDrivers,
        CompanyData,
      };
    }
    function failure(error) {
      return { type: DATConst.GET_MISREPORT_DOCUMENTS_FAILURE, error };
    }
  },

  OnChangeForm: (name, value) => {
    return (dispatch) => {
      dispatch(SetStateForm(name, value));
    };
    function SetStateForm(name, value) {
      return { type: DATConst.POST_FORM_DATA, name, value };
    }
  },

  ///////////////////////////////////////////////////////////////////
  // getAllEnrollmentDocuments: (id, page, size) => {
  getDOTDrivers: (idu, page, page2, size) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DQF/getDrivers?idu=" +
          idu +
          "&page=" +
          page +
          "&page2=" +
          page2 +
          "&size=" +
          size,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            var drivers = 0;
            for (let x = 0; x < r.drivers.Items.length; x++) {
              if (r.drivers.Items[x].DrugsTest == true) {
                drivers = drivers + 1;
              }
            }
            const DOTDrivers = drivers;
            dispatch(success(DOTDrivers));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error handling data from DOT drivers!" + error));
        });
    };
    function request() {
      return { type: DATConst.GET_DOTDRIVERS_REQUEST };
    }
    function success(DOTDrivers) {
      return {
        type: DATConst.GET_DOTDRIVERS_SUCCESS,
        DOTDrivers,
      };
    }
    function failure(error) {
      return { type: DATConst.GET_DOTDRIVERS_FAILURE, error };
    }
  },
  ///////////////////////////////////////////////////////////////////
  updateDOTDrivers: (idu, value, callback, inactivate) => {
    return (dispatch) => {
      dispatch(request());
      fetch(
        "api/DrugAndAlcoholTesting/updateDOTDriver?idu=" +
          idu +
          "&value=" +
          value + 
          "&inactivate=" + 
          inactivate,
        { method: "POST" }
      )
        .then((res) => res.json())
        .then((response) => {
          const r = JSON.parse(response);
          if (r.status === 0) {
            callback(idu, 1, 1, 1000);
            const driverList = r.driverList;
            dispatch(success(driverList));
          } else {
            dispatch(failure(r.error));
          }
        })
        .catch((error) => {
          dispatch(failure("Error UPDATE DOT DRIVER", error));
        });
    };

    function request() {
      return { type: DATConst.UPDATE_DOTDriver_REQUEST };
    }
    function success(driverList) {
      return { type: DATConst.UPDATE_DOTDriver_SUCCESS, driverList };
    }
    function failure(error) {
      return {
        type: DATConst.UPDATE_DOTDriver_FAILURE,
        error,
      };
    }
  },
};
///////////////////////////////////////////////////////////////////
export const reducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    ////#region
    // GET
    case DATConst.GET_MISREPORT_DOCUMENTS_SUCCESS:
      return {
        ...state,
        MISCollectionReport: action.MISCollectionReport,
        DotDriversMIS: action.DotDriversMIS,
        QuantityDrivers: action.QuantityDrivers,
        CompanyData: action.CompanyData,
        isLoading: false,
        isLoadingMIS: false,
      };

    case DATConst.GET_MISREPORT_DOCUMENTS_REQUEST:
      return { ...state, isLoading: true, isLoadingMIS: true };

    case DATConst.GET_MISREPORT_DOCUMENTS_FAILURE:
      return {
        ...state,
        ValidationMIS: true,
        isLoading: false,
        isLoadingMIS: false,
        // toastAlertState: true,
        error: action.error,
        message: "",
      };

    case DATConst.UPDATE_DOTDriver_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.UPDATE_DOTDriver_SUCCESS:
      return {
        ...state,
        isLoading: false,
        driversList: action.driverList,
        idDelete1: 0,
        toastAlertState: true,
        message: "Driver Removed Successfully",
        modalDeleteDA: false,
        modalActivateDA: false,
        error: "",
      };

    case DATConst.DELETE_DRIVER_TOGGLE:
      return {
        ...state,
        modalDeleteDA: action.modalDeleteDA,
        idDelete1: action.idD,
      };

      case DATConst.RESTORE_DRIVER_TOGGLE:
      return {
        ...state,
        modalActivateDA: action.modalActivateDA,
        idDelete1: action.idD,
      };

    case DATConst.UPDATE_DOTDriver_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        message: "",
        driversList: [],
        error: action.error,
        idDelete1: 0,
        modalDeleteDA: false,
        modalActivateDA: false,
        message: "",
      };
    // UPLOAD
    // case DATConst.UPLOADMIS_FILE_REQUEST:
    //   return { ...state, isLoading: true, MISReports: [] };

    // case DATConst.UPLOADMIS_FILE_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     MISReports: action.MISReports.Items,
    //     error: "",
    //     toastAlertState: true,
    //     message: "File successfully uploaded",
    //   };

    // case DATConst.GET_ALL_MISREPORTS_FAILURE:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: action.error,
    //     message: "",
    //     toastAlertState: true,
    //   };

    // case DATConst.GET_ALL_MISREPORTS_REQUEST:
    //   return { ...state, isLoading: true, docs: [] };

    // case DATConst.GET_ALL_MISREPORTS_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     MISDocs: action.docs.Items,
    //     pageD: action.docs.CurrentPage,
    //     countD: action.docs.NumberP,
    //     error: "",
    //     message: "",
    //   };

    case DATConst.GET_ALL_DOCUMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };
    //#endregion
    case DATConst.DELETE_DATA_STEPPER_SUCCESS:
      return { ...state, scheduleDyA: {} };

    case DATConst.TOGGLE_TOAST_ALERT:
      return { ...state, toastAlertState: action.toastAlert };

    case DATConst.TOGGLE_DRUG_TOAST_ALERT:
      return { ...state, drugToastAlertState: action.toastAlert };
    
      case DATConst.TOGGLE_RANDOM_VALIDATION:
      return { ...state, isLoadingRandom: action.toastAlert };

    case DATConst.RESET_MESSAGE:
      return { ...state, message: "" };

    case DATConst.CONFIRM_COLLECTOR_SIGNATURE_SUCCESS:
      return {
        ...state,
        toastAlertState: true,
        message: "Signature Confirm",
        error: "",
        collectorSignature: action.signature,
      };

    case DATConst.CONFIRM_COLLECTOR_SIGNATURE_FAILURE:
      return {
        ...state,
        toastAlertState: true,
        error: "Empty Signature",
        message: "",
        collectorSignature: "",
      };

    case DATConst.POST_NEW_DRIVER_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.POST_NEW_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        drivers: action.drivers.Items,
        error: "",
        message: "New Driver has been added to Drug Testing Program",
        modal: false,
        toastAlertState: true,
      };

    case DATConst.POST_NEW_DRIVER_FAILURE:
      return {
        ...state,
        isLoading: false,
        modal: true,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case DATConst.CONFIRM_DONOR_SIGNATURE_SUCCESS:
      return {
        ...state,
        toastAlertState: true,
        message: "Signature Confirm",
        error: "",
        donorSignature: action.signature,
      };

    case DATConst.CONFIRM_DONOR_SIGNATURE_FAILURE:
      return {
        ...state,
        toastAlertState: true,
        error: "Empty Signature",
        message: "",
        donorSignature: "",
      };

    case DATConst.TOGGLE_DRUG_TEST:
      return {
        ...state,
        Id: action.id,
        modalDT: action.modal,
        DrugList: action.Durgitems,
        pageDrug: action.Drugpage,
        countDrug: action.Drugcount,
        AlcoholList: action.Alcoholitems,
        pageAlcohol: action.Alcoholpage,
        countAlcohol: action.Alcoholcount,
        docsDAT: action.Docitems,
        page: action.Docpage,
        count: action.Doccount,
      };

    case DATConst.NEW_DRIVER_TOGGLE:
      return {
        ...state,
        modal: action.modal,
        error: "",
      };

    case DATConst.ENROLL_DRIVER_TOGGLE:
      return {
        ...state,
        modalERL: action.modal,
        error: "",
        driversNE: action.items,
        pageNE: action.page,
        countNE: action.count,
      };

    case DATConst.CONFIRMATION_ENROLL_TOGGLE:
      return { ...state, modalCF: action.modal };

    case DATConst.GET_DRIVERS_DAT_REQUEST:
      return { ...state, isLoading: true, enrolledExport: [] };

    case DATConst.GET_DRIVERS_DAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        driversE: action.drivers.Items,
        pageE: action.drivers.CurrentPage,
        countE: action.drivers.NumberP,
        enrolledExport: action.enrolledExport,
      };

    case DATConst.GET_DRIVERS_DAT_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "",
      driversE: [],
    };

    case DATConst.GET_NONDOTDRIVERS_DAT_REQUEST:
      return { ...state, isLoading: true, NonenrolledExport: [] };

    case DATConst.GET_NONDOTDRIVERS_DAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        driversNonE: action.drivers.Items,
        pageNonE: action.drivers.CurrentPage,
        countNonE: action.drivers.NumberP,
        NonenrolledExport: action.enrolledExport,
      };

    case DATConst.GET_NONDOTDRIVERS_DAT_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "",
    driversNonE:[] };

    case DATConst.EXPORT_ENROLL_DRIVER_REQUEST:
      return { ...state, isLoading: true, enrolledExport: [] };

    case DATConst.EXPORT_ENROLL_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        enrolledExport: action.enrolledExport,
      };

    case DATConst.EXPORT_ENROLL_DRIVER_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DATConst.GET_DRIVERSNE_DAT_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.GET_DRIVERSNE_DAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        driversNE: action.drivers.Items,
        pageNE: action.drivers.CurrentPage,
        countNE: action.drivers.NumberP,
      };

    case DATConst.GET_DRIVERSNE_DAT_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DATConst.ENROLL_DRIVER_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.ENROLL_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        driversNE: action.driversNE.Items,
        pageNE: action.driversNE.CurrentPage,
        countNE: action.driversNE.NumberP,
        driversE: action.driversE.Items,
        pageE: action.driversE.CurrentPage,
        countE: action.driversE.NumberP,
        toastAlertState: true,
        error: "",
        message: action.enroll
          ? "Driver Enrolled Successfully"
          : "Driver Removed Successfully",
      };

    case DATConst.ENROLL_DRIVER_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case DATConst.DRUGSTEST_DOCS_TOGGLE:
      return {
        ...state,
        modalDA: action.modal,
        error: "",
        docs: action.d,
        certificate: action.items,
        pageCE: action.page,
        countCE: action.count,
        training: action.items2,
        pageST: action.page2,
        countST: action.count2,
      };

    case DATConst.DELETE_CERTIFICATES_TOGGLE:
      return { ...state, modalDDA: action.modalDDA, idDeleteDA: action.idD };

    case DATConst.DELETE_TRAINING_TOGGLE:
      return { ...state, modalDST: action.modalDST, idDeleteST: action.idD };

    case DATConst.SAVE_DRUGSTEST_DOCS_REQUEST:
      return {
        ...state,
        isLoading: true,
        docs: {},
        certificate: [],
        pageCE: 0,
        countCE: 0,
        idDeleteDA: 0,
        training: [],
        pageST: 0,
        countST: 0,
      };

    case DATConst.SAVE_DRUGSTEST_DOCS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        modalDA: true,
        docs: action.docs,
        certificate: action.certificate.Items,
        pageCE: action.certificate.CurrentPage,
        countCE: action.certificate.NumberP,
        training: action.training.Items,
        pageST: action.training.CurrentPage,
        countST: action.training.NumberP,
        toastAlertState: true,
        error: "",
        message: "Saved Successfully",
      };

    case DATConst.SAVE_DRUGSTEST_DOCS_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case DATConst.GET_CERTIFICATES_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.GET_CERTIFICATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        certificate: action.certificate.Items,
        pageCE: action.certificate.CurrentPage,
        countCE: action.certificate.NumberP,
      };

    case DATConst.GET_CERTIFICATES_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DATConst.DELETE_CERTIFICATES_REQUEST:
      return {
        ...state,
        isLoading: true,
        certificate: [],
        pageCE: 0,
        countCe: 0,
      };

    case DATConst.DELETE_CERTIFICATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        certificate: action.items,
        pageCE: action.page,
        countCE: action.count,
        toastAlertState: true,
        error: "",
        message: "File has been deleted Successfully",
        idDeleteDA: 0,
        modalDDA: false,
        modalDA: true,
      };

    case DATConst.DELETE_CERTIFICATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
        idDeleteDA: 0,
      };

    case DATConst.GET_TRAINING_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.GET_TRAINING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        training: action.training.Items,
        pageST: action.training.CurrentPage,
        countST: action.training.NumberP,
      };

    case DATConst.GET_TRAINING_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DATConst.DELETE_TRAINING_REQUEST:
      return { ...state, isLoading: true, training: [], pageST: 0, countST: 0 };

    case DATConst.DELETE_TRAINING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        training: action.items2,
        pageST: action.page2,
        countST: action.count2,
        error: "",
        toastAlertState: true,
        message: "Deleted Successfully",
        idDeleteST: 0,
        modalDST: false,
        modalDA: true,
      };

    case DATConst.DELETE_TRAINING_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
        idDeleteST: 0,
      };

    case DATConst.POST_DRUG_ALCOHOL_TEST_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DATConst.POST_DRUG_ALCOHOL_TEST_SUCCESS:
      return {
        ...state,
        isLoadingM: false,
        error: "",
        toastAlertState: true,
        message: "Saved Successfully",
        DrugList: action.drugTest.Items,
        pageDrug: action.drugTest.CurrentPage,
        countDrug: action.drugTest.NumberP,
        AlcoholList: action.alcoholTest.Items,
        pageAlcohol: action.alcoholTest.CurrentPage,
        countAlcohol: action.alcoholTest.NumberP,
        fitness: action.fitness,
        modalDrugTest: false,
      };

    case DATConst.POST_DRUG_ALCOHOL_TEST_FAILURE:
      return {
        ...state,
        isLoadingM: false,
        error: action.error,
        toastAlertState: true,
        message: "",
      };

    case DATConst.GET_LIST_DRUG_ALCOHOL_TEST_REQUEST:
      return { ...state, isLoadingM: true, errorM: "" };

    case DATConst.GET_LIST_DRUG_ALCOHOL_TEST_SUCCESS:
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

    case DATConst.GET_LIST_DRUG_ALCOHOL_TEST_FAILURE:
      return { ...state, isLoadingM: false, error: action.error, message: "" };

    case DATConst.DELETE_DRIVER_DOCUMENT_TOGGLE:
      return {
        ...state,
        modalD: action.modalD,
        idDeleteDoc: action.idD,
        driverId: action.driver,
        docType: action.dType,
        fileName: action.fName,
      };

    case DATConst.POST_SAVE_DRIVER_DOCUMENT_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.POST_SAVE_DRIVER_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docsDAT: action.docs.Items,
        page: action.docs.CurrentPage,
        count: action.docs.NumberP,
        error: "",
        message: "File successfully uploaded",
        toastAlertState: true,
        modal1: true,
      };

    case DATConst.POST_SAVE_DRIVER_DOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case DATConst.GET_ALL_DRIVER_DOCUMENTS_REQUEST:
      return { ...state, isLoading: true, docsDAT: [] };

    case DATConst.GET_ALL_DRIVER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docsDAT: action.docs.Items,
        page: action.docs.CurrentPage,
        count: action.docs.NumberP,
        error: "",
        message: "",
      };

    case DATConst.GET_ALL_DRIVER_DOCUMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DATConst.DELETE_DRIVER_DOCUMENT_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.DELETE_DRIVER_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docsDAT: action.docs.Items,
        page: action.docs.CurrentPage,
        count: action.docs.NumberP,
        error: "",
        message: "Deleted Successfully",
        toastAlertState: true,
        idDelete: 0,
        modalD: false,
        modal1: true,
      };

    case DATConst.DELETE_DRIVER_DOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDelete: 0,
        toastAlertState: true,
        message: "",
      };

    case DATConst.GET_DRIVERS_LIST_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.GET_DRIVERS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        driversList: action.driverList,
        error: "",
      };

    case DATConst.GET_DRIVERS_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        driversList: [],
        error: action.error,
        message: "",
      };

    case DATConst.POST_SCHEDULE_DRUG_TEST_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.POST_SCHEDULE_DRUG_TEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduleDyA: action.schedule,
        appointmentSchedule: action.aSchedule,
        busyDays: action.busyDays,
      };

    case DATConst.POST_SCHEDULE_DRUG_TEST_FAILURE:
      return { ...state, isLoading: false };

    case DATConst.FINISH_SCHEDULE_DRUG_TEST_REQUEST:
      return { ...state, isLoading: true, validationRequest: "" };

    case DATConst.FINISH_SCHEDULE_DRUG_TEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduleDyA: action.schedule,
        appointmentSchedule: action.aSchedule,
        busyDays: action.busyDays,
        toastAlertState: true,
        validationRequest: action.status,
        error: "",
        message: "Test successfully scheduled",
      };
    case DATConst.FINISH_SCHEDULE_DRUG_TEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        validationRequest: action.status,
        message: "",
      };

    case DATConst.GET_SCHEDULE_FOR_DAY_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.GET_SCHEDULE_FOR_DAY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        appointmentSchedule: action.schedule,
      };

    case DATConst.GET_SCHEDULE_FOR_DAY_FAILURE:
      return { ...state, isLoading: false };

    case DATConst.GET_DRUG_SCHEDULED_TESTS_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.GET_DRUG_SCHEDULED_TESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduleTestComplete: action.scheduledData,
        scheduledTests: action.schedule,
        scheduleTestInProcess: action.scheduleTestInProcess,
        modalCancel: false,
      };

    case DATConst.GET_ALCOHOL_SCHEDULED_TESTS_REQUEST:
      return { ...state, isLoading: true };
    case DATConst.GET_ALCOHOL_SCHEDULED_TESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduledAlcoholTestsCompleted: action.scheduledAlcoholTestsCompleted,
        scheduledAlcoholTests: action.scheduledAlcoholTests,
        scheduledAlcoholTestsInProcess: action.scheduledAlcoholTestsInProcess,
        modalCancelAlcohol: false,
      };

    case DATConst.GET_DRUG_SCHEDULED_TESTS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DATConst.DELETE_DRUG_SCHEDULED_TEST_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.DELETE_DRUG_SCHEDULED_TEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduledTests: action.schedule,
        error: "",
        message: "Deleted Successfully",
        toastAlertState: true,
        modalDeleteSchedule: false,
        idScheduled: 0,
      };

    case DATConst.DELETE_DRUG_SCHEDULED_TEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDelete: 0,
        toastAlertState: true,
        message: "",
      };

    case DATConst.DELETE_ALCOHOL_SCHEDULED_TEST_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.DELETE_ALCOHOL_SCHEDULED_TEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduledAlcoholTests: action.scheduledAlcoholTests,
        error: "",
        message: "Deleted Successfully",
        toastAlertState: true,
        modalDeleteScheduleAlcohol: false,
        idScheduled: 0,
      };

    case DATConst.DELETE_ALCOHOL_SCHEDULED_TEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDelete: 0,
        toastAlertState: true,
        message: "",
      };

    case DATConst.GET_DRUG_SCHEDULED_TEST_DATA_REQUEST:
      return { ...state, isLoading: true, scheduleDyA: {} };

    case DATConst.GET_DRUG_SCHEDULED_TEST_DATA_SUCCESS:
      return { ...state, isLoading: false, scheduleDyA: action.schedule };

    case DATConst.GET_DRUG_SCHEDULED_TEST_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        scheduleDyA: {},
      };

    case DATConst.CANCEL_SCHEDULED_TOGGLE:
      return {
        ...state,
        modalCancel: action.modalC,
        idScheduled: action.idD,
        error: "",
      };

    case DATConst.CANCEL_ALCOHOL_SCHEDULED_TOGGLE:
      return {
        ...state,
        modalCancelAlcohol: action.modalC,
        idScheduled: action.idD,
        error: "",
      };

    case DATConst.GET_PAYMENT_METHOD_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.GET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "",
        paymentMethods: action.items,
      };

    case DATConst.GET_PAYMENT_METHOD_FAILURE:
      return { ...state, isLoading: false, error: "", message: "" };

    case DATConst.GET_DEFAULT_PAYMENT_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.GET_DEFAULT_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "",
        defaultPaymentMethod: action.items,
      };

    case DATConst.GET_DEFAULT_PAYMENT_FAILURE:
      return { ...state, isLoading: false, error: "", message: "" };

    case DATConst.SET_DEFAULT_PAYMENT_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.SET_DEFAULT_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        defaultPaymentMethod: action.items,
        toastAlertState: true,
        error: "",
        message: "Changed PaymentMethod Successfully",
      };

    case DATConst.SET_DEFAULT_PAYMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "Something went wrong",
        message: "",
      };

    case DATConst.CHARGE_TEST_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.CHARGE_TEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduleDyA: {},
        toastAlertState: true,
        error: "",
        message: "Drug test successfully scheduled",
      };

    case DATConst.CHARGE_TEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "Something went wrong! try again",
        message: "",
      };

    case DATConst.ADD_CARD_MODAL_TOGGLE:
      return { ...state, addCardModal: action.modal, error: "" };

    case DATConst.ATTACH_PAYMENT_METHOD_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.ATTACH_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "",
        message: "New Payment Method added",
        paymentMethods: action.items,
        addCardModal: false,
      };

    case DATConst.ATTACH_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case DATConst.DELETE_SCHEDULED_TOGGLE:
      return {
        ...state,
        modalDeleteSchedule: action.modal,
        idScheduled: action.idDelete,
        error: "",
      };
    case DATConst.DELETE_SCHEDULED_ALCOHOL_TOGGLE:
      return {
        ...state,
        modalDeleteScheduleAlcohol: action.modal,
        isScheduled: action.idDelete,
        error: "",
      };

    case DATConst.GET_ALL_DOCUMENTS_REQUEST:
      return { ...state, isLoading: true, docs: [] };

    case DATConst.GET_ALL_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docs: action.docs.Items,
        pageD: action.docs.CurrentPage,
        countD: action.docs.NumberP,
        error: "",
        message: "",
      };

    case DATConst.GET_ALL_DOCUMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DATConst.DELETE_DOCUMENT_TOGGLE_FILES_DRUGTEST:
      return {
        ...state,
        modalDeleteFilesDrugTest: action.modalDeleteFilesDrugTest,
        idDelete: action.idD,
        fileNameToDelete: action.fileName,
        docTypeToDelete: action.docTypeToDelete,
      };

    case DATConst.DELETE_DOCUMENT_REQUEST_C:
      return { ...state, isLoading: true };

    case DATConst.DELETE_DOCUMENT_SUCCESS_C:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "",
        message: "File deleted successfully",
        idDelete: 0,
        idDelete2: 0,
        docTypeDelete2: 0,
        docNameDelete2: 0,
        modalDeleteDAEC: false,
        modalDeleteFilesDrugTest: false,
        docs: action.docs.Items,
      };

    case DATConst.DELETE_DOC_TOGGLE:
      return {
        ...state,
        modalDeleteDAEC: action.modalDeleteDAEC,
        idDelete2: action.idD,
        docTypeDelete2: action.docTypeDelete2,
        docNameDelete2: action.docNameDelete2,
      };

    case DATConst.DELETE_DOCUMENT_FAILURE_C:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        modalDeleteDAEC: false,
        message: "",
        idDelete: 0,
        idDelete2: 0,
        docTypeDelete2: 0,
        docNameDelete2: 0,
      };

    case DATConst.DOWNLOAD_DOCUMENT_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.DOWNLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.message,
        error: "",
        idDownload: 0,
      };

    case DATConst.DOWNLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
        idDownload: 0,
      };

    case DATConst.UPLOAD_FILE_REQUEST:
      return { ...state, isLoading: true, docs: [] };

    case DATConst.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docs: action.docs.Items,
        error: "",
        ToastAlertState: true,
        message: "File successfully uploaded",
      };

    case DATConst.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        toastAlertState: true,
      };

    case DATConst.GET_DRUG_SCHEDULED_TEST_PROVIDER_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.GET_DRUG_SCHEDULED_TEST_PROVIDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        providerDrugTest: action.providerDrugTest,
      };

    case DATConst.GET_DRUG_SCHEDULED_TEST_PROVIDER_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DATConst.GET_DRUG_SCHEDULED_TEST_DATA_PROVIDER_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.GET_DRUG_SCHEDULED_TEST_DATA_PROVIDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduleData: action.scheduleData,
        DrugTestData: action.DrugTestData,
        fileComplianceByDrugTest: action.fileComplianceByDrugTest,
      };

    case DATConst.GET_DRUG_SCHEDULED_TEST_DATA_PROVIDER_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DATConst.POST_DRUG_TEST_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.POST_DRUG_TEST_SUCCESS:
      return {
        ...state,
        toastAlertState: true,
        message: "Collection Completed",
        error: "",
        isLoading: false,
        providerDrugTest: action.providerDrugTest,
      };

    case DATConst.POST_DRUG_TEST_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DATConst.TOGGLE_DRUG_TEST_COLLECTOR:
      return {
        ...state,
        isLoading: false,
        modalDrugTest: action.modal,
        DrugTestData: action.drugTest,
        scheduleData: action.scheduleData,
        fileComplianceByDrugTest: action.fileComplianceByDrugTest
      };
    case DATConst.TOGGLE_ALCOHOL_TEST_COLLECTOR:
      return {
        ...state,
        isLoading: false,
        modalAlcoholTest: action.modal,
        error: "",
        alcoholTest: action.alcoholTest,
        alcoholScheduleData: action.alcoholScheduleData,
        FileCompliance: action.FileCompliance
      };
    case DATConst.DELETE_DOCUMENT_COLLECTOR_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.DELETE_DOCUMENT_COLLECTOR_SUCCESS:
      return {
        ...state,
        error: "",
        message: "Deleted Successfully",
        toastAlertState: true,
        idDelete: 0,
        modalD: false,
        modalDrugTest: false,
      };

    case DATConst.DELETE_DOCUMENT_COLLECTOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        idDelete: 0,
        toastAlertState: true,
        message: "",
      };

    case DATConst.DOWNLOAD_DOCUMENT_COLLECTOR_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.DOWNLOAD_DOCUMENT_COLLECTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.message,
        error: "",
      };

    case DATConst.DOWNLOAD_DOCUMENT_COLLECTOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case DATConst.POST_COLLECTOR_SIGNATURE_REQUEST:
      return { ...state, isLoading: true, message: "", error: "" };

    case DATConst.POST_COLLECTOR_SIGNATURE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: "",
        message: "Signature successfully saved",
        collectorSignature: action.signature,
      };

    case DATConst.POST_COLLECTOR_SIGNATURE_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case DATConst.UPDATE_STATUS_SCHEDULE_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.UPDATE_STATUS_SCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: true,
        error: "",
        updateSuccessful: true,
        message: "",
      };

    case DATConst.UPDATE_STATUS_SCHEDULE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "",
      };

    case DATConst.GET_RANDOM_TEST_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.GET_RANDOM_TEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "Get Random Tests Success",
        toastAlertState: true,
        modalRandomTest: true,
        toggle: false,
      };

    case DATConst.GET_RANDOM_TEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "Error Loading Random Tests",
        modalRandomTest: false,
        toggle: false,
      };
    case DATConst.RESORT_RANDOM_TEST_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.RESORT_RANDOM_TEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        driversRandomList: action.driversRandomList,
        logsRandom: action.logsRandom,
        modalRandomTest: true,
        toggle: false
      };

    case DATConst.RESORT_RADOM_TEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "Error Creating Random Tests Try Again!",
        modalRandomTest: false,
        toggle: false,
      };

    case DATConst.GET_STATS_REQUEST:
      return { ...state, isLoading: true };

    case DATConst.GET_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        Q1remainingDrivers: action.Q1remainingDrivers,
        Q1PercentageOfDrugtestDrivers: action.Q1PercentageOfDrugtestDrivers,
        Q2remainingDrivers: action.Q2remainingDrivers,
        Q2PercentageOfDrugtestDrivers: action.Q2PercentageOfDrugtestDrivers,
        Q3remainingDrivers: action.Q3remainingDrivers,
        Q3PercentageOfDrugtestDrivers: action.Q3PercentageOfDrugtestDrivers,
        Q4remainingDrivers: action.Q4remainingDrivers,
        Q4PercentageOfDrugtestDrivers: action.Q4PercentageOfDrugtestDrivers,
      };

    case DATConst.GET_STATS_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "Error Creating Random Tests Try Again!",
      };

    case DATConst.GET_ALCOHOL_SCHEDULED_TEST_PROVIDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DATConst.GET_ALCOHOL_SCHEDULED_TEST_PROVIDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        providerAlcoholTests: action.providerAlcoholTests,
      };
    case DATConst.GET_ALCOHOL_SCHEDULED_TEST_PROVIDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        providerAlcoholTests: [],
        message: "Couldn't load provider scheduled alcohol tests",
      };
    case DATConst.GET_ALCOHOL_SCHEDULED_TEST_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DATConst.GET_ALCOHOL_SCHEDULED_TEST_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduledAlcoholTestData: action.scheduledAlcoholTestData,
        alcoholTest: action.alcoholTest,
        FileCompliance: action.FileCompliance,
        scheduleDya: action.scheduledAlcoholTestData,
      };
    case DATConst.GET_ALCOHOL_SCHEDULED_TEST_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        scheduledAlcoholTestData: {},
        alcoholTest: [],
        FileCompliance: "",
      };
    case DATConst.POST_SCHEDULE_ALCOHOL_TEST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DATConst.POST_SCHEDULE_ALCOHOL_TEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduleDyA: action.scheduleTest,
        appointmentSchedule: action.aSchedule,
        busyDays: action.busyDays,
      };

    case DATConst.POST_SCHEDULE_ALCOHOL_TEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        scheduleDyA: {},
        appointmentSchedule: [],
      };
    case DATConst.FINISH_SCHEDULE_ALCOHOL_TEST_REQUEST:
      return {
        ...state,
        isLoading: true,
        validationRequest: "",
      };
    case DATConst.FINISH_SCHEDULE_ALCOHOL_TEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduleDyA: action.schedule,
        appointmentSchedule: action.aSchedule,
        busyDays: action.busyDays,
        toastAlertState: true,
        validationRequest: action.status,
        error: "",
        message: "Alcohol test successfully scheduled",
      };

    case DATConst.FINISH_SCHEDULE_ALCOHOL_TEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        validationRequest: action.status,
        message: "",
      };

    case DATConst.CANCEL_ALCOHOL_SCHEDULED_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DATConst.CANCEL_ALCOHOL_SCHEDULED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        isLoading: false,
        scheduleDyA: action.scheduledAlcoholTests,
        scheduledAlcoholTestsCompleted: action.scheduledAlcoholTestsCompleted,
        scheduledAlcoholTests: action.scheduledAlcoholTests,
        scheduledAlcoholTestsInProcess: action.scheduledAlcoholTestsInProcess,
        modalCancel: false,
        toastAlertState: true,
        error: "",
        message: "Cancel Scheduled Alcohol Test Success",
      };

    case DATConst.CANCEL_ALCOHOL_SCHEDULED_FAILURE:
      return {
        ...state,
        isLoading: false,
        toastAlertState: true,
        error: action.error,
        message: "",
      };

    case DATConst.GET_ALCOHOL_SCHEDULED_TEST_DATA_CLIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        scheduleDyA: {},
      };
    case DATConst.GET_ALCOHOL_SCHEDULED_TEST_DATA_CLIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduleDyA: action.scheduledAlcoholTestData,
      };

    case DATConst.GET_ALCOHOL_SCHEDULED_TEST_DATA_CLIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: "",
        scheduleDyA: {},
      };

    case DATConst.GET_ALCOHOL_SCHEDULED_TESTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DATConst.GET_ALCOHOL_SCHEDULED_TESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scheduledAlcoholTests: action.schedule,
        scheduledData: action.scheduledData,
        scheduledAlcoholTestsInProcess: action.scheduledAlcoholTestsInProcess,
      };
    case DATConst.GET_ALCOHOL_SCHEDULED_TESTS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DATConst.GET_ENROLLMENT_DOCUMENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DATConst.GET_ENROLLMENT_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "Donor information success updated",
        toastAlertState: true,
        driver: action.driver,
        alertsCount: action.alertsCount,
        alerts: action.alerts,
      };
    case DATConst.GET_ENROLLMENT_DOCUMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    ////////////////////////////////////////////////////////////////////
    case DATConst.GET_DOTDRIVERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DATConst.GET_DOTDRIVERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "",
        DOTDrivers: action.DOTDrivers,
        // alertsCount: action.alertsCount,
        // alerts: action.alerts,
      };
    case DATConst.GET_DOTDRIVERS_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };
    ////////////////////////////////////////////////////////////////////

    case DATConst.GET_DATA_DRIVER_REQUEST:
      return {
        ...state,
        isLoading: true,
        messageS: "",
        errorS: "",
        error: "",
        message: "",
      };

    case DATConst.GET_DATA_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        driver: action.driver.driver,
        States: action.driver.States,
        Countries: action.driver.Countries,
        signature: action.driver.driver.FileSignature,
        companyInfo: action.company,
      };

    case DATConst.GET_DATA_DRIVER_FAILURE:
      return { ...state, isLoading: false, error: action.error, message: "" };

    case DATConst.POST_DATA_DRIVER_REQUEST:
      return { ...state, isLoading: true, error: "", message: "" };
    case DATConst.POST_DATA_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "Driver Information Updated",
        toastAlertState: true,
        driver: action.driver,
      };
    case DATConst.POST_DATA_DRIVER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "Driver information successfully saved",
        toastAlertState: true,
        driver: action.driver,
      };

    case DATConst.DELETE_DATA_STEPPER_SUCCESS:
      return {
        scheduleDyA: {},
      };

    case DATConst.POST_FORM_DATA:
      return {
        ...state,
        scheduleDyA: {
          ...state.scheduleDyA,
          [action.name]: action.value,
        },
      };
    default:
      return state;
  }
};
