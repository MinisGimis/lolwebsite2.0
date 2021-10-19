import React from 'react'
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Home.css'

const Home = ({ setapiKey, setRegion, setName, region, name }) => {

    return (
        <div>
          <h1 className="searchText">Search for a Player</h1>
          <div className="searchBar">
            <select id="regionSelect"

            className="regionSelect" onChange={()=>{
                setRegion((document.getElementById("regionSelect")).value)
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
            <input id="inputText" className="inputText" placeholder="Enter Summoner Name" onChange={()=>{
                setName(((document.getElementById("inputText")).value).toLowerCase())
            }}></input>
            <Link to={`/Profile/${region}/${name}`}
            className="searchButton">Search</Link>
          </div>
          <p className="apiText">Copy your Developer API Key Here</p>
          <div className="apibar" >
            <input onChange={() => {
              setapiKey((document.getElementById("apiInput")).value)
            }} className="apiInput" id="apiInput" type="text" placeholder="Enter Developer API Key"></input>
            <button className="showapi" onClick={()=>{
              var target = document.getElementById("apiInput")
              if (target.type == "password") {
                target.type="text"
              }
              else {
                  target.type="password"
              }
          }}>Show/Hide</button>
          </div>
        </div>
    )
}
export default Home
