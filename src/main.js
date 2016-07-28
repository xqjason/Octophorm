import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

import Header from './frame/header.jsx';
import SearchBar from './frame/search.jsx';
import ContentPanel from './frame/content.jsx';
import BottomMenu from './frame/bottom-menu.jsx';
import Login from './login.jsx';
import Form from './form.jsx';
import Hello from './hello.jsx';
import World from './world.jsx';

function get_cookie ( cookie_name ){
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
};

class Home extends React.Component {
	static contextTypes = {
    	router: React.PropTypes.object.isRequired
  	}
 	componentWillMount() {
 		var token = get_cookie("token")
 		
 		if (!token) {
      		// redirect to login if not
      		this.context.router.push('/login');
    	}
 	}

  	render() {
  		console.log("--here home render start--");  		

	    return (
	      <div>
	        <Header text="Welcome to Home page" />
	        <SearchBar />    
	        <ContentPanel>
	          	<div className="card">
		            <ul className="table-view">
		              <li className="table-view-cell"><Link to="/hello" className="push-right">hello</Link></li>
		              <li className="table-view-cell"><Link to="/world" className="push-right">world</Link></li>
                  <li className="table-view-cell"><Link to="/form" className="push-right">Lead Form</Link></li>
		            </ul>
	          	</div> 
	        </ContentPanel>
	        <BottomMenu />
	      </div>
	    )
 	}
};

render((
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login}/>
    <Route path="/form" component={Form}/>
    <Route path="/hello" component={Hello}/>
    <Route path="/world" component={World}/>
  </Router>
), document.getElementById('root'))