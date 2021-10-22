import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Home from './Home'
import Profile from './Profile';
import History from './History';
import Statistics from './Statistics';
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

  const [data, setData] = useState(() => {
    return (0)
  })

  const [masteryData, setMasteryData] = useState(() => {
    return (0)
  })


  return (
    <Router>
      <div>
        <Navbar region={region} name={name} apiKey={apiKey} data={data}/>

        <Switch>

          <Route path='/Profile/:region/:name'>
            <Profile setData={setData} setMasteryData={setMasteryData} masteryData={masteryData} data={data} apiKey={apiKey}/>
          </Route>

          <Route path='/History'>
            <History data={data} apiKey={apiKey}/>
          </Route>

          <Route path='/Recent'>
            <Statistics data={data} apiKey={apiKey}/>
          </Route>

          <Route path='/API'>
            <h1>Get API Key at https://developer.riotgames.com/</h1>
          </Route>

          <Route path='/'>
            <Home setData={setData} setMasteryData={setMasteryData} setapiKey={setapiKey} setRegion={setRegion} setName={setName} region={region} name={name} apiKey={apiKey}/>

          </Route>

        </Switch>
      </div>
    </Router>

  );
}

export default App;
