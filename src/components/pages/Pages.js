import React from 'react'

import Home from './home/Home'
import About from './about/About'
import Project from './project/Project'
import Dashboard from './dashboard/Dashboard'
import Footer from '../footer/Footer'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from 'react-router-dom';

class Pages extends React.Component{
    
    
render() { 
  return(
    <Router>   
        <Switch>
            <Route path="/about">
              <About />
              <Footer/>
            </Route>
            <Route path="/project">
              <Project />
              <Footer/>
            </Route>
             <Route path="/dashboard">
              <Dashboard />
              <Footer/>
            </Route>
            <Route path="/">
              <Home />
              <Footer/>
            </Route>
        </Switch>  
    </Router>
  );
};

}

export default Pages;