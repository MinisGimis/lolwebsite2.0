import React, { useEffect } from 'react'
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Home.css'

const Home = ({ }) => {

  var apiKey;

  useEffect(() => {
    var apiKey = sessionStorage.getItem('apiKey');
    if (apiKey) {
      document.getElementById('apiInput').value = apiKey;
    }
  }, []);

  return (
    <div>
      <h1 className="searchText">Search for a Player</h1>
      <div className="searchBar">
        <select id="regionSelect" className="regionSelect" onChange={()=>{
          
        }}>
          <option value="na1">NA</option>
          <option value="euw1">EUW</option>
          <option value="eun1">EUNE</option>
          <option value="la1">LAN</option>
          <option value="la2">LAS</option>
          <option value="br1">BR</option>
          <option value="oc1">OCE</option>
          <option value="ru1">RU</option>
          <option value="tr1">TR</option>
          <option value="jp1">JP</option>
          <option value="kr">KR</option>
        </select>

        <input id="inputText" className="inputText" placeholder="Enter Summoner Name"></input>
        <Link 
          onClick={()=> {
            sessionStorage.setItem('region', (document.getElementById("regionSelect")).value);
            sessionStorage.setItem('username', (document.getElementById('inputText').value).toLowerCase());
            sessionStorage.setItem('apiKey', document.getElementById("apiInput").value);
          }}to={`/Profile`}
          className="searchButton">Search
        </Link>

      </div>
      <p className="apiText">Copy your Developer API Key Here</p>
      <div className="apibar" >
        <input className="apiInput" id="apiInput" type="password" placeholder="Enter Developer API Key" ></input>
        <button className="showapi" id="showapi" onClick={()=>{
          var target = document.getElementById("apiInput")
          if (target.type == "password") {
            target.type="text"
            document.getElementById("showapi").innerText = "Hide";
          }
          else {
              target.type="password"
              document.getElementById("showapi").innerText = "Show";
          }
      }}>Show</button>
      </div>
    </div>
  )
}
export default Home
