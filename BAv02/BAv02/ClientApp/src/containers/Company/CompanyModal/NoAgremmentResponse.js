import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import IconAgreement from "./../../../assets/icons/icons8-agreement.svg";

const NoAgremmentResponse = function () {
  const notify = () =>
    toast.error(
      "You are not able to open this document until you agree terms and add signature.",
      { hideProgressBar: false }
    );
  return (
    <div>
      <img
        src={IconAgreement}
        alt="Document Authorization"
        width={150}
        height={150}
        disabled
        onClick={notify}
      />
      <ToastContainer />
    </div>
  );
};

export default NoAgremmentResponse;
