import React from 'react'
import { Link } from 'react-router'

import Header from './frame/header.jsx';
import SearchBar from './frame/search.jsx';
import ContentPanel from './frame/content.jsx';
import BottomMenu from './frame/bottom-menu.jsx';

class Home extends React.Component {
	static contextTypes = {
    	router: React.PropTypes.object.isRequired
  	}
 	componentWillMount() {
 		var token = get_cookie("token"); 	 	
 		if (!token) {
      		// redirect to login if not
      		this.context.router.push('/login');
    	}
 	}
  	render() {
  		console.log("--here home render start--");  		

	    return (
	      <div>
	        <Header text="Welcome to Home page"/>
	        <SearchBar />    
	        <ContentPanel>
	          	<div className="card">
		            <ul className="table-view">
		              <li className="table-view-cell"><Link to="/hello" className="push-right">hello</Link></li>
		              <li className="table-view-cell"><Link to="/world" className="push-right">world</Link></li>
                  	  <li className="table-view-cell"><Link to="/form" className="push-right">Lead Form</Link></li>
		            </ul>
	          	</div>
	          	{this.props.children} 
	        </ContentPanel>
	        <BottomMenu />
	      </div>
	    )
 	}
};

export default Home;