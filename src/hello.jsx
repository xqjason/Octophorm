import React from 'react';
import Header from './frame/header.jsx';

class Hello extends React.Component {
  render() {
    return (
		<div>	
	       <Header text="Hello Page" back="true" />
	       <div className="content">
		        Hello Page
	      </div>
	    </div>
	);
  }
}

export default Hello;