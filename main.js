import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

import Header from './src/frame/header.jsx';
import SearchBar from './src/frame/search.jsx';
import ContentPanel from './src/frame/content.jsx';
import BottomMenu from './src/frame/bottom-menu.jsx';
import LoginPanel from './src/login.jsx';
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

	constructor(props) {
	    super(props);
	    this.state = {
	      text: 'initial text'
	    };
 	}

  	render() {
  		console.log("--here render start--");

  		var currentText = this.state.text;
  		console.log(currentText);
  		

	    return (
	      <div>
	        <Header text={this.state.text} />
	        <SearchBar />    
	        <ContentPanel>
	          	<div className="card">
		            <ul className="table-view">
		              <li className="table-view-cell"><Link to="/hello" className="push-right">hello</Link></li>
		              <li className="table-view-cell"><Link to="/world" className="push-right">world</Link></li>
		            </ul>
	          	</div> 
	          <LoginPanel />
	        </ContentPanel>
	        <BottomMenu />
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