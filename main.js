import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

import Header from './src/frame/header.jsx';
import Hello from './src/hello.jsx';
import World from './src/world.jsx';

/*
class Content extends React.Component {
    render() {
        return (
         	 <div className="content">
	          <div className="card">
	            <ul className="table-view">
	              <li className="table-view-cell"><Link to="/hello" className="push-right">hello</Link></li>
	              <li className="table-view-cell"><Link to="/world" className="push-right">world</Link></li>
	            </ul>
	            {this.props.children}
	          </div>  
        	</div>
        );
    }
};
*/

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header text="This is the Home Page" />    
        <div className="content">
	          <div className="card">
	            <ul className="table-view">
	              <li className="table-view-cell"><Link to="/hello" className="push-right">hello</Link></li>
	              <li className="table-view-cell"><Link to="/world" className="push-right">world</Link></li>
	            </ul>
	          </div> 
	          {this.props.children} 
        </div>
      </div>
    )
  }
};

render((
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/hello" component={Hello}/>
    <Route path="/world" component={World}/>
  </Router>
), document.getElementById('root'))