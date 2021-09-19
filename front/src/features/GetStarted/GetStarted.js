import React from "react";
import { Link } from "react-router-dom";
import './GetStarted.css'

const GetStarted = () => {
    return(
        <section>
            <div className="getstarted">
                <div className="section-title">Get Started</div>
            </div>
            <div className="getstarted-body">
                <div className="gets-left">
                    <ul>
                        <li className="free-acc"><Link to="/join">Create a <b>FREE</b> account</Link></li>
                    </ul>
                </div>
                <div className="gets-right">
                    <ul>
                        <li>Create or Join a team</li>
                        <li>Invite your friends</li>
                        <li>Get Access to the Chat</li>
                        <li>Schedule a match</li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </section>
        
    )
}

export default GetStarted;