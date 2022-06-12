// Copyright (c) 2018 Bhojpur Consulting Private Limited, India. All rights reserved.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

// import logo from './logo.svg'
import './App.css'
import Menu from './components/Menu/Menu'
import Members from './components/Authentication/Members'
import FrontDesk, {CallForAction } from './components/Home/FrontDesk'
import SearchBlock from "./components/Searching/Search"
import Practitioner from './components/Practitioners/Practitioner'
import PractitionerProfile from './components/Practitioners/PractitionerProfile'

// import Footer from './components/Footer/Footer'

const App = () => {
  
  return (
    <div className="App">
      <header className="App-header">
      <Menu />  
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        */}
      < SearchBlock />
                
      </header>
      <CallForAction />
      <main id="main" className="App-content">
        
        <React.Fragment>
          <Router>
          <Switch>
            <Route exact path="/" component={FrontDesk} />
            <Route exact path="/subscribe" component={Members} />
            <Route exact path="/members/Authentication" component={Members} />
            <Route exact path="/donate" component={Members} />
            <Route exact path="/tryforfree" component={Members} />
            <Route exact path="/practitioners" component={Practitioner} />
            <Route exact path="/members/practitioners" component={PractitionerProfile} />
          </Switch>
          </Router>
        </React.Fragment>
      </main>
      <div className="App-sidebar"></div>
      {/* <footer className="App-footer">
        <Footer ></Footer>
      </footer> */}
    </div>
  )
}

export default App