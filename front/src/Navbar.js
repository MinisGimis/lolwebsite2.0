import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Navbar.css'

const Navbar = ({ region, name, apiKey }) => {



    return (
        
            <nav className="header">
                <Link to ="/" className="link" >Home</Link>
                <Link to ={`/Profile/${region}/${name}`} className="link" >Profile</Link>
                <Link to ={`/History/${region}/${name}/${apiKey}`} className="link">Match History</Link>
                <Link to ={`/Recent/${region}/${name}/${apiKey}`} className="link">Recent Statistics</Link>
                <Link to ="/API" className="link">API Key</Link>

                
            </nav>
        
    )
}

export default Navbar