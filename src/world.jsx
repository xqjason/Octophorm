import React from 'react';
import Header from './frame/header.jsx';
 
class World extends React.Component {
  render() {
    return (
		<div>	
	       <Header text="World Page" back="true" />
	       <div className="content">
		        World Page
	      </div>
	    </div>
	);
  }
}
 
export default World;