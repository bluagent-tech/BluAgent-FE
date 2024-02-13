import React from "react";

function MessageContainer(props) {
  if (Array.isArray(props.messages)) {
    let alertStyle = props.severies.map(function (severy, index) {
      const myStyle = {
        color: "black",
        backgroundColor: "white",
        marginTop: 4,
        borderRadius: 4,
        paddingLeft: 2,
        textAlign:"center",
        fontWeight: "bold",
      };
      if (props.tab == 1) {
        myStyle.backgroundColor = "#eaedf1";
        myStyle.color="black";
        myStyle.fontWeight="bold";
      } else {
        if (severy === "danger") myStyle.backgroundColor = "#f8d7da";
        if (severy === "warning") myStyle.backgroundColor = "#fff3cd";
        if (severy === "info") {
          myStyle.backgroundColor = "#cfe2ff";
          myStyle.color="black";
          myStyle.fontWeight="bold";
        }
      }
      return [myStyle, props.messages[index]];
    });
    return (
      <div>
        {alertStyle.map((myStyle, index) => (
          <div style={myStyle[0]} key={index}>
            {myStyle[1]}
          </div>
        ))}
      </div>
    );
  } else {
    let severy;
    const myStyle = {
      textAlign: "center",
      color: "black",
      backgroundColor: "black",
      marginTop: 4,
      borderRadius: 4,
      paddingLeft: 2,
      textAlign:"center",
      fontWeight:"bold",
    };
    if (props.tab == 1) {
      myStyle.backgroundColor = "#eaedf1";
      myStyle.color="black"; 
      myStyle.fontWeight="bold";
    } else {
      if (props.severies === "danger") myStyle.backgroundColor = "#f8d7da";
      if (props.severies === "warning") myStyle.backgroundColor = "#fff3cd";
      if (props.severies === "info") 
      {
        myStyle.backgroundColor = "#cfe2ff";
        myStyle.color="black"; 
        myStyle.fontWeight="bold";
      }

      if (props.severies === "message") 
      {
        myStyle.backgroundColor = "#eaedf1";
        myStyle.color="black"; 
        myStyle.fontWeight="bold";
      }
    }
    return <div style={myStyle}>{props.messages}</div>;
  }
}

export default MessageContainer;
