import React from "react";
import "./style.css";

const TutorialTab = props => {
  return <div onClick={props.onClickEvent} className="Header fa fa-question" />;
};

export default TutorialTab;
