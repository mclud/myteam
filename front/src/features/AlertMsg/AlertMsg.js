import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAlertMsg, valid, invalid, origin } from "./AlertMsgSlice";
import "../AlertMsg/AlertMsg.css";

export default function AlertMsg() {

    const alertMsg = useSelector(selectAlertMsg)

    return(
        <div className="alertBlock">
        {alertMsg.visible ? 
        <div className={alertMsg.msgClass}>
            <div>{alertMsg.msg}</div>
        </div>
        : 
        null
        }
        </div>
    )
}