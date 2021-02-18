import logo from './logo.svg';
import './App.css';
import {
  Link, 
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"

import Login from "./content/Login"
import Admin from "./content/Admin"
import Dashboard from "./content/Dashboard/Dashboard"
import './app.scss'
import TutorialHeader from './components/TutorialHeader';
import { Content } from 'carbon-components-react';

function App() {
  return (
    <Router>
      <div >
        <TutorialHeader />
        {/* <Content> */}
          <Switch>
              <Route path="/dashboard"> <Dashboard /> </Route>
              <Route path="/admin"> <Admin /> </Route>
              <Route path="/login"> <Login /> </Route>
              <Route path="/"> <Login /> </Route>
          </Switch>
        {/* </Content> */}
      </div>
  </Router>
  )
}

export default App;