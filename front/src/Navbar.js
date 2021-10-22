import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Navbar.css'

const Navbar = ({ region, name, apiKey, data}) => {



    return (
        
            <nav>
              <div className="header">
                <Link to ="/" className="link" >Home</Link>
                <Link to ={`/Profile/${region}/${name}`} className="link" >Profile</Link>
                <Link to ={`/History/${region}/${name}/${apiKey}`} className="link">History</Link>
                <Link to ={`/Recent/${region}/${name}/${apiKey}`} className="link">Statistics</Link>
                <a href ="https://developer.riotgames.com" className="link"  target="_blank" rel="noopener noreferrer">API Key</a>
              </div>
            </nav>
        
    )
}

export default Navbar