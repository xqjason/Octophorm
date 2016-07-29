import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

import Home from './home.jsx';
import Login from './login.jsx';
import Form from './form.jsx';
import Hello from './hello.jsx';
import World from './world.jsx';

render((
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
      <Route path="/hello" component={Hello}/>
    </Route>
    <Route path="/login" component={Login}/>
    <Route path="/world" component={World}/>
    <Route path="/form" component={Form}/>
  </Router>
), document.getElementById('root'))