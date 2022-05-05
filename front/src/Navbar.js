import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Navbar.css'

const Navbar = ({}) => {



    return (
        
            <nav>
              <div className="header">
                <Link to ="/" className="link" >Home</Link>
                <Link to ={`/Profile`} className="link" >Profile</Link>
                <Link to ={`/History`} className="link">History</Link>
                <Link to ={`/Recent`} className="link">Statistics</Link>
                <a href ="https://developer.riotgames.com" className="link"  target="_blank" rel="noopener noreferrer">API Key</a>
              </div>
            </nav>
        
    )
}

export default Navbar