import React from 'react'

const MessageCrashNotification = () => {
    return (
        <div style={{ textAlign: "center" }}>
        <img
          alt="Check"
          src="/assets/icons/icons8-checkmark.svg"
          style={{ width: "50px" }}
        />
        <h4>You're All Caught Up!</h4>
        <span style={{ fontSize: "15px", color: "#b2bec3" }}>
        You Have No Accident!
        </span>
      </div>
    )
}

export default MessageCrashNotification
