import React from 'react'
import Navbar from './Navbar';
import Home from './Home'
import Profile from './Profile';
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [apiKey, setapiKey] = useState(() => {
    return(0)
  })

  const [name, setName] = useState(() => {
    return ("minisgimis")
  })

  const [region, setRegion] = useState(() => {
    return ("na1")
  })


  return (
    <Router>
      <div>
        <Navbar region={region} name={name} apiKey={apiKey}/>

        <Switch>

          <Route path='/Profile/:region/:name'>
            <Profile apiKey={apiKey}/>
          </Route>

          <Route path='/History'>
            <h1>Match History</h1>
          </Route>

          <Route path='/Recent'>
            <h1>Recent Statistics</h1>
          </Route>

          <Route path='/API'>
            <h1>Get API Key at https://developer.riotgames.com/</h1>
          </Route>

          <Route path='/'>
            <Home setapiKey={setapiKey} setRegion={setRegion} setName={setName} region={region} name={name} apiKey={apiKey}/>
            <button onClick={()=>{
              console.log(apiKey)
            }}>temp button to log api</button>
          </Route>

        </Switch>
      </div>
    </Router>

  );
}

export default App;
